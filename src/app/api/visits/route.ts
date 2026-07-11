import { NextRequest, NextResponse } from "next/server";

// In-memory visit counter.
// Persists for the lifetime of the server process.
// sessionIds we've already counted so duplicate tab-opens don't inflate the count.
let totalVisits = 0;
const countedSessions = new Set<string>();

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json().catch(() => ({}));
  if (!sessionId) return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });

  if (!countedSessions.has(sessionId)) {
    countedSessions.add(sessionId);
    totalVisits += 1;
  }

  return NextResponse.json({ visits: totalVisits });
}

export async function GET() {
  return NextResponse.json({ visits: totalVisits });
}
