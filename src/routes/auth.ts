import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { ApiResponse, UserRole } from "../types";

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
	const { email, password, portal } = req.body;

	if (!email || !password) {
		return res.status(400).json({
			error: "Validation Error",
			message: "Email and password are required",
		});
	}

	try {
		const user = await User.findOne({ email: email.toLowerCase() });

		if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
			return res.status(401).json({
				error: "Authentication Failed",
				message: "Invalid email or password",
			});
		}

		// Portal Access Control
		if (portal === "student") {
			if (!user.roles.includes(UserRole.STUDENT)) {
				return res.status(403).json({
					error: "Access Denied",
					message: "This portal is for students only",
				});
			}
		}

		const token = jwt.sign(
			{ userId: user._id, email: user.email, roles: user.roles },
			process.env.JWT_SECRET || "fallback-secret",
			{ expiresIn: "7d" }
		);

		const response: ApiResponse<any> = {
			data: {
				token,
				user: {
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
			},
		};

		res.json(response);
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "Login failed",
		});
	}
});

// POST /api/auth/register
router.post("/register", async (req, res) => {
	const { email, password, name, phone } = req.body;

	if (!email || !password || !name) {
		return res.status(400).json({
			error: "Validation Error",
			message: "Email, password, and name are required",
		});
	}

	try {
		// Check if user already exists
		const existingUser = await User.findOne({ email: email.toLowerCase() });
		if (existingUser) {
			return res.status(409).json({
				error: "User Exists",
				message: "User with this email already exists",
			});
		}

		// Create new user
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			email: email.toLowerCase(),
			name,
			phone,
			passwordHash: hashedPassword,
			roles: [UserRole.MEMBER],
			memberships: [],
			credits: 0,
		});

		await newUser.save();

		const token = jwt.sign(
			{ userId: newUser._id, email: newUser.email, roles: newUser.roles },
			process.env.JWT_SECRET || "fallback-secret",
			{ expiresIn: "7d" }
		);

		const response: ApiResponse<any> = {
			data: {
				token,
				user: {
					id: newUser._id,
					email: newUser.email,
					name: newUser.name,
					phone: newUser.phone,
					roles: newUser.roles,
					memberships: newUser.memberships,
					credits: newUser.credits,
					createdAt: newUser.createdAt,
					updatedAt: newUser.updatedAt,
				},
			},
		};

		res.status(201).json(response);
	} catch (error) {
		console.error("Registration error:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "Registration failed",
		});
	}
});

// POST /api/auth/change-password
router.post("/change-password", async (req, res) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		return res
			.status(401)
			.json({ error: "Unauthorized", message: "No token provided" });
	}

	const token = authHeader.split(" ")[1];
	let userId: string;

	try {
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || "fallback-secret"
		) as any;
		userId = decoded.userId;
	} catch (e) {
		return res
			.status(401)
			.json({ error: "Unauthorized", message: "Invalid token" });
	}

	const { newPassword } = req.body;
	if (!newPassword || newPassword.length < 6) {
		return res
			.status(400)
			.json({
				error: "Validation Error",
				message: "Password must be at least 6 characters",
			});
	}

	try {
		const hashedPassword = await bcrypt.hash(newPassword, 10);
		await User.findByIdAndUpdate(userId, {
			passwordHash: hashedPassword,
			forcePasswordChange: false,
		});

		res.json({ data: { message: "Password changed successfully" } });
	} catch (error) {
		console.error("Change password error:", error);
		res.status(500).json({
			error: "Internal Server Error",
			message: "Failed to change password",
		});
	}
});

export { router as authRoutes };
