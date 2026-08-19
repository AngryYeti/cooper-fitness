import Link from "next/link";
import { Instagram, Twitter, Youtube } from "lucide-react";
import { Logo } from "@/components/shared/logo";

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

export function MarketingFooter({ campaign = false }: { campaign?: boolean }) {
  if (campaign) {
    return (
      <footer className="relative z-10 founding-footer" style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 sm:px-6 lg:px-8">
          <Logo />
          <p>Individualized coaching for adults ready to make a real commitment.</p>
          <nav aria-label="Founding campaign" className="flex flex-wrap gap-x-6 gap-y-3">
            <Link href="/#mechanism">THE COACHING</Link>
            <Link href="/#coach">ABOUT EVAN</Link>
            <Link href="/#faq">FAQ</Link>
            <Link href={process.env.NEXT_PUBLIC_FOUNDING_TERMS_URL || "/terms"}>TERMS</Link>
            <Link href={process.env.NEXT_PUBLIC_FOUNDING_PRIVACY_URL || "/privacy"}>PRIVACY</Link>
            <Link href={process.env.NEXT_PUBLIC_FOUNDING_REFUND_POLICY_URL || "/refunds"}>REFUND POLICY</Link>
            <a href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "evan@cooper.fitness"}`}>CONTACT</a>
          </nav>
          <p className="font-mono">&copy; {new Date().getFullYear()} COOPER FITNESS. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative z-10" style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p style={{ maxWidth: 280, fontSize: "0.9rem", lineHeight: 1.65, color: "var(--muted-foreground)" }}>
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
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-white/8"
                  style={{ border: "1px solid rgba(255,255,255,0.14)", color: "var(--muted-foreground)" }}
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--foreground)" }}>
              SERVICES
            </h3>
            <ul className="space-y-3">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono transition-colors hover:text-foreground"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--foreground)" }}>
              RESOURCES
            </h3>
            <ul className="space-y-3">
              {RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono transition-colors hover:text-foreground"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.1em", color: "var(--muted-foreground)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--foreground)" }}>
              INQUIRE
            </h3>
            <Link
              href="/#contact"
              className="inline-flex items-center font-mono uppercase transition-all hover:-translate-y-[2px]"
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.16em",
                fontWeight: 500,
                padding: "12px 24px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.22)",
                color: "var(--foreground)",
              }}
            >
              SEND INQUIRY
            </Link>
          </div>
        </div>
        <p className="mt-12 text-center font-mono" style={{ fontSize: "0.6rem", letterSpacing: "0.14em", color: "var(--muted-foreground)", textTransform: "uppercase" }}>
          &copy; {new Date().getFullYear()} COOPER FITNESS. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
