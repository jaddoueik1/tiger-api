import mongoose, { Document, Schema } from "mongoose";

export interface IProspect extends Document {
	name: string;
	email: string;
	phone?: string;
	interested: "classes" | "private";
	preferredDate?: Date;
	preferredTime?: string;
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
	email: { type: String, required: true },
	phone: { type: String },
	interested: {
		type: String,
		enum: ["classes", "private"],
		required: true,
		default: "classes",
	},
	preferredDate: { type: Date },
	preferredTime: { type: String },
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
