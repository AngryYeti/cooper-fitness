import Image from "next/image";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Section } from "@/components/shared/section";

export function AboutSection() {
  return (
    <Section id="about" label="01 — MEET YOUR COACH">
      <div className="grid items-center gap-12 lg:grid-cols-2" style={{ gap: "clamp(32px, 5vw, 72px)" }}>
        <ScrollReveal variant="scale">
          <div className="relative" style={{ borderRadius: 26, overflow: "hidden", height: "clamp(420px, 58vh, 600px)" }}>
            <Image
              src="/evanselfiegym.jpeg"
              alt="Coach Evan"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ boxShadow: "inset 0 0 60px rgba(0,0,0,0.3)" }}
            />
            <div
              className="absolute bottom-4 right-4 glass font-mono"
              style={{
                padding: "10px 16px",
                borderRadius: 14,
                fontSize: "0.62rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--foreground)",
                animation: "floaty 4s ease-in-out infinite",
              }}
            >
              FATHER OF TWO · LIFELONG ATHLETE
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={150} variant="up" className="space-y-6">
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
            Coaching that respects your{" "}
            <span className="font-serif-italic" style={{ color: "var(--primary)" }}>real life.</span>
          </h2>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--muted-foreground)" }}>
            I&apos;m Evan — father of two and full-time coach. I know what it&apos;s like to feel
            too busy and too out of shape to start. Before I found my own path, I was the parent
            running on coffee and zero plan. That&apos;s exactly why I built Cooper Fitness.
          </p>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--muted-foreground)" }}>
            My approach is calm, simple, and built for real life. You don&apos;t need experience,
            a gym membership, or two free hours a day. We start exactly where you are and build
            from there — so you have more energy for your kids, not less.
          </p>
          <p className="font-mono" style={{ fontSize: "0.72rem", letterSpacing: "0.14em", color: "var(--muted-foreground)", textTransform: "uppercase" }}>
            — EVAN · FOUNDER & HEAD COACH
          </p>
        </ScrollReveal>
      </div>
    </Section>
  );
}
