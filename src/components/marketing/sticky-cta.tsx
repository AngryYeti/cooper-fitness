"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      } border-t border-border/60 bg-background/90 backdrop-blur-xl p-4 md:hidden`}
    >
      <Button size="lg" className="w-full" asChild>
        <Link href="/#pricing">
          VIEW PRICING
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
