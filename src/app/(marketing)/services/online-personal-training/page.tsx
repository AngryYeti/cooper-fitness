import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ServiceSchema, BreadcrumbSchema } from "@/components/seo/schema";
import { CTASection } from "@/components/marketing/cta-section";
import { ServiceCard } from "@/components/marketing/service-card";
import { FAQSection } from "@/components/marketing/faq-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SERVICES, FAQ_ITEMS } from "@/lib/constants";
import { Dumbbell, Video, MessageCircle, BarChart3 } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Online Personal Training",
  description:
    "Personalized lifting programs with direct coach access and video check-ins. Train smarter with expert online personal training.",
  path: "/services/online-personal-training",
});

const WHATS_INCLUDED = [
  {
    icon: Dumbbell,
    title: "Custom Programming",
    description:
      "Training cycles built around your goals, schedule, equipment, and experience level.",
  },
  {
    icon: Video,
    title: "Video Check-ins",
    description:
      "Regular video calls to review form, discuss progress, and refine your approach.",
  },
  {
    icon: MessageCircle,
    title: "Direct Coach Access",
    description:
      "Message your coach anytime for form checks, questions, or program adjustments.",
  },
  {
    icon: BarChart3,
    title: "Performance Data",
    description:
      "Track strength gains, volume, and progressive overload with structured logging.",
  },
];

const FAQ_SUBSET = FAQ_ITEMS.filter((item) =>
  [
    "How does online coaching work?",
    "Do I need a gym membership?",
    "How is this different from a personal trainer at my gym?",
  ].includes(item.question)
);

export default function OnlinePersonalTrainingPage() {
  const breadcrumbs = [
    { name: "Services", href: "/programs" },
    { name: "Online Personal Training", href: "/services/online-personal-training" },
  ];

  return (
    <div className="pt-8">
      <ServiceSchema
        name="Online Personal Training"
        description="Personalized lifting programs with direct coach access and video check-ins."
        url="https://cooper.fitness/services/online-personal-training"
      />
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Online Personal Training
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Personalized lifting programs with direct coach access and video check-ins.
          Expert programming delivered to your phone — train on your schedule.
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
                Deep dive into your training history, movement patterns, schedule, and goals.
              </p>
            </div>
            <div>
              <span className="section-label">Step 02</span>
              <h3 className="mt-2 text-lg font-semibold">Programming</h3>
              <p className="mt-2 text-muted-foreground">
                Receive a fully customized training plan with progressive overload built in.
              </p>
            </div>
            <div>
              <span className="section-label">Step 03</span>
              <h3 className="mt-2 text-lg font-semibold">Refinement</h3>
              <p className="mt-2 text-muted-foreground">
                Ongoing adjustments based on performance data, feedback, and life demands.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold uppercase">Who This Is For</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              { title: "Experienced lifters", desc: "You've been training but hit a plateau. You need expert programming to break through." },
              { title: "Busy professionals", desc: "You need efficient sessions built around your schedule, not a cookie-cutter plan." },
              { title: "Injury-conscious", desc: "You want to get stronger safely. Every exercise is selected for your movement patterns." },
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
            {SERVICES.filter((s) => s.id !== "online-personal-training").map((service) => (
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
