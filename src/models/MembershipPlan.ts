import mongoose, { Schema, Document } from 'mongoose';
import { BillingPeriod } from '../types';

export interface IMembershipPlan extends Document {
  name: string;
  price: number;
  currency: string;
  period: BillingPeriod;
  benefits: string[];
  maxClassesPerPeriod?: number;
  classAccess: string[];
  terms: string;
  isPopular?: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const membershipPlanSchema = new Schema<IMembershipPlan>({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  currency: { type: String, required: true, default: 'USD', uppercase: true },
  period: { 
    type: String, 
    enum: Object.values(BillingPeriod),
    required: true 
  },
  benefits: [{ type: String, required: true }],
  maxClassesPerPeriod: { type: Number, min: 1 },
  classAccess: [{ type: String, required: true }],
  terms: { type: String, required: true },
  isPopular: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Indexes
membershipPlanSchema.index({ isActive: 1 });
membershipPlanSchema.index({ period: 1 });

export const MembershipPlan = mongoose.model<IMembershipPlan>('MembershipPlan', membershipPlanSchema);