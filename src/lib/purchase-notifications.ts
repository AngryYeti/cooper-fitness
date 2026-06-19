import type Stripe from "stripe";
import { INQUIRY_EMAIL } from "@/lib/constants";
import {
  getPricingTier,
  getTierBilledAmountCents,
  getTierBilledAmountDollars,
} from "@/lib/pricing";

export type PurchaseNotificationResult = {
  success: boolean;
  emailSent: boolean;
  crmForwarded: boolean;
};

export async function sendPurchaseNotification(
  paymentIntent: Stripe.PaymentIntent,
): Promise<PurchaseNotificationResult> {
  const tierId = paymentIntent.metadata.tier;
  const tier = getPricingTier(tierId);

  if (!tier) {
    throw new Error("PaymentIntent is missing a valid pricing tier.");
  }

  const expectedAmount = getTierBilledAmountCents(tier);
  if (
    paymentIntent.status !== "succeeded" ||
    paymentIntent.amount !== expectedAmount ||
    paymentIntent.currency !== "usd"
  ) {
    throw new Error("PaymentIntent does not match the expected purchase details.");
  }

  const name = paymentIntent.metadata.checkout_name || "Not provided";
  const email = paymentIntent.metadata.checkout_email || "Not provided";
  const phone = paymentIntent.metadata.checkout_phone || "Not provided";
  const billedAmount = getTierBilledAmountDollars(tier);

  const message = [
    `Plan: ${tier.name} - $${tier.price}/mo`,
    `Paid: $${billedAmount}`,
    `PaymentIntent: ${paymentIntent.id}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Date: ${new Date().toISOString()}`,
  ].join("\n");

  let emailSent = false;
  const emailjsRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: {
        to_email: INQUIRY_EMAIL,
        from_name: name,
        from_email: email === "Not provided" ? "checkout@cooper.fitness" : email,
        message,
      },
    }),
  });

  if (!emailjsRes.ok) {
    const errorText = await emailjsRes.text();
    console.error("[purchase] EmailJS error:", emailjsRes.status, errorText);
  } else {
    emailSent = true;
  }

  let crmForwarded = false;
  const crmUrl = process.env.CRM_WEBHOOK_URL;
  if (crmUrl) {
    try {
      const crmRes = await fetch(`${crmUrl}/api/webhooks/new-lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-webhook-secret": process.env.CRM_WEBHOOK_SECRET || "",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          goals: `PAID - ${tier.name} at $${tier.price}/mo - $${billedAmount} collected via Stripe`,
          plan: tier.name,
          price: billedAmount,
          paymentIntentId: paymentIntent.id,
          tag: "Active Client",
          status: "paid",
          source: "stripe_webhook",
        }),
      });

      crmForwarded = crmRes.ok;
      if (!crmRes.ok) {
        console.error("[purchase] CRM webhook error:", crmRes.status);
      }
    } catch (error) {
      console.error("[purchase] CRM webhook error:", error);
    }
  }

  return {
    success: emailSent,
    emailSent,
    crmForwarded,
  };
}

