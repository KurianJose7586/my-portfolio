import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const VISITS_KEY = "kurian:total-visits";
const VISITS_BASE = 156; // Starting count

// POST /api/visits — register this session as a visit (idempotent)
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { sessionId } = body;
  if (!sessionId) return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });

  // Ensure the base count exists (only sets if key doesn't exist yet)
  await redis.setnx(VISITS_KEY, VISITS_BASE);

  // NX = only set if not exists → returns "OK" for new visitors, null for returning ones
  // TTL of 7 days: same browser tab re-opening won't double count within a week
  const isNew = await redis.set(`visit:${sessionId}`, 1, { ex: 60 * 60 * 24 * 7, nx: true });
  if (isNew === "OK") {
    await redis.incr(VISITS_KEY);
  }

  const visits = (await redis.get<number>(VISITS_KEY)) ?? VISITS_BASE;
  return NextResponse.json({ visits });
}

// GET /api/visits — read current count without registering a new visit
export async function GET() {
  await redis.setnx(VISITS_KEY, VISITS_BASE);
  const visits = (await redis.get<number>(VISITS_KEY)) ?? VISITS_BASE;
  return NextResponse.json({ visits });
}
