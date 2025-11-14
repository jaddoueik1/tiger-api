import { ContentBlock } from "../types";

export const contentBlocks: ContentBlock[] = [
	{
		id: "1",
		key: "home.hero",
		locale: "en",
		json: {
			title: "Train Hard. Evolve Faster.",
			subtitle:
				"Elite MMA, BJJ, Muay Thai, and Boxing coaching inside a world-class facility built for champions.",
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
						"Train under seasoned fighters, certified coaches, and competition veterans who know exactly how to take you to the next level.",
				},
				{
					icon: "users",
					title: "Supportive Community",
					description:
						"Be part of a culture where beginners and advanced athletes grow together, without ego and without judgment.",
				},
				{
					icon: "trophy",
					title: "Proven Results",
					description:
						"Our students consistently transform their fitness, sharpen their skills, and achieve podium-level performance.",
				},
				{
					icon: "clock",
					title: "Flexible Schedule",
					description:
						"Morning, afternoon, and evening classes designed to fit perfectly into any lifestyle.",
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
			items: [],
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
						{ label: "Private Training", href: "/coaches" },
						{ label: "Memberships", href: "/pricing" },
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
				phone: "+961 (78) 967-230",
				email: "info@tigermuaythai.me",
			},
			socials: [
				{ platform: "instagram", url: "https://instagram.com/tigermuaythaigym" },
				{ platform: "facebook", url: "https://facebook.com/tigermuaythaigym" },
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
						"Develop a complete MMA skillset with integrated striking, wrestling, and grappling. Improve through structured drills, partner work, and optional sparring as your confidence grows.",
					icon: "swords",
					features: [
						"All levels",
						"Integrated striking + grappling",
						"Sparring optional",
					],
					href: "/discipline/mma",
					ctaLabel: "View Schedule",
					badge: "Popular",
				},
				{
					id: "bjj",
					title: "Brazilian Jiu-Jitsu (Gi / No-Gi)",
					subtitle: "Leverage & technique",
					description:
						"Gi and No-Gi training focused on leverage, control, and submission mastery. Build clean fundamentals or refine advanced tactics for competition.",
					icon: "shieldCheck",
					features: ["Gi & No-Gi days", "All belts welcome", "Competition prep"],
					href: "/discipline/bjj",
					ctaLabel: "View Schedule",
				},
				{
					id: "muay-thai",
					title: "Muay Thai",
					subtitle: "Striking • Clinch • Kicks",
					description:
						"Authentic Thai boxing emphasizing pad work, footwork, clinch control, and ring strategy. Ideal for beginners and fighters preparing for competition.",
					icon: "badgeCheck",
					features: ["Pad work", "Bag rounds", "Conditioning"],
					href: "/discipline/muay-thai",
					ctaLabel: "View Schedule",
				},
				{
					id: "boxing",
					title: "Boxing",
					subtitle: "Footwork • Defense • Combinations",
					description:
						"Sharpen your striking with a focus on footwork, defensive movement, powerful combinations, and optional technical sparring for those progressing.",
					icon: "sparkles",
					features: [
						"Beginners welcome",
						"Technical sparring (opt-in)",
						"Drills & mitts",
					],
					href: "/discipline/boxing",
					ctaLabel: "View Schedule",
				},
				{
					id: "s&c",
					title: "Strength & Conditioning",
					subtitle: "Power • Mobility • Engine",
					description:
						"Athlete-level strength training combining mobility, power development, and conditioning to boost your overall fight performance.",
					icon: "dumbbell",
					features: ["Periodized plans", "Mobility focus", "All levels"],
					href: "/discipline/strength-conditioning",
					ctaLabel: "View Schedule",
				},
				{
					id: "privates",
					title: "Private Training",
					subtitle: "One-on-one with a coach",
					description:
						"Personalized one-on-one sessions built around your goals—whether fitness, technique, or competition prep. Choose your coach and train on your schedule.",
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
				"From your first day on the mats to advanced fight camps, our mission is to help you grow—physically, mentally, and as part of a team.",
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
				"Combat sports build far more than physical ability—they develop resilience, humility, discipline, and confidence that carry into every part of life.",
				"Our approach blends traditional martial arts values with modern sports science to create a structured, safe environment where every athlete can progress.",
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
						"Smart progressions, protective habits, and controlled training environments to keep athletes learning without unnecessary risks.",
				},
				{
					icon: "target",
					title: "Technical Excellence",
					description:
						"Coaching focused on precision, fundamentals, and accountability to ensure long-term growth.",
				},
				{
					icon: "users",
					title: "Community",
					description:
						"A supportive and ego-free culture where teammates push each other to improve.",
				},
				{
					icon: "heartPulse",
					title: "Health",
					description:
						"Training built for longevity—prioritizing mobility, proper mechanics, and mental well-being.",
				},
				{
					icon: "award",
					title: "Results",
					description:
						"Clear goals, measurable progress, and dedicated guidance for recreational and competitive athletes alike.",
				},
				{
					icon: "sparkles",
					title: "Respect",
					description:
						"We uphold martial arts values—respecting training partners, coaches, and the space we share.",
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
				{ value: "200+", label: "Active Members" },
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
					name: "Hassan Berjawi",
					role: "Head Coach",
					specialties: [
						"MMA Strategy",
						"Wrestling Integration",
						"Cornering",
					],
					photo:
						"https://images.pexels.com/photos/4754149/pexels-photo-4754149.jpeg",
					socials: [{ platform: "instagram", url: "https://instagram.com/" }],
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
					description:
						"Started with a single mat and a vision to bring structured combat sports training to Beirut.",
				},
				{
					date: "2020",
					title: "Competition Team",
					description:
						"Introduced a complete pathway from foundational classes to advanced competition preparation.",
				},
				{
					date: "2023",
					title: "Expanded Facility",
					description:
						"Upgraded the gym with a full-size ring, expanded mat space, and a fully equipped strength area.",
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
			subtitle:
				"Pick a class, meet the team, and take your first step.",
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
				"Review your information and we’ll finalize your order instantly through WhatsApp.",
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
