import express from 'express';
import { ContentService } from '../services/contentService';
import { ApiResponse } from '../types';

const router = express.Router();

// GET /api/content/:key
router.get('/:key', async (req, res) => {
  const { key } = req.params;
  const locale = req.query.locale as string || 'en';
  
  try {
    const content = await ContentService.getContentByKey(key, locale);
  
    if (!content) {
      return res.status(404).json({
        error: 'Content Not Found',
        message: `Content block with key "${key}" and locale "${locale}" not found`,
      });
    }
  
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

// GET /api/content/seo/:path
// router.get('/seo/:path(*)', (req, res) => {
//   const path = req.params.path || '';
//   const locale = req.query.locale as string || 'en';
  
//   // Mock SEO data
//   const seoData = {
//     title: `Apex MMA - ${path.charAt(0).toUpperCase() + path.slice(1)}`,
//     description: 'World-class MMA, BJJ, Muay Thai, and Boxing training in state-of-the-art facilities.',
//     keywords: 'MMA, Brazilian Jiu-Jitsu, Muay Thai, Boxing, Martial Arts, Training',
//     openGraph: {
//       title: `Apex MMA - ${path.charAt(0).toUpperCase() + path.slice(1)}`,
//       description: 'World-class MMA, BJJ, Muay Thai, and Boxing training in state-of-the-art facilities.',
//       image: 'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg',
//       url: `https://apexmma.com/${path}`,
//     },
//     jsonLd: {
//       '@context': 'https://schema.org',
//       '@type': 'Organization',
//       name: 'Apex MMA',
//       url: 'https://apexmma.com',
//       logo: 'https://apexmma.com/logo.png',
//       contactPoint: {
//         '@type': 'ContactPoint',
//         telephone: '+1-555-123-4567',
//         contactType: 'customer service'
//       }
//     }
//   };
  
//   const response: ApiResponse<any> = {
//     data: seoData,
//   };
  
//   res.json(response);
// });

export { router as contentRoutes };