import express from 'express';
import { CoachService } from '../services/coachService';
import { ApiResponse } from '../types';

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

// GET /api/coaches/:id/availability
router.get('/:id/availability', async (req, res) => {
  const { id } = req.params;
  const { from, to } = req.query;
  
  try {
    const fromDate = new Date(from as string || new Date());
    const toDate = new Date(to as string || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
    
    const availableSlots = await CoachService.getCoachAvailability(id, fromDate, toDate);
    
    const response: ApiResponse<any> = {
      data: availableSlots,
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching coach availability:', error);
    if (error instanceof Error && error.message === 'Coach not found') {
      return res.status(404).json({
        error: 'Coach Not Found',
        message: `Coach with id "${id}" not found`,
      });
    }
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch coach availability'
    });
  }
});

export { router as coachRoutes };