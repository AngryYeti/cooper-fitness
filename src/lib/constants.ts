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
      "Tried diets that didn't stick? We build a simple, sustainable plan around your actual life — no restriction, no guesswork, just steady progress.",
    href: "/services/online-weight-loss-coaching",
  },
  {
    id: "online-personal-training",
    title: "Online Personal Training",
    shortTitle: "Personal Training",
    description:
      "Never lifted before? No problem. You'll get a program designed for your level, your schedule, and your equipment — with a coach checking in every week.",
    href: "/services/online-personal-training",
  },
  {
    id: "nutrition-coaching",
    title: "Nutrition Coaching",
    shortTitle: "Nutrition",
    description:
      "Don't know where to start with food? We'll cut through the noise and give you a clear, flexible eating plan that works around family meals and a busy week.",
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
    role: "Product lead, mom of one",
    rating: 5,
  },
  {
    quote:
      "Down 22lb, deadlift up 80lb, and zero burnout. The structure and check-ins make it impossible to drift.",
    name: "James R.",
    role: "Operations VP, dad of three",
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

export const FOUNDING_OFFER = {
  id: "founding-offer",
  name: "Founding Member",
  tagline: "6 Months of 1-on-1 Online Coaching",
  price: 299,
  regularPrice: 1524,
  priceId: "price_1U5WCxK67H8U3fOqXS60McFP",
  productId: "prod_V5hcsMgIEK4Srk",
  totalSpots: 5,
  description:
    "One-time $299 payment for 6 full months of dedicated coaching. Strictly limited to 5 founding members.",
  features: [
    "Full 6 months of 1-on-1 personalized coaching",
    "20–30 min Zoom onboarding & strategy call",
    "Custom training plan (3–4 sessions/week, ~45 mins)",
    "Flexible nutrition protocol tailored to your lifestyle",
    "Weekly progress reviews & program adjustments",
    "Direct messaging access to Coach Evan",
  ],
} as const;
