import mongoose, { Schema, Document } from 'mongoose';

export interface ICoachingSession extends Document {
  name: string;
  coach?: mongoose.Types.ObjectId;
  coachModel?: 'Coach' | 'User';
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const coachingSessionSchema = new Schema<ICoachingSession>({
  name: { type: String, required: true, trim: true },
  coach: { type: Schema.Types.ObjectId, refPath: 'coachModel' },
  coachModel: {
    type: String,
    enum: ['Coach', 'User'],
    required: function(this: ICoachingSession) {
      return !!this.coach;
    }
  },
  date: { type: Date, required: true }
}, {
  timestamps: true
});

// Indexes
coachingSessionSchema.index({ coach: 1 });
coachingSessionSchema.index({ date: 1 });

export const CoachingSession = mongoose.model<ICoachingSession>('CoachingSession', coachingSessionSchema);

