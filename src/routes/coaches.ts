import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { IBookedSession } from "../models";
import { CoachService } from "../services/coachService";
import { ApiResponse } from "../types";

const router = express.Router();

interface ICoachPublicBookedSessions {
	coachId: string;
	coachName: string;
	bookedSessions: IBookedSession[];
}

// GET /api/coaches
router.get("/", async (req, res) => {
	const { specialty } = req.query;

	try {
		const coaches = await CoachService.getAllCoaches(specialty as string);

		const response: ApiResponse<any> = {
			data: coaches,
		};

		res.json(response);
	} catch (error) {
		console.error("Error fetching coaches:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to fetch coaches",
		});
	}
});

// POST /api/coaches
router.post("/", requireAdmin, async (req, res) => {
	try {
		const coach = await CoachService.createCoach(req.body);
		const response: ApiResponse<any> = { data: coach };
		res.status(201).json(response);
	} catch (error) {
		console.error("Error creating coach:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to create coach",
		});
	}
});

// GET /api/coaches/booked-sessions
router.get("/booked-sessions", async (_req, res) => {
	try {
		const bookedSessions =
			await CoachService.getAllCoachesPublicBookedSessions();

		const response: ApiResponse<ICoachPublicBookedSessions[]> = {
			data: bookedSessions,
		};

		res.json(response);
	} catch (error) {
		console.error("Error fetching booked sessions for all coaches:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to fetch booked sessions for all coaches",
		});
	}
});

// GET /api/coaches/booked-sessions-range
router.get(
	"/booked-sessions-range",
	async (req: express.Request, res: express.Response) => {
		const { startDate, endDate } = req.query;

		if (!startDate || !endDate) {
			return res.status(400).json({
				error: "Bad Request",
				message: "startDate and endDate are required parameters",
			});
		}

		try {
			const bookedSessions = await CoachService.getCoachesBookedSessionsInRange(
				new Date(startDate as string),
				new Date(endDate as string),
			);

			const response: ApiResponse<any> = {
				data: bookedSessions,
			};

			res.json(response);
		} catch (error) {
			console.error("Error fetching booked sessions in range:", error);
			res.status(500).json({
				error: "Internal Server Error",
				message: "Failed to fetch booked sessions in range",
			});
		}
	},
);

// GET /api/coaches/:id
router.get("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const coach = await CoachService.getCoachById(id);

		if (!coach) {
			return res.status(404).json({
				error: "Coach Not Found",
				message: `Coach with id "${id}" not found`,
			});
		}

		const response: ApiResponse<any> = {
			data: coach,
		};

		res.json(response);
	} catch (error) {
		console.error("Error fetching coach:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to fetch coach",
		});
	}
});

// PUT /api/coaches/:id
router.put("/:id", requireAdmin, async (req, res) => {
	const { id } = req.params;
	try {
		const coach = await CoachService.updateCoach(id, req.body);
		if (!coach) {
			return res.status(404).json({
				error: "Coach Not Found",
				message: `Coach with id "${id}" not found`,
			});
		}
		const response: ApiResponse<any> = { data: coach };
		res.json(response);
	} catch (error) {
		console.error("Error updating coach:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to update coach",
		});
	}
});

// DELETE /api/coaches/:id
router.delete("/:id", requireAdmin, async (req, res) => {
	const { id } = req.params;
	try {
		const coach = await CoachService.deleteCoach(id);
		if (!coach) {
			return res.status(404).json({
				error: "Coach Not Found",
				message: `Coach with id "${id}" not found`,
			});
		}
		const response: ApiResponse<any> = { data: { success: true } };
		res.json(response);
	} catch (error) {
		console.error("Error deleting coach:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to delete coach",
		});
	}
});

// GET /api/coaches/:id/booked-sessions
router.get("/:id/booked-sessions", async (req, res) => {
	const { id } = req.params;

	try {
		const bookedSessions = await CoachService.getCoachBookedSessions(id);

		const response: ApiResponse<IBookedSession[]> = {
			data: bookedSessions,
		};

		res.json(response);
	} catch (error) {
		console.error("Error fetching coach booked sessions:", error);
		if (error instanceof Error && error.message === "Coach not found") {
			return res.status(404).json({
				error: "Coach Not Found",
				message: `Coach with id "${id}" not found`,
			});
		}
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to fetch coach booked sessions",
		});
	}
});

router.post("/:id/booked-sessions", async (req, res) => {
	const { id } = req.params;
	const sessionData: IBookedSession = req.body;
	try {
		const session = await CoachService.addBookedSession(id, sessionData);
		const response: ApiResponse<IBookedSession> = { data: session };
		res.status(201).json(response);
	} catch (error) {
		console.error("Error adding booked session:", error);
		if (error instanceof Error && error.message === "Coach not found") {
			return res.status(404).json({
				error: "Coach Not Found",
				message: `Coach with id "${id}" not found`,
			});
		}
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to add booked session",
		});
	}
});

// POST /api/coaches/:id/sessions/:sessionId/cancel
router.post(
	"/:id/sessions/:sessionId/cancel",
	requireAdmin,
	async (req, res) => {
		const { id, sessionId } = req.params;
		const { date } = req.body; // Expect ISO string

		if (!date) {
			return res.status(400).json({
				error: "Bad Request",
				message: "Date is required",
			});
		}

		try {
			await CoachService.cancelSessionInstance(id, sessionId, new Date(date));
			res.json({
				data: { success: true, message: "Session instance cancelled" },
			});
		} catch (error) {
			console.error("Error cancelling session instance:", error);
			if (error instanceof Error && error.message.includes("not found")) {
				return res.status(404).json({
					error: "Not Found",
					message: error.message,
				});
			}
			res.status(500).json({
				error: "Internal Server Error",
				message: "Failed to cancel session instance",
			});
		}
	},
);

// GET /api/coaches/:id/schedules/:scheduleId/instances
router.get(
	"/:id/schedules/:scheduleId/instances",
	requireAdmin,
	async (req, res) => {
		const { id, scheduleId } = req.params;
		try {
			const sessions = await CoachService.getSessionsBySchedule(id, scheduleId);
			const response: ApiResponse<any[]> = { data: sessions };
			res.json(response);
		} catch (error) {
			console.error("Error fetching session instances:", error);
			res.status(500).json({
				error: "Internal Server Error",
				message: "Failed to fetch session instances",
			});
		}
	},
);

// DELETE /api/coaches/:id/booked-sessions/:sessionId
router.delete(
	"/:id/booked-sessions/:sessionId",
	requireAdmin,
	async (req, res) => {
		const { id, sessionId } = req.params;
		try {
			await CoachService.deleteBookedSession(id, sessionId);
			const response: ApiResponse<any> = { data: { success: true } };
			res.json(response);
		} catch (error) {
			console.error("Error deleting booked session:", error);
			if (error instanceof Error && error.message === "Coach not found") {
				return res.status(404).json({
					error: "Coach Not Found",
					message: `Coach with id "${id}" not found`,
				});
			}
			res.status(500).json({
				error: "Internal Server Error",
				message: "Failed to delete booked session",
			});
		}
	},
);

// GET /api/coaches/:id/sessions
router.get("/:id/sessions", async (req, res) => {
	const { id } = req.params;
	const { startDate, endDate } = req.query;

	if (!startDate || !endDate) {
		return res.status(400).json({
			error: "Bad Request",
			message: "startDate and endDate are required parameters",
		});
	}

	try {
		const sessions = await CoachService.getCoachSessionsInRange(
			id,
			new Date(startDate as string),
			new Date(endDate as string),
		);

		const response: ApiResponse<any> = {
			data: sessions,
		};

		res.json(response);
	} catch (error) {
		console.error("Error fetching coach sessions in range:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to fetch coach sessions in range",
		});
	}
});

export { router as coachRoutes };
