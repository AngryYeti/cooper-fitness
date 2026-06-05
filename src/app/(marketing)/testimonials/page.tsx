import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ReviewSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { TestimonialCard } from "@/components/marketing/testimonial-card";
import { CTASection } from "@/components/marketing/cta-section";
import { TESTIMONIALS } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Client Results & Testimonials",
  description:
    "See what our clients say about their transformation journey with Cooper Fitness. Real results from real professionals.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  const breadcrumbs = [{ name: "Testimonials", href: "/testimonials" }];

  return (
    <div className="pt-8">
      <ReviewSchema reviews={[...TESTIMONIALS]} />
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Client Results &amp; Testimonials
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Real transformations from busy professionals who committed to the process.
        </p>
      </section>

      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard
                key={t.name}
                quote={t.quote}
                name={t.name}
                role={t.role}
                rating={t.rating}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">The Results Speak</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">22lb+</p>
              <p className="mt-2 text-sm text-muted-foreground">Average fat loss in 12 weeks</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">80lb+</p>
              <p className="mt-2 text-sm text-muted-foreground">Average deadlift increase</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">95%</p>
              <p className="mt-2 text-sm text-muted-foreground">Client retention rate</p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
