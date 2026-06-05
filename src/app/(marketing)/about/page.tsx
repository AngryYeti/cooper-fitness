import type { Metadata } from "next";
import Image from "next/image";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { PersonSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { AboutSection } from "@/components/marketing/about-section";
import { ProofSection } from "@/components/marketing/proof-section";
import { CTASection } from "@/components/marketing/cta-section";

export const metadata: Metadata = generatePageMetadata({
  title: "About Coach Evan",
  description:
    "Meet Evan Cooper — premium online fitness coach specializing in strength training, weight loss, and accountability coaching for busy professionals.",
  path: "/about",
});

export default function AboutPage() {
  const breadcrumbs = [{ name: "About", href: "/about" }];

  return (
    <div className="pt-8">
      <PersonSchema />
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">About Cooper Fitness</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Elite coaching built for real lives — not fitness influencers.
        </p>
      </section>
      <AboutSection />
      <section className="border-t border-border py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative aspect-video overflow-hidden rounded-3xl bg-muted">
            <Image
              src="/evanactionweb.png"
              alt="Training environment"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Our philosophy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We believe sustainable performance comes from systems, not motivation spikes.
              Every client gets data-led programming, weekly accountability, and coaching that
              keeps execution honest.
            </p>
          </div>
        </div>
      </section>
      <ProofSection />
      <CTASection />
    </div>
  );
}
