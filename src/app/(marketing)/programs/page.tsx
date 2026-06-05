import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbSchema } from "@/components/seo/schema";
import { ProgramsSection } from "@/components/marketing/programs-section";
import { ServiceCard } from "@/components/marketing/service-card";
import { PROGRAMS, SERVICES } from "@/lib/constants";
import { getIcon } from "@/lib/icons";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = generatePageMetadata({
  title: "Coaching Programs",
  description:
    "Precision protocols for strength, weight loss, and accountability. Choose the coaching program that matches your goals.",
  path: "/programs",
});

export default function ProgramsPage() {
  const breadcrumbs = [{ name: "Programs", href: "/programs" }];

  return (
    <div className="pt-8">
      <BreadcrumbSchema items={breadcrumbs} />

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Coaching Programs</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Three protocols. One standard of excellence.
        </p>
      </section>
      <ProgramsSection />
      <section className="mx-auto max-w-7xl space-y-12 px-4 pb-12 sm:px-6 lg:px-8">
        {PROGRAMS.map((p) => {
          const Icon = getIcon(p.icon);
          return (
            <Card key={p.id} id={p.id} className="scroll-mt-24 p-8 md:p-12">
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <span className="section-label">{p.index}</span>
                  <h2 className="mt-2 text-2xl font-bold">{p.title}</h2>
                  <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
                    {p.description} Our coaches tailor volume, intensity, and recovery to your
                    schedule, equipment, and goals — with weekly adjustments based on your data.
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </section>

      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Explore Our Services</h2>
          <p className="mt-2 text-muted-foreground">
            Deep dive into each coaching track.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {SERVICES.map((service) => (
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
    </div>
  );
}
