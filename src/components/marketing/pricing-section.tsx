"use client";

import { useState } from "react";
import { Check, Lock, RotateCcw, CreditCard } from "lucide-react";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { MagneticCard } from "@/components/effects/magnetic-card";
import { Section } from "@/components/shared/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckoutModal } from "@/components/stripe/checkout-modal";
import { PRICING_TIERS } from "@/lib/constants";
import { getTierBilledAmountDollars } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const tier = selectedTier
    ? PRICING_TIERS.find((t) => t.id === selectedTier)
    : null;

  return (
    <Section
      id="pricing"
      label="04 — INVESTMENT"
      title="Choose your commitment."
      description="The longer you commit, the deeper the work — and the better the price."
      className="text-center [&_h2]:mx-auto"
    >
      <p className="mb-6 text-sm font-bold uppercase tracking-widest text-primary">
        Only 5 spots available this quarter
      </p>
      <div className="grid gap-6 lg:grid-cols-3">
        {PRICING_TIERS.map((tier, i) => (
          <ScrollReveal key={tier.id} delay={i * 100}>
            <MagneticCard glow={tier.highlighted}>
              <Card
                className={cn(
                  "relative flex h-full flex-col p-8 text-left",
                  tier.highlighted &&
                    "border-primary shadow-[0_0_20px_rgba(74,111,255,0.15)]"
                )}
              >
                {tier.badge && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    {tier.badge}
                  </Badge>
                )}
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {tier.name}
                </p>
                <p className="mt-4 text-4xl font-bold">
                  {`$${tier.price}`}
                  <span className="text-lg font-normal opacity-70">
                    /{tier.period}
                  </span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tier.description}
                </p>
                <ul className="mt-8 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-8 w-full"
                  variant={tier.highlighted ? "default" : "secondary"}
                  onClick={() => setSelectedTier(tier.id)}
                >
                  GET STARTED
                </Button>
              </Card>
            </MagneticCard>
          </ScrollReveal>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-8 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><Lock className="h-3 w-3 text-primary" /> SECURE STRIPE CHECKOUT</span>
        <span className="flex items-center gap-1.5"><CreditCard className="h-3 w-3 text-primary" /> ALL MAJOR CARDS ACCEPTED</span>
        <span className="flex items-center gap-1.5"><RotateCcw className="h-3 w-3 text-primary" /> CANCEL ANYTIME</span>
      </div>

      {tier && (
        <CheckoutModal
          open={!!selectedTier}
          onClose={() => setSelectedTier(null)}
          tierId={tier.id}
          tierName={tier.name}
          tierPrice={tier.price}
          tierBillingAmount={getTierBilledAmountDollars(tier)}
        />
      )}
    </Section>
  );
}
