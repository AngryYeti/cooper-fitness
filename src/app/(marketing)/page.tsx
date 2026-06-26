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

export const metadata: Metadata = generatePageMetadata({
  title: "Cooper Fitness | Online Coaching for Busy Parents",
  description:
    "Online fitness and weight loss coaching designed for busy parents starting from zero. Simple programs that fit around your real life.",
  path: "",
});

const WHY_ITEMS = [
  { index: "01", title: "Actually Simple", desc: "No complicated routines. Clear steps each week so you always know exactly what to do." },
  { index: "02", title: "Built for Busy Parents", desc: "30-minute workouts that fit around school runs, nap times, and work. No 2-hour sessions." },
  { index: "03", title: "A Coach in Your Corner", desc: "Message your coach anytime. Weekly video check-ins. Someone who gets it." },
  { index: "04", title: "Beginner-Friendly", desc: "Start with zero experience. Every exercise explained, every question welcome. No judgment." },
];

export default function HomePage() {
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
