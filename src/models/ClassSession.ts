import mongoose, { Schema, Document } from 'mongoose';
import { SessionStatus } from '../types';

export interface IClassSession extends Document {
  templateId: mongoose.Types.ObjectId;
  coachId: mongoose.Types.ObjectId;
  locationId: string;
  room: string;
  startAt: Date;
  endAt: Date;
  capacity: number;
  bookedCount: number;
  waitlist: mongoose.Types.ObjectId[];
  status: SessionStatus;
  createdAt: Date;
  updatedAt: Date;
}

const classSessionSchema = new Schema<IClassSession>({
  templateId: { 
    type: Schema.Types.ObjectId, 
    ref: 'ClassTemplate', 
    required: true 
  },
  coachId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Coach', 
    required: true 
  },
  locationId: { type: String, required: true },
  room: { type: String, required: true, trim: true },
  startAt: { type: Date, required: true },
  endAt: { type: Date, required: true },
  capacity: { type: Number, required: true, min: 1 },
  bookedCount: { type: Number, default: 0, min: 0 },
  waitlist: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  status: { 
    type: String, 
    enum: Object.values(SessionStatus),
    default: SessionStatus.SCHEDULED 
  }
}, {
  timestamps: true
});

// Indexes
classSessionSchema.index({ startAt: 1 });
classSessionSchema.index({ coachId: 1 });
classSessionSchema.index({ templateId: 1 });
classSessionSchema.index({ status: 1 });

// Validation
classSessionSchema.pre('save', function(next) {
  if (this.endAt <= this.startAt) {
    next(new Error('End time must be after start time'));
  }
  if (this.bookedCount > this.capacity) {
    next(new Error('Booked count cannot exceed capacity'));
  }
  next();
});

export const ClassSession = mongoose.model<IClassSession>('ClassSession', classSessionSchema);