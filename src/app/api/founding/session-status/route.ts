import { verifyFoundingSession } from "@/lib/founding/session-status";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const sessionId = new URL(request.url).searchParams.get("session_id")?.trim() ?? "";
  const status = await verifyFoundingSession(sessionId);
  return Response.json(
    { status },
    { headers: { "Cache-Control": "no-store" } },
  );
}
