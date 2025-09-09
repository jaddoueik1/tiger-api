import express from 'express';
import { startOfMonth, endOfMonth } from 'date-fns';
import { Payment } from '../models';

const router = express.Router();

// GET /api/payment
router.get('/payment', async (req, res) => {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);

  try {
    const match = {
      status: { $ne: 'failed' },
      createdAt: { $gte: start, $lte: end }
    };

    const items = await Payment.find(match);

    const summary = await Payment.aggregate([
      { $match: match },
      { $group: { _id: '$currency', totalAmount: { $sum: '$amount' }, count: { $sum: 1 } } }
    ]);

    res.json({
      items,
      summary,
      range: {
        start: start.toISOString(),
        end: end.toISOString()
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: 'Failed to fetch payments' });
  }
});

export { router as paymentRoutes };

