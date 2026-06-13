import { addDays, addMonths, addWeeks, addYears, isBefore } from "date-fns";
import { IBookedSession, ISession } from "../models";
import { SessionRepetition, SessionStatus } from "../types";

const ONE_HOUR_MS = 60 * 60 * 1000;
const MAX_COUNT = 100;

function buildInstance(
	schedule: IBookedSession,
	coachId: string,
	startDateTime: Date,
	repetition: string,
): Partial<ISession> {
	return {
		coachId,
		templateId: schedule.templateId,
		scheduleId: schedule._id,
		name: schedule.name,
		repetition,
		startDateTime,
		endDateTime: new Date(startDateTime.getTime() + ONE_HOUR_MS),
		status: SessionStatus.PENDING,
		isPrivate: schedule.isPrivate || false,
		studentId: schedule.studentId,
		details: {
			mainInterest: schedule.mainInterest,
			goal: schedule.goal,
			medicalInformation: schedule.medicalInformation,
			dailyRoutine: schedule.dailyRoutine,
			physicalActivity: schedule.physicalActivity,
			nutrition: schedule.nutrition,
		},
	};
}

export function computeSessionInstances(
	schedule: IBookedSession,
	coachId: string,
): Partial<ISession>[] {
	const startDate = new Date(schedule.sessionDate);
	const endDate = schedule.recurrenceEndDate
		? new Date(schedule.recurrenceEndDate)
		: addMonths(new Date(), 3);

	const sessionsToCreate: Partial<ISession>[] = [];

	if (!schedule.repetition || (schedule.repetition as string) === "none") {
		sessionsToCreate.push(
			buildInstance(schedule, coachId, startDate, "none"),
		);
		return sessionsToCreate;
	}

	const countMode = !!schedule.numberOfSessions && schedule.numberOfSessions > 0;
	const target = countMode
		? Math.min(schedule.numberOfSessions as number, MAX_COUNT)
		: 0;
	const horizonEnd = addYears(startDate, 2); // backstop against misconfigured count mode

	let currentDate = startDate;
	while (
		isBefore(currentDate, horizonEnd) &&
		(countMode
			? sessionsToCreate.length < target
			: isBefore(currentDate, endDate) ||
				currentDate.getTime() === endDate.getTime())
	) {
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
			sessionsToCreate.push(
				buildInstance(
					schedule,
					coachId,
					new Date(currentDate),
					schedule.repetition,
				),
			);
		}

		if (schedule.repetition === SessionRepetition.DAILY) {
			currentDate = addDays(currentDate, 1);
		} else if (schedule.repetition === SessionRepetition.WEEKLY) {
			if (schedule.selectedDays && schedule.selectedDays.length > 0) {
				currentDate = addDays(currentDate, 1);
			} else {
				currentDate = addWeeks(currentDate, 1);
			}
		} else if (schedule.repetition === SessionRepetition.MONTHLY) {
			currentDate = addMonths(currentDate, 1);
		} else {
			break;
		}
	}

	return sessionsToCreate;
}
