import mongoose, { Schema, Document } from 'mongoose';

export interface IClassDiscipline extends Document {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  media: IMediaItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IMediaItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  caption?: string;
}

const mediaItemSchema = new Schema<IMediaItem>({
  type: { type: String, enum: ['image', 'video'], required: true },
  src: { type: String, required: true },
  alt: { type: String },
  caption: { type: String }
});

const classDisciplineSchema = new Schema<IClassDiscipline>({
  slug: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  tags: [{ type: String, lowercase: true, trim: true }],
  media: [mediaItemSchema]
}, {
  timestamps: true
});

// Indexes
classDisciplineSchema.index({ slug: 1 });
classDisciplineSchema.index({ tags: 1 });

export const ClassDiscipline = mongoose.model<IClassDiscipline>('ClassDiscipline', classDisciplineSchema);