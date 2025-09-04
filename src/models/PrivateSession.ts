import mongoose, { Schema, Document } from 'mongoose';
import { PrivateSessionStatus } from '../types';

export interface IPrivateSession extends Document {
  userId: mongoose.Types.ObjectId;
  coachId: mongoose.Types.ObjectId;
  startAt: Date;
  endAt: Date;
  price: number;
  status: PrivateSessionStatus;
  notes?: string;
  paymentIntentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const privateSessionSchema = new Schema<IPrivateSession>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  coachId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Coach', 
    required: true 
  },
  startAt: { type: Date, required: true },
  endAt: { type: Date, required: true },
  price: { type: Number, required: true, min: 0 },
  status: { 
    type: String, 
    enum: Object.values(PrivateSessionStatus),
    default: PrivateSessionStatus.PENDING 
  },
  notes: { type: String },
  paymentIntentId: { type: String }
}, {
  timestamps: true
});

// Indexes
privateSessionSchema.index({ userId: 1 });
privateSessionSchema.index({ coachId: 1 });
privateSessionSchema.index({ startAt: 1 });
privateSessionSchema.index({ status: 1 });

// Validation
privateSessionSchema.pre('save', function(next) {
  if (this.endAt <= this.startAt) {
    next(new Error('End time must be after start time'));
  }
  next();
});

export const PrivateSession = mongoose.model<IPrivateSession>('PrivateSession', privateSessionSchema);