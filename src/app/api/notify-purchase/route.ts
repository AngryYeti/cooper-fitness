import { NextResponse } from "next/server";
import { sendPurchaseNotification } from "@/lib/purchase-notifications";
import { getPricingTier } from "@/lib/pricing";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const { tierId, paymentIntentId, name, email, phone } = await request.json();

    const tier = getPricingTier(tierId);
    if (!tier || !paymentIntentId) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const paymentIntent = await getStripe().paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.metadata.tier !== tierId) {
      return NextResponse.json({ success: false }, { status: 402 });
    }

    const result = await sendPurchaseNotification({
      ...paymentIntent,
      metadata: {
        ...paymentIntent.metadata,
        checkout_name: name || paymentIntent.metadata.checkout_name || "",
        checkout_email: email || paymentIntent.metadata.checkout_email || "",
        checkout_phone: phone || paymentIntent.metadata.checkout_phone || "",
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("[purchase] notification error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

