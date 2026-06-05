import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PRICING_TIERS } from "@/lib/constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function POST(request: Request) {
  try {
    const { tierId } = await request.json();

    const tier = PRICING_TIERS.find((t) => t.id === tierId);
    if (!tier) {
      return NextResponse.json({ error: "Invalid tier." }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: tier.price * 100,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        tier: tierId,
        tier_name: tier.name,
        site: "cooper.fitness",
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("[stripe] PaymentIntent error:", error);
    return NextResponse.json(
      { error: "Unable to create payment. Please try again." },
      { status: 500 }
    );
  }
}
