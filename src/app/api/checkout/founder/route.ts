import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { FOUNDING_OFFER } from "@/lib/constants";

export const dynamic = "force-dynamic";

async function createFounderSession() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    "https://cooper.fitness";

  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: FOUNDING_OFFER.priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${siteUrl}/founder/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/founder`,
    billing_address_collection: "auto",
    customer_creation: "always",
    metadata: {
      product: "Founding Member (6 Months)",
      offer: "founding_offer",
      price: "299",
    },
    allow_promotion_codes: true,
  });

  return session;
}

export async function POST() {
  try {
    const session = await createFounderSession();

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to generate checkout session URL." },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[founder-checkout] Error creating checkout session:", error);
    const message =
      error instanceof Error ? error.message : "Unable to initiate checkout.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await createFounderSession();

    if (!session.url) {
      return NextResponse.redirect(new URL("/founder?error=checkout_failed", "https://cooper.fitness"));
    }

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error("[founder-checkout] Error creating checkout session:", error);
    return NextResponse.redirect(new URL("/founder?error=checkout_failed", "https://cooper.fitness"));
  }
}
