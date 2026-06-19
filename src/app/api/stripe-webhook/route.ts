import { NextResponse } from "next/server";
import { sendPurchaseNotification } from "@/lib/purchase-notifications";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Webhook is not configured." }, { status: 400 });
  }

  let event;

  try {
    const payload = await request.text();
    event = getStripe().webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error("[stripe-webhook] signature verification failed:", error);
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;

    if (paymentIntent.metadata.purchase_notified === "true") {
      return NextResponse.json({ received: true, duplicate: true });
    }

    const result = await sendPurchaseNotification(paymentIntent);
    if (!result.emailSent) {
      return NextResponse.json({ error: "Purchase notification failed." }, { status: 500 });
    }

    await getStripe().paymentIntents.update(paymentIntent.id, {
      metadata: {
        ...paymentIntent.metadata,
        purchase_notified: "true",
      },
    });
  }

  return NextResponse.json({ received: true });
}
