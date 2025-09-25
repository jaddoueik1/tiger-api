import express from 'express';
import { ApiResponse, ClassSession } from '../types';
import { requireAdmin } from '../middleware/requireAdmin';
import { DisciplineService } from '../services/disciplineService';

const router = express.Router();

// GET /api/classes/disciplines
router.get('/disciplines', async (req, res) => {
  try {
    const disciplines = await DisciplineService.getAllDisciplines();
    
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
    const discipline = await DisciplineService.createDiscipline(req.body);
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
    const discipline = await DisciplineService.updateDiscipline(id, req.body);
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
    const discipline = await DisciplineService.deleteDiscipline(id);
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
  try {
    const templates = await DisciplineService.getClassTemplates();

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

// GET /api/classes/templates/discipline/:disciplineId
router.get('/templates/discipline/:disciplineId', async (req, res) => {
  const { disciplineId } = req.params;

  try {
    const templates = await DisciplineService.getClassTemplatesByDisciplineId(disciplineId);

    const response: ApiResponse<any> = {
      data: templates,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching templates by discipline:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch templates by discipline'
    });
  }
});

// POST /api/classes/templates
router.post('/templates', requireAdmin, async (req, res) => {
  try {
    const template = await DisciplineService.createClassTemplate(req.body);
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
    const template = await DisciplineService.getClassTemplateBySlug(slug);

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
    const template = await DisciplineService.updateClassTemplate(id, req.body);
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
    const template = await DisciplineService.deleteClassTemplate(id);
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

export { router as classRoutes };
