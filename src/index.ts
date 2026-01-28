import cors from "cors";
import express from "express";
import fs from "fs";
import helmet from "helmet";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from "url";
import YAML from "yamljs";
import { connectDatabase } from "./config/database";
import { adminRoutes } from "./routes/admin";
import { authRoutes } from "./routes/auth";
import { classRoutes } from "./routes/classes";
import { coachRoutes } from "./routes/coaches";
import { contentRoutes } from "./routes/content";
import { cronRoutes } from "./routes/cron";
import { evaluationRoutes } from "./routes/evaluations";
import { membershipPlanRoutes } from "./routes/membership-plans";
import { newsRoutes } from "./routes/news";
import { orderRoutes } from "./routes/orders";
import { prospectRoutes } from "./routes/prospects";
import { quizRoutes } from "./routes/quizzes";
import { shopRoutes } from "./routes/shop";
import { studentRoutes } from "./routes/students";
import { userRoutes } from "./routes/user";

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to database
connectDatabase();

// Security middleware
app.use(
	helmet({
		crossOriginResourcePolicy: false,
	}),
);
const STATIC_DIR = path.resolve(__dirname, "public");
const ASSETS_DIR = path.resolve(__dirname, "../assets");

if (!fs.existsSync(ASSETS_DIR)) {
	fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

console.log("Serving static from:", STATIC_DIR);

app.use(
	cors({
		origin: "*",
		credentials: true,
	}),
);

app.use(
	"/static",
	express.static(STATIC_DIR, {
		maxAge: "1d",
		etag: true,
	}),
);

app.use(
	"/assets",
	express.static(ASSETS_DIR, {
		maxAge: "1d",
		etag: true,
	}),
);

// Body parsing middleware
app.use("/webhooks", express.raw({ type: "application/json" })); // Stripe webhooks need raw body
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// API Documentation
try {
	const swaggerDocument = YAML.load("./swagger.yaml");
	app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} catch (error) {
	console.warn("Swagger documentation not available");
}

// Health check
app.get("/health", (req, res) => {
	res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/admin", adminRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/coaches", coachRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/membership-plans", membershipPlanRoutes);
app.use("/api/me", userRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/prospects", prospectRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/evaluations", evaluationRoutes);
app.use("/api/cron", cronRoutes);
// app.use("/api/admin/prospects", ... ) is handled inside prospectRoutes (it defines /admin/prospects paths)
// Actually, since I defined the routes as /admin/prospects INSIDE the router, I should mount it at /api/prospects only if I change the internal paths.
// Let's re-read the route file.
// route file has: post('/') AND get('/admin/prospects') etc.
// So if I mount at /api/prospects:
// POST /api/prospects/ -> works
// GET /api/prospects/admin/prospects -> This is ugly and wrong.
// I should mount it at /api and let the router handle the full paths, OR split them.
// Let's mount at /api to keep it simple with the internal paths I wrote.

// 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({ error: 'Not Found', message: 'Route not found' });
// });

// Error handler
app.use(
	(
		err: any,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		console.error(err.stack);
		res.status(500).json({
			error: "Internal Server Error",
			message:
				process.env.NODE_ENV === "development"
					? err.message
					: "Something went wrong",
		});
	},
);

app.listen(PORT, () => {
	console.log(`🚀 API Server running on http://localhost:${PORT}`);
	console.log(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
});
