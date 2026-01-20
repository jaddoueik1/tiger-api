import mongoose, { Document, Schema } from "mongoose";

export interface INews extends Document {
	title: string;
	description: string;
	creationDate: Date;
}

const NewsSchema: Schema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	creationDate: { type: Date, default: Date.now },
});

export default mongoose.model<INews>("News", NewsSchema);
