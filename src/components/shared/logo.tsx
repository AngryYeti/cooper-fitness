import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "transition-opacity hover:opacity-80",
        className,
      )}
      style={{
        fontFamily: "var(--font-space-grotesk), sans-serif",
        fontWeight: 600,
        fontSize: "0.96rem",
        letterSpacing: "0.14em",
        color: "var(--foreground)",
      }}
    >
      COOPER
      <span style={{ color: "var(--primary)" }}>/</span>
      FITNESS
    </Link>
  );
}
