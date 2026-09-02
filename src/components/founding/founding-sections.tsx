import Image from "next/image";

const mechanismCards = [
  ["TRAINING THAT FITS", "Strength programming built around your experience, equipment, schedule, and recovery."],
  ["NUTRITION WITHOUT THE RESET", "Flexible guidance for normal meals, social plans, and the 80/20 decisions that make consistency possible."],
  ["WEEKLY ACCOUNTABILITY", "A clear weekly review of what happened, what needs changing, and what to focus on next."],
  ["ADJUSTMENTS WHEN LIFE MOVES", "Travel, deadlines, missed sessions, and changing equipment are part of the plan—not reasons to throw it away."],
] as const;

export function FoundingSections() {
  return (
    <>
      <section id="mechanism" className="founding-section founding-section-grid">
        <div>
          <p className="founding-eyebrow">01 — THE 45-MINUTE SYSTEM</p>
          <h2>Focused work. Repeatable structure.</h2>
          <p className="founding-lede">Most sessions are built around approximately 45 focused minutes, three or four times per week.</p>
        </div>
        <div className="founding-card-grid">
          {mechanismCards.map(([title, copy]) => (
            <article className="founding-card" key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="schedule" className="founding-section founding-section-grid founding-section-tint">
        <div>
          <p className="founding-eyebrow">02 — WHAT THIS CAN LOOK LIKE</p>
          <h2>A plan that leaves room for life.</h2>
          <p className="founding-lede">Your week is built around what you can repeat—not an ideal schedule you can only follow once.</p>
        </div>
        <div className="founding-schedule" aria-label="Example weekly structure">
          <p>MON / 45 MIN / FULL-BODY STRENGTH</p>
          <p>WED / 45 MIN / UPPER-BODY STRENGTH</p>
          <p>SAT / 45 MIN / LOWER-BODY STRENGTH</p>
          <p>OPTIONAL / WALKING, CONDITIONING, OR A MISSED-SESSION ADJUSTMENT</p>
          <small>Example structure only. Your plan is individualized around your schedule, equipment, and current level.</small>
        </div>
      </section>

      <section id="review" className="founding-section founding-review">
        <p className="founding-eyebrow">03 — THE WEEKLY REVIEW</p>
        <h2>Every week has a next move.</h2>
        <p>You’ll review the sessions you completed, the exercises that felt good or difficult, your nutrition wins and sticking points, your schedule for the week ahead, and the one adjustment most likely to keep you moving.</p>
        <p>The goal is not to collect perfect weeks. It is to keep making useful decisions.</p>
      </section>

      <section id="coach" className="founding-section founding-founder-grid">
        <div className="founding-founder-image">
          <Image src="/evanselfiegym.jpeg" alt="Evan Cooper in the gym" fill sizes="(max-width: 768px) 100vw, 42vw" />
        </div>
        <div>
          <p className="founding-eyebrow">04 — YOUR COACH</p>
          <h2>Coaching built for the week you actually have.</h2>
          <p>I’m Evan, founder and coach at Cooper Fitness. I built this around a simple belief: your plan should support your life, not compete with it.</p>
          <p>We’ll build training around your schedule, your equipment, and your current level. You do not need a perfect week to make progress. You need a clear next step, honest communication, and a plan that can adapt when life changes.</p>
          <p className="founding-signature">— EVAN COOPER / FOUNDER &amp; COACH</p>
        </div>
      </section>

      <section id="faq" className="founding-section founding-faq">
        <p className="founding-eyebrow">FAQ</p>
        <div className="founding-faq-list">
          <details><summary>DO I NEED A GYM?</summary><p>No. We can build around a commercial gym, home gym, or a combination.</p></details>
          <details><summary>DO I NEED TRAINING EXPERIENCE?</summary><p>No. Your plan starts from your current level.</p></details>
          <details><summary>HOW MUCH TIME DOES IT TAKE?</summary><p>Most sessions are designed around approximately 45 focused minutes, three or four times per week.</p></details>
          <details><summary>WHO IS THIS FOR?</summary><p>Busy adults of any gender who are ready to commit to a clear plan, communicate honestly, and make useful adjustments when life changes.</p></details>
          <details><summary>WHAT DOES THE WEEKLY REVIEW INCLUDE?</summary><p>A structured review of your training, nutrition, schedule, and next adjustment. It is not a promise of unlimited or 24-hour messaging.</p></details>
          <details><summary>WHEN WILL I START?</summary><p>You should be ready to begin within 14 days of purchase. Your onboarding details will be sent after successful payment.</p></details>
          <details><summary>HOW DO I GET STARTED?</summary><p>Select GET STARTED TODAY, complete the one-time USD $399 checkout for 12 weeks of coaching, and follow the onboarding instructions on the success page and email.</p></details>
        </div>
      </section>
    </>
  );
}
