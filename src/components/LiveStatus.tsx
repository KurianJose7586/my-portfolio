"use client";

import { useEffect, useState } from "react";
import { getOrCreateSessionId } from "@/lib/session";

export default function LiveStatus({ variant }: { variant: "hero" | "navbar" }) {
  // null = not yet loaded (prevents flicker from hardcoded "1")
  const [onlineCount, setOnlineCount] = useState<number | null>(null);

  useEffect(() => {
    const sessionId = getOrCreateSessionId();

    async function heartbeat() {
      try {
        const res = await fetch("/api/active-users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        if (typeof data.count === "number") setOnlineCount(data.count);
      } catch { /* ignore */ }
    }

    async function poll() {
      try {
        const res = await fetch("/api/active-users");
        const data = await res.json();
        if (typeof data.count === "number") setOnlineCount(data.count);
      } catch { /* ignore */ }
    }

    // Register immediately, then heartbeat every 8s
    heartbeat();
    const heartbeatInterval = setInterval(heartbeat, 8_000);

    // Poll for count changes every 5s
    const pollInterval = setInterval(poll, 5_000);

    // Clean up on tab close
    function handleUnload() {
      navigator.sendBeacon(
        "/api/active-users",
        new Blob(
          [JSON.stringify({ sessionId, _method: "DELETE" })],
          { type: "application/json" }
        )
      );
    }
    window.addEventListener("pagehide", handleUnload);

    return () => {
      clearInterval(heartbeatInterval);
      clearInterval(pollInterval);
      window.removeEventListener("pagehide", handleUnload);
    };
  }, []);

  const label = onlineCount === null
    ? "connecting…"
    : `${onlineCount} ${onlineCount === 1 ? "person" : "people"} online`;

  const counterContent = (
    <div className={`flex items-center gap-2 font-mono text-sm uppercase tracking-widest font-bold ${variant === "navbar" ? "text-paper" : "text-ink"}`}>
      <div className="relative flex h-3 w-3">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${variant === "navbar" ? "bg-electric-cyan" : "bg-punch-pink"}`} />
        <span className={`relative inline-flex rounded-full h-3 w-3 ${variant === "navbar" ? "bg-electric-cyan" : "bg-punch-pink"}`} />
      </div>
      <span>{label}</span>
    </div>
  );

  if (variant === "hero") {
    return (
      <div className="mt-8 inline-block bg-paper text-ink px-4 py-2 border-[4px] border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {counterContent}
      </div>
    );
  }

  return counterContent;
}
