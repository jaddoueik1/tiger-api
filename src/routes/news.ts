import express from "express";
import News from "../models/News";
// Actually I don't need to import ApiResponse type to output JSON.

export const newsRoutes = express.Router();

// GET /api/news - Get all news (public)
newsRoutes.get("/", async (req, res) => {
	try {
		const news = await News.find().sort({ creationDate: -1 });
		res.json({ data: news });
	} catch (error) {
		res.status(500).json({ message: "Error fetching news", error });
	}
});

// GET /api/news/:id - Get single news (public)
newsRoutes.get("/:id", async (req, res) => {
	try {
		const news = await News.findById(req.params.id);
		if (!news) {
			return res.status(404).json({ message: "News not found" });
		}
		res.json({ data: news });
	} catch (error) {
		res.status(500).json({ message: "Error fetching news", error });
	}
});

// POST /api/news - Create news (admin)
newsRoutes.post("/", async (req, res) => {
	try {
		const { title, description, creationDate } = req.body;
		const newNews = new News({
			title,
			description,
			creationDate: creationDate || Date.now(),
		});
		const savedNews = await newNews.save();
		res.status(201).json({ data: savedNews });
	} catch (error) {
		res.status(500).json({ message: "Error creating news", error });
	}
});

// PUT /api/news/:id - Update news (admin)
newsRoutes.put("/:id", async (req, res) => {
	try {
		const { title, description, creationDate } = req.body;
		const updatedNews = await News.findByIdAndUpdate(
			req.params.id,
			{ title, description, creationDate },
			{ new: true }
		);
		if (!updatedNews) {
			return res.status(404).json({ message: "News not found" });
		}
		res.json({ data: updatedNews });
	} catch (error) {
		res.status(500).json({ message: "Error updating news", error });
	}
});

// DELETE /api/news/:id - Delete news (admin)
newsRoutes.delete("/:id", async (req, res) => {
	try {
		const deletedNews = await News.findByIdAndDelete(req.params.id);
		if (!deletedNews) {
			return res.status(404).json({ message: "News not found" });
		}
		res.json({ data: { success: true }, message: "News deleted successfully" });
	} catch (error) {
		res.status(500).json({ message: "Error deleting news", error });
	}
});
