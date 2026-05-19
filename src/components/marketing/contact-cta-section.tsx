import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { Button } from "@/components/ui/button";

export function ContactCtaSection() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="overflow-hidden rounded-[2.5rem] bg-foreground p-8 text-center text-background md:p-14">
            <p className="section-label text-primary">05 — Get started</p>
            <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Ready to train with intention?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-background/70 md:text-lg">
              Tell Evan about your goals and schedule. You&apos;ll hear back within 24 hours with
              next steps.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/#inquire">
                Send an inquiry
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
