import mongoose, { Document, Schema } from 'mongoose';

export enum OrderStatus {
  PLACED = 'placed',
  IN_DELIVERY = 'in_delivery',
  COMPLETED = 'completed',
}

export interface IOrderCustomer {
  name: string;
  email: string;
  phoneNumber: string;
  paymentMethod: string;
}

export interface IOrderProduct {
  productId: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  customer: IOrderCustomer;
  products: IOrderProduct[];
  deliveryMethod: string;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const orderCustomerSchema = new Schema<IOrderCustomer>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phoneNumber: { type: String, required: true, trim: true },
  paymentMethod: { type: String, required: true, trim: true },
}, { _id: false });

const orderProductSchema = new Schema<IOrderProduct>({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
}, { _id: false });

const orderSchema = new Schema<IOrder>({
  customer: { type: orderCustomerSchema, required: true },
  products: {
    type: [orderProductSchema],
    required: true,
    validate: {
      validator: (value: IOrderProduct[]) => Array.isArray(value) && value.length > 0,
      message: 'At least one product is required',
    },
  },
  deliveryMethod: { type: String, required: true, trim: true },
  status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.PLACED },
}, {
  timestamps: true,
});

orderSchema.index({ status: 1 });
orderSchema.index({ 'customer.email': 1 });

export const Order = mongoose.model<IOrder>('Order', orderSchema);
