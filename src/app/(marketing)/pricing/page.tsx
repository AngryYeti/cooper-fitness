import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/schema";
import { PricingSection } from "@/components/marketing/pricing-section";
import { FAQSection } from "@/components/marketing/faq-section";
import { CTASection } from "@/components/marketing/cta-section";
import { FAQ_ITEMS } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Pricing",
  description:
    "Choose your commitment — monthly, quarterly, or 6-month coaching blocks. Premium online fitness coaching starting at $254/mo.",
  path: "/pricing",
});

const PRICING_FAQ = FAQ_ITEMS.filter((item) =>
  ["Is there a minimum commitment?", "Can I switch programs or pricing tiers?"].includes(
    item.question
  )
);

export default function PricingPage() {
  const breadcrumbs = [{ name: "Pricing", href: "/pricing" }];

  return (
    <div className="pt-8">
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Pricing</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Transparent pricing. No hidden fees. Choose the commitment that fits your goals.
        </p>
      </section>
      <PricingSection />
      <FAQSection items={[...PRICING_FAQ]} title="Pricing Questions" />
      <CTASection />
    </div>
  );
}
