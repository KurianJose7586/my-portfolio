import { NextRequest, NextResponse } from "next/server";

interface CursorEntry {
  pageX: number;    // absolute document X in px (clientX + scrollX)
  pageY: number;    // absolute document Y in px (clientY + scrollY)
  color: string;
  lastSeen: number; // unix ms
}

// In-memory store: sessionId -> cursor data
const cursors = new Map<string, CursorEntry>();

// Cursor disappears after 3 s of no update
const CURSOR_TIMEOUT_MS = 3_000;

// Neobrutalist color palette — one per session, derived from sessionId
const COLORS = [
  "#EB5E93", // punch-pink
  "#00D4FF", // electric-cyan
  "#7C3AED", // violet
  "#10B981", // emerald
  "#F59E0B", // amber
  "#EF4444", // red
  "#3B82F6", // blue
  "#EC4899", // hot-pink
  "#14B8A6", // teal
  "#F97316", // orange
];

function sessionColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return COLORS[hash % COLORS.length];
}

function pruneExpired() {
  const cutoff = Date.now() - CURSOR_TIMEOUT_MS;
  for (const [id, entry] of cursors) {
    if (entry.lastSeen < cutoff) cursors.delete(id);
  }
}

// POST /api/cursors — update this session's cursor position
export async function POST(req: NextRequest) {
  const { sessionId, pageX, pageY } = await req.json();
  if (!sessionId || typeof pageX !== "number" || typeof pageY !== "number") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  cursors.set(sessionId, {
    pageX,
    pageY,
    color: sessionColor(sessionId),
    lastSeen: Date.now(),
  });
  pruneExpired();
  return NextResponse.json({ ok: true });
}

// DELETE /api/cursors — remove cursor on tab close
export async function DELETE(req: NextRequest) {
  const { sessionId } = await req.json();
  if (sessionId) cursors.delete(sessionId);
  return NextResponse.json({ ok: true });
}

// GET /api/cursors — return all live cursors
export async function GET() {
  pruneExpired();
  const result = Array.from(cursors.entries()).map(([sessionId, entry]) => ({
    sessionId,
    pageX: entry.pageX,
    pageY: entry.pageY,
    color: entry.color,
  }));
  return NextResponse.json({ cursors: result });
}
