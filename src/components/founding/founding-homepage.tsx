import Image from "next/image";
import type { FoundingInventory } from "@/lib/founding/types";
import {
  FOUNDING_APPROX_CAD,
  FOUNDING_COHORT_STARTS,
  FOUNDING_ENROLLMENT_CLOSES,
  foundingSpotsLeft,
} from "@/lib/founding/campaign";
import { InquiryModal } from "@/components/shared/inquiry-modal";
import { FoundingCheckoutForm } from "./founding-checkout-form";
import { FoundingSections } from "./founding-sections";

type FoundingHomepageProps = {
  inventory: FoundingInventory;
  supportEmail: string;
  termsUrl: string;
  privacyUrl: string;
  refundPolicyUrl: string;
};

function SpotsLeft({ inventory }: { inventory: FoundingInventory }) {
  if (inventory.state !== "OPEN" || inventory.capacity < 1) return null;
  const left = foundingSpotsLeft(inventory.purchasedCount, inventory.pendingCount, inventory.capacity);
  return (
    <p className="founding-spots-left">
      {left} OF {inventory.capacity} SPOTS LEFT · ENROLLMENT CLOSES {FOUNDING_ENROLLMENT_CLOSES.toUpperCase()}
    </p>
  );
}

function FreeCallButton({ inventory }: { inventory: FoundingInventory }) {
  if (inventory.state !== "OPEN") return null;
  return (
    <InquiryModal
      title="BOOK A FREE 15-MIN CALL"
      description="Not sure yet? Tell Evan a bit about your week and your goals, and he'll reach out within 24 hours to set up a quick call."
    >
      <button type="button" className="founding-button founding-button-secondary founding-call-button">
        NOT SURE? BOOK A FREE 15-MIN CALL
      </button>
    </InquiryModal>
  );
}

export function FoundingHomepage({ inventory, supportEmail, termsUrl, privacyUrl, refundPolicyUrl }: FoundingHomepageProps) {
  return (
    <div className="founding-page">
      <section className="founding-hero">
        <div className="founding-hero-image">
          <Image src="/evanactionweb.png" alt="Evan Cooper training in the gym" fill priority sizes="(max-width: 768px) 100vw, 55vw" />
        </div>
        <div className="founding-hero-panel">
          <p className="founding-eyebrow">FOUNDING MEMBERS</p>
          <h1>Five people. 12 weeks. One plan built around real life.</h1>
          <p className="founding-hero-copy">Individualized strength training, sustainable nutrition guidance, and weekly accountability for adults ready to make a real commitment.</p>
          <div className="founding-offer-marker">
            <strong>$399 USD TOTAL</strong>
            <span>ONE-TIME FOUNDING RATE · DIRECT CHECKOUT</span>
            <span className="founding-offer-detail">{FOUNDING_APPROX_CAD.toUpperCase()} · COACHING STARTS BY {FOUNDING_COHORT_STARTS.toUpperCase()}</span>
          </div>
          <SpotsLeft inventory={inventory} />
          <FoundingCheckoutForm state={inventory.state} supportEmail={supportEmail} termsUrl={termsUrl} privacyUrl={privacyUrl} refundPolicyUrl={refundPolicyUrl} />
          <FreeCallButton inventory={inventory} />
          <p className="founding-inclusion">Five founding-member spots. The first cohort helps shape what Cooper Fitness becomes.</p>
        </div>
      </section>

      <FoundingSections />

      <section id="founding-offer" className="founding-section founding-offer-section">
        <div>
          <p className="founding-eyebrow">05 — FOUNDING MEMBERS</p>
          <h2>Five places to build the first version of Cooper Fitness together.</h2>
          <p className="founding-inclusion">Five founding-member spots. The first cohort helps shape what Cooper Fitness becomes.</p>
          <p>I’m opening five genuine coaching positions for adults who are ready to commit to the next 12 weeks, communicate honestly, and help shape the first version of Cooper Fitness.</p>
          <ul>
            <li>Personalized 1-on-1 training for three or four sessions per week</li>
            <li>Approximately 45-minute sessions</li>
            <li>Commercial gym, home gym, or mixed-equipment options</li>
            <li>Flexible nutrition guidance for normal meals and real schedules</li>
            <li>Weekly check-ins and accountability</li>
            <li>Direct coaching access for questions, form feedback, and accountability between check-ins</li>
            <li>Initial onboarding call to set the plan up properly</li>
            <li>Reasonable program adjustments when life changes</li>
            <li>Founding-member feedback and testimonial opportunity, with permission</li>
            <li>12 weeks of onboarding, progression, and review</li>
          </ul>
        </div>
        <div className="founding-offer-aside">
          <p className="founding-price">$399 USD TOTAL</p>
          <p>One-time founding rate ({FOUNDING_APPROX_CAD}, approximate. Your bank sets the final conversion). Direct checkout required. Enrollment closes {FOUNDING_ENROLLMENT_CLOSES} and coaching starts by {FOUNDING_COHORT_STARTS}.</p>
          <p>This is not a quick-fix challenge or a generic PDF plan. It is for people ready to follow a focused plan, communicate honestly, and help shape the founding coaching experience. With permission, founding members may also be invited to share a testimonial about the process.</p>
          <SpotsLeft inventory={inventory} />
          <FoundingCheckoutForm state={inventory.state} supportEmail={supportEmail} termsUrl={termsUrl} privacyUrl={privacyUrl} refundPolicyUrl={refundPolicyUrl} />
          <FreeCallButton inventory={inventory} />
        </div>
      </section>

      <section id="founding-waitlist" className="founding-section founding-closing-cta">
        <p className="founding-eyebrow">COOPER FITNESS FOUNDING COHORT</p>
        <h2>Ready for a plan you can actually repeat?</h2>
        <p>Start before the holidays instead of waiting for January. A focused 12-week structure built around your actual life, starting by {FOUNDING_COHORT_STARTS}.</p>
        <p className="founding-inventory-note">Five founding member spots. $399 USD total. Enrollment closes {FOUNDING_ENROLLMENT_CLOSES}. Open to any adult.</p>
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
