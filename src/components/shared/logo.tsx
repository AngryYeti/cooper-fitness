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
        "text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80",
        className,
      )}
    >
      COOPER / FITNESS
    </Link>
  );
}
