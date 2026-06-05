import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Particles } from "@/components/effects/particles";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Button } from "@/components/ui/button";
import { InquiryModal } from "@/components/shared/inquiry-modal";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      <Particles />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-background" />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-0">
        <ScrollReveal className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-sm border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
            NOW ACCEPTING Q3 CLIENTS
          </div>
          <h1 className="text-balance text-5xl font-bold uppercase tracking-tight sm:text-6xl lg:text-7xl">
            Built for the{" "}
            <span className="text-primary">Elite Daily.</span>
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
            Precision coaching for professionals who demand measurable strength,
            sustainable energy, and zero guesswork.
          </p>
          <div className="flex flex-wrap gap-4">
            <InquiryModal>
              <Button size="lg">
                START TRAINING
                <ArrowRight className="h-4 w-4" />
              </Button>
            </InquiryModal>
            <Button size="lg" variant="outline" asChild>
              <Link href="/programs">VIEW PROGRAMS</Link>
            </Button>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={150}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <Image
              src="/evanactionweb.png"
              alt="Coach training in a modern gym"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
