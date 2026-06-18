export const SITE_NAME = "Cooper Fitness";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cooper.fitness";
export const INQUIRY_EMAIL = "evan@cooper.fitness";

export const NAV_LINKS = [
  { href: "/programs", label: "Programs" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#inquire", label: "Inquire" },
] as const;

export const SERVICES = [
  {
    id: "online-weight-loss-coaching",
    title: "Online Weight Loss Coaching",
    shortTitle: "Weight Loss",
    description:
      "Sustainable fat loss through metabolic conditioning, nutrition protocols, and weekly accountability.",
    href: "/services/online-weight-loss-coaching",
  },
  {
    id: "online-personal-training",
    title: "Online Personal Training",
    shortTitle: "Personal Training",
    description:
      "Personalized lifting programs with direct coach access and video check-ins.",
    href: "/services/online-personal-training",
  },
  {
    id: "nutrition-coaching",
    title: "Nutrition Coaching",
    shortTitle: "Nutrition",
    description:
      "Science-backed nutrition protocols tailored to your goals and lifestyle.",
    href: "/services/nutrition-coaching",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "How does online coaching work?",
    answer:
      "You'll receive a fully personalized program delivered through our coaching platform. We communicate weekly via video check-ins, and you have direct message access to your coach for questions between sessions.",
  },
  {
    question: "Do I need a gym membership?",
    answer:
      "Not necessarily. We design programs around your available equipment — whether that's a full gym, home setup, or bodyweight only.",
  },
  {
    question: "How soon will I see results?",
    answer:
      "Most clients see noticeable changes within 4–6 weeks. Significant transformations typically occur within 3–6 months of consistent training and nutrition.",
  },
  {
    question: "What if I travel frequently?",
    answer:
      "We specialize in coaching busy professionals. Your program includes travel-friendly alternatives and flexible scheduling to keep you on track anywhere.",
  },
  {
    question: "Is there a minimum commitment?",
    answer:
      "We offer monthly, quarterly, and 6-month options. While we recommend at least 3 months for meaningful results, there's no long-term contract required.",
  },
  {
    question: "How is this different from a personal trainer at my gym?",
    answer:
      "Online coaching gives you a complete system — programming, nutrition, accountability, and direct coach access — often at a fraction of the cost of in-person training. You also get the flexibility to train on your schedule.",
  },
  {
    question: "What qualifications does Coach Evan have?",
    answer:
      "Evan Cooper is a certified personal trainer with years of experience coaching busy professionals. He specializes in strength training, weight loss, and building sustainable habits.",
  },
  {
    question: "Can I switch programs or pricing tiers?",
    answer:
      "Absolutely. You can upgrade or adjust your plan at any time. We'll transition your programming seamlessly.",
  },
] as const;

export const PROGRAMS = [
  {
    id: "strength",
    index: "01",
    title: "Strength Training",
    description:
      "Personalized lifting cycles built for sustainable, measurable strength.",
    icon: "dumbbell",
  },
  {
    id: "weight-loss",
    index: "02",
    title: "Weight Loss",
    description:
      "Metabolic conditioning + nutrition to shift body composition for good.",
    icon: "flame",
  },
  {
    id: "accountability",
    index: "03",
    title: "Accountability",
    description:
      "Daily check-ins and habit design for beginners who need real structure.",
    icon: "message-circle",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Evan rebuilt my training around a chaotic travel schedule. I'm stronger than I was at 25 and I haven't missed a kid's bedtime in months.",
    name: "Marcus T.",
    role: "Founder, two kids",
    rating: 5,
  },
  {
    quote:
      "The accountability is the unlock. I finally trust the plan because someone smart is paying attention every week.",
    name: "Priya S.",
    role: "Product lead",
    rating: 5,
  },
  {
    quote:
      "Down 22lb, deadlift up 80lb, and zero burnout. The structure and check-ins make it impossible to drift.",
    name: "James R.",
    role: "Operations VP",
    rating: 5,
  },
] as const;

export const PRICING_TIERS = [
  {
    id: "monthly",
    name: "Monthly",
    price: 299,
    billingMonths: 1,
    period: "mo",
    description: "Rolling. Cancel anytime.",
    badge: undefined as string | undefined,
    features: [
      "Personalized programming",
      "Direct coach access",
      "Monthly video check-in",
    ],
    highlighted: false,
  },
  {
    id: "quarterly",
    name: "3-Month Block",
    price: 269,
    billingMonths: 3,
    period: "mo",
    description: "10% off · billed $807 quarterly",
    badge: "Most popular",
    features: [
      "Everything in Monthly",
      "Weekly video check-ins",
      "Nutrition protocol",
    ],
    highlighted: true,
  },
  {
    id: "biannual",
    name: "6-Month Commit",
    price: 254,
    billingMonths: 6,
    period: "mo",
    description: "15% off · billed $1,524 — best value",
    badge: undefined as string | undefined,
    features: [
      "Everything in 3-Month",
      "Bloodwork analysis",
      "Quarterly strategy call",
    ],
    highlighted: false,
  },
] as const;
