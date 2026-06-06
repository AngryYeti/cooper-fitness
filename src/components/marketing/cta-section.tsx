import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Button } from "@/components/ui/button";

export function CTASection({
  title = "READY TO START YOUR TRANSFORMATION?",
  description = "Choose a plan that fits your goals and start your transformation today.",
  buttonText = "VIEW PRICING",
}: {
  title?: string;
  description?: string;
  buttonText?: string;
}) {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
            {description}
          </p>
          <div className="mt-8">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/#pricing">
                {buttonText}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
