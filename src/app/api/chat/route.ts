// src/app/api/chat/route.ts
import { NextResponse, NextRequest } from "next/server";

const BACKEND_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : "https://your-flask-backend.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Forward to Flask backend
    const flaskRes = await fetch(`${BACKEND_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await flaskRes.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in proxy route:", error);
    return NextResponse.json(
      { error: "Failed to connect to backend" },
      { status: 500 }
    );
  }
}
