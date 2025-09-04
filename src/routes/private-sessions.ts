import express from 'express';
import { PrivateSession, PrivateSessionStatus } from '../types';
import { coaches } from '../data/coaches';
import { ApiResponse } from '../types';

const router = express.Router();

// Mock private sessions storage
const privateSessions: PrivateSession[] = [];

// POST /api/private-sessions
router.post('/', (req, res) => {
  const { userId, coachId, startAt, endAt } = req.body;
  
  if (!userId || !coachId || !startAt || !endAt) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'userId, coachId, startAt, and endAt are required',
    });
  }
  
  const coach = coaches.find(c => c.id === coachId && c.isActive);
  
  if (!coach) {
    return res.status(404).json({
      error: 'Coach Not Found',
      message: `Coach with id "${coachId}" not found`,
    });
  }
  
  const startDate = new Date(startAt);
  const endDate = new Date(endAt);
  const durationHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  const price = (coach.hourlyRate || 100) * durationHours;
  
  const newSession: PrivateSession = {
    id: Date.now().toString(),
    userId,
    coachId,
    startAt: startDate,
    endAt: endDate,
    price,
    status: PrivateSessionStatus.PENDING,
    notes: req.body.notes,
  };
  
  privateSessions.push(newSession);
  
  const response: ApiResponse<PrivateSession> = {
    data: newSession,
  };
  
  res.status(201).json(response);
});

// POST /api/private-sessions/:id/cancel
router.post('/:id/cancel', (req, res) => {
  const { id } = req.params;
  
  const session = privateSessions.find(s => s.id === id);
  
  if (!session) {
    return res.status(404).json({
      error: 'Session Not Found',
      message: `Private session with id "${id}" not found`,
    });
  }
  
  session.status = PrivateSessionStatus.CANCELLED;
  
  const response: ApiResponse<PrivateSession> = {
    data: session,
  };
  
  res.json(response);
});

export { router as privateSessionRoutes };