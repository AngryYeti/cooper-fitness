"use client";

import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA verification.");
      setLoading(false);
      return;
    }

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          goals: data.get("goals"),
          recaptchaToken,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        return;
      }

      setSubmitted(true);
      form.reset();
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } catch {
      setError("Something went wrong. Please try again.");
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <p className="text-sm text-muted-foreground" role="status">
        Thanks — Evan will be in touch within 24 hours.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input name="name" placeholder="Your name" required aria-label="Your name" disabled={loading} />
      <Input
        name="email"
        type="email"
        placeholder="Email"
        required
        aria-label="Email"
        disabled={loading}
      />
      <Textarea
        name="goals"
        placeholder="Your goals"
        required
        aria-label="Your goals"
        disabled={loading}
      />
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
      <div className="flex justify-center">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                onChange={(token) => setRecaptchaToken(token)}
                theme="dark"
              />
      </div>
      <Button type="submit" className="w-full" disabled={loading || !recaptchaToken}>
        {loading ? "SENDING…" : "SEND INQUIRY"}
      </Button>
    </form>
  );
}
