import express from 'express';
import { ApiResponse } from '../types';

const router = express.Router();

// Mock user data (in real app, get from JWT and database)
const mockUser = {
  id: '1',
  email: 'member@example.com',
  name: 'John Doe',
  phone: '+1 (555) 123-4567',
  roles: ['member'],
  memberships: [
    {
      id: '1',
      planId: '3',
      status: 'active',
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      remainingClasses: null, // unlimited
    }
  ],
  credits: 10,
};

// GET /api/me
router.get('/', (req, res) => {
  // In real app, decode JWT and fetch user
  const response: ApiResponse<any> = {
    data: mockUser,
  };
  
  res.json(response);
});

// GET /api/me/bookings
router.get('/bookings', (req, res) => {
  const mockBookings = [
    {
      id: '1',
      sessionId: 'morning-1-0',
      status: 'booked',
      createdAt: new Date(),
      session: {
        id: 'morning-1-0',
        startAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        endAt: new Date(Date.now() + 25 * 60 * 60 * 1000),
        template: { title: 'BJJ Fundamentals', level: 'beginner' },
        coach: { name: 'Rafael Silva' },
        discipline: { name: 'Brazilian Jiu-Jitsu' },
      }
    }
  ];
  
  const response: ApiResponse<any> = {
    data: mockBookings,
  };
  
  res.json(response);
});

// GET /api/me/orders
router.get('/orders', (req, res) => {
  const mockOrders = [
    {
      id: '1',
      total: 89.00,
      status: 'delivered',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      items: [
        { title: 'Muay Thai Boxing Gloves', quantity: 1, price: 89 }
      ]
    }
  ];
  
  const response: ApiResponse<any> = {
    data: mockOrders,
  };
  
  res.json(response);
});

export { router as userRoutes };