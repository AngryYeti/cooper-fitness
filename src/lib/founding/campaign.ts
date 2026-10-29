// Founding cohort campaign details shown on the homepage.
// Edit these in one place when the dates or the exchange rate change.

// Last day to buy a founding spot.
export const FOUNDING_ENROLLMENT_CLOSES = "Nov 22";

// Date the founding cohort's coaching starts by.
export const FOUNDING_COHORT_STARTS = "Dec 1";

// Rough Canadian dollar equivalent of the USD $399 price.
// Based on the Bank of Canada rate of 1.4036 on Oct 28, 2026 (399 x 1.4036 = ~$560).
export const FOUNDING_APPROX_CAD = "about $560 CAD";

export function foundingSpotsLeft(purchasedCount: number, pendingCount: number, capacity: number): number {
  return Math.max(0, capacity - purchasedCount - pendingCount);
}
