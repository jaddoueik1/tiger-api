import mongoose, { Schema, Document } from 'mongoose';

export interface ICoach extends Document {
  name: string;
  bio: string;
  accolades: string[];
  socials: ISocialLink[];
  photo: string;
  specialties: string[];
  availabilityRules: IAvailabilityRule[];
  hourlyRate?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

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

const coachSchema = new Schema<ICoach>({
  name: { type: String, required: true, trim: true },
  bio: { type: String, required: true },
  accolades: [{ type: String }],
  socials: [socialLinkSchema],
  photo: { type: String, required: true },
  specialties: [{ type: String, required: true }],
  availabilityRules: [availabilityRuleSchema],
  hourlyRate: { type: Number, min: 0 },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Indexes
coachSchema.index({ isActive: 1 });
coachSchema.index({ specialties: 1 });

export const Coach = mongoose.model<ICoach>('Coach', coachSchema);