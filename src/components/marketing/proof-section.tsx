import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Section } from "@/components/shared/section";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TESTIMONIALS } from "@/lib/constants";

export function ProofSection() {
  return (
    <Section id="proof" label="03 — PROOF" title="Real people. Compounding results.">
      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 100}>
            <Card className="flex h-full flex-col p-8">
              <blockquote className="flex-1 text-base leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <Separator className="my-6" />
              <footer>
                <p className="font-bold uppercase">{t.name}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {t.role}
                </p>
              </footer>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
