"use client";

import { useState } from "react";
import { Lock, RotateCcw, CreditCard } from "lucide-react";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { GlassCard } from "@/components/effects/glass-sheen";
import { Section } from "@/components/shared/section";
import { CheckoutModal } from "@/components/stripe/checkout-modal";
import { PRICING_TIERS } from "@/lib/constants";
import { getTierBilledAmountDollars } from "@/lib/pricing";

export function PricingSection() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const tier = selectedTier
    ? PRICING_TIERS.find((t) => t.id === selectedTier)
    : null;

  return (
    <Section id="pricing" label="04 — INVESTMENT">
      <div className="text-center mb-10">
        <h2
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 500,
            fontSize: "clamp(2rem, 3.6vw, 3.1rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: "var(--foreground)",
          }}
        >
          Choose your{" "}
          <span className="font-serif-italic" style={{ color: "var(--primary)" }}>commitment.</span>
        </h2>
        <p className="mt-4 mx-auto max-w-md" style={{ color: "var(--muted-foreground)", fontSize: "1.05rem", lineHeight: 1.7 }}>
          The longer you commit, the deeper the work — and the better the price.
        </p>
        <div
          className="inline-flex items-center gap-2 font-mono mt-6"
          style={{
            fontSize: "0.62rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "8px 18px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.06)",
            color: "var(--primary)",
          }}
        >
          ONLY 5 SPOTS AVAILABLE THIS QUARTER
        </div>
      </div>

      <div className="grid gap-[22px] lg:grid-cols-3" style={{ alignItems: "start" }}>
        {PRICING_TIERS.map((t, i) => (
          <ScrollReveal key={t.id} delay={i * 100}>
            <GlassCard
              className={`h-full ${
                t.highlighted
                  ? "!border-[oklch(0.70_0.14_245_/_0.5)]"
                  : ""
              }`}
              strong={t.highlighted}
            >
              <div
                className="flex h-full flex-col p-8 text-left"
                style={
                  t.highlighted
                    ? {
                        background: "linear-gradient(150deg, oklch(0.70 0.14 245 / 0.16), rgba(255,255,255,0.04))",
                        borderRadius: 20,
                      }
                    : undefined
                }
              >
                {t.badge && (
                  <div
                    className="font-mono mb-4"
                    style={{
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignSelf: "flex-start",
                      padding: "5px 12px",
                      borderRadius: 999,
                      background: "var(--primary)",
                      color: "var(--primary-foreground)",
                    }}
                  >
                    {t.badge}
                  </div>
                )}
                <p className="font-mono" style={{ fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted-foreground)" }}>
                  {t.name}
                </p>
                <p className="mt-4" style={{ fontSize: "3rem", fontWeight: 600, color: "var(--foreground)" }}>
                  ${t.price}
                  <span style={{ fontSize: "1rem", fontWeight: 400, opacity: 0.6 }}>/{t.period}</span>
                </p>
                <p className="mt-2" style={{ fontSize: "0.85rem", color: "var(--muted-foreground)" }}>
                  {t.description}
                </p>
                <div style={{ height: 1, background: "rgba(255,255,255,0.10)", margin: "20px 0" }} />
                <ul className="flex-1 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3" style={{ fontSize: "0.9rem", color: "var(--foreground)" }}>
                      <span style={{ color: "var(--primary)", marginTop: 2 }}>✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setSelectedTier(t.id)}
                  className="mt-8 w-full font-mono uppercase transition-all hover:-translate-y-[2px]"
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.16em",
                    fontWeight: 500,
                    padding: "15px 28px",
                    borderRadius: 999,
                    ...(t.highlighted
                      ? {
                          background: "var(--primary)",
                          color: "var(--primary-foreground)",
                          boxShadow: "0 8px 30px oklch(0.70 0.14 245 / 0.4)",
                        }
                      : {
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.22)",
                          color: "var(--foreground)",
                          backdropFilter: "blur(10px)",
                        }),
                  }}
                >
                  GET STARTED
                </button>
              </div>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-8 font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.12em", color: "var(--muted-foreground)", textTransform: "uppercase" }}>
        <span className="flex items-center gap-1.5"><Lock className="h-3 w-3" style={{ color: "var(--primary)" }} /> SECURE STRIPE CHECKOUT</span>
        <span className="flex items-center gap-1.5"><CreditCard className="h-3 w-3" style={{ color: "var(--primary)" }} /> ALL MAJOR CARDS ACCEPTED</span>
        <span className="flex items-center gap-1.5"><RotateCcw className="h-3 w-3" style={{ color: "var(--primary)" }} /> CANCEL ANYTIME</span>
      </div>

      {tier && (
        <CheckoutModal
          open={!!selectedTier}
          onClose={() => setSelectedTier(null)}
          tierId={tier.id}
          tierName={tier.name}
          tierPrice={tier.price}
          tierBillingAmount={getTierBilledAmountDollars(tier)}
        />
      )}
    </Section>
  );
}
