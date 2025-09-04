import mongoose, { Schema, Document } from 'mongoose';
import { UserRole, MembershipStatus } from '../types';

export interface IUser extends Document {
  email: string;
  name: string;
  phone?: string;
  passwordHash: string;
  roles: UserRole[];
  memberships: IMembership[];
  credits: number;
  defaultPaymentMethod?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMembership {
  id: string;
  planId: string;
  status: MembershipStatus;
  startDate: Date;
  endDate?: Date;
  remainingClasses?: number;
}

const membershipSchema = new Schema<IMembership>({
  id: { type: String, required: true },
  planId: { type: String, required: true },
  status: { 
    type: String, 
    enum: Object.values(MembershipStatus),
    required: true 
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  remainingClasses: { type: Number }
});

const userSchema = new Schema<IUser>({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  name: { type: String, required: true, trim: true },
  phone: { type: String, trim: true },
  passwordHash: { type: String, required: true },
  roles: [{ 
    type: String, 
    enum: Object.values(UserRole),
    default: [UserRole.MEMBER]
  }],
  memberships: [membershipSchema],
  credits: { type: Number, default: 0, min: 0 },
  defaultPaymentMethod: { type: String }
}, {
  timestamps: true
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ roles: 1 });

export const User = mongoose.model<IUser>('User', userSchema);