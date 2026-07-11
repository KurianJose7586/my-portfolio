import { NextRequest, NextResponse } from "next/server";

const COLORS = [
  "#EB5E93", "#00D4FF", "#7C3AED", "#10B981",
  "#F59E0B", "#EF4444", "#3B82F6", "#EC4899",
  "#14B8A6", "#F97316",
];

function sessionColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
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

interface LaserPoint {
  pageX: number;
  pageY: number;
  t: number;
}

interface LaserTrail {
  sessionId: string;
  color: string;
  points: LaserPoint[];
  lastSeen: number;
}

// In-memory stores
const events: StoredEvent[] = [];
const laserTrails = new Map<string, LaserTrail>();

function pruneEvents() {
  const now = Date.now();
  let i = 0;
  while (i < events.length && events[i].expiresAt < now) i++;
  if (i > 0) events.splice(0, i);
  // Cap memory
  if (events.length > 500) events.splice(0, events.length - 500);
}

function pruneLasers() {
  const cutoff = Date.now() - 5000;
  for (const [id, trail] of laserTrails) {
    if (trail.lastSeen < cutoff) laserTrails.delete(id);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const { type, sessionId } = body;
  if (!sessionId) return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });

  pruneEvents();
  pruneLasers();

  if (type === "emoji") {
    const { pageX, pageY, emoji } = body;
    if (typeof pageX !== "number" || typeof pageY !== "number" || !emoji) {
      return NextResponse.json({ error: "Invalid emoji payload" }, { status: 400 });
    }
    events.push({
      id: crypto.randomUUID(),
      type: "emoji",
      sessionId,
      pageX,
      pageY,
      color: sessionColor(sessionId),
      emoji: String(emoji).slice(0, 10),
      expiresAt: Date.now() + 3000,
    });
  } else if (type === "click") {
    const { pageX, pageY } = body;
    if (typeof pageX !== "number" || typeof pageY !== "number") {
      return NextResponse.json({ error: "Invalid click payload" }, { status: 400 });
    }
    events.push({
      id: crypto.randomUUID(),
      type: "click",
      sessionId,
      pageX,
      pageY,
      color: sessionColor(sessionId),
      expiresAt: Date.now() + 1500,
    });
  } else if (type === "laser") {
    const { points } = body;
    if (Array.isArray(points) && points.length > 0) {
      laserTrails.set(sessionId, {
        sessionId,
        color: sessionColor(sessionId),
        points: (points as { pageX: number; pageY: number; t: number }[])
          .slice(-50)
          .map(p => ({
            pageX: Number(p.pageX),
            pageY: Number(p.pageY),
            t: Number(p.t),
          })),
        lastSeen: Date.now(),
      });
    } else {
      laserTrails.delete(sessionId);
    }
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  pruneEvents();
  pruneLasers();
  const now = Date.now();
  return NextResponse.json({
    events: events.filter(e => e.expiresAt > now),
    lasers: Array.from(laserTrails.values()).map(({ sessionId, color, points }) => ({
      sessionId,
      color,
      points,
    })),
  });
}
