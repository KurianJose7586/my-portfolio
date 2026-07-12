import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const SESSIONS_KEY = "kurian:sessions";
// Session expires if no heartbeat in 20 seconds
const SESSION_TIMEOUT_MS = 20_000;

async function getActiveCount(): Promise<number> {
  // Prune sessions that haven't sent a heartbeat recently, then count
  await redis.zremrangebyscore(SESSIONS_KEY, 0, Date.now() - SESSION_TIMEOUT_MS);
  return redis.zcard(SESSIONS_KEY);
}

// POST /api/active-users — heartbeat (keeps session alive) or DELETE via sendBeacon
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { sessionId, _method } = body;

  if (!sessionId || typeof sessionId !== "string") {
    return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
  }

  if (_method === "DELETE") {
    await redis.zrem(SESSIONS_KEY, sessionId);
  } else {
    // Score = current timestamp — used to prune old sessions
    await redis.zadd(SESSIONS_KEY, { score: Date.now(), member: sessionId });
  }

  const count = await getActiveCount();
  return NextResponse.json({ count });
}

// DELETE /api/active-users — explicit cleanup on page hide
export async function DELETE(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  if (body?.sessionId) await redis.zrem(SESSIONS_KEY, body.sessionId);
  const count = await getActiveCount();
  return NextResponse.json({ count });
}

// GET /api/active-users — poll current count
export async function GET() {
  const count = await getActiveCount();
  return NextResponse.json({ count });
}
