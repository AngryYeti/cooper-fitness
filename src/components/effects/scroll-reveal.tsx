"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "left" | "right" | "scale";

export function ScrollReveal({
  children,
  className,
  delay = 0,
  variant = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add("revealed");
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const variantClass = {
    up: "",
    left: "scroll-reveal--slide-left",
    right: "scroll-reveal--slide-right",
    scale: "scroll-reveal--scale",
  }[variant];

  return (
    <div ref={ref} className={cn("scroll-reveal", variantClass, className)}>
      {children}
    </div>
  );
}
