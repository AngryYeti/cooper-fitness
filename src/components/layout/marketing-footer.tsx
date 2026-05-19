import Link from "next/link";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { InquiryForm } from "@/components/marketing/inquiry-form";

const PROTOCOL_LINKS = [
  { href: "/programs#strength", label: "Strength" },
  { href: "/programs#weight-loss", label: "Weight Loss" },
  { href: "/programs#accountability", label: "Accountability" },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              High-performance coaching for the modern professional. Built on data,
              sustained by discipline.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "https://instagram.com/_cooperfitness", label: "Instagram" },
                { icon: Youtube, href: "https://youtube.com/@cooperfitness", label: "YouTube" },
                { icon: Twitter, href: "https://twitter.com/cooperfitnessx", label: "Twitter" },
              ].map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold">Protocol</h3>
            <ul className="space-y-3">
              {PROTOCOL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div id="inquire">
            <h3 className="mb-4 text-sm font-semibold">Inquire</h3>
            <InquiryForm />
          </div>
        </div>
        <p className="mt-12 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Cooper Fitness. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
