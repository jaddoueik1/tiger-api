import mongoose, { Schema, Document } from 'mongoose';

export interface IContentBlock extends Document {
  key: string;
  locale: string;
  json: any;
  createdAt: Date;
  updatedAt: Date;
}

const contentBlockSchema = new Schema<IContentBlock>({
  key: { 
    type: String, 
    required: true,
    trim: true
  },
  locale: { 
    type: String, 
    required: true,
    default: 'en',
    lowercase: true,
    trim: true
  },
  json: { 
    type: Schema.Types.Mixed, 
    required: true 
  }
}, {
  timestamps: true
});

// Compound index for key + locale uniqueness
contentBlockSchema.index({ key: 1, locale: 1 }, { unique: true });

export const ContentBlock = mongoose.model<IContentBlock>('ContentBlock', contentBlockSchema);