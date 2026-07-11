"use client";

import { useEffect, useState } from "react";

function getTabSessionId(): string {
  // sessionStorage is unique per-tab — unlike localStorage which is shared
  let id = sessionStorage.getItem("kurian_tab_id");
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem("kurian_tab_id", id);
  }
  return id;
}

export default function LiveStatus({ variant }: { variant: "hero" | "navbar" }) {
  const [onlineCount, setOnlineCount] = useState(1);

  useEffect(() => {
    const sessionId = getTabSessionId();

    async function heartbeat() {
      try {
        const res = await fetch("/api/active-users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
        const data = await res.json();
        if (typeof data.count === "number") setOnlineCount(data.count);
      } catch {
        // silently ignore network errors
      }
    }

    async function poll() {
      try {
        const res = await fetch("/api/active-users");
        const data = await res.json();
        if (typeof data.count === "number") setOnlineCount(data.count);
      } catch {
        // silently ignore network errors
      }
    }

    // Register this tab immediately, refresh session every 10s
    heartbeat();
    const heartbeatInterval = setInterval(heartbeat, 10_000);

    // Poll for count changes every 3s so other tabs' joins/leaves show up fast
    const pollInterval = setInterval(poll, 3_000);

    // Deregister when tab closes (best-effort — fires on most modern browsers)
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


  const counterContent = (
    <div className={`flex items-center gap-2 font-mono text-sm uppercase tracking-widest font-bold ${variant === 'navbar' ? 'text-paper' : 'text-ink'}`}>
      <div className="relative flex h-3 w-3">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${variant === 'navbar' ? 'bg-electric-cyan' : 'bg-punch-pink'}`}></span>
        <span className={`relative inline-flex rounded-full h-3 w-3 ${variant === 'navbar' ? 'bg-electric-cyan' : 'bg-punch-pink'}`}></span>
      </div>
      <span>{onlineCount} {onlineCount === 1 ? 'person' : 'people'} online</span>
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
