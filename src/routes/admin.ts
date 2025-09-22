import express from 'express';
import { requireAdmin } from '../middleware/requireAdmin';
import { ContentService } from '../services/contentService';
import { ProductService } from '../services/productService';
import { ApiResponse } from '../types';
import { DisciplineService } from '../services/disciplineService';
import { registerAdminUploadImageRoute } from './admin/uploadImage';

const router = express.Router();

// Apply admin middleware to all routes
router.use(requireAdmin);

registerAdminUploadImageRoute(router);

// GET /api/admin/content
router.get('/content', async (req, res) => {
  const locale = (req.query.locale as string) || 'en';

  try {
    const content = await ContentService.getAllContent(locale);

    const response: ApiResponse<any> = {
      data: content,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch content'
    });
  }
});

// GET /api/admin/disciplines
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

// GET /api/admin/class-templates
router.get('/class-templates', async (req, res) => {
  try {
    const templates = await DisciplineService.getClassTemplates();

    const response: ApiResponse<any> = {
      data: templates,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching class templates:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch class templates'
    });
  }
});


// GET /api/admin/product-categories
router.get('/product-categories', async (req, res) => {
  try {
    const categories = await ProductService.getAllCategories();

    const response: ApiResponse<any> = {
      data: categories,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching product categories:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch product categories'
    });
  }
});

export { router as adminRoutes };

