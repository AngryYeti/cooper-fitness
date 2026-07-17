import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ServiceSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { CTASection } from "@/components/marketing/cta-section";
import { ServiceCard } from "@/components/marketing/service-card";
import { FAQSection } from "@/components/marketing/faq-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SERVICES, FAQ_ITEMS, SITE_URL } from "@/lib/constants";
import { Flame, TrendingDown, CalendarCheck, Apple } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Online Weight Loss Coaching",
  description:
    "Sustainable fat loss through metabolic conditioning, nutrition protocols, and weekly accountability. Personalized online coaching for lasting results.",
  path: "/services/online-weight-loss-coaching",
});

const WHATS_INCLUDED = [
  {
    icon: Flame,
    title: "Metabolic Programming",
    description:
      "Training cycles designed to maximize fat oxidation while preserving lean muscle mass.",
  },
  {
    icon: Apple,
    title: "Nutrition Protocol",
    description:
      "Flexible macro-based nutrition plan that adapts to your lifestyle and preferences.",
  },
  {
    icon: CalendarCheck,
    title: "Weekly Check-ins",
    description:
      "Video calls to review progress, adjust programming, and troubleshoot plateaus.",
  },
  {
    icon: TrendingDown,
    title: "Progress Tracking",
    description:
      "Data-driven approach with body composition metrics, strength benchmarks, and photo documentation.",
  },
];

const FAQ_SUBSET = FAQ_ITEMS.filter((item) =>
  ["How does online coaching work?", "How soon will I see results?", "What if I travel frequently?"].includes(item.question)
);

export default function WeightLossCoachingPage() {
  const breadcrumbs = [
    { name: "Services", href: "/programs" },
    { name: "Online Weight Loss Coaching", href: "/services/online-weight-loss-coaching" },
  ];

  return (
    <div className="pt-8">
      <ServiceSchema
        name="Online Weight Loss Coaching"
        description="Sustainable fat loss through metabolic conditioning, nutrition protocols, and weekly accountability."
        url={`${SITE_URL}/services/online-weight-loss-coaching`}
      />
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Online Weight Loss Coaching
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Sustainable fat loss through metabolic conditioning, nutrition protocols, and weekly
          accountability. No crash diets. No gimmicks. Just results that last.
        </p>
      </section>

      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">What&apos;s Included</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {WHATS_INCLUDED.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">How It Works</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div>
              <span className="section-label">Step 01</span>
              <h3 className="mt-2 text-lg font-semibold">Assessment</h3>
              <p className="mt-2 text-muted-foreground">
                We evaluate your current training, nutrition, lifestyle, and goals to build your
                baseline.
              </p>
            </div>
            <div>
              <span className="section-label">Step 02</span>
              <h3 className="mt-2 text-lg font-semibold">Execution</h3>
              <p className="mt-2 text-muted-foreground">
                You follow your personalized plan with direct coach access for support between
                check-ins.
              </p>
            </div>
            <div>
              <span className="section-label">Step 03</span>
              <h3 className="mt-2 text-lg font-semibold">Iteration</h3>
              <p className="mt-2 text-muted-foreground">
                Weekly data review drives adjustments to training, nutrition, and recovery
                protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold uppercase">What To Expect</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-sm border border-border bg-card p-6">
              <span className="text-2xl font-bold text-primary">4-6</span>
              <span className="text-sm text-muted-foreground"> weeks</span>
              <p className="mt-2 text-muted-foreground">Noticeable changes in energy, measurements, and strength. The first milestone.</p>
            </div>
            <div className="rounded-sm border border-border bg-card p-6">
              <span className="text-2xl font-bold text-primary">3-6</span>
              <span className="text-sm text-muted-foreground"> months</span>
              <p className="mt-2 text-muted-foreground">Significant body composition shift. Habits are locked in. Results compound.</p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection items={[...FAQ_SUBSET]} />

      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Explore Other Services</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {SERVICES.filter((s) => s.id !== "online-weight-loss-coaching").map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                href={service.href}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
