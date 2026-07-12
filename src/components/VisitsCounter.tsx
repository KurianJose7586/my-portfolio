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
    <div className="font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-ink/70 flex flex-col gap-1 items-end">
      <span>Total Visits</span>
      <span className="bg-ink text-cyber-yellow px-2 py-0.5 text-base md:text-xl border-2 border-ink">
        {display}
      </span>
    </div>
  );
}
