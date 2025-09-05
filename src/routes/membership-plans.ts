import express from 'express';
import { MembershipPlanService } from '../services/membershipPlanService';
import { ApiResponse } from '../types';
import { requireAdmin } from '../middleware/requireAdmin';

const router = express.Router();

// GET /api/membership-plans
router.get('/', async (req, res) => {
  try {
    const plans = await MembershipPlanService.getAllPlans();
    const response: ApiResponse<any> = {
      data: plans,
    };
    res.json(response);
  } catch (error) {
    console.error('Error fetching membership plans:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch membership plans'
    });
  }
});

// GET /api/membership-plans/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const plan = await MembershipPlanService.getPlanById(id);

    if (!plan) {
      return res.status(404).json({
        error: 'Membership Plan Not Found',
        message: `Membership plan with id "${id}" not found`,
      });
    }

    const response: ApiResponse<any> = {
      data: plan,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching membership plan:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch membership plan'
    });
  }
});

// POST /api/membership-plans
router.post('/', requireAdmin, async (req, res) => {
  try {
    const plan = await MembershipPlanService.createPlan(req.body);

    const response: ApiResponse<any> = {
      data: plan,
    };

    res.status(201).json(response);
  } catch (error) {
    console.error('Error creating membership plan:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create membership plan'
    });
  }
});

// PUT /api/membership-plans/:id
router.put('/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const plan = await MembershipPlanService.updatePlan(id, req.body);

    if (!plan) {
      return res.status(404).json({
        error: 'Membership Plan Not Found',
        message: `Membership plan with id "${id}" not found`,
      });
    }

    const response: ApiResponse<any> = {
      data: plan,
    };

    res.json(response);
  } catch (error) {
    console.error('Error updating membership plan:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update membership plan'
    });
  }
});

// DELETE /api/membership-plans/:id
router.delete('/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const plan = await MembershipPlanService.deletePlan(id);

    if (!plan) {
      return res.status(404).json({
        error: 'Membership Plan Not Found',
        message: `Membership plan with id "${id}" not found`,
      });
    }

    const response: ApiResponse<any> = {
      data: plan,
    };

    res.json(response);
  } catch (error) {
    console.error('Error deleting membership plan:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete membership plan'
    });
  }
});

export { router as membershipPlanRoutes };
