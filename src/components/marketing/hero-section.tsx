"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useCallback } from "react";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

export function HeroSection() {
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          if (imageRef.current) {
            imageRef.current.style.transform = `translateY(${window.scrollY * -0.06}px)`;
          }
          ticking = false;
        });
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCardMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${mx}%`);
    el.style.setProperty("--my", `${my}%`);
  }, []);

  return (
    <section className="relative flex items-end overflow-hidden" style={{ minHeight: "94vh" }}>
      <div ref={imageRef} className="absolute inset-0 will-change-transform">
        <Image
          src="/evanactionweb.png"
          alt="Coach training in a modern gym"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(20,18,16,0.28) 0%, rgba(20,18,16,0.50) 52%, rgba(20,18,16,0.93) 100%)",
        }}
      />

      <div className="relative z-10 w-full" style={{ padding: "130px clamp(20px, 4vw, 56px) 64px" }}>
        <div className="flex items-end justify-between">
          <ScrollReveal>
            <div
              ref={cardRef}
              className="relative overflow-hidden"
              style={{
                maxWidth: 660,
                borderRadius: 26,
                padding: "38px clamp(24px, 3vw, 44px)",
                background: "linear-gradient(135deg, rgba(255,255,255,0.13), rgba(255,255,255,0.04))",
                backdropFilter: "blur(24px) saturate(140%)",
                WebkitBackdropFilter: "blur(24px) saturate(140%)",
                border: "1px solid rgba(255,255,255,0.18)",
                boxShadow: "0 28px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.22)",
              }}
              onMouseMove={handleCardMove}
            >
              <div
                className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
                style={{
                  background: "radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.14), transparent 60%)",
                  opacity: 0,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0"; }}
                aria-hidden="true"
              />
              <div className="relative z-[1] space-y-6">
                <div
                  className="inline-flex items-center gap-2 font-mono"
                  style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    padding: "8px 16px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.06)",
                    color: "var(--foreground)",
                  }}
                >
                  <span
                    className="inline-block h-[7px] w-[7px] rounded-full"
                    style={{
                      background: "var(--primary)",
                      animation: "pulseDot 2.4s ease-in-out infinite",
                    }}
                    aria-hidden="true"
                  />
                  NOW ACCEPTING NEW CLIENTS — LIMITED SPOTS
                </div>

                <h1
                  style={{
                    fontFamily: "var(--font-space-grotesk), sans-serif",
                    fontWeight: 500,
                    fontSize: "clamp(2.9rem, 6vw, 5.2rem)",
                    lineHeight: 0.97,
                    letterSpacing: "-0.025em",
                    color: "var(--foreground)",
                  }}
                >
                  Fit Around{" "}
                  <span className="font-serif-italic" style={{ color: "var(--primary)" }}>
                    Your Real Life.
                  </span>
                </h1>

                <p
                  style={{
                    color: "var(--muted-foreground)",
                    fontSize: "clamp(1rem, 1.3vw, 1.18rem)",
                    lineHeight: 1.6,
                    maxWidth: "46ch",
                  }}
                >
                  Programs that fit around school runs, deadlines, and travel — built for busy parents who are ready to start, even if they&apos;ve never stepped foot in a gym.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/#pricing"
                    className="inline-flex items-center font-mono uppercase transition-all hover:-translate-y-[2px] hover:brightness-[1.06]"
                    style={{
                      fontSize: "0.72rem",
                      letterSpacing: "0.16em",
                      fontWeight: 500,
                      padding: "15px 28px",
                      borderRadius: 999,
                      background: "var(--primary)",
                      color: "var(--primary-foreground)",
                      boxShadow: "0 8px 30px oklch(0.70 0.14 245 / 0.4)",
                    }}
                  >
                    START TRAINING
                  </Link>
                  <Link
                    href="/programs"
                    className="inline-flex items-center font-mono uppercase transition-all hover:-translate-y-[2px]"
                    style={{
                      fontSize: "0.72rem",
                      letterSpacing: "0.16em",
                      fontWeight: 500,
                      padding: "15px 28px",
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.22)",
                      color: "var(--foreground)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    VIEW PROGRAMS
                  </Link>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="hidden lg:flex flex-col gap-3">
            {[
              { value: "+80 lb", label: "AVG DEADLIFT GAIN" },
              { value: "24 hr", label: "COACH REPLY TIME" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass font-mono text-center"
                style={{ padding: "14px 22px", borderRadius: 16 }}
              >
                <p className="text-lg font-semibold" style={{ color: "var(--foreground)" }}>{stat.value}</p>
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.16em", color: "var(--muted-foreground)", textTransform: "uppercase" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
