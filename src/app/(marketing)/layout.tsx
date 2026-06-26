import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { StickyCTA } from "@/components/marketing/sticky-cta";
import { GrainOverlay } from "@/components/effects/grain-overlay";
import { AmbientBackground } from "@/components/effects/ambient-background";

export default function MarketingLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col relative">
      <AmbientBackground />
      <GrainOverlay />
      <MarketingHeader />
      <main className="flex-1 relative z-10">{children}</main>
      <MarketingFooter />
      <StickyCTA />
    </div>
  );
}
