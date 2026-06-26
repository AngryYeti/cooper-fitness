import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { GlassCard } from "@/components/effects/glass-sheen";
import { Section } from "@/components/shared/section";
import { TESTIMONIALS } from "@/lib/constants";

export function ProofSection() {
  return (
    <Section id="proof" label="03 — PROOF">
      <h2
        className="mb-10"
        style={{
          fontFamily: "var(--font-space-grotesk), sans-serif",
          fontWeight: 500,
          fontSize: "clamp(2rem, 3.6vw, 3.1rem)",
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          color: "var(--foreground)",
        }}
      >
        Real people. Compounding{" "}
        <span className="font-serif-italic" style={{ color: "var(--primary)" }}>results.</span>
      </h2>
      <div className="grid gap-[22px] md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <ScrollReveal key={t.name} delay={i * 100}>
            <GlassCard className="h-full">
              <div className="flex h-full flex-col p-8">
                <span className="font-serif-italic mb-4" style={{ fontSize: "3rem", lineHeight: 1, color: "var(--primary)" }}>
                  &ldquo;
                </span>
                <blockquote style={{ flex: 1, fontSize: "1.08rem", lineHeight: 1.65, color: "var(--foreground)" }}>
                  {t.quote}
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className="rounded-full"
                    style={{
                      width: 38,
                      height: 38,
                      background: "linear-gradient(135deg, var(--primary), oklch(0.60 0.12 255))",
                      opacity: 0.7,
                    }}
                  />
                  <div>
                    <p style={{ fontWeight: 500, color: "var(--foreground)" }}>{t.name}</p>
                    <p className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.12em", color: "var(--muted-foreground)", textTransform: "uppercase" }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
