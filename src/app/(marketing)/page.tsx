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
import { ShieldCheck, TrendingUp, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Cooper Fitness | Online Coaching for Busy Parents",
  description:
    "Online fitness and weight loss coaching designed for busy parents starting from zero. Simple programs that fit around your real life.",
  path: "",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <Section label="WHY COOPER" title="The System Behind the Results.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: TrendingUp, title: "ACTUALLY SIMPLE", desc: "No complicated routines. Clear steps each week so you always know exactly what to do." },
            { icon: Clock, title: "BUILT FOR BUSY PARENTS", desc: "30-minute workouts that fit around school runs, nap times, and work. No 2-hour sessions." },
            { icon: MessageCircle, title: "A COACH IN YOUR CORNER", desc: "Message your coach anytime. Weekly video check-ins. Someone who gets it." },
            { icon: ShieldCheck, title: "BEGINNER-FRIENDLY", desc: "Start with zero experience. Every exercise explained, every question welcome. No judgment." },
          ].map((item) => (
            <ScrollReveal key={item.title}>
              <div className="flex flex-col gap-3 rounded-sm border border-border p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-accent">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-bold uppercase tracking-wider">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Section>
      <Section
        label="Services"
        title="Online Coaching Services"
        description="Not sure where to start? Pick the one that feels right — we'll handle the rest."
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              href={service.href}
            />
          ))}
        </div>
      </Section>
      <ProofSection />
      <PricingSection />
      <ContactCtaSection />
    </>
  );
}
