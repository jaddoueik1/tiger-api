import mongoose, { Document, Schema } from "mongoose";
import { ClassLevel, Coach } from "../types";
import { IQuiz } from "./Quiz";

export interface IClassTemplate extends Document {
	disciplineId: mongoose.Types.ObjectId;
	title: string;
	level: ClassLevel;
	durationMin: number;
	description: string;
	capacity: number;
	prices?: {
		dropIn?: number;
		pack10?: number;
		monthly?: number;
		unlimited?: number;
	};
	prerequisites?: string[];
	createdAt: Date;
	updatedAt: Date;
	coaches: Coach[];
	quizzes: IQuiz[];
}

const classTemplateSchema = new Schema<IClassTemplate>(
	{
		disciplineId: {
			type: Schema.Types.ObjectId,
			ref: "ClassDiscipline",
			required: true,
		},
		title: { type: String, required: true, trim: true },
		level: {
			type: String,
			enum: Object.values(ClassLevel),
			required: true,
		},
		durationMin: { type: Number, required: true, min: 15 },
		description: { type: String, required: true },
		capacity: { type: Number, required: true, default: 20 },
		prices: {
			dropIn: Number,
			pack10: Number,
			monthly: Number,
			unlimited: Number,
		},
		coaches: [{ type: Schema.Types.ObjectId, ref: "Coach" }],
		quizzes: [{ type: Schema.Types.ObjectId, ref: "Quiz" }],
		prerequisites: [{ type: String, trim: true }],
	},
	{
		timestamps: true,
	}
);

// Indexes
classTemplateSchema.index({ disciplineId: 1 });
classTemplateSchema.index({ coaches: 1 });
classTemplateSchema.index({ level: 1 });

export const ClassTemplate = mongoose.model<IClassTemplate>(
	"ClassTemplate",
	classTemplateSchema
);
