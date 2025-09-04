import mongoose, { Schema, Document } from 'mongoose';
import { BookingStatus } from '../types';

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId;
  sessionId: mongoose.Types.ObjectId;
  status: BookingStatus;
  source: string;
  penaltyApplied?: boolean;
  waitlistPosition?: number;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  sessionId: { 
    type: Schema.Types.ObjectId, 
    ref: 'ClassSession', 
    required: true 
  },
  status: { 
    type: String, 
    enum: Object.values(BookingStatus),
    required: true 
  },
  source: { 
    type: String, 
    required: true,
    default: 'web'
  },
  penaltyApplied: { type: Boolean, default: false },
  waitlistPosition: { type: Number, min: 1 }
}, {
  timestamps: true
});

// Indexes
bookingSchema.index({ userId: 1 });
bookingSchema.index({ sessionId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ userId: 1, sessionId: 1 }, { unique: true });

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);