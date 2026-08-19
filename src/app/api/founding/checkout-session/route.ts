import { FoundingConfigError, getFoundingConfig } from "@/lib/founding/config";
import {
  clientIp,
  consumeCheckoutRateLimit,
  createFoundingCheckout,
  isSameOrigin,
  parseFoundingPurchaser,
  FoundingProxyError,
} from "@/lib/founding/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unavailable(status = 503): Response {
  return Response.json(
    { error: "Founding checkout is temporarily unavailable" },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  let config;
  try {
    config = getFoundingConfig();
  } catch (error) {
    if (!(error instanceof FoundingConfigError)) console.error("[founding-checkout] unavailable");
    return unavailable();
  }
  if (!config.homepageEnabled || !config.checkoutEnabled) return unavailable(404);

  if (!isSameOrigin(request, config.siteOrigin)) {
    return Response.json({ error: "Forbidden" }, { status: 403, headers: { "Cache-Control": "no-store" } });
  }
  const limit = consumeCheckoutRateLimit(clientIp(request));
  if (!limit.allowed) {
    return Response.json(
      { error: "Too many checkout attempts" },
      { status: 429, headers: { "Cache-Control": "no-store", "Retry-After": String(limit.retryAfter) } },
    );
  }

  let purchaser;
  try {
    purchaser = parseFoundingPurchaser(await request.json());
  } catch (error) {
    if (error instanceof FoundingProxyError && error.status === 400) {
      return Response.json({ error: "Invalid purchaser" }, { status: 400, headers: { "Cache-Control": "no-store" } });
    }
    return Response.json({ error: "Invalid purchaser" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  try {
    const result = await createFoundingCheckout(config, purchaser);
    return Response.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof FoundingProxyError) return unavailable(error.status);
    return unavailable();
  }
}
