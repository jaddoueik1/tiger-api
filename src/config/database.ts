import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error("MONGODB_URI environment variable is not defined");
}

export const connectDatabase = async (): Promise<void> => {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log("✅ Connected to MongoDB");
	} catch (error) {
		console.error("❌ MongoDB connection error:", error);
		process.exit(1);
	}
};

export const disconnectDatabase = async (): Promise<void> => {
	try {
		await mongoose.disconnect();
		console.log("✅ Disconnected from MongoDB");
	} catch (error) {
		console.error("❌ MongoDB disconnection error:", error);
	}
};

// Graceful shutdown
process.on("SIGINT", async () => {
	await disconnectDatabase();
	process.exit(0);
});

process.on("SIGTERM", async () => {
	await disconnectDatabase();
	process.exit(0);
});
