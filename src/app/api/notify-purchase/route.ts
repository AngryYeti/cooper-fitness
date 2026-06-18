import { NextResponse } from "next/server";
import { INQUIRY_EMAIL } from "@/lib/constants";
import {
  getPricingTier,
  getTierBilledAmountCents,
  getTierBilledAmountDollars,
} from "@/lib/pricing";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const { tierId, paymentIntentId, name, email, phone } = await request.json();

    const tier = getPricingTier(tierId);
    if (!tier || !paymentIntentId) {
      return NextResponse.json({ success: false }, { status: 400 });
    }

    const paymentIntent = await getStripe().paymentIntents.retrieve(paymentIntentId);
    const expectedAmount = getTierBilledAmountCents(tier);

    if (
      paymentIntent.status !== "succeeded" ||
      paymentIntent.amount !== expectedAmount ||
      paymentIntent.currency !== "usd" ||
      paymentIntent.metadata.tier !== tierId
    ) {
      return NextResponse.json({ success: false }, { status: 402 });
    }

    const tierName = tier.name;
    const tierPrice = tier.price;
    const billedAmount = getTierBilledAmountDollars(tier);

    const message = [
      `Plan: ${tierName} - $${tierPrice}/mo`,
      `Paid: $${billedAmount}`,
      `PaymentIntent: ${paymentIntent.id}`,
      `Name: ${name || "Not provided"}`,
      `Email: ${email || "Not provided"}`,
      `Phone: ${phone || "Not provided"}`,
      `Date: ${new Date().toISOString()}`,
    ].join("\n");

    const emailjsServiceId = process.env.EMAILJS_SERVICE_ID;
    const emailjsTemplateId = process.env.EMAILJS_TEMPLATE_ID;
    const emailjsPublicKey = process.env.EMAILJS_PUBLIC_KEY;
    const emailjsPrivateKey = process.env.EMAILJS_PRIVATE_KEY;

    console.log("[purchase] sending notification for:", tierName, paymentIntent.id);

    const emailjsRes = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: emailjsServiceId,
          template_id: emailjsTemplateId,
          user_id: emailjsPublicKey,
          accessToken: emailjsPrivateKey,
          template_params: {
            to_email: INQUIRY_EMAIL,
            from_name: name || "Stripe Checkout",
            from_email: email || "checkout@cooper.fitness",
            message,
          },
        }),
      }
    );

    if (!emailjsRes.ok) {
      const errorText = await emailjsRes.text();
      console.error("[purchase] EmailJS error:", emailjsRes.status, errorText);
    }

    try {
      const crmUrl = process.env.CRM_WEBHOOK_URL;
      if (crmUrl) {
        const webhookUrl = `${crmUrl}/api/webhooks/new-lead`;
        console.log("[purchase] forwarding to:", webhookUrl);
        const crmRes = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-webhook-secret": process.env.CRM_WEBHOOK_SECRET || "",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            goals: `PAID - ${tierName} at $${tierPrice}/mo - $${billedAmount} collected via Stripe`,
            plan: tierName,
            price: billedAmount,
            paymentIntentId: paymentIntent.id,
            tag: "Active Client",
            status: "paid",
            source: "stripe_checkout",
          }),
        });
        const crmJson = await crmRes.json().catch(() => null);
        console.log("[purchase] CRM response:", crmRes.status, crmJson);
      }
    } catch (crmErr) {
      console.error("[purchase] CRM webhook error:", crmErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[purchase] notification error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
