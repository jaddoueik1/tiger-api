import bcrypt from "bcryptjs";
import { Types } from "mongoose";
import { IBookedSession, ICoach, User } from "../models";
import { UserRole } from "../types";

export class CoachService {
	static async getAllCoaches(specialty?: string): Promise<ICoach[]> {
		const query: any = { roles: UserRole.COACH };

		if (specialty) {
			query.specialties = specialty;
		}
		return User.find(query).sort({ name: 1 });
	}

	static async getCoachById(id: string): Promise<ICoach | null> {
		return User.findOne({ _id: id, roles: UserRole.COACH });
	}

	static async createCoach(data: ICoach): Promise<ICoach> {
		const roles = data.roles || [];
		if (!roles.includes(UserRole.COACH)) roles.push(UserRole.COACH);
		data.passwordHash = await bcrypt.hash(data.password, 10);
		delete data.password;
		return User.create({ ...data, roles });
	}

	static async updateCoach(
		id: string,
		data: Partial<ICoach>
	): Promise<ICoach | null> {
		return User.findOneAndUpdate({ _id: id, roles: UserRole.COACH }, data, {
			new: true,
		});
	}

	static async deleteCoach(id: string): Promise<ICoach | null> {
		return User.findOneAndUpdate(
			{ _id: id, roles: UserRole.COACH },
			{ isActive: false },
			{ new: true }
		);
	}

	static async getCoachBookedSessions(id: string): Promise<IBookedSession[]> {
		const coach = await CoachService.getCoachById(id);

		if (!coach) {
			throw new Error("Coach not found");
		}

		return coach.bookedSessions ?? [];
	}

	static async addBookedSession(
		coachId: string,
		session: IBookedSession
	): Promise<IBookedSession> {
		const coach = await CoachService.getCoachById(coachId);
		if (!coach) {
			throw new Error("Coach not found");
		}

		coach.bookedSessions = coach.bookedSessions || [];
		coach.bookedSessions.push(session);
		await coach.save();
		return session;
	}

	static async getAllCoachesPublicBookedSessions(): Promise<
		Array<{
			coachId: string;
			coachName: string;
			bookedSessions: IBookedSession[];
		}>
	> {
		const coaches = await User.find(
			{ roles: UserRole.COACH },
			{ name: 1, bookedSessions: 1 }
		).lean<
			Array<{
				_id: Types.ObjectId;
				name: string;
				bookedSessions?: IBookedSession[];
			}>
		>();

		return coaches.map((coach) => ({
			coachId: coach._id.toString(),
			coachName: coach.name,
			bookedSessions: (coach.bookedSessions ?? []).filter(
				(session) => !session?.isPrivate
			),
		}));
	}

	static async getCoachesBookedSessionsInRange(
		startDate: Date,
		endDate: Date
	): Promise<Array<IBookedSession & { coach: { id: string; name: string } }>> {
		const coaches = await User.find(
			{ roles: UserRole.COACH },
			{ name: 1, bookedSessions: 1 }
		).lean<
			Array<{
				_id: Types.ObjectId;
				name: string;
				bookedSessions?: IBookedSession[];
			}>
		>();

		const allSessions: Array<
			IBookedSession & { coach: { id: string; name: string } }
		> = [];

		for (const coach of coaches) {
			const coachInfo = { id: coach._id.toString(), name: coach.name };
			const bookedSessions = coach.bookedSessions ?? [];

			for (const session of bookedSessions) {
				if (session.isPrivate) continue;

				const sessionDate = new Date(session.sessionDate);
				const repetition = (session.repetition as string) || "none";

				if (repetition === "none") {
					if (sessionDate >= startDate && sessionDate <= endDate) {
						allSessions.push({ ...session, coach: coachInfo });
					}
				} else if (repetition === "daily") {
					// Generate session for every day in range
					const current = new Date(
						Math.max(startDate.getTime(), sessionDate.getTime())
					);
					// Reset time part if needed? Assuming sessionDate has the time we want.
					// We must keep the original time from sessionDate

					// Iterate day by day from startDate to endDate
					// If the day is >= sessionDate (checking just date part or full timestamp? context implies full timestamp for start)

					let loopDate = new Date(startDate);
					while (loopDate <= endDate) {
						if (loopDate >= sessionDate) {
							// Create a new date with loopDate's year/month/day and sessionDate's time
							const newDate = new Date(loopDate);
							newDate.setHours(
								sessionDate.getHours(),
								sessionDate.getMinutes(),
								sessionDate.getSeconds(),
								sessionDate.getMilliseconds()
							);

							// Double check if this newDate is actually within range and >= original start
							if (
								newDate >= startDate &&
								newDate <= endDate &&
								newDate >= sessionDate
							) {
								allSessions.push({
									...session,
									sessionDate: newDate,
									coach: coachInfo,
								});
							}
						}
						loopDate.setDate(loopDate.getDate() + 1);
					}
				} else if (repetition === "weekly") {
					// Generate for same day of week
					const sessionDay = sessionDate.getDay();

					let loopDate = new Date(startDate);
					while (loopDate <= endDate) {
						if (loopDate.getDay() === sessionDay) {
							const newDate = new Date(loopDate);
							newDate.setHours(
								sessionDate.getHours(),
								sessionDate.getMinutes(),
								sessionDate.getSeconds(),
								sessionDate.getMilliseconds()
							);

							if (
								newDate >= startDate &&
								newDate <= endDate &&
								newDate >= sessionDate
							) {
								allSessions.push({
									...session,
									sessionDate: newDate,
									coach: coachInfo,
								});
							}
						}
						loopDate.setDate(loopDate.getDate() + 1);
					}
				} else if (repetition === "monthly") {
					// Generate for same day of month
					const sessionDateNum = sessionDate.getDate();

					let loopDate = new Date(startDate);
					while (loopDate <= endDate) {
						if (loopDate.getDate() === sessionDateNum) {
							const newDate = new Date(loopDate);
							newDate.setHours(
								sessionDate.getHours(),
								sessionDate.getMinutes(),
								sessionDate.getSeconds(),
								sessionDate.getMilliseconds()
							);

							if (
								newDate >= startDate &&
								newDate <= endDate &&
								newDate >= sessionDate
							) {
								allSessions.push({
									...session,
									sessionDate: newDate,
									coach: coachInfo,
								});
							}
						}
						loopDate.setDate(loopDate.getDate() + 1);
					}
				}
			}
		}

		// Sort by date
		return allSessions.sort(
			(a, b) =>
				new Date(a.sessionDate).getTime() - new Date(b.sessionDate).getTime()
		);
	}
}
