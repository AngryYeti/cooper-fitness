import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { MagneticCard } from "@/components/effects/magnetic-card";
import { Section } from "@/components/shared/section";
import { Card } from "@/components/ui/card";
import { PROGRAMS } from "@/lib/constants";
import { getIcon } from "@/lib/icons";

const PROGRAM_LINKS: Record<string, string> = {
  strength: "/services/online-personal-training",
  "weight-loss": "/services/online-weight-loss-coaching",
  accountability: "/programs#accountability",
};

export function ProgramsSection() {
  return (
    <Section
      id="programs"
      muted
      label="02 — PROGRAMS"
      title="Precision protocols."
      description="Targeted programs that integrate into a high-stakes lifestyle — not the other way around."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {PROGRAMS.map((program, i) => {
          const Icon = getIcon(program.icon);
          return (
            <ScrollReveal key={program.id} delay={i * 100}>
              <MagneticCard>
                <Card className="group flex h-full flex-col p-6">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-sm bg-accent">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="mb-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    {program.index}
                  </span>
                  <h3 className="mb-3 text-lg font-bold uppercase">{program.title}</h3>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {program.description}
                  </p>
                  <Link
                    href={PROGRAM_LINKS[program.id] || `/programs#${program.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary transition-gap hover:gap-2"
                  >
                    EXPLORE PROTOCOL
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Card>
              </MagneticCard>
            </ScrollReveal>
          );
        })}
      </div>
    </Section>
  );
}
