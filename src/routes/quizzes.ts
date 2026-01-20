import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import { Quiz } from "../models/Quiz";

const router = express.Router();

// Apply admin middleware to all quiz routes
router.use(requireAdmin);

// GET /api/quizzes - Get all quizzes
router.get("/", async (req, res) => {
	try {
		const quizzes = await Quiz.find().sort({ createdAt: -1 });
		res.json({ data: quizzes });
	} catch (error) {
		console.error("Error fetching quizzes:", error);
		res.status(500).json({ message: "Error fetching quizzes", error });
	}
});

// GET /api/quizzes/:id - Get single quiz
router.get("/:id", async (req, res) => {
	try {
		const quiz = await Quiz.findById(req.params.id);
		if (!quiz) {
			return res.status(404).json({ message: "Quiz not found" });
		}
		res.json({ data: quiz });
	} catch (error) {
		console.error("Error fetching quiz:", error);
		res.status(500).json({ message: "Error fetching quiz", error });
	}
});

// POST /api/quizzes - Create quiz
router.post("/", async (req, res) => {
	try {
		const quiz = new Quiz(req.body);
		const savedQuiz = await quiz.save();
		res.status(201).json({ data: savedQuiz });
	} catch (error) {
		console.error("Error creating quiz:", error);
		res.status(500).json({ message: "Error creating quiz", error });
	}
});

// PUT /api/quizzes/:id - Update quiz
router.put("/:id", async (req, res) => {
	try {
		const updatedQuiz = await Quiz.findByIdAndUpdate(
			req.params.id,
			{ ...req.body },
			{ new: true }
		);
		if (!updatedQuiz) {
			return res.status(404).json({ message: "Quiz not found" });
		}
		res.json({ data: updatedQuiz });
	} catch (error) {
		console.error("Error updating quiz:", error);
		res.status(500).json({ message: "Error updating quiz", error });
	}
});

// DELETE /api/quizzes/:id - Delete quiz
router.delete("/:id", async (req, res) => {
	try {
		const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
		if (!deletedQuiz) {
			return res.status(404).json({ message: "Quiz not found" });
		}
		res.json({ data: { success: true }, message: "Quiz deleted successfully" });
	} catch (error) {
		console.error("Error deleting quiz:", error);
		res.status(500).json({ message: "Error deleting quiz", error });
	}
});

export const quizRoutes = router;
