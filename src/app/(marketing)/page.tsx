import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { AboutSection } from "@/components/marketing/about-section";
import { ContactCtaSection } from "@/components/marketing/contact-cta-section";
import { HeroSection } from "@/components/marketing/hero-section";
import { PricingSection } from "@/components/marketing/pricing-section";
import { ProgramsSection } from "@/components/marketing/programs-section";
import { ProofSection } from "@/components/marketing/proof-section";
import { ServiceCard } from "@/components/marketing/service-card";
import { Section } from "@/components/shared/section";
import { SERVICES } from "@/lib/constants";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { GlassCard } from "@/components/effects/glass-sheen";
import { FoundingHomepage } from "@/components/founding/founding-homepage";
import { FoundingConfigError, getFoundingConfig } from "@/lib/founding/config";
import { fetchFoundingInventory } from "@/lib/founding/client";
import type { FoundingInventory } from "@/lib/founding/types";

const ORIGINAL_METADATA = generatePageMetadata({
  title: "Online Fitness Coaching for Busy Parents",
  description:
    "Online fitness and weight loss coaching designed for busy parents starting from zero. Simple programs that fit around your real life.",
  path: "",
});

const FOUNDING_METADATA = generatePageMetadata({
  title: "Cooper Fitness | A Stronger Body Can Fit Inside a Busy Week",
  description: "Individualized strength, nutrition, and accountability coaching for busy adults. Join the Cooper Fitness founding cohort for six months of coaching at a one-time USD $299 rate.",
  path: "",
  image: "/evanactionweb.png",
});

export const metadata: Metadata = process.env.FOUNDING_HOMEPAGE_ENABLED === "true"
  ? {
      ...FOUNDING_METADATA,
      title: { absolute: "Cooper Fitness | A Stronger Body Can Fit Inside a Busy Week" },
      openGraph: {
        ...FOUNDING_METADATA.openGraph,
        title: "Cooper Fitness — Five people. Six months. One plan built around real life.",
        description: "Five founding positions. Six months of individualized training, sustainable nutrition guidance, and weekly accountability. Get started today.",
      },
      twitter: {
        ...FOUNDING_METADATA.twitter,
        title: "Cooper Fitness — Five people. Six months. One plan built around real life.",
        description: "Five founding positions. Six months of individualized training, sustainable nutrition guidance, and weekly accountability. Get started today.",
      },
    }
  : ORIGINAL_METADATA;

const WHY_ITEMS = [
  { index: "01", title: "Actually Simple", desc: "No complicated routines. Clear steps each week so you always know exactly what to do." },
  { index: "02", title: "Built for Busy Parents", desc: "30-minute workouts that fit around school runs, nap times, and work. No 2-hour sessions." },
  { index: "03", title: "A Coach in Your Corner", desc: "Message your coach anytime. Weekly video check-ins. Someone who gets it." },
  { index: "04", title: "Beginner-Friendly", desc: "Start with zero experience. Every exercise explained, every question welcome. No judgment." },
];

function OriginalHomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <Section label="WHY COOPER">
        <h2
          className="mb-10"
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 500,
            fontSize: "clamp(2rem, 3.6vw, 3.1rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: "var(--foreground)",
          }}
        >
          The system behind the{" "}
          <span className="font-serif-italic" style={{ color: "var(--primary)" }}>results.</span>
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_ITEMS.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 100}>
              <GlassCard className="h-full transition-all duration-300 hover:-translate-y-[6px]">
                <div className="flex flex-col gap-3 p-6">
                  <span className="font-mono" style={{ fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--primary)" }}>
                    {item.index}
                  </span>
                  <h3 style={{ fontWeight: 500, fontSize: "1.1rem", color: "var(--foreground)" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.88rem", lineHeight: 1.6, color: "var(--muted-foreground)" }}>{item.desc}</p>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>
      </Section>
      <Section label="SERVICES">
        <h2
          className="mb-10"
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 500,
            fontSize: "clamp(2rem, 3.6vw, 3.1rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: "var(--foreground)",
          }}
        >
          Online coaching{" "}
          <span className="font-serif-italic" style={{ color: "var(--primary)" }}>services</span>
        </h2>
        <div className="flex flex-col gap-4">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 100}>
              <ServiceCard
                title={service.title}
                description={service.description}
                href={service.href}
                index={i}
              />
            </ScrollReveal>
          ))}
        </div>
      </Section>
      <ProofSection />
      <PricingSection />
      <ContactCtaSection />
    </>
  );
}

const FULL_INVENTORY: FoundingInventory = {
  state: "FULL",
  purchasedCount: 0,
  pendingCount: 0,
  capacity: 0,
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  if (process.env.FOUNDING_HOMEPAGE_ENABLED !== "true") return <OriginalHomePage />;

  let inventory = FULL_INVENTORY;
  let supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "evan@cooper.fitness";
  let termsUrl = process.env.NEXT_PUBLIC_FOUNDING_TERMS_URL || "/terms";
  let privacyUrl = process.env.NEXT_PUBLIC_FOUNDING_PRIVACY_URL || "/privacy";
  let refundPolicyUrl = process.env.NEXT_PUBLIC_FOUNDING_REFUND_POLICY_URL || "/refunds";

  try {
    const config = getFoundingConfig();
    supportEmail = config.supportEmail;
    termsUrl = config.termsUrl;
    privacyUrl = config.privacyUrl;
    refundPolicyUrl = config.refundPolicyUrl;
    if (config.checkoutEnabled) inventory = await fetchFoundingInventory(config);
  } catch (error) {
    if (!(error instanceof FoundingConfigError)) console.error("[founding-homepage] unavailable");
  }

  return <FoundingHomepage inventory={inventory} supportEmail={supportEmail} termsUrl={termsUrl} privacyUrl={privacyUrl} refundPolicyUrl={refundPolicyUrl} />;
}
