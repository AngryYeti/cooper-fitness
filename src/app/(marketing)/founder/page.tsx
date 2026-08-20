import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/schema";
import { GlassCard } from "@/components/effects/glass-sheen";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Section } from "@/components/shared/section";
import { FAQSection } from "@/components/marketing/faq-section";
import { FounderCheckoutButton } from "@/components/marketing/founder-checkout-button";
import { FOUNDING_OFFER } from "@/lib/constants";
import { CheckCircle2, ShieldCheck, Zap, Calendar, MessageSquare, Dumbbell } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Founding Member Offer — 6 Months Coaching",
  description:
    "Claim 1 of 5 Founding Member spots: 6 months of 1-on-1 online fitness and nutrition coaching for a one-time $299 USD (regularly $1,524).",
  path: "/founder",
});

const FOUNDER_FAQS = [
  {
    question: "Why are there only 5 spots?",
    answer:
      "Because this is genuine 1-on-1 coaching, not an automated program. I personally review your training logs, answer every message, and adjust your plan every single week. Capping the cohort at 5 ensures you get my full focus.",
  },
  {
    question: "What happens immediately after I pay?",
    answer:
      "You'll immediately receive an automated welcome email with a link to book our 20–30 minute Zoom intro call. We'll discuss your training history, your weekly schedule, and any equipment you have access to before I write a single workout.",
  },
  {
    question: "Do I need a gym membership or specific equipment?",
    answer:
      "No. Your program is built around the equipment you actually have — whether that's a commercial gym, a couple of dumbbells at home, or bodyweight exercises.",
  },
  {
    question: "Is this a recurring subscription or a one-time charge?",
    answer:
      "It is a single, one-time payment of $299 USD for 6 full months of coaching. There are no recurring monthly charges and no hidden fees.",
  },
  {
    question: "What if I have old injuries or haven't worked out in years?",
    answer:
      "That is exactly why we do a 1-on-1 call first. We build around existing joint issues, busy work schedules, and your actual baseline so you progress safely and sustainably.",
  },
];

export default function FounderPage() {
  const breadcrumbs = [
    { name: "Pricing", href: "/pricing" },
    { name: "Founding Offer", href: "/founder" },
  ];

  return (
    <div className="pt-8 pb-16">
      <BreadcrumbSchema items={breadcrumbs} />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />

        <div className="text-center max-w-3xl mx-auto mt-4 space-y-6">
          <div
            className="inline-flex items-center gap-2 font-mono"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              padding: "8px 20px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.06)",
              color: "var(--primary)",
            }}
          >
            ✦ STRICTLY LIMITED TO 5 FOUNDING SPOTS
          </div>

          <h1
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 600,
              fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--foreground)",
            }}
          >
            6 Months of 1-on-1 Coaching.{" "}
            <span className="font-serif-italic" style={{ color: "var(--primary)" }}>
              Built for real life.
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Get six full months of customized programming, nutrition guidance, and weekly
            direct accountability for a one-time <strong>$299 USD</strong> (stated value $1,524).
          </p>
        </div>

        {/* Pricing Card */}
        <div className="mt-12 max-w-3xl mx-auto">
          <ScrollReveal>
            <GlassCard
              className="!border-[oklch(0.70_0.14_245_/_0.5)] p-8 md:p-12"
              strong
            >
              <div
                className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b"
                style={{ borderColor: "rgba(255,255,255,0.12)" }}
              >
                <div>
                  <span
                    className="font-mono text-xs uppercase px-3 py-1 rounded-full font-semibold"
                    style={{
                      background: "var(--primary)",
                      color: "var(--primary-foreground)",
                      letterSpacing: "0.15em",
                    }}
                  >
                    FOUNDING COHORT
                  </span>
                  <h2 className="text-2xl font-bold mt-3">{FOUNDING_OFFER.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    {FOUNDING_OFFER.tagline} · One-time payment
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <div className="flex items-baseline gap-2 md:justify-end">
                    <span className="text-4xl md:text-5xl font-extrabold text-foreground">
                      ${FOUNDING_OFFER.price}
                    </span>
                    <span className="text-muted-foreground font-mono text-sm">USD</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="line-through opacity-70">${FOUNDING_OFFER.regularPrice}</span>{" "}
                    · Save 80% today
                  </p>
                </div>
              </div>

              <div className="py-8">
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
                  EVERYTHING INCLUDED IN YOUR 6-MONTH BLOCK:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {FOUNDING_OFFER.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                <FounderCheckoutButton text="CLAIM YOUR FOUNDING SPOT — $299" />
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </section>

      {/* How It Works */}
      <Section
        label="01 — THE PROCESS"
        title="How the Founding Offer Works"
        description="No guesswork, no generic templates. Here is exactly what happens from the moment you join."
      >
        <div className="grid md:grid-cols-3 gap-8">
          <ScrollReveal delay={100}>
            <GlassCard className="p-8 h-full flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-mono font-bold mb-6">
                  1
                </div>
                <h3 className="text-lg font-bold uppercase mb-2">Secure Your Spot</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Complete your one-time $299 payment via our secure Stripe checkout. Once the 5 spots are taken, this offer closes.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-primary">
                <Zap className="h-4 w-4" /> Instant Confirmation
              </div>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <GlassCard className="p-8 h-full flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-mono font-bold mb-6">
                  2
                </div>
                <h3 className="text-lg font-bold uppercase mb-2">Book Your Zoom Intro</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your welcome email arrives immediately with a link to book our 20–30 minute kickoff call. We&apos;ll map out your history, schedule, and goals.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-primary">
                <Calendar className="h-4 w-4" /> 1-on-1 Video Strategy
              </div>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <GlassCard className="p-8 h-full flex flex-col justify-between">
              <div>
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-mono font-bold mb-6">
                  3
                </div>
                <h3 className="text-lg font-bold uppercase mb-2">Execute & Progress</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I deliver your custom 3–4 session/week plan. Every week, we review your progress, adjust workouts, and keep momentum high.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-primary">
                <MessageSquare className="h-4 w-4" /> Weekly Accountability
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </Section>

      {/* Core Principles */}
      <section className="border-t border-b border-border py-20 bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="section-label mb-4">02 — PHILOSOPHY</p>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Why this works when other plans haven&apos;t
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Most fitness programs fail because they ask you to live like a full-time athlete.
              We build around your career, family dinners, and actual schedule.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-foreground font-bold uppercase text-sm">
                <Dumbbell className="h-5 w-5 text-primary" />
                <span>45-Minute Focused Sessions</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Efficient, high-impact strength training designed to fit in lunch breaks or before work.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-foreground font-bold uppercase text-sm">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span>No Extreme Diets</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Simple protein and calorie targets that let you eat with your family and enjoy meals out.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-foreground font-bold uppercase text-sm">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>Direct Access to Coach Evan</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No middle managers or automated bots. When you have a question, you message Evan directly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection
        items={FOUNDER_FAQS}
        title="Founding Offer Questions"
        description="Everything you need to know about the 6-month Founding Member cohort."
      />

      {/* Bottom CTA */}
      <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="rounded-3xl border border-border bg-card p-10 md:p-16 space-y-6">
            <span className="font-mono text-xs uppercase px-3 py-1 rounded-full bg-primary/10 text-primary">
              LAST 5 SPOTS AT $299
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to build sustainable strength and consistency?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              Lock in 6 months of coaching today before all 5 spots are filled.
            </p>
            <div className="pt-4">
              <FounderCheckoutButton text="SECURE YOUR SPOT — $299" />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
