import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { GlassCard } from "@/components/effects/glass-sheen";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Mail, Calendar, ArrowRight } from "lucide-react";

export const metadata: Metadata = generatePageMetadata({
  title: "Welcome Founding Member — Cooper Fitness",
  description: "Your Founding Member spot is confirmed. Check your email for next steps.",
  path: "/founder/success",
});

export default function FounderSuccessPage() {
  return (
    <div className="pt-16 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 text-primary mb-2">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-primary font-semibold">
            PAYMENT CONFIRMED
          </p>
          <h1
            style={{
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 600,
              fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: "var(--foreground)",
            }}
          >
            You&apos;re in. Welcome to the Founding Cohort.
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Your 6 months of coaching starts now. We have sent your confirmation and next steps to your email.
          </p>
        </div>

        <GlassCard className="text-left p-8 md:p-10 space-y-6" strong>
          <h2 className="text-lg font-bold uppercase tracking-wider text-foreground">
            What Happens Next:
          </h2>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-mono text-sm font-bold shrink-0 mt-0.5">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">
                  1. Check your email
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Look for an email from <strong>evan@cooper.fitness</strong> with the subject <em>&ldquo;You&apos;re in — let&apos;s book your first call&rdquo;</em>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-mono text-sm font-bold shrink-0 mt-0.5">
                <Calendar className="h-4 w-4" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">
                  2. Book your 1-on-1 Zoom kickoff
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Use the booking link in your email to pick a 20–30 minute time slot that fits your schedule.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-mono text-sm font-bold shrink-0 mt-0.5">
                3
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">
                  3. We build your personalized plan
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  After we talk through your goals, schedule, and equipment, I&apos;ll deliver your custom 3–4 day training block and nutrition protocol.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-border/50 text-xs text-muted-foreground">
            Didn&apos;t receive the email after a few minutes? Check your spam folder or reach out directly at{" "}
            <a href="mailto:evan@cooper.fitness" className="text-primary hover:underline">
              evan@cooper.fitness
            </a>.
          </div>
        </GlassCard>

        <div className="pt-4 flex justify-center">
          <Button asChild variant="outline">
            <Link href="/">
              RETURN TO HOME
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
