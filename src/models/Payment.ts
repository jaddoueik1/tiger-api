import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  amount: number;
  currency: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>({
  amount: { type: Number, required: true, min: 0 },
  currency: { type: String, required: true, uppercase: true, trim: true },
  status: { type: String, required: true }
}, {
  timestamps: true
});

// Indexes
paymentSchema.index({ createdAt: 1 });
paymentSchema.index({ status: 1 });

export const Payment = mongoose.model<IPayment>('Payment', paymentSchema);

