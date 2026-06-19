import { NextResponse } from "next/server";
import { getPricingTier } from "@/lib/pricing";
import { getStripe } from "@/lib/stripe";

type UpdatePaymentIntentBody = {
  tierId?: string;
  paymentIntentId?: string;
  name?: string;
  email?: string;
  phone?: string;
};

export async function POST(request: Request) {
  let body: UpdatePaymentIntentBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const tier = getPricingTier(body.tierId || "");
  const paymentIntentId = body.paymentIntentId?.trim();
  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim() || "";

  if (!tier || !paymentIntentId || !name || !email) {
    return NextResponse.json({ error: "Missing checkout details." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const stripe = getStripe();
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  if (paymentIntent.metadata.tier !== tier.id || paymentIntent.status !== "requires_payment_method") {
    return NextResponse.json({ error: "Invalid payment state." }, { status: 400 });
  }

  await stripe.paymentIntents.update(paymentIntentId, {
    receipt_email: email,
    metadata: {
      ...paymentIntent.metadata,
      checkout_name: name,
      checkout_email: email,
      checkout_phone: phone,
    },
  });

  return NextResponse.json({ success: true });
}

