import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Button } from "@/components/ui/button";

export function ContactCtaSection() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="overflow-hidden rounded-sm bg-primary p-8 text-center text-primary-foreground md:p-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/70">
              05 — GET STARTED
            </p>
            <h2 className="mt-4 text-balance text-3xl font-bold uppercase tracking-tight md:text-4xl">
              Ready to train with intention?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-primary-foreground/80 md:text-lg">
              Tell Evan about your goals and schedule. You&apos;ll hear back within 24 hours with
              next steps.
            </p>
            <Button size="lg" variant="secondary" className="mt-8" asChild>
              <Link href="/#pricing">
                VIEW PRICING
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
