import { FoundingConfigError, getFoundingConfig } from "@/lib/founding/config";
import { failClosedInventory, fetchFoundingInventory } from "@/lib/founding/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const config = getFoundingConfig();
    if (!config.homepageEnabled || !config.checkoutEnabled) return failClosedInventory(200);
    const inventory = await fetchFoundingInventory(config);
    return Response.json(inventory, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (!(error instanceof FoundingConfigError)) console.error("[founding-inventory] unavailable");
    return failClosedInventory(503);
  }
}
