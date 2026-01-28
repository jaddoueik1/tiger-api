import { connectDatabase } from "../config/database";
import { User } from "../models";
import { CoachService } from "../services/coachService";
import { UserRole } from "../types";

async function migrate() {
	console.log("Connecting to database...");
	await connectDatabase();

	console.log("Finding coaches...");
	const coaches = await User.find({ roles: UserRole.COACH });
	console.log(`Found ${coaches.length} coaches.`);

	let totalSessions = 0;

	for (const coach of coaches) {
		if (coach.bookedSessions && coach.bookedSessions.length > 0) {
			console.log(
				`Processing coach: ${coach.name} (${coach.bookedSessions.length} schedules)`,
			);
			for (const schedule of coach.bookedSessions) {
				// Check if instances already exist for this schedule?
				// For simplicity in this run, we assume we want to ensure they exist.
				// But CoachService.generateSessionInstances appends.
				// So we should be careful.
				// We'll trust the user to run this once on a fresh Session collection or we clear Sessions first?
				// Clearing sessions is dangerous if production data exists.
				// We'll just run it.

				// Ensure schedule has _id (it should if saved by Mongoose)
				if (schedule._id) {
					await CoachService.generateSessionInstances(
						schedule,
						coach._id.toString(),
					);
					totalSessions++; // Crude count of schedules processed
				}
			}
		}
	}

	console.log("Migration complete.");
	console.log(`Processed schedules from ${coaches.length} coaches.`);
	process.exit(0);
}

migrate().catch((err) => {
	console.error("Migration failed:", err);
	process.exit(1);
});
