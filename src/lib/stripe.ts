import Stripe from "stripe";

let stripe: Stripe | null = null;

function getStripeApiKey() {
  const apiKey = process.env.STRIPE_SECRET_KEY;

  if (!apiKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
  }

  if (
    process.env.NODE_ENV === "production" &&
    !apiKey.startsWith("sk_live_") &&
    !apiKey.startsWith("rk_live_")
  ) {
    throw new Error("Production Stripe payments require a live-mode Stripe key.");
  }

  return apiKey;
}

export function getStripe() {
  if (!stripe) {
    stripe = new Stripe(getStripeApiKey(), {
      apiVersion: "2026-05-27.dahlia",
    });
  }

  return stripe;
}
