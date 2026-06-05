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
