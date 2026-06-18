import { PRICING_TIERS } from "@/lib/constants";

export type PricingTier = (typeof PRICING_TIERS)[number];

export function getPricingTier(tierId: string): PricingTier | undefined {
  return PRICING_TIERS.find((tier) => tier.id === tierId);
}

export function getTierBilledAmountCents(tier: PricingTier): number {
  return tier.price * tier.billingMonths * 100;
}

export function getTierBilledAmountDollars(tier: PricingTier): number {
  return getTierBilledAmountCents(tier) / 100;
}
