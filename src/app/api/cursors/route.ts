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

// Cursor positions expire automatically after 3 seconds of no update.
// No in-memory state — all stored in Redis so every serverless instance sees the same data.
const CURSOR_TTL_S = 3;

interface CursorData {
  pageX: number;
  pageY: number;
  color: string;
}

// POST /api/cursors — update this session's cursor
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });

  const { sessionId, pageX, pageY } = body;
  if (!sessionId || typeof pageX !== "number" || typeof pageY !== "number") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await redis.set(
    `cursor:${sessionId}`,
    { pageX, pageY, color: sessionColor(sessionId) } satisfies CursorData,
    { ex: CURSOR_TTL_S }
  );

  return NextResponse.json({ ok: true });
}

// DELETE /api/cursors — immediately remove cursor (tab close / page leave)
export async function DELETE(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  if (body?.sessionId) await redis.del(`cursor:${body.sessionId}`);
  return NextResponse.json({ ok: true });
}

// GET /api/cursors — return all currently active cursors
export async function GET() {
  const keys = await redis.keys("cursor:*");
  if (keys.length === 0) return NextResponse.json({ cursors: [] });

  const values = await redis.mget<CursorData>(...keys);
  const cursors = keys
    .map((key, i) => {
      const data = values[i];
      if (!data) return null;
      return { sessionId: key.replace("cursor:", ""), ...data };
    })
    .filter(Boolean);

  return NextResponse.json({ cursors });
}
