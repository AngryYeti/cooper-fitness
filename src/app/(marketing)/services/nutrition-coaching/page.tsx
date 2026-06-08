import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ServiceSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { CTASection } from "@/components/marketing/cta-section";
import { ServiceCard } from "@/components/marketing/service-card";
import { FAQSection } from "@/components/marketing/faq-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SERVICES, FAQ_ITEMS } from "@/lib/constants";
import { Apple, Utensils, TrendingUp, FileText } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Online Nutrition Coaching",
  description:
    "Science-backed nutrition protocols tailored to your goals and lifestyle. Expert online nutrition coaching for sustainable results.",
  path: "/services/nutrition-coaching",
});

const WHATS_INCLUDED = [
  {
    icon: Apple,
    title: "Custom Nutrition Plan",
    description:
      "Macro targets and meal frameworks built around your preferences, schedule, and goals.",
  },
  {
    icon: Utensils,
    title: "Flexible Approach",
    description:
      "No rigid meal plans. Learn to make smart choices within your lifestyle.",
  },
  {
    icon: TrendingUp,
    title: "Ongoing Adjustments",
    description:
      "Regular tweaks to your nutrition protocol based on progress and biofeedback.",
  },
  {
    icon: FileText,
    title: "Education",
    description:
      "Understand the why behind every recommendation so you can sustain results independently.",
  },
];

const FAQ_SUBSET = FAQ_ITEMS.filter((item) =>
  [
    "How does online coaching work?",
    "How soon will I see results?",
    "Is there a minimum commitment?",
  ].includes(item.question)
);

export default function NutritionCoachingPage() {
  const breadcrumbs = [
    { name: "Services", href: "/programs" },
    { name: "Nutrition Coaching", href: "/services/nutrition-coaching" },
  ];

  return (
    <div className="pt-8">
      <ServiceSchema
        name="Nutrition Coaching"
        description="Science-backed nutrition protocols tailored to your goals and lifestyle."
        url="https://cooper.fitness/services/nutrition-coaching"
      />
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Nutrition Coaching
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Science-backed nutrition protocols tailored to your goals and lifestyle.
          Fuel your performance without restriction or guesswork.
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
              <h3 className="mt-2 text-lg font-semibold">Audit</h3>
              <p className="mt-2 text-muted-foreground">
                Review your current eating habits, preferences, schedule, and relationship with food.
              </p>
            </div>
            <div>
              <span className="section-label">Step 02</span>
              <h3 className="mt-2 text-lg font-semibold">Protocol</h3>
              <p className="mt-2 text-muted-foreground">
                Receive a personalized nutrition framework with macro targets and meal strategies.
              </p>
            </div>
            <div>
              <span className="section-label">Step 03</span>
              <h3 className="mt-2 text-lg font-semibold">Optimize</h3>
              <p className="mt-2 text-muted-foreground">
                Iterate based on results, energy levels, and lifestyle changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold uppercase">The Approach</h2>
          <p className="mt-2 text-muted-foreground max-w-2xl">No meal plans. No forbidden foods. Just a framework that works with your life.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { title: "Flexible macro targets", desc: "Hit your numbers with foods you actually enjoy. No restrictive eating." },
              { title: "Weekly adjustments", desc: "Targets evolve as your body changes. We never let you plateau." },
              { title: "Education first", desc: "Learn why you're eating what you're eating. Build skills that last a lifetime." },
            ].map((item) => (
              <div key={item.title} className="rounded-sm border border-border bg-card p-6">
                <h3 className="text-sm font-bold uppercase">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={[...FAQ_SUBSET]} />

      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Explore Other Services</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {SERVICES.filter((s) => s.id !== "nutrition-coaching").map((service) => (
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
