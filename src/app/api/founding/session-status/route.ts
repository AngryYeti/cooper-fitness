import { verifyFoundingSession } from "@/lib/founding/session-status";
import { clientIp, consumeSessionStatusRateLimit } from "@/lib/founding/client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const limit = consumeSessionStatusRateLimit(clientIp(request));
  if (!limit.allowed) {
    return Response.json(
      { status: "not_confirmed" },
      { status: 429, headers: { "Cache-Control": "no-store", "Retry-After": String(limit.retryAfter) } },
    );
  }
  const sessionId = new URL(request.url).searchParams.get("session_id")?.trim() ?? "";
  if (sessionId.length > 200) {
    return Response.json({ status: "not_confirmed" }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }
  const status = await verifyFoundingSession(sessionId);
  return Response.json(
    { status },
    { headers: { "Cache-Control": "no-store" } },
  );
}
