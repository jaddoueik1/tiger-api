import express from 'express';
import { CoachService } from '../services/coachService';
import { ApiResponse } from '../types';
import { IBookedSession } from '../models';
import { requireAdmin } from '../middleware/requireAdmin';

const router = express.Router();

// GET /api/coaches
router.get('/', async (req, res) => {
  const { specialty } = req.query;
  
  try {
    const coaches = await CoachService.getAllCoaches(specialty as string);
    
    const response: ApiResponse<any> = {
      data: coaches,
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching coaches:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch coaches'
    });
  }
});

// POST /api/coaches
router.post('/', requireAdmin, async (req, res) => {
  try {
    const coach = await CoachService.createCoach(req.body);
    const response: ApiResponse<any> = { data: coach };
    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating coach:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create coach'
    });
  }
});

// GET /api/coaches/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const coach = await CoachService.getCoachById(id);
    
    if (!coach) {
      return res.status(404).json({
        error: 'Coach Not Found',
        message: `Coach with id "${id}" not found`,
      });
    }
    
    const response: ApiResponse<any> = {
      data: coach,
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching coach:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch coach'
    });
  }
});

// PUT /api/coaches/:id
router.put('/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const coach = await CoachService.updateCoach(id, req.body);
    if (!coach) {
      return res.status(404).json({
        error: 'Coach Not Found',
        message: `Coach with id "${id}" not found`,
      });
    }
    const response: ApiResponse<any> = { data: coach };
    res.json(response);
  } catch (error) {
    console.error('Error updating coach:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update coach'
    });
  }
});

// DELETE /api/coaches/:id
router.delete('/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const coach = await CoachService.deleteCoach(id);
    if (!coach) {
      return res.status(404).json({
        error: 'Coach Not Found',
        message: `Coach with id "${id}" not found`,
      });
    }
    const response: ApiResponse<any> = { data: { success: true } };
    res.json(response);
  } catch (error) {
    console.error('Error deleting coach:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete coach'
    });
  }
});

// GET /api/coaches/:id/booked-sessions
router.get('/:id/booked-sessions', async (req, res) => {
  const { id } = req.params;

  try {
    const bookedSessions = await CoachService.getCoachBookedSessions(id);

    const response: ApiResponse<IBookedSession[]> = {
      data: bookedSessions,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching coach booked sessions:', error);
    if (error instanceof Error && error.message === 'Coach not found') {
      return res.status(404).json({
        error: 'Coach Not Found',
        message: `Coach with id "${id}" not found`,
      });
    }
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch coach booked sessions'
    });
  }
});

export { router as coachRoutes };
