"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      } p-4 md:hidden`}
      style={{
        borderTop: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(20,18,16,0.90)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
    >
      <Link
        href="/#pricing"
        className="flex w-full items-center justify-center font-mono uppercase transition-all"
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
        VIEW PRICING
      </Link>
    </div>
  );
}
