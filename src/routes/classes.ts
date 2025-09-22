import express from 'express';
import { ClassService } from '../services/classService';
import { ApiResponse, ClassSession } from '../types';
import { requireAdmin } from '../middleware/requireAdmin';

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

// POST /api/classes/disciplines
router.post('/disciplines', requireAdmin, async (req, res) => {
  try {
    const discipline = await ClassService.createDiscipline(req.body);
    const response: ApiResponse<any> = { data: discipline };
    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating discipline:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create discipline'
    });
  }
});

// PUT /api/classes/disciplines/:id
router.put('/disciplines/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const discipline = await ClassService.updateDiscipline(id, req.body);
    if (!discipline) {
      return res.status(404).json({
        error: 'Discipline Not Found',
        message: `Discipline with id "${id}" not found`,
      });
    }
    const response: ApiResponse<any> = { data: discipline };
    res.json(response);
  } catch (error) {
    console.error('Error updating discipline:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update discipline'
    });
  }
});

// DELETE /api/classes/disciplines/:id
router.delete('/disciplines/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const discipline = await ClassService.deleteDiscipline(id);
    if (!discipline) {
      return res.status(404).json({
        error: 'Discipline Not Found',
        message: `Discipline with id "${id}" not found`,
      });
    }
    const response: ApiResponse<any> = { data: { success: true } };
    res.json(response);
  } catch (error) {
    console.error('Error deleting discipline:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete discipline'
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

// POST /api/classes/templates
router.post('/templates', requireAdmin, async (req, res) => {
  try {
    const template = await ClassService.createClassTemplate(req.body);
    const response: ApiResponse<any> = { data: template };
    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating template:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create template'
    });
  }
});

// GET /api/classes/templates/:slug
router.get('/templates/:slug', async (req, res) => {
  const { slug } = req.params;

  try {
    const template = await ClassService.getClassTemplateBySlug(slug);

    if (!template) {
      return res.status(404).json({
        error: 'Class Template Not Found',
        message: `Class template with slug "${slug}" not found`,
      });
    }

    const response: ApiResponse<any> = {
      data: template,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching template:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch template',
    });
  }
});

// PUT /api/classes/templates/:id
router.put('/templates/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const template = await ClassService.updateClassTemplate(id, req.body);
    if (!template) {
      return res.status(404).json({
        error: 'Class Template Not Found',
        message: `Class template with id "${id}" not found`,
      });
    }
    const response: ApiResponse<any> = { data: template };
    res.json(response);
  } catch (error) {
    console.error('Error updating template:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update template'
    });
  }
});

// DELETE /api/classes/templates/:id
router.delete('/templates/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const template = await ClassService.deleteClassTemplate(id);
    if (!template) {
      return res.status(404).json({
        error: 'Class Template Not Found',
        message: `Class template with id "${id}" not found`,
      });
    }
    const response: ApiResponse<any> = { data: { success: true } };
    res.json(response);
  } catch (error) {
    console.error('Error deleting template:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete template'
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

// POST /api/classes/sessions
router.post('/sessions', requireAdmin, async (req, res) => {
  try {
    const session = await ClassService.createClassSession(req.body);
    const response: ApiResponse<any> = { data: session };
    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create session'
    });
  }
});

// PUT /api/classes/sessions/:id
router.put('/sessions/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const session = await ClassService.updateClassSession(id, req.body);
    if (!session) {
      return res.status(404).json({
        error: 'Class Session Not Found',
        message: `Class session with id "${id}" not found`,
      });
    }
    const response: ApiResponse<any> = { data: session };
    res.json(response);
  } catch (error) {
    console.error('Error updating session:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update session'
    });
  }
});

// DELETE /api/classes/sessions/:id
router.delete('/sessions/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const session = await ClassService.deleteClassSession(id);
    if (!session) {
      return res.status(404).json({
        error: 'Class Session Not Found',
        message: `Class session with id "${id}" not found`,
      });
    }
    const response: ApiResponse<any> = { data: { success: true } };
    res.json(response);
  } catch (error) {
    console.error('Error deleting session:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete session'
    });
  }
});

export { router as classRoutes };
