"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function ColorRevealImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imageRef.current;
    if (!container || !img) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          container.classList.add("color-revealed");
          observer.unobserve(container);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("color-reveal-image overflow-hidden rounded-sm bg-muted", className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="color-reveal-image__img"
        sizes={sizes}
        {...(priority ? { fetchPriority: "high" } : {})}
      />
    </div>
  );
}
