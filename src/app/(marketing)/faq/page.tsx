import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FAQSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { FAQSection } from "@/components/marketing/faq-section";
import { CTASection } from "@/components/marketing/cta-section";
import { FAQ_ITEMS } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Get answers to common questions about online fitness coaching, programs, pricing, and how Cooper Fitness works.",
  path: "/faq",
});

export default function FAQPage() {
  const breadcrumbs = [{ name: "FAQ", href: "/faq" }];

  return (
    <div className="pt-8">
      <FAQSchema items={[...FAQ_ITEMS]} />
      <BreadcrumbSchema items={breadcrumbs} />

      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <FAQSection items={[...FAQ_ITEMS]} headingLevel="h1" />

      <CTASection
        title="Ready to Get Started?"
        description="Choose a plan and begin your transformation."
        buttonText="VIEW PRICING"
      />
    </div>
  );
}
