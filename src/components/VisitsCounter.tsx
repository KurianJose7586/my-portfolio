"use client";

import { useEffect, useState } from "react";
import { getOrCreateSessionId, presenceFetch } from "@/lib/session";

export default function VisitsCounter() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    // getOrCreateSessionId ensures the ID exists even if LiveStatus hasn't mounted yet
    const sessionId = getOrCreateSessionId();
    if (!sessionId) return;

    presenceFetch("/api/visits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then(d => d ?? presenceFetch("/api/visits"))
      .then(d => { if (typeof d?.visits === "number") setVisits(d.visits); });
  }, []);

  // No count yet (or presence is down): render no cell at all
  if (visits === null) return null;

  return (
    <span className="flex items-center gap-2 px-3 py-2">
      Visits
      <span className="bg-ink text-cyber-yellow px-1.5 py-0.5 tabular-nums">{String(visits).padStart(5, "0")}</span>
    </span>
  );
}
