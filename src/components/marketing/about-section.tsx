import Image from "next/image";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Section } from "@/components/shared/section";

export function AboutSection() {
  return (
    <Section id="about" label="01 — MEET YOUR COACH" title="Coaching that respects your real life.">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <ScrollReveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
            <Image
              src="/evanselfiegym.jpeg"
              alt="Coach Evan"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={100} className="space-y-6">
          <p className="text-lg leading-relaxed text-muted-foreground">
            I&apos;m Evan — father of two, lifelong athlete, and full-time coach. I built Cooper
            Fitness because the people I respect most don&apos;t have time to chase trends. They
            need a system that works around school runs, deadlines, and travel.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            My approach is calm, data-led, and entirely human. We start where you are, train with
            intention, and protect your energy for the things that matter outside the gym.
          </p>
        </ScrollReveal>
      </div>
    </Section>
  );
}
