import mongoose, { Schema, Document } from 'mongoose';
import { UserRole, MembershipStatus } from '../types';

export interface ISocialLink {
  platform: string;
  url: string;
}

export interface IAvailabilityRule {
  dayOfWeek: number; // 0-6
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  bufferMinutes: number;
  leadTimeHours: number;
}

export interface IUser extends Document {
  email: string;
  name: string;
  phone?: string;
  passwordHash: string;
  roles: UserRole[];
  memberships: IMembership[];
  credits: number;
  defaultPaymentMethod?: string;
  bio?: string;
  accolades?: string[];
  socials?: ISocialLink[];
  photo?: string;
  specialties?: string[];
  availabilityRules?: IAvailabilityRule[];
  hourlyRate?: number;
  isActive?: boolean;
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

const socialLinkSchema = new Schema<ISocialLink>({
  platform: { type: String, required: true },
  url: { type: String, required: true }
});

const availabilityRuleSchema = new Schema<IAvailabilityRule>({
  dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  bufferMinutes: { type: Number, required: true, min: 0 },
  leadTimeHours: { type: Number, required: true, min: 0 }
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
  defaultPaymentMethod: { type: String },
  bio: { type: String },
  accolades: [{ type: String }],
  socials: [socialLinkSchema],
  photo: { type: String },
  specialties: [{ type: String }],
  availabilityRules: [availabilityRuleSchema],
  hourlyRate: { type: Number, min: 0 },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ roles: 1 });
userSchema.index({ isActive: 1 });

export const User = mongoose.model<IUser>('User', userSchema);