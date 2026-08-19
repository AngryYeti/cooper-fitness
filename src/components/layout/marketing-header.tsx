"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

type NavItem =
  | { type: "link"; href: string; label: string }
  | { type: "dropdown"; label: string; children: { href: string; label: string }[] };

const MAIN_NAV: NavItem[] = [
  {
    type: "dropdown",
    label: "Services",
    children: [
      { href: "/services/online-weight-loss-coaching", label: "Weight Loss" },
      { href: "/services/online-personal-training", label: "Personal Training" },
      { href: "/services/nutrition-coaching", label: "Nutrition" },
    ],
  },
  { type: "link", href: "/about", label: "About" },
  { type: "link", href: "/testimonials", label: "Testimonials" },
  { type: "link", href: "/pricing", label: "Pricing" },
  { type: "link", href: "/faq", label: "FAQ" },
];

const FOUNDING_NAV: NavItem[] = [
  { type: "link", href: "/#mechanism", label: "THE COACHING" },
  { type: "link", href: "/#coach", label: "ABOUT EVAN" },
  { type: "link", href: "/#faq", label: "FAQ" },
];

export function MarketingHeader({ campaign = false }: { campaign?: boolean }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  const nav = campaign ? FOUNDING_NAV : MAIN_NAV;
  const primaryHref = campaign ? "/#founding-offer" : "/#pricing";

  return (
    <header className="fixed top-0 left-0 right-0 z-[60]" style={{
      backdropFilter: "blur(18px) saturate(150%)",
      WebkitBackdropFilter: "blur(18px) saturate(150%)",
      background: "linear-gradient(180deg, rgba(20,18,16,0.62), rgba(20,18,16,0.20))",
      borderBottom: "1px solid rgba(255,255,255,0.12)",
    }}>
      <div
        className="absolute top-0 left-0 h-[2px] z-[70] origin-left"
        style={{
          transform: `scaleX(${scrollProgress})`,
          background: "linear-gradient(90deg, var(--primary), oklch(0.84 0.06 240))",
          boxShadow: "0 0 12px var(--primary)",
          width: "100%",
        }}
      />
      <div className="flex items-center justify-between" style={{ padding: "15px clamp(18px, 4vw, 56px)" }}>
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {nav.map((item) =>
            item.type === "dropdown" ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <button
                  type="button"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="menu"
                  aria-controls="services-menu"
                  className="flex items-center gap-1 font-mono uppercase transition-colors"
                  style={{ fontSize: "0.7rem", letterSpacing: "0.18em", color: "var(--muted-foreground)" }}
                >
                  {item.label}
                  <ChevronDown className="h-3 w-3" />
                </button>
                {dropdownOpen && (
                  <div
                    id="services-menu"
                    role="menu"
                    className="absolute left-0 top-full z-50 min-w-[200px] rounded-[16px] glass p-1 mt-2"
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        role="menuitem"
                        className="block rounded-[12px] px-3 py-2 text-sm transition-colors hover:bg-white/8"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono uppercase transition-colors hover:text-foreground"
                style={{ fontSize: "0.7rem", letterSpacing: "0.18em", color: "var(--muted-foreground)" }}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={primaryHref}
            className="hidden sm:inline-flex items-center font-mono uppercase transition-all hover:-translate-y-[2px]"
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
            {campaign ? "GET STARTED TODAY" : "START TRAINING"}
          </Link>
          <button
            type="button"
            className="md:hidden p-2 text-foreground"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <div
        className={cn(
          "border-t border-white/12 md:hidden",
          mobileOpen ? "block" : "hidden"
        )}
        style={{ background: "rgba(20,18,16,0.90)", backdropFilter: "blur(18px)" }}
      >
        <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
          {nav.map((item) =>
            item.type === "dropdown" ? (
              <div key={item.label} className="space-y-1">
                <p className="px-4 py-2 font-mono text-xs uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
                  {item.label}
                </p>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="block rounded-[12px] px-4 py-3 pl-6 text-sm hover:bg-white/6"
                    style={{ color: "var(--muted-foreground)" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-[12px] px-4 py-3 font-mono text-sm uppercase tracking-wider hover:bg-white/6"
                style={{ color: "var(--muted-foreground)" }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            href={primaryHref}
            className="mt-2 block text-center font-mono uppercase rounded-full"
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.16em",
              fontWeight: 500,
              padding: "15px 28px",
              background: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
            onClick={() => setMobileOpen(false)}
          >
            {campaign ? "GET STARTED TODAY" : "START TRAINING"}
          </Link>
        </nav>
      </div>
    </header>
  );
}
