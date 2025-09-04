import express from 'express';
import { ClassService } from '../services/classService';
import { ApiResponse, ClassSession } from '../types';

const router = express.Router();

// GET /api/classes/disciplines
router.get('/disciplines', async (req, res) => {
  try {
    const disciplines = await ClassService.getAllDisciplines();
    
    const response: ApiResponse<any> = {
      data: disciplines,
    };
    res.json(response);
  } catch (error) {
    console.error('Error fetching disciplines:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch disciplines'
    });
  }
});

// GET /api/classes/templates
router.get('/templates', async (req, res) => {
  const { discipline, level, coachId } = req.query;
  
  try {
    const templates = await ClassService.getClassTemplates({
      discipline: discipline as string,
      level: level as string,
      coachId: coachId as string
    });
    
    const response: ApiResponse<any> = {
      data: templates,
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch templates'
    });
  }
});

// GET /api/classes/sessions
router.get('/sessions', async (req, res) => {
  const { from, to, discipline, level, coachId, locationId } = req.query;
  
  try {
    const sessions = await ClassService.getClassSessions({
      from: from ? new Date(from as string) : undefined,
      to: to ? new Date(to as string) : undefined,
      discipline: discipline as string,
      level: level as string,
      coachId: coachId as string,
      locationId: locationId as string
    });
    
    const response: ApiResponse<ClassSession[]> = {
      data: sessions,
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching sessions:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch sessions'
    });
  }
});

export { router as classRoutes };