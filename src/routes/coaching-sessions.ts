import express from "express";
import mongoose from "mongoose";
import { authenticateToken } from "../middleware/authenticateToken";
import { CoachingSession } from "../models";
import { ApiResponse } from "../types";

const router = express.Router();

// POST /api/coaching-sessions
router.post("/", authenticateToken, async (req, res) => {
	try {
		const session = new CoachingSession(req.body);
		session.coach = new mongoose.Types.ObjectId(req.user.userId);
		await session.save();
		res.status(201).json(session);
	} catch (err) {
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to create coaching session",
		});
	}
});

// GET /api/coaching-sessions
router.get("/", async (req, res) => {
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
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to fetch coaching sessions",
		});
	}
});

router.get("/me", authenticateToken, async (req, res) => {
	const userId = req.user["userId"];
	try {
		const sessions = await CoachingSession.find({coach: userId}).populate('coach', 'name');
		const response: ApiResponse<any> = {
			data: sessions,
		};
		res.json(response);
	} catch (err) {
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to fetch coaching sessions",
		});
	}
});

// DELETE /api/coaching-sessions/:id
router.delete("/:id", async (req, res) => {
	try {
		const session = await CoachingSession.findByIdAndDelete(req.params.id);
		if (!session) {
			return res
				.status(404)
				.json({ error: "Not Found", message: "Coaching session not found" });
		}
		res.status(204).send();
	} catch (err) {
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to delete coaching session",
		});
	}
});

export { router as coachingSessionRoutes };

