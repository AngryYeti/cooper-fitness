import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { Button } from "@/components/ui/button";
import { InquiryModal } from "@/components/shared/inquiry-modal";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <FadeIn className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
            Now accepting Q3 clients
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
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
                Start Training
                <ArrowRight className="h-4 w-4" />
              </Button>
            </InquiryModal>
            <Button size="lg" variant="outline" asChild>
              <Link href="/programs">View Programs</Link>
            </Button>
          </div>
        </FadeIn>
        <FadeIn delay={0.15} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] rounded-tl-[4rem] bg-muted">
            <Image
              src="/evanactionweb.png"
              alt="Coach training in a modern gym"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
