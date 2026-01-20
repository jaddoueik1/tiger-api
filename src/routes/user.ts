import express from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import { User } from "../models";
import { ApiResponse } from "../types";

const router = express.Router();

// GET /api/me
router.get("/", authenticateToken, async (req: any, res) => {
	try {
		const user = await User.findById(req.user.userId).populate(
			"enrolledClassTemplates"
		);
		if (!user) {
			return res
				.status(404)
				.json({ error: "Not Found", message: "User not found" });
		}

		const response: ApiResponse<any> = {
			data: {
				id: user._id,
				email: user.email,
				name: user.name,
				phone: user.phone,
				roles: user.roles,
				memberships: user.memberships,
				credits: user.credits,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
				forcePasswordChange: user.forcePasswordChange,
				enrolledClassTemplates: user.enrolledClassTemplates,
			},
		};

		res.json(response);
	} catch (error) {
		console.error("Error fetching user profile:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to fetch profile",
		});
	}
});

// PUT /api/me
router.put("/", authenticateToken, async (req: any, res) => {
	const { name, phone } = req.body;

	try {
		const user = await User.findById(req.user.userId);
		if (!user) {
			return res
				.status(404)
				.json({ error: "Not Found", message: "User not found" });
		}

		if (name) user.name = name;
		if (phone) user.phone = phone;

		await user.save();

		const response: ApiResponse<any> = {
			data: {
				id: user._id,
				email: user.email,
				name: user.name,
				phone: user.phone,
				roles: user.roles,
				memberships: user.memberships,
				credits: user.credits,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
				forcePasswordChange: user.forcePasswordChange,
			},
		};

		res.json(response);
	} catch (error) {
		console.error("Error updating user profile:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to update profile",
		});
	}
});

// GET /api/me/bookings (Keeping mock for now as it relies on other logic not fully visible/implemented yet, or maybe it should be empty?)
// The previous mock had booking logic. I'll verify if I should keep mocking or fetch real bookings if Ticket/Booking model exists.
// User model has memberships but bookings structure isn't clear from User model alone.
// Admin API has sessions.
// For now I will comment out the mock bookings/orders or return empty to avoid confusion,
// OR keep them as mocks if the user didn't ask to fix them explicitly.
// The user asked for Student Profile Update. I will strictly implement GET/PUT / and leave others as is or keep them mocked if they were mocked.
// The previous content had them mocked. I'll keep them mocked but moved after the real implementations,
// using the same router structure.
// Actually, to avoid breaking the file replace with extensive unrelated code, I will just append the mock routes after my changes if I replace the whole file.
// Or I can use multi_replace to target specific blocks.
// Replacing lines 1-82 (whole file) allows me to rewrite it cleanly.

// GET /api/me/bookings
router.get("/bookings", authenticateToken, (req, res) => {
	// TODO: Implement real bookings fetch
	const mockBookings: any[] = [];

	const response: ApiResponse<any> = {
		data: mockBookings,
	};

	res.json(response);
});

// GET /api/me/orders
router.get("/orders", authenticateToken, (req, res) => {
	// TODO: Implement real orders fetch
	const mockOrders: any[] = [];

	const response: ApiResponse<any> = {
		data: mockOrders,
	};

	res.json(response);
});

export { router as userRoutes };
