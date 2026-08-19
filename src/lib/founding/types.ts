export type FoundingInventoryState = "OPEN" | "HELD" | "FULL";

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
