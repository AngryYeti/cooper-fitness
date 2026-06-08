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
  title: "Cooper Fitness | Premium Online Coaching",
  description:
    "Precision online fitness coaching for high-performing professionals. Personalized strength, nutrition, and accountability.",
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
            { icon: TrendingUp, title: "DATA-DRIVEN", desc: "Every decision backed by metrics, not guesswork. Progressive overload tracked weekly." },
            { icon: Clock, title: "BUILT FOR BUSY LIVES", desc: "Programs that fit around school runs, deadlines, and travel. No 2-hour workouts." },
            { icon: MessageCircle, title: "DIRECT COACH ACCESS", desc: "Message your coach anytime. Weekly video check-ins. Real accountability." },
            { icon: ShieldCheck, title: "SCIENCE-BACKED", desc: "Protocols grounded in exercise science and nutritional biochemistry. No fads." },
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
        description="Choose the coaching track that matches your goals."
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
