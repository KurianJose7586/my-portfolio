// src/app/api/chat/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'https://joserman-kurian-portfolio-backend.hf.space';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Dynamically inject the absolute latest knowledge base so we don't have to redeploy the HF backend
    try {
      const aboutMePath = path.join(process.cwd(), 'aboutMe.md');
      const aboutMeContent = await fs.readFile(aboutMePath, 'utf8');
      
      const knowledgeBase = `\n\n[CRITICAL KNOWLEDGE BASE UPDATE: You MUST use the following updated profile data about Kurian Jose to answer the user's query perfectly. Treat this data as the absolute source of truth and ignore any conflicting older data you may have in your original system prompt:\n\n${aboutMeContent}\n]`;
      
      if (body.message && typeof body.message === 'string') {
        body.message += knowledgeBase;
      }
    } catch (fsError) {
      console.warn("Could not load aboutMe.md for knowledge base injection", fsError);
    }

    // Inject Terminal History
    if (body.history && typeof body.message === 'string') {
      const historyContext = `\n\n[TERMINAL CONTEXT: The user recently executed these commands and saw this output in the terminal. Use this to provide deeply contextual answers if relevant:\n${body.history}\n]`;
      body.message += historyContext;
      delete body.history; // Backend might not expect this field
    }

    const flaskRes = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      // HF Spaces cold-starts can be slow — give it up to 20s
      signal: AbortSignal.timeout(20_000),
    });

    if (!flaskRes.ok) {
      const text = await flaskRes.text();
      console.error('Backend error:', flaskRes.status, text);
      return NextResponse.json(
        { error: `Backend returned ${flaskRes.status}` },
        { status: flaskRes.status }
      );
    }

    const data = await flaskRes.json();
    return NextResponse.json(data);
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error in /api/chat proxy:', msg);
    return NextResponse.json(
      { error: 'Failed to connect to KurianGPT backend' },
      { status: 502 }
    );
  }
}
