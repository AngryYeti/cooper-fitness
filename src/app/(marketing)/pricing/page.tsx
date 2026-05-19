import type { Metadata } from "next";
import { PricingSection } from "@/components/marketing/pricing-section";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Choose your commitment — monthly, quarterly, or 6-month coaching blocks.",
};

export default function PricingPage() {
  return (
    <div className="pt-8">
      <PricingSection />
    </div>
  );
}
