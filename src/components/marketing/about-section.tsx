import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { ColorRevealImage } from "@/components/effects/color-reveal-image";
import { Section } from "@/components/shared/section";

export function AboutSection() {
  return (
    <Section id="about" label="01 — MEET YOUR COACH" title="Coaching that respects your real life.">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal variant="scale">
          <ColorRevealImage
            src="/evanselfiegym.jpeg"
            alt="Coach Evan"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="relative aspect-[4/5]"
          />
        </ScrollReveal>
        <ScrollReveal delay={150} variant="up" className="space-y-6">
          <p className="text-lg leading-relaxed text-muted-foreground">
            I&apos;m Evan — father of two and full-time coach. I know what it&apos;s like to feel
            too busy and too out of shape to start. Before I found my own path, I was the parent
            running on coffee and zero plan. That&apos;s exactly why I built Cooper Fitness.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            My approach is calm, simple, and built for real life. You don&apos;t need experience,
            a gym membership, or two free hours a day. We start exactly where you are and build
            from there — so you have more energy for your kids, not less.
          </p>
        </ScrollReveal>
      </div>
    </Section>
  );
}
