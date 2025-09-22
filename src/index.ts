import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import YAML from 'yamljs';
import { connectDatabase } from './config/database';
import { adminRoutes } from './routes/admin';
import { authRoutes } from './routes/auth';
import { classRoutes } from './routes/classes';
import { coachRoutes } from './routes/coaches';
import { contentRoutes } from './routes/content';
import { membershipPlanRoutes } from './routes/membership-plans';
import { shopRoutes } from './routes/shop';
import { userRoutes } from './routes/user';

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to database
connectDatabase();

// Security middleware
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
const STATIC_DIR = path.resolve(__dirname, 'public');
console.log('Serving static from:', STATIC_DIR);

app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(
  '/static',
  express.static(STATIC_DIR, {
    maxAge: '1d',
    etag: true,
  })
);


// Body parsing middleware
app.use('/webhooks', express.raw({ type: 'application/json' })); // Stripe webhooks need raw body
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API Documentation
try {
  const swaggerDocument = YAML.load('./swagger.yaml');
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (error) {
  console.warn('Swagger documentation not available');
}

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/coaches', coachRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/membership-plans', membershipPlanRoutes);
app.use('/api/me', userRoutes);

// 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ error: 'Not Found', message: 'Route not found' });
// });

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
});