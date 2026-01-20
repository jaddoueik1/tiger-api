import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
	throw new Error("JWT_SECRET environment variable is not defined");
}

// Extend Express Request type so we can attach `user`
export interface AuthRequest extends Request {
	user?: string | JwtPayload;
}

export function authenticateToken(
	req: AuthRequest,
	res: Response,
	next: NextFunction,
) {
	const authHeader = (req as any).headers["authorization"];

	// Bearer <token>
	const token = authHeader && authHeader.split(" ")[1];

	if (!token) {
		return res.sendStatus(401); // Unauthorized
	}

	jwt.verify(token, JWT_SECRET, (err, user) => {
		if (err) {
			return res.sendStatus(403); // Forbidden (invalid token)
		}

		// Save decoded payload in request
		req.user = user;
		next();
	});
}
