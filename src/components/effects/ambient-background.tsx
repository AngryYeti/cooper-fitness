"use client";

import { useEffect, useRef } from "react";

export function AmbientBackground() {
  const orbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = orbsRef.current;
    if (!el) return;

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          const children = el!.children;
          for (let i = 0; i < children.length; i++) {
            const factor = 0.1 + i * 0.05;
            (children[i] as HTMLElement).style.transform = `translateY(${y * factor}px)`;
          }
          ticking = false;
        });
      }
    }

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mql.matches) {
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="ambient-glow" />
      <div ref={orbsRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            top: "10%",
            right: "5%",
            background: "oklch(0.72 0.12 248 / 0.30)",
            filter: "blur(54px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            top: "40%",
            left: "-5%",
            background: "oklch(0.66 0.10 252 / 0.28)",
            filter: "blur(48px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 350,
            height: 350,
            top: "70%",
            right: "20%",
            background: "oklch(0.60 0.12 255 / 0.22)",
            filter: "blur(44px)",
          }}
        />
      </div>
    </>
  );
}
