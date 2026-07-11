import { NextRequest, NextResponse } from "next/server";

// In-memory store: sessionId -> last heartbeat timestamp (ms)
// This lives in the Next.js server process memory and resets on cold starts.
const sessions = new Map<string, number>();

// Consider a session "dead" if no heartbeat in 15 seconds
const SESSION_TIMEOUT_MS = 15_000;

function pruneExpired() {
  const cutoff = Date.now() - SESSION_TIMEOUT_MS;
  for (const [id, ts] of sessions) {
    if (ts < cutoff) sessions.delete(id);
  }
}

// POST /api/active-users  — heartbeat (register / refresh a session)
// Also handles sendBeacon "DELETE" (browsers can't sendBeacon with method=DELETE)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { sessionId, _method } = body;
  if (!sessionId || typeof sessionId !== "string") {
    return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
  }
  pruneExpired();
  if (_method === "DELETE") {
    sessions.delete(sessionId);
  } else {
    sessions.set(sessionId, Date.now());
  }
  return NextResponse.json({ count: sessions.size });
}

// DELETE /api/active-users  — tab is closing (best-effort)
export async function DELETE(req: NextRequest) {
  const { sessionId } = await req.json();
  if (sessionId) sessions.delete(sessionId);
  pruneExpired();
  return NextResponse.json({ count: sessions.size });
}

// GET /api/active-users  — read current count without updating
export async function GET() {
  pruneExpired();
  return NextResponse.json({ count: sessions.size });
}
