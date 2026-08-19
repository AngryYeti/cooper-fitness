"use client";

import { useState } from "react";
import type { FoundingInventoryState } from "@/lib/founding/types";
import { FoundingInventoryCTA } from "./founding-inventory-cta";

type CheckoutFormProps = {
  state: FoundingInventoryState;
  supportEmail: string;
  termsUrl: string;
  privacyUrl: string;
  refundPolicyUrl: string;
};

export function FoundingCheckoutForm({
  state,
  supportEmail,
  termsUrl,
  privacyUrl,
  refundPolicyUrl,
}: CheckoutFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state !== "OPEN" || submitting) return;
    setError(null);
    setSubmitting(true);
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/founding/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.get("name"), email: form.get("email") }),
      });
      const body = await response.json().catch(() => null) as { checkoutUrl?: unknown } | null;
      if (response.status === 409) {
        setError("This spot is temporarily held. Please join the waitlist while we confirm availability.");
        return;
      }
      if (!response.ok || typeof body?.checkoutUrl !== "string" || !body.checkoutUrl.startsWith("https://")) {
        throw new Error("checkout unavailable");
      }
      window.location.assign(body.checkoutUrl);
    } catch {
      setError("Checkout is temporarily unavailable. Please try again or contact Evan for support.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="founding-checkout-form" onSubmit={submit} aria-describedby="founding-checkout-note">
      <div className="founding-form-fields">
        <label htmlFor="founding-name">NAME</label>
        <input id="founding-name" name="name" type="text" autoComplete="name" required maxLength={100} />
        <label htmlFor="founding-email">EMAIL</label>
        <input id="founding-email" name="email" type="email" autoComplete="email" required maxLength={254} />
      </div>
      <FoundingInventoryCTA state={state} disabled={submitting} />
      <p id="founding-checkout-note" className="founding-legal-copy">
        One-time USD $299 checkout for six months of coaching. Be ready to begin within 14 days. By continuing, you agree to the <a href={termsUrl}>terms</a>, <a href={privacyUrl}>privacy notice</a>, and <a href={refundPolicyUrl}>refund/cancellation policy</a>. Questions? <a href={`mailto:${supportEmail}`}>{supportEmail}</a>.
      </p>
      {error ? <p role="alert" className="founding-form-error">{error}</p> : null}
    </form>
  );
}
