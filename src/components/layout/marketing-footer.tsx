import Link from "next/link";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { InquiryForm } from "@/components/marketing/inquiry-form";

const SERVICE_LINKS = [
  { href: "/services/online-weight-loss-coaching", label: "WEIGHT LOSS" },
  { href: "/services/online-personal-training", label: "PERSONAL TRAINING" },
  { href: "/services/nutrition-coaching", label: "NUTRITION" },
];

const RESOURCE_LINKS = [
  { href: "/testimonials", label: "TESTIMONIALS" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "BLOG" },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
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
                  className="flex h-10 w-10 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">
              SERVICES
            </h3>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((link) => (
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
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">
              RESOURCES
            </h3>
            <ul className="space-y-3">
              {RESOURCE_LINKS.map((link) => (
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
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-foreground">
              INQUIRE
            </h3>
            <InquiryForm />
          </div>
        </div>
        <p className="mt-12 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} COOPER FITNESS. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
