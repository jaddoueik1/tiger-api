import mongoose, { Schema, Document } from 'mongoose';
import { ClassLevel } from '../types';

export interface IClassTemplate extends Document {
  disciplineId: mongoose.Types.ObjectId;
  title: string;
  level: ClassLevel;
  durationMin: number;
  description: string;
  gearNeeded: string[];
  coachIds: mongoose.Types.ObjectId[];
  price?: number;
  prerequisites?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const classTemplateSchema = new Schema<IClassTemplate>({
  disciplineId: { 
    type: Schema.Types.ObjectId, 
    ref: 'ClassDiscipline', 
    required: true 
  },
  title: { type: String, required: true, trim: true },
  level: { 
    type: String, 
    enum: Object.values(ClassLevel),
    required: true 
  },
  durationMin: { type: Number, required: true, min: 15 },
  description: { type: String, required: true },
  gearNeeded: [{ type: String, trim: true }],
  coachIds: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Coach' 
  }],
  price: { type: Number, min: 0 },
  prerequisites: [{ type: String, trim: true }]
}, {
  timestamps: true
});

// Indexes
classTemplateSchema.index({ disciplineId: 1 });
classTemplateSchema.index({ level: 1 });
classTemplateSchema.index({ coachIds: 1 });

export const ClassTemplate = mongoose.model<IClassTemplate>('ClassTemplate', classTemplateSchema);