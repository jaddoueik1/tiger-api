import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { requireAdmin } from '../middleware/requireAdmin';
import { ContentService } from '../services/contentService';
import { ProductService } from '../services/productService';
import { ApiResponse } from '../types';
import { DisciplineService } from '../services/disciplineService';
import { registerAdminUploadImageRoute } from './admin/uploadImage';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const UPLOAD_DIR = path.resolve(PROJECT_ROOT, 'assets', 'uploaded-images');
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);

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

router.post('/upload-image', async (req, res) => {
  const body = req.body as { fileName?: string; imageData?: string } | undefined;
  const { fileName, imageData } = body ?? {};

  if (!body || typeof body !== 'object') {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Invalid request payload',
    });
  }

  if (!fileName || !imageData) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Both fileName and imageData are required',
    });
  }

  const sanitizedName = sanitizeFileName(fileName);
  const extension = path.extname(sanitizedName).toLowerCase();
  const nameWithoutExtension = path.basename(sanitizedName, extension);

  if (!extension || !ALLOWED_EXTENSIONS.has(extension) || !nameWithoutExtension) {
    return res.status(400).json({
      error: 'Unsupported Media Type',
      message: `File extension ${extension || 'unknown'} is not allowed`,
    });
  }

  const dataUrlMatch = imageData.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/);
  const base64Payload = (dataUrlMatch ? dataUrlMatch[2] : imageData).replace(/\s/g, '');

  let buffer: Buffer;
  try {
    buffer = Buffer.from(base64Payload, 'base64');
  } catch (error) {
    console.error('Failed to decode base64 image data', error);
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Invalid base64 image data',
    });
  }

  if (!buffer.length) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Image data is empty',
    });
  }

  if (buffer.length > MAX_FILE_SIZE_BYTES) {
    return res.status(413).json({
      error: 'Payload Too Large',
      message: 'Image exceeds the maximum allowed size of 5MB',
    });
  }

  try {
    await ensureUploadDirectory();
    const uniqueFileName = await getUniqueFileName(sanitizedName);
    const filePath = path.join(UPLOAD_DIR, uniqueFileName);
    await fs.writeFile(filePath, buffer);

    const relativePath = path.relative(PROJECT_ROOT, filePath).split(path.sep).join('/');
    const response: ApiResponse<{ fileName: string; path: string; url: string }> = {
      data: {
        fileName: uniqueFileName,
        path: relativePath,
        url: `/assets/uploaded-images/${uniqueFileName}`,
      },
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Failed to save uploaded image', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to store uploaded image',
    });
  }
});

export { router as adminRoutes };

