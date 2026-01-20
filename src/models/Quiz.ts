import mongoose, { Document, Schema } from "mongoose";

export interface IQuestion {
	text: string;
	options: string[];
	correctAnswer: number; // Index of the correct option
}

export interface IQuiz extends Document {
	title: string;
	description?: string;
	questions: IQuestion[];
	createdAt: Date;
	updatedAt: Date;
}

const QuestionSchema = new Schema({
	text: { type: String, required: true },
	options: [{ type: String, required: true }],
	correctAnswer: { type: Number, required: true },
});

const QuizSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String },
		questions: [QuestionSchema],
	},
	{
		timestamps: true,
	}
);

export const Quiz = mongoose.model<IQuiz>("Quiz", QuizSchema);
