"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function StickyCTA({ campaign = false }: { campaign?: boolean }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const isRecipeArea = pathname === "/recipes" || pathname.startsWith("/recipes/") ||
    (typeof window !== "undefined" && window.location.hostname === "recipes.cooper.fitness");
  const href = isRecipeArea ? "https://cooper.fitness/#contact" : campaign ? "/#founding-offer" : "/#pricing";
  const label = isRecipeArea ? "BOOK CONSULTATION" : campaign ? "GET STARTED TODAY" : "VIEW PRICING";
  const target = isRecipeArea ? "_blank" : undefined;

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (campaign && !isRecipeArea) return null;

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
        paddingBottom: "calc(1rem + env(safe-area-inset-bottom))",
      }}
    >
      <Link
        href={href}
        target={target}
        rel={target === "_blank" ? "noreferrer" : undefined}
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
        {label}
      </Link>
    </div>
  );
}
