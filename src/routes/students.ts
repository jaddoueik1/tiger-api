import bcrypt from "bcryptjs";
import express from "express";
import { requireAdmin } from "../middleware/requireAdmin"; // Corrected path
import { User } from "../models";
import { UserRole } from "../types";

const router = express.Router();

// Get all students
router.get("/", requireAdmin, async (req, res) => {
	try {
		const students = await User.find({ roles: UserRole.STUDENT }).select(
			"-passwordHash"
		);
		res.json({ data: students });
	} catch (error) {
		console.error("Error fetching students:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to fetch students",
		});
	}
});

// Get a single student by ID
router.get("/:id", requireAdmin, async (req, res) => {
	try {
		const student = await User.findOne({
			_id: req.params.id,
			roles: UserRole.STUDENT,
		}).select("-passwordHash");

		if (!student) {
			return res
				.status(404)
				.json({ error: "Not Found", message: "Student not found" });
		}

		res.json({ data: student });
	} catch (error) {
		console.error("Error fetching student:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to fetch student",
		});
	}
});

// Create a new student
router.post("/", requireAdmin, async (req, res) => {
	const { email, name, phone, password } = req.body;

	if (!email || !name) {
		return res.status(400).json({
			error: "Validation Error",
			message: "Email and Name are required",
		});
	}

	try {
		const existingUser = await User.findOne({ email: email.toLowerCase() });
		if (existingUser) {
			return res.status(409).json({
				error: "User Exists",
				message: "User with this email already exists",
			});
		}

		// Generate a random password if not provided
		const tempPassword = password || Math.random().toString(36).slice(-8);
		const passwordHash = await bcrypt.hash(tempPassword, 10);

		const newStudent = new User({
			email: email.toLowerCase(),
			name,
			phone,
			passwordHash,
			roles: [UserRole.STUDENT],
			forcePasswordChange: true,
			isActive: true,
		});

		await newStudent.save();

		// Return the user AND the temp password so the admin can share it
		res.status(201).json({
			data: {
				...newStudent.toObject(),
				tempPassword: password ? undefined : tempPassword, // Only return if auto-generated
			},
		});
	} catch (error) {
		console.error("Error creating student:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to create student",
		});
	}
});

// Update a student
router.put("/:id", requireAdmin, async (req, res) => {
	const { name, phone, email, isActive, enrolledClassTemplates } = req.body;

	try {
		const student = await User.findOne({
			_id: req.params.id,
			roles: UserRole.STUDENT,
		});

		if (!student) {
			return res
				.status(404)
				.json({ error: "Not Found", message: "Student not found" });
		}

		if (email && email.toLowerCase() !== student.email) {
			const existingUser = await User.findOne({ email: email.toLowerCase() });
			if (existingUser) {
				return res.status(409).json({
					error: "User Exists",
					message: "User with this email already exists",
				});
			}
			student.email = email.toLowerCase();
		}

		if (name) student.name = name;
		if (phone) student.phone = phone;
		if (typeof isActive === "boolean") student.isActive = isActive;
		if (enrolledClassTemplates)
			student.enrolledClassTemplates = enrolledClassTemplates;

		await student.save();

		res.json({ data: student });
	} catch (error) {
		console.error("Error updating student:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to update student",
		});
	}
});

// Delete a student
router.delete("/:id", requireAdmin, async (req, res) => {
	try {
		const result = await User.findOneAndDelete({
			_id: req.params.id,
			roles: UserRole.STUDENT,
		});

		if (!result) {
			return res
				.status(404)
				.json({ error: "Not Found", message: "Student not found" });
		}

		res.json({ message: "Student deleted successfully" });
	} catch (error) {
		console.error("Error deleting student:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to delete student",
		});
	}
});

export { router as studentRoutes };
