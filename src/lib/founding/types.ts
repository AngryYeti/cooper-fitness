export type FoundingInventoryState = "OPEN" | "HELD" | "FULL";

export const FOUNDING_STRIPE_PRICE_ID = "price_1UBFsOK67H8U3fOqRw3dEIhw";
export const FOUNDING_STRIPE_PRODUCT_ID = "prod_VBd8KVVN9wW0cM";
export const FOUNDING_CHECKOUT_HOST = "checkout.stripe.com";

export interface FoundingInventory {
  state: FoundingInventoryState;
  purchasedCount: number;
  pendingCount: number;
  capacity: number;
}

export interface FoundingPurchaser {
  name: string;
  email: string;
}

export interface FoundingCheckoutResult {
  checkoutUrl: string;
  expiresAt: string;
}

export interface FoundingConfig {
  homepageEnabled: boolean;
  checkoutEnabled: boolean;
  crmOrigin: string;
  internalApiSecret: string;
  siteOrigin: string;
  supportEmail: string;
  termsUrl: string;
  privacyUrl: string;
  refundPolicyUrl: string;
}
