"use client";

import { useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

export function MagneticCard({
  children,
  className,
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMove = useCallback((e: React.MouseEvent) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = (y - cy) / 12;
    const ry = (cx - x) / 12;

    setStyle({
      transform: `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`,
      transition: "transform 0.1s ease-out, box-shadow 0.1s ease-out",
    });
  }, []);

  const handleLeave = useCallback(() => {
    timerRef.current = setTimeout(() => {
      setStyle({
        transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)",
        transition: "transform 0.4s ease-out, box-shadow 0.4s ease-out",
      });
    }, 0);
  }, []);

  return (
    <div
      ref={ref}
      className={cn("magnetic-card", glow && "hover:shadow-[0_0_20px_rgba(74,111,255,0.15)]", className)}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}
