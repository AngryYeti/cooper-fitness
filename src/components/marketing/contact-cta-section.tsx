"use client";

import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { InquiryForm } from "@/components/marketing/inquiry-form";

export function ContactCtaSection() {
  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div
            className="glass-strong overflow-hidden"
            style={{ borderRadius: 30, padding: "clamp(32px, 5vw, 56px)" }}
          >
            <div className="grid gap-12 lg:grid-cols-2 items-start">
              <div className="space-y-6">
                <p className="section-label">05 — GET STARTED</p>
                <h2
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(2rem, 3.6vw, 3.1rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                    color: "var(--foreground)",
                  }}
                >
                  Ready to train with{" "}
                  <span className="font-serif-italic" style={{ color: "var(--primary)" }}>intention?</span>
                </h2>
                <p style={{ color: "var(--muted-foreground)", fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "40ch" }}>
                  Tell Evan about your goals and schedule. You&apos;ll hear back within 24 hours with
                  next steps.
                </p>
              </div>
              <InquiryForm />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
