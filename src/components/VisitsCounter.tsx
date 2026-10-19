"use client";

import { useEffect, useState } from "react";
import { getOrCreateSessionId } from "@/lib/session";

export default function VisitsCounter() {
  const [visits, setVisits] = useState<number | null>(null);

  useEffect(() => {
    // getOrCreateSessionId ensures the ID exists even if LiveStatus hasn't mounted yet
    const sessionId = getOrCreateSessionId();
    if (!sessionId) return;

    fetch("/api/visits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then(r => r.json())
      .then(d => setVisits(d.visits))
      .catch(() => {
        fetch("/api/visits")
          .then(r => r.json())
          .then(d => setVisits(d.visits))
          .catch(() => {});
      });
  }, []);

  const display = visits === null ? "—" : String(visits).padStart(5, "0");

  return (
    <span className="flex items-center gap-2">
      Visits
      <span className="bg-ink text-cyber-yellow px-1.5 py-0.5 tabular-nums">{display}</span>
    </span>
  );
}
