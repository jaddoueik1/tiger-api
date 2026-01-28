import express from "express";
import { CoachService } from "../services/coachService";

const router = express.Router();

// GET /api/cron/process-sessions
router.get("/process-sessions", async (req, res) => {
	try {
		await CoachService.processPendingSessions();
		res.json({ success: true, message: "Sessions processed" });
	} catch (error) {
		console.error("Cron error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

export { router as cronRoutes };
