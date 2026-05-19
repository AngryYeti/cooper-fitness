import { FadeIn } from "@/components/shared/fade-in";
import { Section } from "@/components/shared/section";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TESTIMONIALS } from "@/lib/constants";

export function ProofSection() {
  return (
    <Section id="proof" label="03 — Proof" title="Real people. Compounding results.">
      <div className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <FadeIn key={t.name} delay={i * 0.1}>
            <Card className="flex h-full flex-col p-8">
              <blockquote className="flex-1 text-base leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <Separator className="my-6" />
              <footer>
                <p className="font-semibold">{t.name}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t.role}
                </p>
              </footer>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
