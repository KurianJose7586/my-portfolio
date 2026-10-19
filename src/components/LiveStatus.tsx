"use client";

import { useEffect, useState } from "react";
import { getOrCreateSessionId } from "@/lib/session";

export default function LiveStatus() {
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

  return (
    <span className="flex items-center gap-2">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-punch-pink opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-punch-pink" />
      </span>
      {label}
    </span>
  );
}
