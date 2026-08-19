import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Founding checkout cancelled",
  robots: { index: false, follow: false },
};

export default function FoundingCancelPage() {
  return (
    <main className="founding-status-page">
      <div className="founding-status-card">
        <h1>No payment was taken.</h1>
        <p>Your checkout was not completed. The five-position founding offer remains available while spots remain.</p>
        <Link className="founding-button founding-button-primary" href="/#founding-offer">RETURN TO THE OFFER</Link>
      </div>
    </main>
  );
}
