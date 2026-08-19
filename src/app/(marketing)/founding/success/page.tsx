import type { Metadata } from "next";
import Link from "next/link";
import { verifyFoundingSession } from "@/lib/founding/session-status";

export const metadata: Metadata = {
  title: "Founding checkout status",
  robots: { index: false, follow: false },
};

export default async function FoundingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const status = params.session_id ? await verifyFoundingSession(params.session_id) : "not_confirmed";
  const confirmed = status === "confirmed";
  const processing = status === "processing";

  return (
    <main className="founding-status-page">
      <div className="founding-status-card" role="status" aria-live="polite">
        {confirmed ? <h1>You’re in.</h1> : processing ? <h1>Payment received.</h1> : <h1>We couldn’t verify this checkout yet.</h1>}
        {confirmed ? (
          <>
            <p>Your Cooper Fitness founding purchase was received. Check your email for onboarding details and your next step.</p>
            <p>If you do not see the email within 15 minutes, contact Evan at the published Cooper Fitness support address.</p>
          </>
        ) : processing ? (
          <p>Payment received. We’re preparing your onboarding details now.</p>
        ) : (
          <p>We couldn’t verify this checkout yet. If you completed payment, please contact Evan at the published Cooper Fitness support address.</p>
        )}
        <Link className="founding-button founding-button-secondary" href="/">RETURN TO COOPER FITNESS</Link>
      </div>
    </main>
  );
}
