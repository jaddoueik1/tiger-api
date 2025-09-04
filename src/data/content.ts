import { ContentBlock } from "../types";

export const contentBlocks: ContentBlock[] = [
	{
		id: "1",
		key: "home.hero",
		locale: "en",
		json: {
			title: "Train Hard. Evolve Faster.",
			subtitle:
				"World-class MMA, BJJ, Muay Thai, and Boxing training in a state-of-the-art facility.",
			ctas: [{ label: "View Schedule", href: "/schedule", variant: "primary" }],
			media: {
				type: "image",
				src: "/static/main.jpg",
				alt: "MMA training session",
			},
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "2",
		key: "home.features",
		locale: "en",
		json: {
			title: "Why Train With Us",
			items: [
				{
					icon: "target",
					title: "Expert Instruction",
					description:
						"Learn from world-class fighters and certified instructors with championship experience.",
				},
				{
					icon: "users",
					title: "Supportive Community",
					description:
						"Join a welcoming environment where everyone supports each other's growth.",
				},
				{
					icon: "trophy",
					title: "Proven Results",
					description:
						"Our students consistently achieve their fitness and competition goals.",
				},
				{
					icon: "clock",
					title: "Flexible Schedule",
					description: "Classes throughout the day to fit your busy lifestyle.",
				},
			],
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "3",
		key: "home.testimonials",
		locale: "en",
		json: {
			title: "What Our Students Say",
			items: [
				{
					name: "Sarah Chen",
					role: "BJJ Blue Belt",
					content:
						"The instruction here is incredible. I've learned more in 6 months than I did in 2 years at my previous gym.",
					avatar:
						"https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
				},
				{
					name: "Marcus Rodriguez",
					role: "MMA Fighter",
					content:
						"This gym helped me prepare for my professional debut. The coaching staff is world-class.",
					avatar:
						"https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg",
				},
				{
					name: "Emily Johnson",
					role: "Fitness Enthusiast",
					content:
						"Best workout I've ever had. The energy here is amazing and everyone is so supportive.",
					avatar:
						"https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
				},
			],
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "4",
		key: "navigation.main",
		locale: "en",
		json: {
			brand: "Tiger Muay-Thai",
			items: [
				{ label: "Classes", href: "/classes" },
				{ label: "Schedule", href: "/schedule" },
				{ label: "Coaches", href: "/coaches" },
				{ label: "Pricing", href: "/pricing" },
				{ label: "Shop", href: "/shop" },
				{ label: "About", href: "/about" },
			],
			cta: { label: "Book Trial", href: "/pricing" },
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "5",
		key: "footer.main",
		locale: "en",
		json: {
			sections: [
				{
					title: "Training",
					links: [
						{ label: "Class Schedule", href: "/schedule" },
						{ label: "Private Training", href: "/private" },
						{ label: "Memberships", href: "/pricing" },
						{ label: "Trial Class", href: "/trial" },
					],
				},
				{
					title: "Disciplines",
					links: [
						{ label: "Brazilian Jiu-Jitsu", href: "/classes/bjj" },
						{ label: "Muay Thai", href: "/classes/muay-thai" },
						{ label: "Boxing", href: "/classes/boxing" },
						{ label: "MMA", href: "/classes/mma" },
					],
				},
				{
					title: "Support",
					links: [
						{ label: "Contact Us", href: "/contact" },
						{ label: "FAQ", href: "/faq" },
						{ label: "Policies", href: "/policies" },
						{ label: "Account", href: "/account" },
					],
				},
			],
			contact: {
				address: "Jnah, Beirut, Lebanon",
				phone: "+961 (71) 234-567",
				email: "info@tigermuaythailb.com",
			},
			socials: [
				{ platform: "instagram", url: "https://instagram.com/tigermuaythailb" },
				{ platform: "facebook", url: "https://facebook.com/tigermuaythailb" },
				{ platform: "youtube", url: "https://youtube.com/tigermuaythailb" },
			],
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "6",
		key: "home.services",
		locale: "en",
		json: {
			title: "Programs & Services",
			subtitle: "Choose a path that fits your goals.",
			items: [
				{
					id: "mma",
					title: "Mixed Martial Arts (MMA)",
					subtitle: "Fundamentals to Pro",
					description:
						"Striking, wrestling, and grappling integrated into a complete game. Drill, spar, and develop well-rounded skills.",
					icon: "swords",
					features: [
						"All levels",
						"Integrated striking + grappling",
						"Sparring optional",
					],
					href: "/classes/mma",
					ctaLabel: "View Schedule",
					badge: "Popular",
				},
				{
					id: "bjj",
					title: "Brazilian Jiu-Jitsu (Gi / No-Gi)",
					subtitle: "Leverage & technique",
					description:
						"Gi and No-Gi classes focusing on positional control, submissions, and competition strategy.",
					icon: "shieldCheck",
					features: [
						"Gi & No-Gi days",
						"All belts welcome",
						"Competition prep",
					],
					href: "/classes/bjj",
					ctaLabel: "View Schedule",
				},
				{
					id: "muay-thai",
					title: "Muay Thai",
					subtitle: "Striking • Clinch • Kicks",
					description:
						"Traditional Thai boxing with emphasis on pad work, footwork, clinch, and ring IQ.",
					icon: "badgeCheck",
					features: ["Pad work", "Bag rounds", "Conditioning"],
					href: "/classes/muay-thai",
					ctaLabel: "View Schedule",
				},
				{
					id: "boxing",
					title: "Boxing",
					subtitle: "Footwork • Defense • Combinations",
					description:
						"Build crisp fundamentals and ring craft: stance, head movement, counters, and sparring for those who opt in.",
					icon: "sparkles",
					features: [
						"Beginners welcome",
						"Technical sparring (opt-in)",
						"Drills & mitts",
					],
					href: "/classes/boxing",
					ctaLabel: "View Schedule",
				},
				{
					id: "s&c",
					title: "Strength & Conditioning",
					subtitle: "Power • Mobility • Engine",
					description:
						"Fight-ready strength, mobility, and energy system work to support your skill training.",
					icon: "dumbbell",
					features: ["Periodized plans", "Mobility focus", "All levels"],
					href: "/classes/strength-conditioning",
					ctaLabel: "View Schedule",
				},
				{
					id: "privates",
					title: "Private Training",
					subtitle: "One-on-one with a coach",
					description:
						"Personalized sessions tailored to your goals and schedule. Pick a coach, select a slot, and book online.",
					icon: "calendarClock",
					features: ["Coach picker", "Flexible times", "Goal-based planning"],
					href: "/private-training",
					ctaLabel: "Book a Session",
					badge: "1:1",
				},
			],
			cta: { label: "See All Services", href: "/classes" },
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "7",
		key: "about.hero",
		locale: "en",
		json: {
			kicker: null,
			title: "Building Fighters. Building Community.",
			subtitle:
				"From first-day fundamentals to championship camps, we exist to help you evolve—on and off the mats.",
			media: { src: "/static/main.jpg", alt: "Gym floor" },
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "8",
		key: "about.mission",
		locale: "en",
		json: {
			title: "Mission & Philosophy",
			body: [
				"We believe combat sports teach more than techniques—they teach resilience, humility, and focus.",
				"Our coaching blends tradition and modern sports science to create a safe, supportive path for every athlete.",
			],
			media: { src: "/static/about.jpg", alt: "Coaching on pads" },
			cta: { label: "Meet the Coaches", href: "/coaches" },
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "9",
		key: "about.values",
		locale: "en",
		json: {
			title: "What We Stand For",
			items: [
				{
					icon: "shieldCheck",
					title: "Safety First",
					description:
						"Structured progressions, protective culture, and smart training.",
				},
				{
					icon: "target",
					title: "Technical Excellence",
					description: "Detail-oriented coaching and accountable standards.",
				},
				{
					icon: "users",
					title: "Community",
					description: "Ego-free mats where everyone contributes and grows.",
				},
				{
					icon: "heartPulse",
					title: "Health",
					description: "Longevity, mobility, and mental well-being come first.",
				},
				{
					icon: "award",
					title: "Results",
					description:
						"Clear goals, trackable progress, and competitive pathways.",
				},
				{
					icon: "sparkles",
					title: "Respect",
					description: "Tradition, partners, and facility treated with care.",
				},
			],
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "10",
		key: "about.stats",
		locale: "en",
		json: {
			items: [
				{ value: "10k+", label: "Classes Taught" },
				{ value: "1,200+", label: "Active Members" },
				{ value: "60+", label: "Weekly Sessions" },
				{ value: "50+", label: "Podium Finishes" },
			],
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "11",
		key: "about.team",
		locale: "en",
		json: {
			title: "Leadership & Coaches",
			items: [
				{
					name: "Ali Haddad",
					role: "Head Coach – MMA",
					specialties: ["MMA Strategy", "Wrestling Integration", "Cornering"],
					photo:
						"https://images.pexels.com/photos/4754149/pexels-photo-4754149.jpeg",
					socials: [{ platform: "instagram", url: "https://instagram.com/" }],
				},
				{
					name: "Rina Santos",
					role: "BJJ Lead – Gi/No-Gi",
					specialties: ["Guard Systems", "Competition Prep"],
					photo:
						"https://images.pexels.com/photos/799156/pexels-photo-799156.jpeg",
					socials: [{ platform: "facebook", url: "https://facebook.com/" }],
				},
				{
					name: "Maksim Petrov",
					role: "Muay Thai Head Coach",
					specialties: ["Clinch", "Pad Work"],
					photo:
						"https://images.pexels.com/photos/4178577/pexels-photo-4178577.jpeg",
					socials: [{ platform: "youtube", url: "https://youtube.com/" }],
				},
			],
			cta: { label: "View All Coaches", href: "/coaches" },
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "12",
		key: "about.timeline",
		locale: "en",
		json: {
			title: "Milestones",
			items: [
				{
					date: "2008",
					title: "Doors Opened",
					description: "Launched our first mat in Beirut with 3 daily classes.",
				},
				{
					date: "2020",
					title: "Competition Team",
					description:
						"Built a structured pathway from fundamentals to fight camps.",
				},
				{
					date: "2023",
					title: "Expanded Facility",
					description: "Added a full-size ring, extra mats, and S&C area.",
				},
			],
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "13",
		key: "about.cta",
		locale: "en",
		json: {
			title: "Ready to Start?",
			subtitle: "Pick a class, meet the team, and take your first step.",
			cta: { label: "Book a Trial Class", href: "/pricing" },
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "15",
		key: "checkout.page",
		locale: "en",
		json: {
			title: "Checkout",
			subtitle:
				"Confirm your details and we’ll finalize your order on WhatsApp.",
			fields: {
				name: "Full name",
				email: "Email",
				phone: "Phone",
				address: "Delivery address",
				note: "Note (optional)",
			},
			summary: {
				title: "Order summary",
				empty: "Your cart is empty.",
				total: "Total",
			},
			actions: {
				placeOrder: "Place order via WhatsApp",
			},
		},
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];