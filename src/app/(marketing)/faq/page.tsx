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

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Everything you need to know about online fitness coaching with Cooper Fitness.
        </p>
      </section>

      <FAQSection items={[...FAQ_ITEMS]} />

      <CTASection
        title="Still Have Questions?"
        description="Book a free consultation and we'll answer everything — no pressure, no commitment."
        buttonText="Book Free Consultation"
      />
    </div>
  );
}
