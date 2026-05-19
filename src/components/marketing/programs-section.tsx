import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { Section } from "@/components/shared/section";
import { Card } from "@/components/ui/card";
import { PROGRAMS } from "@/lib/constants";
import { getIcon } from "@/lib/icons";

export function ProgramsSection() {
  return (
    <Section
      id="programs"
      muted
      label="02 — Programs"
      title="Precision protocols."
      description="Targeted programs that integrate into a high-stakes lifestyle — not the other way around."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {PROGRAMS.map((program, i) => {
          const Icon = getIcon(program.icon);
          return (
            <FadeIn key={program.id} delay={i * 0.08}>
              <Card className="group flex h-full flex-col p-6 transition-shadow hover:shadow-md">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="mb-2 text-xs text-muted-foreground">{program.index}</span>
                <h3 className="mb-3 text-lg font-semibold">{program.title}</h3>
                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {program.description}
                </p>
                <Link
                  href={`/programs#${program.id}`}
                  className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-primary transition-gap hover:gap-2"
                >
                  Explore protocol
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Card>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
