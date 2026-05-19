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

  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL ?? "Cooper Fitness <onboarding@resend.dev>",
          to: [INQUIRY_EMAIL],
          reply_to: email,
          subject: `New inquiry from ${name}`,
          text: [
            `Name: ${name}`,
            `Email: ${email}`,
            "",
            "Goals:",
            goals,
          ].join("\n"),
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Resend API error:", errorText);
        return NextResponse.json(
          { error: "Unable to send your message. Please try again." },
          { status: 500 },
        );
      }

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Resend fetch error:", error);
      return NextResponse.json(
        { error: "Unable to send your message. Please try again." },
        { status: 500 },
      );
    }
  }

  try {
    const formsubmitRes = await fetch(`https://formsubmit.co/ajax/${INQUIRY_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message: goals,
        _subject: `Cooper Fitness inquiry from ${name}`,
        _template: "table",
      }),
    });

    if (!formsubmitRes.ok) {
      const errorText = await formsubmitRes.text();
      console.error("FormSubmit error:", errorText);
      return NextResponse.json(
        { error: "Unable to send your message. Please email us directly." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("FormSubmit fetch error:", error);
    return NextResponse.json(
      { error: "Unable to send your message. Please email us directly." },
      { status: 500 },
    );
  }
}
