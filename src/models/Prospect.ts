import mongoose, { Document, Schema } from "mongoose";

export interface IProspect extends Document {
	name: string;
	phone?: string;
	interested: "classes" | "private";
	source: "Instagram" | "Website" | "Friend" | "Other";
	preferredDate?: Date;
	preferredTime?: string;
	followUpDates: Date[];
	preferredCoach?: string;
	interestedClass?: mongoose.Types.ObjectId;
	price?: number;
	notes?: string;
	mainInterest?: string;
	goal?: string;
	medicalInformation?: string;
	dailyRoutine?: string;
	physicalActivity?: string;
	nutrition?: string;
	status: "pending" | "contacted" | "resolved" | "cancelled";
	createdAt: Date;
}

const ProspectSchema: Schema = new Schema({
	name: { type: String, required: true },
	phone: { type: String },
	interested: {
		type: String,
		enum: ["classes", "private"],
		required: true,
		default: "classes",
	},
	source: {
		type: String,
		enum: ["Instagram", "Website", "Friend", "Other"],
		default: "Other",
	},
	preferredDate: { type: Date },
	preferredTime: { type: String },
	followUpDates: [{ type: Date }],
	preferredCoach: { type: String },
	interestedClass: { type: Schema.Types.ObjectId, ref: "ClassTemplate" },
	price: { type: Number },
	notes: { type: String },
	mainInterest: { type: String },
	goal: { type: String },
	medicalInformation: { type: String },
	dailyRoutine: { type: String },
	physicalActivity: { type: String },
	nutrition: { type: String },
	status: {
		type: String,
		enum: ["pending", "contacted", "resolved", "cancelled"],
		default: "pending",
	},
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProspect>("Prospect", ProspectSchema);
