import express from 'express';
import { sessions } from '../data/sessions';
import { templates } from '../data/templates';
import { coaches } from '../data/coaches';
import { disciplines } from '../data/disciplines';
import { ApiResponse, Booking, BookingStatus, SessionStatus } from '../types';

const router = express.Router();

// Mock bookings storage
const bookings: Booking[] = [];

// POST /api/bookings
router.post('/', (req, res) => {
  const { userId, sessionId } = req.body;
  
  if (!userId || !sessionId) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'userId and sessionId are required',
    });
  }
  
  const session = sessions.find(s => s.id === sessionId);
  
  if (!session) {
    return res.status(404).json({
      error: 'Session Not Found',
      message: `Session with id "${sessionId}" not found`,
    });
  }
  
  if (session.status !== SessionStatus.SCHEDULED) {
    return res.status(400).json({
      error: 'Session Unavailable',
      message: 'Session is not available for booking',
    });
  }
  
  // Check if user already booked
  const existingBooking = bookings.find(
    b => b.userId === userId && b.sessionId === sessionId && 
    (b.status === BookingStatus.BOOKED || b.status === BookingStatus.WAITLISTED)
  );
  
  if (existingBooking) {
    return res.status(409).json({
      error: 'Already Booked',
      message: 'User is already booked for this session',
    });
  }
  
  const newBooking: Booking = {
    id: Date.now().toString(),
    userId,
    sessionId,
    status: session.bookedCount < session.capacity ? BookingStatus.BOOKED : BookingStatus.WAITLISTED,
    createdAt: new Date(),
    source: 'web',
    waitlistPosition: session.bookedCount >= session.capacity ? session.waitlist.length + 1 : undefined,
  };
  
  bookings.push(newBooking);
  
  // Update session counts
  if (newBooking.status === BookingStatus.BOOKED) {
    session.bookedCount++;
  } else {
    session.waitlist.push(userId);
  }
  
  const response: ApiResponse<Booking> = {
    data: newBooking,
  };
  
  res.status(201).json(response);
});

// DELETE /api/bookings/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  const bookingIndex = bookings.findIndex(b => b.id === id);
  
  if (bookingIndex === -1) {
    return res.status(404).json({
      error: 'Booking Not Found',
      message: `Booking with id "${id}" not found`,
    });
  }
  
  const booking = bookings[bookingIndex];
  const session = sessions.find(s => s.id === booking.sessionId);
  
  // Update booking status
  booking.status = BookingStatus.CANCELLED;
  
  // Update session counts
  if (session) {
    if (booking.status === BookingStatus.BOOKED) {
      session.bookedCount--;
    } else if (booking.status === BookingStatus.WAITLISTED) {
      const waitlistIndex = session.waitlist.indexOf(booking.userId);
      if (waitlistIndex > -1) {
        session.waitlist.splice(waitlistIndex, 1);
      }
    }
  }
  
  const response: ApiResponse<Booking> = {
    data: booking,
  };
  
  res.json(response);
});

export { router as bookingRoutes };