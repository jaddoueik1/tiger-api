import mongoose, { Document, Schema } from "mongoose";
import { SessionStatus } from "../types";

export interface ISession extends Document {
	coachId: string;
	templateId?: string;
	scheduleId?: string; // ID of the recurrence rule in User.bookedSessions
	name?: string;
	repetition?: string;
	startDateTime: Date;
	endDateTime: Date;
	status: SessionStatus;
	isPrivate: boolean;
	details?: {
		mainInterest?: string;
		goal?: string;
		medicalInformation?: string;
		dailyRoutine?: string;
		physicalActivity?: string;
		nutrition?: string;
	};
	bookedBy?: string[]; // Array of User IDs who booked this session (for group classes)
	capacity?: number;
	createdAt: Date;
	updatedAt: Date;
}

const sessionSchema = new Schema<ISession>(
	{
		coachId: { type: String, required: true, index: true },
		templateId: { type: String },
		scheduleId: { type: String },
		name: { type: String },
		repetition: { type: String },
		startDateTime: { type: Date, required: true, index: true },
		endDateTime: { type: Date, required: true },
		status: {
			type: String,
			enum: Object.values(SessionStatus),
			default: SessionStatus.PENDING,
			index: true,
		},
		isPrivate: { type: Boolean, default: false },
		details: {
			mainInterest: String,
			goal: String,
			medicalInformation: String,
			dailyRoutine: String,
			physicalActivity: String,
			nutrition: String,
		},
		bookedBy: [{ type: String }],
		capacity: { type: Number },
	},
	{
		timestamps: true,
	},
);

// Indexes
sessionSchema.index({ coachId: 1, startDateTime: 1 });
sessionSchema.index({ startDateTime: 1, endDateTime: 1 });
sessionSchema.index({ status: 1 });

export const Session = mongoose.model<ISession>("Session", sessionSchema);
