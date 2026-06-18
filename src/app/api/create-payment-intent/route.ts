import { NextResponse } from "next/server";
import { getPricingTier, getTierBilledAmountCents } from "@/lib/pricing";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const { tierId } = await request.json();

    const tier = getPricingTier(tierId);
    if (!tier) {
      return NextResponse.json({ error: "Invalid tier." }, { status: 400 });
    }

    const paymentIntent = await getStripe().paymentIntents.create({
      amount: getTierBilledAmountCents(tier),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        tier: tierId,
        tier_name: tier.name,
        billing_months: String(tier.billingMonths),
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
