export const SITE_NAME = "Cooper Fitness";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cooperfitness.com";
export const INQUIRY_EMAIL = "evan@cooperfitness.net";

export const NAV_LINKS = [
  { href: "/programs", label: "Programs" },
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#inquire", label: "Inquire" },
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
  },
  {
    quote:
      "The accountability is the unlock. I finally trust the plan because someone smart is paying attention every week.",
    name: "Priya S.",
    role: "Product lead",
  },
  {
    quote:
      "Down 22lb, deadlift up 80lb, and zero burnout. The structure and check-ins make it impossible to drift.",
    name: "James R.",
    role: "Operations VP",
  },
] as const;

export const PRICING_TIERS = [
  {
    id: "monthly",
    name: "Monthly",
    price: 299,
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
