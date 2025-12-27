import { ClassLevel, ClassTemplate } from "../types";

export const templates: ClassTemplate[] = [
	{
		id: "1",
		disciplineId: "1",
		title: "BJJ Fundamentals",
		level: ClassLevel.BEGINNER,
		durationMin: 60,
		description:
			"Learn the fundamental techniques of Brazilian Jiu-Jitsu including basic positions, escapes, and submissions.",
		coachIds: ["1"],
		capacity: 20,
		prices: {
			dropIn: 30,
		},
		prerequisites: ["No experience required"],
	},
	{
		id: "2",
		disciplineId: "2",
		title: "Muay Thai Basics",
		level: ClassLevel.BEGINNER,
		durationMin: 60,
		description:
			"Introduction to Muay Thai fundamentals including stance, basic strikes, and pad work.",
		coachIds: ["2"],
		capacity: 20,
		prices: {
			dropIn: 25,
		},
	},
	{
		id: "3",
		disciplineId: "3",
		title: "Boxing Basics",
		level: ClassLevel.BEGINNER,
		durationMin: 60,
		description:
			"Learn proper boxing fundamentals including stance, footwork, and basic combinations.",
		coachIds: ["3"],
		capacity: 20,
		prices: {
			dropIn: 25,
		},
	},
	{
		id: "4",
		disciplineId: "4",
		title: "MMA Fundamentals",
		level: ClassLevel.INTERMEDIATE,
		durationMin: 90,
		description:
			"Mixed martial arts training combining striking, grappling, and transitions.",
		coachIds: ["4"],
		capacity: 20,
		prices: {
			dropIn: 35,
		},
		prerequisites: ["Basic experience in at least one martial art"],
	},
	{
		id: "5",
		disciplineId: "1",
		title: "BJJ Advanced",
		level: ClassLevel.ADVANCED,
		durationMin: 75,
		description:
			"Advanced Brazilian Jiu-Jitsu techniques, rolling, and competition preparation.",
		coachIds: ["1"],
		capacity: 15,
		prices: {
			dropIn: 35,
		},
		prerequisites: ["Blue belt or equivalent experience"],
	},
	{
		id: "6",
		disciplineId: "2",
		title: "Muay Thai Advanced",
		level: ClassLevel.ADVANCED,
		durationMin: 75,
		description:
			"Advanced Muay Thai techniques including clinch work and sparring.",
		coachIds: ["2"],
		capacity: 15,
		prices: {
			dropIn: 30,
		},
		prerequisites: ["6+ months Muay Thai experience"],
	},
	{
		id: "7",
		disciplineId: "3",
		title: "Boxing Competition",
		level: ClassLevel.ADVANCED,
		durationMin: 90,
		description:
			"Competition-focused boxing training with sparring and fight preparation.",
		coachIds: ["3"],
		capacity: 15,
		prices: {
			dropIn: 40,
		},
		prerequisites: ["1+ year boxing experience", "Coach approval"],
	},
	{
		id: "8",
		disciplineId: "4",
		title: "MMA Sparring",
		level: ClassLevel.ADVANCED,
		durationMin: 90,
		description:
			"Live sparring and fight simulation for experienced practitioners.",
		capacity: 10,
		prices: {
			dropIn: 45,
		},
		prerequisites: ["6+ months MMA experience", "Coach approval"],
	},
];
