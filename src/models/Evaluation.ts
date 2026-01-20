import mongoose, { Document, Schema } from "mongoose";

export interface IEvaluation extends Document {
	studentId: mongoose.Types.ObjectId;
	classTemplateId: mongoose.Types.ObjectId;
	quizId: mongoose.Types.ObjectId;
	answers: {
		questionId: mongoose.Types.ObjectId;
		answer: string;
		score: number;
		notes?: string;
	}[];
	totalScore: number;
	maxScore: number;
	notes?: string;
	createdBy: mongoose.Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
}

const evaluationSchema = new Schema<IEvaluation>(
	{
		studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		classTemplateId: {
			type: Schema.Types.ObjectId,
			ref: "ClassTemplate",
			required: true,
		},
		quizId: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
		answers: [
			{
				questionId: { type: Schema.Types.ObjectId, required: true },
				answer: { type: String, required: true },
				score: { type: Number, required: true },
				notes: { type: String },
			},
		],
		totalScore: { type: Number, required: true },
		maxScore: { type: Number, required: true },
		notes: { type: String },
		createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
	},
	{
		timestamps: true,
	}
);

evaluationSchema.index({ studentId: 1 });
evaluationSchema.index({ classTemplateId: 1 });
evaluationSchema.index({ quizId: 1 });

export const Evaluation = mongoose.model<IEvaluation>(
	"Evaluation",
	evaluationSchema
);
