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
        "text-sm font-bold tracking-[0.3em] text-foreground transition-opacity hover:opacity-80",
        className,
      )}
    >
      COOPER
      <span className="mx-1 text-primary">/</span>
      FITNESS
    </Link>
  );
}
