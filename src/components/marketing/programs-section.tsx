import Link from "next/link";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { GlassCard } from "@/components/effects/glass-sheen";
import { Section } from "@/components/shared/section";
import { PROGRAMS } from "@/lib/constants";

const PROGRAM_LINKS: Record<string, string> = {
  strength: "/services/online-personal-training",
  "weight-loss": "/services/online-weight-loss-coaching",
  accountability: "/programs#accountability",
};

export function ProgramsSection() {
  return (
    <Section
      id="programs"
      label="02 — PROGRAMS"
    >
      <div className="mb-10 space-y-4 max-w-2xl">
        <h2
          style={{
            fontFamily: "var(--font-space-grotesk), sans-serif",
            fontWeight: 500,
            fontSize: "clamp(2rem, 3.6vw, 3.1rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: "var(--foreground)",
          }}
        >
          Precision{" "}
          <span className="font-serif-italic" style={{ color: "var(--primary)" }}>protocols.</span>
        </h2>
        <p style={{ color: "var(--muted-foreground)", fontSize: "1.05rem", lineHeight: 1.7 }}>
          Targeted programs that integrate into a high-stakes lifestyle — not the other way around.
        </p>
      </div>
      <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {PROGRAMS.map((program, i) => (
          <ScrollReveal key={program.id} delay={i * 100}>
            <GlassCard className="group h-full transition-all duration-300 hover:-translate-y-[6px] hover:border-white/25 hover:shadow-[0_28px_80px_rgba(0,0,0,0.5)]">
              <div className="flex h-full flex-col p-7">
                <span
                  className="font-serif-italic mb-3"
                  style={{ fontSize: "2.4rem", color: "var(--primary)", lineHeight: 1 }}
                >
                  {program.index}
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 500,
                    fontSize: "1.4rem",
                    color: "var(--foreground)",
                    marginBottom: 10,
                  }}
                >
                  {program.title}
                </h3>
                <p style={{ color: "var(--muted-foreground)", fontSize: "0.9rem", lineHeight: 1.65, flex: 1 }}>
                  {program.description}
                </p>
                <Link
                  href={PROGRAM_LINKS[program.id] || `/programs#${program.id}`}
                  className="inline-flex items-center gap-1 font-mono uppercase transition-all hover:gap-2 mt-6"
                  style={{ fontSize: "0.66rem", letterSpacing: "0.16em", color: "var(--primary)" }}
                >
                  EXPLORE PROTOCOL →
                </Link>
              </div>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
