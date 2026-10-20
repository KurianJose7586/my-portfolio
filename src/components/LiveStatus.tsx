"use client";

import { useEffect, useState } from "react";
import { getOrCreateSessionId, presenceHeartbeat } from "@/lib/session";

export default function LiveStatus() {
  // null = not yet loaded (prevents flicker from hardcoded "1")
  const [onlineCount, setOnlineCount] = useState<number | null>(null);

  useEffect(() => {
    const sessionId = getOrCreateSessionId();

    // The heartbeat returns the live count, so one call every 8s keeps both fresh.
    async function heartbeat() {
      const count = await presenceHeartbeat();
      if (count !== null) setOnlineCount(count);
    }

    heartbeat();
    const heartbeatInterval = setInterval(heartbeat, 8_000);
    document.addEventListener("visibilitychange", heartbeat);

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
      document.removeEventListener("visibilitychange", heartbeat);
      window.removeEventListener("pagehide", handleUnload);
    };
  }, []);

  // No count yet (or presence is down): render no cell at all
  if (onlineCount === null) return null;

  return (
    <span className="flex items-center gap-2 px-3 py-2">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-punch-pink opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-punch-pink" />
      </span>
      {onlineCount} {onlineCount === 1 ? "person" : "people"} online
    </span>
  );
}
