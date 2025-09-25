import { Order, type IOrder, type IOrderCustomer, OrderStatus } from '../models';

export interface OrderProductInput {
  productId: string;
  quantity: number;
}

export interface OrderCustomerInput extends IOrderCustomer {}

export interface CreateOrderInput {
  customer: OrderCustomerInput;
  products: OrderProductInput[];
  deliveryMethod: string;
  status?: OrderStatus;
}

export type UpdateOrderInput = Partial<CreateOrderInput>;

export class OrderService {
  static async getOrders(): Promise<IOrder[]> {
    return Order.find({}).sort({ createdAt: -1 }).populate('products.productId', 'title price sku');
  }

  static async getOrderById(id: string): Promise<IOrder | null> {
    return Order.findById(id).populate('products.productId', 'title price sku');
  }

  static async createOrder(data: CreateOrderInput): Promise<IOrder> {
    const orderData = {
      ...data,
      status: data.status ?? OrderStatus.PLACED,
    };

    return Order.create(orderData);
  }

  static async updateOrder(id: string, data: UpdateOrderInput): Promise<IOrder | null> {
    return Order.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate('products.productId', 'title price sku');
  }

  static async deleteOrder(id: string): Promise<IOrder | null> {
    return Order.findByIdAndDelete(id);
  }
}
