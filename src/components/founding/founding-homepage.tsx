import Image from "next/image";
import type { FoundingInventory } from "@/lib/founding/types";
import { FoundingCheckoutForm } from "./founding-checkout-form";
import { FoundingSections } from "./founding-sections";

type FoundingHomepageProps = {
  inventory: FoundingInventory;
  supportEmail: string;
  termsUrl: string;
  privacyUrl: string;
  refundPolicyUrl: string;
};

export function FoundingHomepage({ inventory, supportEmail, termsUrl, privacyUrl, refundPolicyUrl }: FoundingHomepageProps) {
  return (
    <div className="founding-page">
      <section className="founding-hero">
        <div className="founding-hero-image">
          <Image src="/evanactionweb.png" alt="Evan Cooper training in the gym" fill priority sizes="(max-width: 768px) 100vw, 55vw" />
        </div>
        <div className="founding-hero-panel">
          <p className="founding-eyebrow">FOUNDING FATHERS*</p>
          <h1>Five people. Six months. One plan built around real life.</h1>
          <p className="founding-hero-copy">Individualized strength training, sustainable nutrition guidance, and weekly accountability for adults ready to make a real commitment.</p>
          <div className="founding-offer-marker">
            <strong>$299 USD TOTAL</strong>
            <span>ONE-TIME FOUNDING RATE · DIRECT CHECKOUT</span>
          </div>
          <FoundingCheckoutForm state={inventory.state} supportEmail={supportEmail} termsUrl={termsUrl} privacyUrl={privacyUrl} refundPolicyUrl={refundPolicyUrl} />
          <p className="founding-inclusion">*FATHERHOOD NOT REQUIRED. COMMITMENT IS.</p>
        </div>
      </section>

      <FoundingSections />

      <section id="founding-offer" className="founding-section founding-offer-section">
        <div>
          <p className="founding-eyebrow">05 — FOUNDING FATHERS*</p>
          <h2>Five places to build the first version of Cooper Fitness together.</h2>
          <p className="founding-inclusion">*FATHERHOOD NOT REQUIRED. COMMITMENT IS.</p>
          <p>I’m opening five genuine coaching positions for adults who are ready to commit to the next six months and communicate honestly throughout the process.</p>
          <ul>
            <li>Individualized training for three or four sessions per week</li>
            <li>Approximately 45-minute sessions</li>
            <li>Commercial gym, home gym, or mixed-equipment options</li>
            <li>Sustainable nutrition guidance</li>
            <li>Weekly progress reviews</li>
            <li>Reasonable program adjustments when life changes</li>
            <li>Six months of onboarding, progression, and review</li>
          </ul>
        </div>
        <div className="founding-offer-aside">
          <p className="founding-price">$299 USD TOTAL</p>
          <p>One-time founding rate. Direct checkout required. Be ready to begin within 14 days of purchase.</p>
          <p>This is not a quick-fix challenge or a generic PDF plan. It is for people ready to follow a focused plan, communicate honestly, and help shape the founding coaching experience.</p>
          <FoundingCheckoutForm state={inventory.state} supportEmail={supportEmail} termsUrl={termsUrl} privacyUrl={privacyUrl} refundPolicyUrl={refundPolicyUrl} />
        </div>
      </section>

      <section id="founding-waitlist" className="founding-section founding-closing-cta">
        <p className="founding-eyebrow">COOPER FITNESS FOUNDING COHORT</p>
        <h2>Ready for a plan you can actually repeat?</h2>
        <p>Start with a focused six-month structure built around your actual life.</p>
        <p className="founding-inventory-note">Five founding positions. $299 USD total. Open to any adult.</p>
        {inventory.state === "OPEN" ? (
          <a className="founding-button founding-button-primary" href="#founding-offer">GET STARTED TODAY</a>
        ) : inventory.state === "HELD" ? (
          <>
            <span className="founding-button founding-button-muted" aria-disabled="true">SPOT TEMPORARILY HELD</span>
            <a className="founding-button founding-button-secondary" href={`mailto:${supportEmail}?subject=Cooper%20Fitness%20founding%20waitlist`}>JOIN THE WAITLIST</a>
          </>
        ) : (
          <a className="founding-button founding-button-primary" href={`mailto:${supportEmail}?subject=Cooper%20Fitness%20founding%20waitlist`}>JOIN THE WAITLIST</a>
        )}
        {inventory.state === "FULL" ? <p className="founding-waitlist-note">The founding cohort is full. Leave your details and we’ll contact you if a position opens or the next cohort is announced.</p> : null}
      </section>
    </div>
  );
}
