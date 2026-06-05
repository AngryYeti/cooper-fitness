import { NextResponse } from "next/server";
import { INQUIRY_EMAIL } from "@/lib/constants";
import { PRICING_TIERS } from "@/lib/constants";

export async function POST(request: Request) {
  try {
    const { tierId } = await request.json();

    const tier = PRICING_TIERS.find((t) => t.id === tierId);
    const tierName = tier?.name || "Unknown plan";
    const tierPrice = tier?.price || 0;

    const emailjsServiceId = process.env.EMAILJS_SERVICE_ID;
    const emailjsTemplateId = process.env.EMAILJS_TEMPLATE_ID;
    const emailjsPublicKey = process.env.EMAILJS_PUBLIC_KEY;
    const emailjsPrivateKey = process.env.EMAILJS_PRIVATE_KEY;

    console.log("[purchase] sending notification for:", tierName);

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
            from_name: "Cooper Fitness Checkout",
            from_email: "checkout@cooper.fitness",
            message: `New purchase: ${tierName} — $${tierPrice}/mo at ${new Date().toISOString()}`,
          },
        }),
      }
    );

    if (!emailjsRes.ok) {
      const errorText = await emailjsRes.text();
      console.error("[purchase] EmailJS error:", emailjsRes.status, errorText);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[purchase] notification error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
