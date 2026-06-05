import { NextResponse } from "next/server";
import { INQUIRY_EMAIL } from "@/lib/constants";
import { PRICING_TIERS } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const { tierId, name, email, phone } = await request.json();

    const tier = PRICING_TIERS.find((t) => t.id === tierId);
    const tierName = tier?.name || "Unknown plan";
    const tierPrice = tier?.price || 0;

    const message = [
      `Plan: ${tierName} — $${tierPrice}/mo`,
      `Name: ${name || "Not provided"}`,
      `Email: ${email || "Not provided"}`,
      `Phone: ${phone || "Not provided"}`,
      `Date: ${new Date().toISOString()}`,
    ].join("\n");

    const emailjsServiceId = process.env.EMAILJS_SERVICE_ID;
    const emailjsTemplateId = process.env.EMAILJS_TEMPLATE_ID;
    const emailjsPublicKey = process.env.EMAILJS_PUBLIC_KEY;
    const emailjsPrivateKey = process.env.EMAILJS_PRIVATE_KEY;

    console.log("[purchase] sending notification for:", tierName, name, email);

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

    // Forward to CRM as Active Client
    try {
      const crmUrl = process.env.CRM_WEBHOOK_URL;
      console.log("[purchase] CRM_WEBHOOK_URL:", crmUrl);
      if (crmUrl) {
        const webhookUrl = `${crmUrl}/api/webhooks/new-lead`;
        console.log("[purchase] forwarding to:", webhookUrl);
        const crmRes = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            phone,
            goals: `PAID — ${tierName} at $${tierPrice}/mo — via Stripe`,
            plan: tierName,
            price: tierPrice,
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
