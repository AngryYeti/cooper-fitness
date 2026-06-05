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
  const imageRef = useRef<HTMLImageElement>(null);
  const ratioRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const img = imageRef.current;
    if (!img) return;

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);

    const observer = new IntersectionObserver(
      ([entry]) => {
        ratioRef.current = entry.intersectionRatio;

        if (!frameRef.current) {
          frameRef.current = requestAnimationFrame(() => {
            frameRef.current = 0;
            const ratio = ratioRef.current;
            const grayscale = Math.round((1 - ratio) * 100);
            img.style.filter = `grayscale(${grayscale}%) contrast(${1 + ratio * 0.1})`;
          });
        }
      },
      { threshold: thresholds }
    );

    observer.observe(img);
    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div
      className={cn("overflow-hidden rounded-sm bg-muted", className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        sizes={sizes}
        style={{ filter: "grayscale(100%) contrast(1.1)" }}
        {...(priority ? { fetchPriority: "high" } : {})}
      />
    </div>
  );
}
