"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";
import type { FoundingInventoryState } from "@/lib/founding/types";

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

export function parseCampaignInventoryState(input: unknown): FoundingInventoryState {
  if (!input || typeof input !== "object" || Array.isArray(input)) return "FULL";
  const state = (input as Record<string, unknown>).state;
  return state === "OPEN" || state === "HELD" || state === "FULL" ? state : "FULL";
}

export function MarketingHeader({ campaign = false }: { campaign?: boolean }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [campaignInventoryState, setCampaignInventoryState] = useState<FoundingInventoryState>("FULL");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!campaign) return;
    let active = true;
    fetch("/api/founding/inventory", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) return "FULL" as FoundingInventoryState;
        return parseCampaignInventoryState(await response.json());
      })
      .catch(() => "FULL" as FoundingInventoryState)
      .then((state) => {
        if (active) setCampaignInventoryState(state);
      });
    return () => {
      active = false;
    };
  }, [campaign]);

  const openDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  const isRecipeArea = pathname === "/recipes" || pathname.startsWith("/recipes/") ||
    (typeof window !== "undefined" && window.location.hostname === "recipes.cooper.fitness");

  if (isRecipeArea) {
    return (
      <header className="fixed top-0 left-0 right-0 z-[60]" style={{
        backdropFilter: "blur(18px) saturate(150%)",
        WebkitBackdropFilter: "blur(18px) saturate(150%)",
        background: "linear-gradient(180deg, rgba(20,18,16,0.82), rgba(20,18,16,0.42))",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
      }}>
        <div className="flex items-center justify-between gap-3" style={{ padding: "13px clamp(16px, 4vw, 56px)" }}>
          <Logo href="https://cooper.fitness" />
          <div className="flex items-center gap-2">
            <a
              href="https://cooper.fitness/#contact"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center font-mono uppercase transition-all hover:-translate-y-[2px]"
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.12em",
                fontWeight: 500,
                padding: "10px 14px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.22)",
                color: "var(--foreground)",
              }}
            >
              BOOK CONSULTATION
            </a>
            <a
              href={campaign ? "https://cooper.fitness/#founding-offer" : "https://cooper.fitness/#pricing"}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center font-mono uppercase transition-all hover:-translate-y-[2px]"
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.12em",
                fontWeight: 500,
                padding: "10px 14px",
                borderRadius: 999,
                background: "var(--primary)",
                color: "var(--primary-foreground)",
                boxShadow: "0 8px 30px oklch(0.70 0.14 245 / 0.4)",
              }}
            >
              {campaign ? "GET STARTED TODAY" : "START TRAINING"}
            </a>
          </div>
        </div>
      </header>
    );
  }

  const nav = campaign ? FOUNDING_NAV : MAIN_NAV;
  const primaryHref = campaign
    ? campaignInventoryState === "OPEN" ? "/#founding-offer" : "/#founding-waitlist"
    : "/#pricing";
  const primaryLabel = campaign
    ? campaignInventoryState === "OPEN" ? "GET STARTED TODAY" : "JOIN THE WAITLIST"
    : "START TRAINING";

  return (
    <header className="fixed top-0 left-0 right-0 z-[60]" style={{
      backdropFilter: "blur(18px) saturate(150%)",
      WebkitBackdropFilter: "blur(18px) saturate(150%)",
      background: "linear-gradient(180deg, rgba(20,18,16,0.72), rgba(20,18,16,0.30))",
      borderBottom: "1px solid rgba(255,255,255,0.12)",
    }}>
      {/* Founding Offer Top Banner */}
      <Link
        href="/#founding-offer"
        className="group relative flex items-center justify-center gap-2.5 px-4 py-2 text-center transition-all hover:bg-white/5 border-b border-white/10"
        style={{
          background: "linear-gradient(90deg, rgba(74,111,255,0.14), rgba(255,255,255,0.03), rgba(74,111,255,0.14))",
        }}
      >
        <span
          className="font-mono text-[0.6rem] tracking-[0.16em] uppercase px-2 py-0.5 rounded-full font-semibold shrink-0"
          style={{
            background: "var(--primary)",
            color: "var(--primary-foreground)",
          }}
        >
          ✦ FOUNDING COHORT
        </span>
        <span className="font-mono text-[0.68rem] tracking-[0.08em] text-foreground font-medium truncate sm:overflow-visible">
          12 Weeks 1-on-1 Coaching for <strong>$399 USD</strong>{" "}
          <span className="text-muted-foreground hidden sm:inline">(Founding Members · 5 Spots Only)</span>
        </span>
        <span className="font-mono text-[0.68rem] text-primary font-bold group-hover:translate-x-0.5 transition-transform shrink-0">
          Claim Spot &rarr;
        </span>
      </Link>

      <div
        className="absolute top-0 left-0 h-[2px] z-[70] origin-left"
        style={{
          transform: `scaleX(${scrollProgress})`,
          background: "linear-gradient(90deg, var(--primary), oklch(0.84 0.06 240))",
          boxShadow: "0 0 12px var(--primary)",
          width: "100%",
        }}
      />
      <div className="flex items-center justify-between" style={{ padding: "13px clamp(18px, 4vw, 56px)" }}>
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
            {primaryLabel}
          </Link>
          <button
            type="button"
            className="marketing-menu-toggle md:hidden p-2 text-foreground"
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
            {primaryLabel}
          </Link>
        </nav>
      </div>
    </header>
  );
}
