import "server-only";
import type { FoundingConfig } from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class FoundingConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FoundingConfigError";
  }
}

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new FoundingConfigError(`Missing founding configuration: ${name}`);
  return value;
}

function boolean(name: string): boolean {
  const value = required(name).toLowerCase();
  if (value !== "true" && value !== "false") {
    throw new FoundingConfigError(`Invalid founding boolean: ${name}`);
  }
  return value === "true";
}

function httpsOrLocalUrl(name: string): string {
  const value = required(name);
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new FoundingConfigError(`Invalid founding URL: ${name}`);
  }
  const local = parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
  if (parsed.protocol !== "https:" && !(local && parsed.protocol === "http:")) {
    throw new FoundingConfigError(`Founding URL must use HTTPS: ${name}`);
  }
  return parsed.origin;
}

function siteOrigin(): string {
  const value = required("NEXT_PUBLIC_SITE_URL");
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new FoundingConfigError("Invalid founding site origin");
  }
  const local = parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1";
  if (parsed.protocol !== "https:" && !(local && parsed.protocol === "http:")) {
    throw new FoundingConfigError("Founding site origin must use HTTPS");
  }
  return parsed.origin;
}

function publicUrl(name: string): string {
  return httpsOrLocalUrl(name);
}

export function getFoundingConfig(): FoundingConfig {
  const homepageEnabled = boolean("FOUNDING_HOMEPAGE_ENABLED");
  const checkoutEnabled = boolean("FOUNDING_CHECKOUT_ENABLED");
  const internalApiSecret = required("FOUNDING_INTERNAL_API_SECRET");
  if (internalApiSecret.length < 32) {
    throw new FoundingConfigError("Founding internal API secret is too short");
  }

  const supportEmail = required("NEXT_PUBLIC_SUPPORT_EMAIL").toLowerCase();
  if (supportEmail.length > 254 || !EMAIL_PATTERN.test(supportEmail)) {
    throw new FoundingConfigError("Invalid founding support email");
  }

  return {
    homepageEnabled,
    checkoutEnabled,
    crmOrigin: httpsOrLocalUrl("FOUNDING_CRM_ORIGIN"),
    internalApiSecret,
    siteOrigin: siteOrigin(),
    supportEmail,
    termsUrl: publicUrl("NEXT_PUBLIC_FOUNDING_TERMS_URL"),
    privacyUrl: publicUrl("NEXT_PUBLIC_FOUNDING_PRIVACY_URL"),
    refundPolicyUrl: publicUrl("NEXT_PUBLIC_FOUNDING_REFUND_POLICY_URL"),
  };
}
