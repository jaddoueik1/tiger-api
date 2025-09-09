import express from 'express';
import mongoose from 'mongoose';
import { z, ZodError, ZodSchema } from 'zod';
import { CoachingSession } from '../models';

const router = express.Router();

const objectId = z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), { message: 'Invalid id' });

// Schema used for both creation and updates
const createSchema = z.object({
  name: z.string().min(1),
  coach: objectId.optional(),
  date: z.coerce.date()
});

const updateSchema = createSchema.partial();

const listSchema = z.object({
  coach: objectId.optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
});

const idSchema = z.object({ id: objectId });

function validate(schema: ZodSchema<any>, property: 'body' | 'query' | 'params' = 'body') {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      (req as any)[property] = schema.parse((req as any)[property]);
      next();
    } catch (err) {
      const error = err as ZodError;
      res.status(400).json({
        error: 'Validation Error',
        message: error.errors.map(e => e.message).join(', ')
      });
    }
  };
}

// POST /api/coaching-sessions
router.post('/', validate(createSchema), async (req, res) => {
  try {
    const session = await CoachingSession.create(req.body);
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to create coaching session' });
  }
});

// GET /api/coaching-sessions
router.get('/', validate(listSchema, 'query'), async (req, res) => {
  const { coach, from, to } = req.query as any;
  const filter: any = {};
  if (coach) {
    filter.coach = coach;
  }
  if (from || to) {
    filter.date = {};
    if (from) filter.date.$gte = from;
    if (to) filter.date.$lte = to;
  }
  try {
    const sessions = await CoachingSession.find(filter);
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to fetch coaching sessions' });
  }
});

// GET /api/coaching-sessions/:id
router.get('/:id', validate(idSchema, 'params'), async (req, res) => {
  try {
    const session = await CoachingSession.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ error: 'Not Found', message: 'Coaching session not found' });
    }
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to fetch coaching session' });
  }
});

// PATCH /api/coaching-sessions/:id
router.patch('/:id', validate(idSchema, 'params'), validate(updateSchema), async (req, res) => {
  try {
    const session = await CoachingSession.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!session) {
      return res.status(404).json({ error: 'Not Found', message: 'Coaching session not found' });
    }
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to update coaching session' });
  }
});

// DELETE /api/coaching-sessions/:id
router.delete('/:id', validate(idSchema, 'params'), async (req, res) => {
  try {
    const session = await CoachingSession.findByIdAndDelete(req.params.id);
    if (!session) {
      return res.status(404).json({ error: 'Not Found', message: 'Coaching session not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to delete coaching session' });
  }
});

export { router as coachingSessionRoutes };

