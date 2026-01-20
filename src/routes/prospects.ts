import express from "express";
import { requireAdmin } from "../middleware/requireAdmin";
import Prospect from "../models/Prospect";

export const prospectRoutes = express.Router();

// Apply admin middleware to all prospect routes
prospectRoutes.use(requireAdmin);

// POST /api/prospects - Create a new prospect (Admin only now)
prospectRoutes.post("/", async (req, res) => {
	try {
		// Since it's admin only, we assume the admin is manually adding a prospect
		const prospect = new Prospect(req.body);
		const savedProspect = await prospect.save();
		res.status(201).json({ data: savedProspect });
	} catch (error) {
		console.error("Error creating prospect:", error);
		res.status(500).json({ message: "Error creating prospect", error });
	}
});

// GET /api/prospects - Get all prospects
prospectRoutes.get("/", async (req, res) => {
	try {
		const prospects = await Prospect.find().sort({ createdAt: -1 });
		res.json({ data: prospects });
	} catch (error) {
		console.error("Error fetching prospects:", error);
		res.status(500).json({ message: "Error fetching prospects", error });
	}
});

// GET /api/prospects/:id - Get single prospect
prospectRoutes.get("/:id", async (req, res) => {
	try {
		const prospect = await Prospect.findById(req.params.id);
		if (!prospect) {
			return res.status(404).json({ message: "Prospect not found" });
		}
		res.json({ data: prospect });
	} catch (error) {
		console.error("Error fetching prospect:", error);
		res.status(500).json({ message: "Error fetching prospect", error });
	}
});

// PUT /api/prospects/:id - Update prospect
prospectRoutes.put("/:id", async (req, res) => {
	try {
		const updatedProspect = await Prospect.findByIdAndUpdate(
			req.params.id,
			{ ...req.body },
			{ new: true }
		);
		if (!updatedProspect) {
			return res.status(404).json({ message: "Prospect not found" });
		}
		res.json({ data: updatedProspect });
	} catch (error) {
		console.error("Error updating prospect:", error);
		res.status(500).json({ message: "Error updating prospect", error });
	}
});

// DELETE /api/prospects/:id - Delete prospect
prospectRoutes.delete("/:id", async (req, res) => {
	try {
		const deletedProspect = await Prospect.findByIdAndDelete(req.params.id);
		if (!deletedProspect) {
			return res.status(404).json({ message: "Prospect not found" });
		}
		res.json({
			data: { success: true },
			message: "Prospect deleted successfully",
		});
	} catch (error) {
		console.error("Error deleting prospect:", error);
		res.status(500).json({ message: "Error deleting prospect", error });
	}
});
