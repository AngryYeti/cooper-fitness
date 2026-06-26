import Link from "next/link";
import { GlassCard } from "@/components/effects/glass-sheen";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  index?: number;
}

export function ServiceCard({ title, description, href, index = 0 }: ServiceCardProps) {
  return (
    <Link href={href} className="group block">
      <GlassCard className="transition-all duration-300 hover:-translate-y-[4px] hover:border-white/22">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] items-center gap-4 p-6">
          <div>
            <span className="font-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.16em", color: "var(--muted-foreground)", textTransform: "uppercase" }}>
              TRACK 0{index + 1}
            </span>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 500, color: "var(--foreground)", marginTop: 4 }}>
              {title}
            </h3>
          </div>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.9rem", lineHeight: 1.6 }}>
            {description}
          </p>
          <span
            className="font-mono uppercase transition-all group-hover:translate-x-1"
            style={{ fontSize: "0.66rem", letterSpacing: "0.14em", color: "var(--primary)" }}
          >
            VIEW →
          </span>
        </div>
      </GlassCard>
    </Link>
  );
}
