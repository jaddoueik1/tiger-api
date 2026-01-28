import bcrypt from "bcryptjs";
import { addDays, addMonths, addWeeks, isBefore } from "date-fns";
import { Types } from "mongoose";
import { IBookedSession, ICoach, ISession, Session, User } from "../models";
import { SessionRepetition, SessionStatus, UserRole } from "../types";

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
		data: Partial<ICoach>,
	): Promise<ICoach | null> {
		return User.findOneAndUpdate({ _id: id, roles: UserRole.COACH }, data, {
			new: true,
		});
	}

	static async deleteCoach(id: string): Promise<ICoach | null> {
		return User.findOneAndUpdate(
			{ _id: id, roles: UserRole.COACH },
			{ isActive: false },
			{ new: true },
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
		session: IBookedSession,
	): Promise<IBookedSession> {
		// This method is now a wrapper for creating a schedule and generating instances
		const coach = await CoachService.getCoachById(coachId);
		if (!coach) {
			throw new Error("Coach not found");
		}

		// Generate an ID for the schedule if not present (to link instances)
		if (!session._id) {
			session._id = new Types.ObjectId().toString();
		}

		coach.bookedSessions = coach.bookedSessions || [];
		coach.bookedSessions.push(session);
		await coach.save();

		// Generate instances
		await CoachService.generateSessionInstances(session, coachId);

		return session;
	}

	static async generateSessionInstances(
		schedule: IBookedSession,
		coachId: string,
	): Promise<void> {
		const startDate = new Date(schedule.sessionDate);
		// Default recurrence end date if not provided: 3 months from now
		const endDate = schedule.recurrenceEndDate
			? new Date(schedule.recurrenceEndDate)
			: addMonths(new Date(), 3);

		const sessionsToCreate: Partial<ISession>[] = [];

		let currentDate = startDate;

		// Note: 'none' check handled by initial loop condition or explicit logic.
		// Assuming undefined repetition means single instance.

		if (!schedule.repetition || (schedule.repetition as string) === "none") {
			sessionsToCreate.push({
				coachId,
				templateId: schedule.templateId,
				scheduleId: schedule._id,
				name: schedule.name,
				repetition: "none",
				startDateTime: startDate,
				endDateTime: new Date(startDate.getTime() + 60 * 60 * 1000), // Default 1 hour duration
				status: SessionStatus.PENDING,
				isPrivate: schedule.isPrivate || false,
				details: {
					mainInterest: schedule.mainInterest,
					goal: schedule.goal,
					medicalInformation: schedule.medicalInformation,
					dailyRoutine: schedule.dailyRoutine,
					physicalActivity: schedule.physicalActivity,
					nutrition: schedule.nutrition,
				},
			});
		} else {
			while (
				isBefore(currentDate, endDate) ||
				currentDate.getTime() === endDate.getTime()
			) {
				// Check if we should generate for this day
				let shouldCreate = true;
				if (
					schedule.repetition === SessionRepetition.WEEKLY &&
					schedule.selectedDays &&
					schedule.selectedDays.length > 0
				) {
					if (!schedule.selectedDays.includes(currentDate.getDay())) {
						shouldCreate = false;
					}
				}

				if (shouldCreate) {
					sessionsToCreate.push({
						coachId,
						templateId: schedule.templateId,
						scheduleId: schedule._id,
						name: schedule.name,
						repetition: schedule.repetition,
						startDateTime: new Date(currentDate),
						endDateTime: new Date(currentDate.getTime() + 60 * 60 * 1000), // Default 1 hour
						status: SessionStatus.PENDING,
						isPrivate: schedule.isPrivate || false,
						details: {
							mainInterest: schedule.mainInterest,
							goal: schedule.goal,
							medicalInformation: schedule.medicalInformation,
							dailyRoutine: schedule.dailyRoutine,
							physicalActivity: schedule.physicalActivity,
							nutrition: schedule.nutrition,
						},
					});
				}

				if (schedule.repetition === SessionRepetition.DAILY) {
					currentDate = addDays(currentDate, 1);
				} else if (schedule.repetition === SessionRepetition.WEEKLY) {
					// If selectedDays is used, we must increment by 1 day to check the next potential day
					if (schedule.selectedDays && schedule.selectedDays.length > 0) {
						currentDate = addDays(currentDate, 1);
					} else {
						currentDate = addWeeks(currentDate, 1);
					}
				} else if (schedule.repetition === SessionRepetition.MONTHLY) {
					currentDate = addMonths(currentDate, 1);
				} else {
					break; // Unknown recurrence
				}
			}
		}

		if (sessionsToCreate.length > 0) {
			await Session.insertMany(sessionsToCreate);
		}
	}

	static async cancelSessionInstance(
		coachId: string,
		sessionId: string,
		date: Date, // Kept for method compatibility, but unused if sessionId refers to actual Session doc
	): Promise<void> {
		// Try finding by ID first (new logic)
		let session = await Session.findOne({ _id: sessionId, coachId });

		if (!session) {
			// If not found by ID, it implies either invalid ID or migration issue.
			// We can try to match by date/coach if strictly necessary, but ideally frontend sends correct ID.
			// Given "Revamp" task, we assume frontend will be updated to send Session ID.
			throw new Error("Session instance not found");
		}

		if (session) {
			session.status = SessionStatus.CANCELLED;
			await session.save();
			return;
		}
	}

	static async getAllCoachesPublicBookedSessions(): Promise<
		Array<{
			coachId: string;
			coachName: string;
			bookedSessions: IBookedSession[];
		}>
	> {
		// This needs to aggregate from Sessions now.
		const sessions = await Session.find({
			status: { $ne: SessionStatus.CANCELLED },
			isPrivate: false,
			startDateTime: { $gte: new Date() }, // Future sessions only for public view? Or allow past?
			// Usually public schedule shows upcoming. I'll stick to future for optimization.
		}).sort({ startDateTime: 1 });

		// Group by coach
		const coachesMap = new Map<string, any[]>();

		const coachIds = [...new Set(sessions.map((s) => s.coachId))];
		const coaches = await User.find({ _id: { $in: coachIds } }, { name: 1 });
		const coachNameMap = new Map(
			coaches.map((c) => [c._id.toString(), c.name]),
		);

		for (const s of sessions) {
			const cId = s.coachId;
			if (!coachesMap.has(cId)) {
				coachesMap.set(cId, []);
			}

			coachesMap.get(cId)?.push({
				_id: s._id.toString(),
				name: s.name,
				sessionDate: s.startDateTime, // Map startDateTime to sessionDate
				repetition: (s.repetition as any) || "none",
				templateId: s.templateId,
				isPrivate: s.isPrivate,
			});
		}

		return Array.from(coachesMap.entries()).map(
			([coachId, bookedSessions]) => ({
				coachId,
				coachName: coachNameMap.get(coachId) || "Unknown Coach",
				bookedSessions,
			}),
		);
	}

	static async getCoachesBookedSessionsInRange(
		startDate: Date,
		endDate: Date,
	): Promise<Array<IBookedSession & { coach: { id: string; name: string } }>> {
		return CoachService.querySessionsInRange(
			startDate,
			endDate,
			undefined,
			false,
		);
	}

	static async getCoachSessionsInRange(
		coachId: string,
		startDate: Date,
		endDate: Date,
	): Promise<Array<IBookedSession & { coach: { id: string; name: string } }>> {
		return CoachService.querySessionsInRange(startDate, endDate, coachId, true);
	}

	private static async querySessionsInRange(
		startDate: Date,
		endDate: Date,
		coachId?: string,
		includePrivate: boolean = false,
	) {
		const query: any = {
			startDateTime: { $gte: startDate, $lte: endDate },
			status: { $ne: SessionStatus.CANCELLED }, // Hide cancelled
		};

		if (!includePrivate) {
			query.isPrivate = false;
		}

		if (coachId) {
			query.coachId = coachId;
		}

		const sessions = await Session.find(query).sort({ startDateTime: 1 });

		const coachIds = [...new Set(sessions.map((s) => s.coachId))];
		const coaches = await User.find({ _id: { $in: coachIds } }, { name: 1 });
		const coachNameMap = new Map(
			coaches.map((c) => [c._id.toString(), c.name]),
		);

		return sessions.map(
			(s) =>
				({
					_id: s._id.toString(), // The actual Session ID
					name: s.name,
					sessionDate: s.startDateTime,
					repetition: (s.repetition as any) || "none",
					templateId: s.templateId,
					isPrivate: s.isPrivate,
					coach: {
						id: s.coachId,
						name: coachNameMap.get(s.coachId) || "Unknown",
					},
				}) as any,
		);
	}

	static async processPendingSessions() {
		// Find PENDING sessions before 'now' (or 1 hour ago) and mark COMPLETED
		const now = new Date();
		const result = await Session.updateMany(
			{
				status: SessionStatus.PENDING,
				endDateTime: { $lt: now },
			},
			{
				$set: { status: SessionStatus.COMPLETED },
			},
		);
		console.log(
			`Processed ${result.modifiedCount} pending sessions to completed.`,
		);
	}

	static async getSessionsBySchedule(
		coachId: string,
		scheduleId: string,
	): Promise<ISession[]> {
		return Session.find({ coachId, scheduleId }).sort({ startDateTime: 1 });
	}

	static async deleteBookedSession(
		coachId: string,
		scheduleId: string,
	): Promise<void> {
		const coach = await CoachService.getCoachById(coachId);
		if (!coach) {
			throw new Error("Coach not found");
		}

		if (coach.bookedSessions) {
			coach.bookedSessions = coach.bookedSessions.filter(
				(s) => s._id?.toString() !== scheduleId,
			);
			await coach.save();
		}

		// Delete future instances associated with this schedule
		await Session.deleteMany({
			scheduleId,
			startDateTime: { $gte: new Date() },
		});
	}
}
