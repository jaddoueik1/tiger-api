import express from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import { requireAdmin } from "../middleware/requireAdmin";
import { User } from "../models";
import { Evaluation } from "../models/Evaluation";
import { ApiResponse } from "../types";

const router = express.Router();

// POST /api/evaluations
router.post("/", requireAdmin, async (req: any, res) => {
	try {
		const {
			studentId,
			classTemplateId,
			quizId,
			answers,
			totalScore,
			maxScore,
			notes,
		} = req.body;

		// Validate Student
		const student = await User.findById(studentId);
		if (!student) {
			return res.status(404).json({
				error: "Not Found",
				message: "Student not found",
			});
		}

		// Create Evaluation
		const evaluation = new Evaluation({
			studentId,
			classTemplateId,
			quizId,
			answers,
			totalScore,
			maxScore,
			notes,
			createdBy: req.user.userId,
		});

		await evaluation.save();

		const response: ApiResponse<any> = {
			data: evaluation,
		};

		res.status(201).json(response);
	} catch (error) {
		console.error("Error creating evaluation:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to create evaluation",
		});
	}
});

// GET /api/evaluations/student/:studentId
router.get("/student/:studentId", requireAdmin, async (req, res) => {
	try {
		const { studentId } = req.params;
		const evaluations = await Evaluation.find({ studentId })
			.populate("classTemplateId", "title")
			.populate("quizId", "title")
			.populate("createdBy", "name")
			.sort({ createdAt: -1 });

		const response: ApiResponse<any> = {
			data: evaluations,
		};

		res.json(response);
	} catch (error) {
		console.error("Error fetching evaluations:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to fetch evaluations",
		});
	}
});

// GET /api/me/evaluations ? (Maybe specific route in user.ts or here)
// Let's verify route structure. Usually user-facing routes might be here if public/auth access.
// Let's add GET /api/evaluations/me for the logged in student.

// GET /api/evaluations/me
router.get("/me", authenticateToken, async (req: any, res) => {
	try {
		const evaluations = await Evaluation.find({ studentId: req.user.userId })
			.populate("classTemplateId", "title")
			.populate("quizId", "title")
			.populate("createdBy", "name")
			.sort({ createdAt: -1 });

		const response: ApiResponse<any> = {
			data: evaluations,
		};

		res.json(response);
	} catch (error) {
		console.error("Error fetching my evaluations:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to fetch evaluations",
		});
	}
});

export { router as evaluationRoutes };
