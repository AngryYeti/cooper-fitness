import { NextResponse } from "next/server";
import { INQUIRY_EMAIL } from "@/lib/constants";

type InquiryBody = {
  name?: string;
  email?: string;
  goals?: string;
};

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const RATE_LIMIT_MAX_REQUESTS = 5;

function getRateLimitKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "unknown";
  return ip;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: Request) {
  const rateLimitKey = getRateLimitKey(request);

  if (!checkRateLimit(rateLimitKey)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

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
      return NextResponse.json(
        { error: "Unable to send your message. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  }

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
    return NextResponse.json(
      { error: "Unable to send your message. Please email us directly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
