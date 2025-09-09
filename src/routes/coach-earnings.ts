import express from 'express';
import { privateSessions } from '../data/privateSessions';
import { PrivateSession, PrivateSessionStatus, ApiResponse } from '../types';

const router = express.Router();

// GET /api/coach-earnings?month=MM&year=YYYY
router.get('/', (req, res) => {
  const { month, year } = req.query;

  if (!month || !year) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'month and year are required',
    });
  }

  const monthNum = parseInt(month as string, 10);
  const yearNum = parseInt(year as string, 10);

  if (isNaN(monthNum) || monthNum < 1 || monthNum > 12 || isNaN(yearNum)) {
    return res.status(400).json({
      error: 'Validation Error',
      message: 'Invalid month or year',
    });
  }

  const earningsMap: Record<string, { coachId: string; totalEarnings: number; sessions: PrivateSession[] }> = {};

  privateSessions.forEach((session) => {
    const date = new Date(session.startAt);
    const sessionMonth = date.getMonth() + 1; // getMonth is 0-indexed
    const sessionYear = date.getFullYear();

    if (
      sessionMonth === monthNum &&
      sessionYear === yearNum &&
      session.status !== PrivateSessionStatus.CANCELLED
    ) {
      if (!earningsMap[session.coachId]) {
        earningsMap[session.coachId] = {
          coachId: session.coachId,
          totalEarnings: 0,
          sessions: [],
        };
      }
      earningsMap[session.coachId].totalEarnings += session.price;
      earningsMap[session.coachId].sessions.push(session);
    }
  });

  const data = Object.values(earningsMap);

  const response: ApiResponse<typeof data> = { data };

  res.json(response);
});

export { router as coachEarningsRoutes };

