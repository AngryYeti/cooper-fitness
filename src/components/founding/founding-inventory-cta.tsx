import Link from "next/link";
import type { FoundingInventoryState } from "@/lib/founding/types";

export function FoundingInventoryCTA({
  state,
  type = "submit",
  disabled = false,
}: {
  state: FoundingInventoryState;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  if (state === "OPEN") {
    return (
      <button type={type} disabled={disabled} className="founding-button founding-button-primary">
        {disabled ? "PROCESSING…" : "GET STARTED TODAY"}
      </button>
    );
  }

  return (
    <div className="founding-cta-stack">
      <button type="button" disabled className="founding-button founding-button-muted">
        {state === "HELD" ? "SPOT TEMPORARILY HELD" : "JOIN THE WAITLIST"}
      </button>
      <Link className="founding-button founding-button-secondary" href="#founding-waitlist">
        JOIN THE WAITLIST
      </Link>
    </div>
  );
}
