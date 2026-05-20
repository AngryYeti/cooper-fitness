import { NextResponse } from "next/server";
import { INQUIRY_EMAIL } from "@/lib/constants";

type InquiryBody = {
  name?: string;
  email?: string;
  goals?: string;
};

export async function POST(request: Request) {
  let body: InquiryBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const goals = body.goals?.trim();

  if (!name || !email || !goals) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  try {
    const emailjsRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        template_params: {
          to_email: INQUIRY_EMAIL,
          from_name: name,
          from_email: email,
          message: goals,
        },
      }),
    });

    if (!emailjsRes.ok) {
      const errorText = await emailjsRes.text();
      console.error("EmailJS error:", errorText);
      return NextResponse.json(
        { error: "Unable to send your message. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("EmailJS fetch error:", error);
    return NextResponse.json(
      { error: "Unable to send your message. Please try again." },
      { status: 500 },
    );
  }
}
