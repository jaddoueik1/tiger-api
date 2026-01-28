import mongoose, { Document, Schema } from "mongoose";
import { MembershipStatus, SessionRepetition, UserRole } from "../types";

export interface ISocialLink {
	platform: string;
	url: string;
}

export interface IUser extends Document {
	email: string;
	name: string;
	phone?: string;
	passwordHash: string;
	roles: UserRole[];
	memberships: IMembership[];
	credits: number;
	defaultPaymentMethod?: string;
	bio?: string;
	accolades?: string[];
	socials?: ISocialLink[];
	photo?: string;
	specialties?: string[];
	bookedSessions?: IBookedSession[];
	hourlyRate?: number;
	isActive?: boolean;
	createdAt: Date;
	updatedAt: Date;
	championships?: string[];
	forcePasswordChange?: boolean;
	enrolledClassTemplates?: string[]; // ObjectIds
	monthlyEarnings?: number;
}

export interface IBookedSession {
	templateId?: string;
	name?: string;
	isPrivate?: boolean;
	sessionDate: Date;
	repetition: SessionRepetition;
	mainInterest?: string;
	goal?: string;
	medicalInformation?: string;
	dailyRoutine?: string;
	physicalActivity?: string;
	nutrition?: string;
	cancelledDates?: Date[];
	recurrenceEndDate?: Date;
	selectedDays?: number[];
	_id?: string;
}

export interface IMembership {
	id: string;
	planId: string;
	status: MembershipStatus;
	startDate: Date;
	endDate?: Date;
	remainingClasses?: number;
}

const membershipSchema = new Schema<IMembership>({
	id: { type: String, required: true },
	planId: { type: String, required: true },
	status: {
		type: String,
		enum: Object.values(MembershipStatus),
		required: true,
	},
	startDate: { type: Date, required: true },
	endDate: { type: Date },
	remainingClasses: { type: Number },
});

const socialLinkSchema = new Schema<ISocialLink>({
	platform: { type: String, required: true },
	url: { type: String, required: true },
});

const bookedSessionSchema = new Schema<IBookedSession>(
	{
		templateId: { type: String, trim: true },
		name: { type: String, trim: true },
		isPrivate: { type: Boolean, default: false },
		sessionDate: { type: Date, required: true },
		repetition: {
			type: String,
			required: true,
			enum: Object.values(SessionRepetition),
		},
		mainInterest: { type: String },
		goal: { type: String },
		medicalInformation: { type: String },
		dailyRoutine: { type: String },
		physicalActivity: { type: String },
		nutrition: { type: String },
		cancelledDates: [{ type: Date }],
		recurrenceEndDate: { type: Date },
		selectedDays: [{ type: Number }], // 0=Sun, 1=Mon, ..., 6=Sat
	},
	{
		timestamps: true,
	},
);

bookedSessionSchema.pre("validate", function (next) {
	const session = this as unknown as mongoose.Document<IBookedSession> &
		IBookedSession;

	if (!session.templateId && !session.name) {
		session.invalidate(
			"templateId",
			"Either templateId or name must be provided",
		);
		session.invalidate("name", "Either templateId or name must be provided");
	}

	next();
});

const userSchema = new Schema<IUser>(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		name: { type: String, required: true, trim: true },
		phone: { type: String, trim: true },
		passwordHash: { type: String, required: true },
		roles: [
			{
				type: String,
				enum: Object.values(UserRole),
				default: [UserRole.MEMBER],
			},
		],
		memberships: [membershipSchema],
		credits: { type: Number, default: 0, min: 0 },
		defaultPaymentMethod: { type: String },
		bio: { type: String },
		accolades: [{ type: String }],
		championships: [{ type: String }],
		socials: [socialLinkSchema],
		photo: { type: String },
		specialties: [{ type: String }],
		bookedSessions: {
			type: [bookedSessionSchema],
			default: [],
		},
		hourlyRate: { type: Number, min: 0 },
		isActive: { type: Boolean, default: true },
		forcePasswordChange: { type: Boolean, default: false },
		enrolledClassTemplates: [
			{ type: Schema.Types.ObjectId, ref: "ClassTemplate" },
		],
		monthlyEarnings: { type: Number, default: 0 },
	},
	{
		timestamps: true,
	},
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ roles: 1 });
userSchema.index({ isActive: 1 });

export const User = mongoose.model<IUser>("User", userSchema);
