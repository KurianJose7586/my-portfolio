import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const COLORS = [
  "#EB5E93", "#00D4FF", "#7C3AED", "#10B981",
  "#F59E0B", "#EF4444", "#3B82F6", "#EC4899",
  "#14B8A6", "#F97316",
];

function sessionColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return COLORS[hash % COLORS.length];
}

interface StoredEvent {
  id: string;
  type: "emoji" | "click";
  sessionId: string;
  pageX: number;
  pageY: number;
  color: string;
  emoji?: string;
  expiresAt: number;
}

interface LaserPoint { pageX: number; pageY: number; t: number; }
interface LaserTrail { sessionId: string; color: string; points: LaserPoint[]; }

const EVENTS_KEY = "kurian:events";
const LASER_TTL_S = 5;    // laser trails vanish 5s after last update
const EVENTS_TTL_S = 60;  // events list expires if idle for 60s

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const { type, sessionId } = body;
  if (!sessionId) return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });

  if (type === "emoji" || type === "click") {
    const { pageX, pageY, emoji } = body;
    if (typeof pageX !== "number" || typeof pageY !== "number") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const event: StoredEvent = {
      id: crypto.randomUUID(),
      type,
      sessionId,
      pageX,
      pageY,
      color: sessionColor(sessionId),
      ...(emoji ? { emoji: String(emoji).slice(0, 10) } : {}),
      expiresAt: Date.now() + (type === "emoji" ? 3000 : 1500),
    };

    // LPUSH (newest first), cap at 300 events, refresh list TTL
    await redis.lpush(EVENTS_KEY, event);
    await redis.ltrim(EVENTS_KEY, 0, 299);
    await redis.expire(EVENTS_KEY, EVENTS_TTL_S);

  } else if (type === "laser") {
    const { points } = body;
    if (Array.isArray(points) && points.length > 0) {
      const trail: LaserTrail = {
        sessionId,
        color: sessionColor(sessionId),
        points: (points as LaserPoint[]).slice(-50).map(p => ({
          pageX: Number(p.pageX),
          pageY: Number(p.pageY),
          t: Number(p.t),
        })),
      };
      // Each session's laser is its own key with a short TTL
      await redis.set(`laser:${sessionId}`, trail, { ex: LASER_TTL_S });
    } else {
      await redis.del(`laser:${sessionId}`);
    }
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const now = Date.now();

  // Events — filter out expired ones (they stay in the list until pruned on next POST or until list expires)
  const rawEvents = await redis.lrange<StoredEvent>(EVENTS_KEY, 0, -1);
  const events = rawEvents.filter(e => e && e.expiresAt > now);

  // Laser trails — each is its own TTL-backed key
  const laserKeys = await redis.keys("laser:*");
  const lasers: LaserTrail[] = laserKeys.length > 0
    ? (await redis.mget<LaserTrail>(...laserKeys)).filter((l): l is LaserTrail => l !== null)
    : [];

  return NextResponse.json({ events, lasers });
}
