import { MarketingFooter } from "@/components/layout/marketing-footer";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { StickyCTA } from "@/components/marketing/sticky-cta";
import { GrainOverlay } from "@/components/effects/grain-overlay";
import { AmbientBackground } from "@/components/effects/ambient-background";
import { isFoundingCampaignEnabled } from "@/lib/founding/config";

export default function MarketingLayout({
  children,
}: { children: React.ReactNode }) {
  const campaignEnabled = isFoundingCampaignEnabled();
  return (
    <div className="flex min-h-screen flex-col relative">
      <AmbientBackground />
      <GrainOverlay />
      <MarketingHeader campaign={campaignEnabled} />
      <main className="flex-1 relative z-10">{children}</main>
      <MarketingFooter campaign={campaignEnabled} />
      <StickyCTA campaign={campaignEnabled} />
    </div>
  );
}

export const dynamic = "force-dynamic";
