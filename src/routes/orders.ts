import express from 'express';
import { OrderStatus } from '../models';
import { OrderService, type CreateOrderInput, type UpdateOrderInput } from '../services/orderService';
import { ApiResponse } from '../types';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const orders = await OrderService.getOrders();
    const response: ApiResponse<any> = { data: orders };
    res.json(response);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch orders',
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const order = await OrderService.getOrderById(id);

    if (!order) {
      return res.status(404).json({
        error: 'Order Not Found',
        message: `Order with id "${id}" not found`,
      });
    }

    const response: ApiResponse<any> = { data: order };
    res.json(response);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch order',
    });
  }
});

router.post('/', async (req, res) => {
  const data = req.body as CreateOrderInput;

  if (!data?.customer || !data?.products || !Array.isArray(data.products) || data.products.length === 0) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'customer and at least one product are required',
    });
  }

  const requiredCustomerFields: (keyof CreateOrderInput['customer'])[] = ['name', 'email', 'phoneNumber', 'paymentMethod'];
  const missingCustomerField = requiredCustomerFields.find(field => !data.customer?.[field]);
  if (missingCustomerField) {
    return res.status(400).json({
      error: 'Validation Error',
      message: `Customer ${missingCustomerField} is required`,
    });
  }

  if (!data.deliveryMethod) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'deliveryMethod is required',
    });
  }

  if (data.status && !Object.values(OrderStatus).includes(data.status)) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Invalid order status',
    });
  }

  try {
    const order = await OrderService.createOrder(data);
    const response: ApiResponse<any> = { data: order };
    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create order',
    });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const data = req.body as UpdateOrderInput;

  if (data.status && !Object.values(OrderStatus).includes(data.status)) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Invalid order status',
    });
  }

  try {
    const order = await OrderService.updateOrder(id, data);

    if (!order) {
      return res.status(404).json({
        error: 'Order Not Found',
        message: `Order with id "${id}" not found`,
      });
    }

    const response: ApiResponse<any> = { data: order };
    res.json(response);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update order',
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const order = await OrderService.deleteOrder(id);

    if (!order) {
      return res.status(404).json({
        error: 'Order Not Found',
        message: `Order with id "${id}" not found`,
      });
    }

    const response: ApiResponse<any> = { data: { success: true } };
    res.json(response);
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete order',
    });
  }
});

export const orderRoutes = router;
