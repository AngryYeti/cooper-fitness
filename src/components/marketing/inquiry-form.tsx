"use client";

import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

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
      <div className="flex flex-col items-center gap-4 py-8" role="status">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{ background: "var(--primary)" }}
        >
          <span style={{ color: "var(--primary-foreground)", fontSize: "1.5rem" }}>✓</span>
        </div>
        <p style={{ color: "var(--muted-foreground)", fontSize: "0.95rem" }}>
          Thanks — Evan will be in touch within 24 hours.
        </p>
      </div>
    );
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.16)",
    background: "rgba(255,255,255,0.04)",
    color: "var(--foreground)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s, background 0.2s",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        placeholder="Your name"
        required
        aria-label="Your name"
        disabled={loading}
        style={inputStyle}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--primary)";
          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        }}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        aria-label="Email"
        disabled={loading}
        style={inputStyle}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--primary)";
          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        }}
      />
      <textarea
        name="goals"
        placeholder="Goals & schedule"
        required
        aria-label="Your goals and schedule"
        disabled={loading}
        rows={4}
        style={{ ...inputStyle, minHeight: 100, resize: "vertical" }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--primary)";
          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        }}
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
      <button
        type="submit"
        className="w-full font-mono uppercase transition-all hover:-translate-y-[2px] hover:brightness-[1.06]"
        disabled={loading || !recaptchaToken}
        style={{
          fontSize: "0.72rem",
          letterSpacing: "0.16em",
          fontWeight: 500,
          padding: "15px 28px",
          borderRadius: 999,
          background: "var(--primary)",
          color: "var(--primary-foreground)",
          boxShadow: "0 8px 30px oklch(0.70 0.14 245 / 0.4)",
          opacity: loading || !recaptchaToken ? 0.5 : 1,
          cursor: loading || !recaptchaToken ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "SENDING…" : "SEND INQUIRY"}
      </button>
    </form>
  );
}
