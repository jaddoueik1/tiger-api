import type { Router } from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { ApiResponse } from '../../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..', '..', '..');
const UPLOAD_DIR = path.resolve(PROJECT_ROOT, 'assets', 'uploaded-images');
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp']);

const ensureUploadDirectory = async () => {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
};

const sanitizeFileName = (fileName: string) => {
  const rawExtension = path.extname(fileName);
  const baseName = path.basename(fileName, rawExtension);
  const sanitizedBase = baseName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const sanitizedExtension = rawExtension
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '');

  const finalBase = sanitizedBase || 'image';
  const finalExtension = sanitizedExtension.startsWith('.')
    ? sanitizedExtension
    : sanitizedExtension
    ? `.${sanitizedExtension}`
    : '';

  return `${finalBase}${finalExtension}`;
};

const getUniqueFileName = async (desiredName: string) => {
  const extension = path.extname(desiredName).toLowerCase();
  const base = path.basename(desiredName, extension);
  let uniqueName = desiredName;
  let counter = 1;

  while (true) {
    try {
      await fs.access(path.join(UPLOAD_DIR, uniqueName));
      uniqueName = `${base}-${counter}${extension}`;
      counter += 1;
    } catch {
      return uniqueName;
    }
  }
};

const normalizeBase64Payload = (input: string) => {
  let normalized = input.trim().replace(/\s/g, '');

  if (!normalized.length) {
    return normalized;
  }

  normalized = normalized
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const padding = normalized.length % 4;
  if (padding) {
    normalized = normalized.padEnd(normalized.length + (4 - padding), '=');
  }

  return normalized;
};

const extractBase64Payload = (input: string) => {
  const trimmed = input.trim();
  const dataUrlMatch = trimmed.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/i);
  return normalizeBase64Payload(dataUrlMatch ? dataUrlMatch[2] : trimmed);
};

export const registerAdminUploadImageRoute = (router: Router) => {
  router.post('/upload-image', async (req, res) => {
    const body = req.body as { fileName?: string; imageData?: string } | undefined;

    if (!body || typeof body !== 'object') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid request payload',
      });
    }

    const { fileName, imageData } = body;

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

    const base64Payload = extractBase64Payload(imageData);

    if (!base64Payload) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Image data is empty',
      });
    }

    if (!/^[A-Za-z0-9+/=]+$/.test(base64Payload)) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Image data must be valid base64',
      });
    }

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

    const reconverted = buffer.toString('base64').replace(/=+$/, '');
    const normalizedPayload = base64Payload.replace(/=+$/, '');

    if (reconverted !== normalizedPayload) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Image data must be valid base64',
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
          url: `${process.env.APP_URL || 'http://localhost:3001'}/assets/uploaded-images/${uniqueFileName}`,
        },
      };

      return res.status(201).json(response);
    } catch (error) {
      console.error('Failed to save uploaded image', error);
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Failed to store uploaded image',
      });
    }
  });
};
