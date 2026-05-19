import { AboutSection } from "@/components/marketing/about-section";
import { ContactCtaSection } from "@/components/marketing/contact-cta-section";
import { HeroSection } from "@/components/marketing/hero-section";
import { PricingSection } from "@/components/marketing/pricing-section";
import { ProgramsSection } from "@/components/marketing/programs-section";
import { ProofSection } from "@/components/marketing/proof-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <ProofSection />
      <PricingSection />
      <ContactCtaSection />
    </>
  );
}
