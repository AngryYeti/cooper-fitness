"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { InquiryModal } from "@/components/shared/inquiry-modal";
import { Button } from "@/components/ui/button";
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

export function MarketingHeader() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {MAIN_NAV.map((item) =>
            item.type === "dropdown" ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                  <ChevronDown className="h-3 w-3" />
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 top-full z-50 mt-1 min-w-[200px] rounded-sm border border-border bg-card p-1 shadow-lg">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-sm px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
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
                className="text-sm font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
        <div className="flex items-center gap-2">
          <InquiryModal>
            <Button variant="secondary" className="hidden sm:inline-flex">
              START TRAINING
            </Button>
          </InquiryModal>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      <div
        className={cn(
          "border-t border-border md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
          {MAIN_NAV.map((item) =>
            item.type === "dropdown" ? (
              <div key={item.label} className="space-y-1">
                <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="rounded-sm px-4 py-3 pl-6 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm px-4 py-3 text-sm font-medium uppercase tracking-wider text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
          <InquiryModal>
            <Button variant="secondary" className="mt-2" onClick={() => setOpen(false)}>
              START TRAINING
            </Button>
          </InquiryModal>
        </nav>
      </div>
    </header>
  );
}
