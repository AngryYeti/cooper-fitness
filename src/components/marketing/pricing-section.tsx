import { Check } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { Section } from "@/components/shared/section";
import { InquiryModal } from "@/components/shared/inquiry-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PRICING_TIERS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function PricingSection() {
  return (
    <Section
      id="pricing"
      label="04 — Investment"
      title="Choose your commitment."
      description="The longer you commit, the deeper the work — and the better the price."
      className="text-center [&_h2]:mx-auto"
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {PRICING_TIERS.map((tier, i) => (
          <FadeIn key={tier.id} delay={i * 0.1}>
            <Card
              className={cn(
                "relative flex h-full flex-col p-8 text-left",
                tier.highlighted && "border-foreground bg-foreground text-background",
              )}
            >
              {tier.badge && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  {tier.badge}
                </Badge>
              )}
              <p
                className={cn(
                  "text-xs font-medium uppercase tracking-wider",
                  tier.highlighted ? "text-background/60" : "text-muted-foreground",
                )}
              >
                {tier.name}
              </p>
              <p className="mt-4 text-4xl font-bold">
                {`$${tier.price}`}
                <span className="text-lg font-normal opacity-70">/{tier.period}</span>
              </p>
              <p
                className={cn(
                  "mt-2 text-sm",
                  tier.highlighted ? "text-background/70" : "text-muted-foreground",
                )}
              >
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
              <InquiryModal>
                <Button
                  className="mt-8 w-full"
                  variant={tier.highlighted ? "default" : "secondary"}
                >
                  Get started
                </Button>
              </InquiryModal>
            </Card>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
