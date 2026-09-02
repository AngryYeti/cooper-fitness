"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, RotateCcw, CreditCard, CheckCircle2, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { GlassCard } from "@/components/effects/glass-sheen";
import { Section } from "@/components/shared/section";
import { CheckoutModal } from "@/components/stripe/checkout-modal";
import { PRICING_TIERS, FOUNDING_OFFER } from "@/lib/constants";
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
      </div>

      {/* Featured Founding Cohort Spotlight Card */}
      <ScrollReveal>
        <div className="mb-12 max-w-4xl mx-auto">
          <GlassCard
            className="!border-[oklch(0.70_0.14_245_/_0.55)] p-6 sm:p-8"
            strong
          >
            <div
              className="p-1 sm:p-2 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 text-left">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span
                    className="font-mono text-[0.62rem] uppercase px-3 py-1 rounded-full font-semibold"
                    style={{
                      background: "var(--primary)",
                      color: "var(--primary-foreground)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    FOUNDING COHORT
                  </span>
                  <span
                    className="font-mono text-[0.65rem] uppercase tracking-wider text-primary font-semibold"
                  >
                    ✦ STRICTLY 5 SPOTS ONLY
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                    6 Months of 1-on-1 Online Coaching
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-xl leading-relaxed">
                    Full custom programming, nutrition protocol, weekly video check-ins, and direct message access to Coach Evan.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-2 pt-1">
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>20–30 min Zoom kickoff</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>3–4 sessions/wk (~45 mins)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>Weekly progress review</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                    <span>Direct coach messaging</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-4 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
                <div className="text-left md:text-right">
                  <div className="flex items-baseline gap-2 md:justify-end">
                    <span className="text-3xl sm:text-4xl font-extrabold text-foreground font-mono">
                      ${FOUNDING_OFFER.price}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono uppercase">
                      USD / One-time
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    <span className="line-through opacity-70">${FOUNDING_OFFER.regularPrice}</span> · Save 80% today
                  </p>
                </div>

                <Link
                  href="/founder"
                  className="font-mono uppercase transition-all hover:-translate-y-[2px] inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                  style={{
                    fontSize: "0.72rem",
                    letterSpacing: "0.16em",
                    fontWeight: 500,
                    padding: "14px 28px",
                    borderRadius: 999,
                    background: "var(--primary)",
                    color: "var(--primary-foreground)",
                    boxShadow: "0 8px 25px oklch(0.70 0.14 245 / 0.35)",
                  }}
                >
                  CLAIM SPOT — $299
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </GlassCard>
        </div>
      </ScrollReveal>

      {/* Standard Tiers Divider */}
      <div className="flex items-center justify-center gap-4 mb-8 max-w-md mx-auto">
        <div className="h-[1px] flex-1 bg-white/10" />
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
          OR STANDARD ROLLING PLANS
        </span>
        <div className="h-[1px] flex-1 bg-white/10" />
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
