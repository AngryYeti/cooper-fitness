"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FounderCheckoutButtonProps {
  className?: string;
  size?: "default" | "sm" | "lg";
  text?: string;
}

export function FounderCheckoutButton({
  className,
  size = "lg",
  text = "CLAIM YOUR FOUNDING SPOT — $399",
}: FounderCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/checkout/founder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout. Please try again.");
      }

      window.location.href = data.url;
    } catch (err) {
      console.error("[founder-checkout] Checkout error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      <Button
        size={size}
        onClick={handleCheckout}
        disabled={loading}
        className={className || "w-full text-base py-6 font-mono tracking-wider font-semibold"}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            REDIRECTING TO STRIPE...
          </>
        ) : (
          <>
            {text}
            <ArrowRight className="h-5 w-5 ml-2" />
          </>
        )}
      </Button>
      {error && (
        <p className="text-sm text-destructive text-center" role="alert">
          {error}
        </p>
      )}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono">
        <Lock className="h-3.5 w-3.5 text-primary" />
        <span>Secure 256-bit Stripe Checkout · One-time $399 USD payment</span>
      </div>
    </div>
  );
}
