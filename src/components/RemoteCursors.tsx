"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface RemoteCursor {
  sessionId: string;
  pageX: number;  // absolute document X (px) — scroll-independent
  pageY: number;  // absolute document Y (px) — scroll-independent
  color: string;
}

function getTabSessionId(): string | null {
  return sessionStorage.getItem("kurian_tab_id");
}

export default function RemoteCursors() {
  const [cursors, setCursors] = useState<RemoteCursor[]>([]);
  // Track our own scroll offset so we can convert pageCoords → viewportCoords
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const mySessionId = useRef<string | null>(null);

  // Grab sessionId once on mount
  useEffect(() => {
    mySessionId.current = getTabSessionId();
  }, []);

  // ── Track our own scroll offset ───────────────────────────────────────────
  useEffect(() => {
    function onScroll() {
      setScrollX(window.scrollX);
      setScrollY(window.scrollY);
    }
    // Seed the initial scroll position
    setScrollX(window.scrollX);
    setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Send cursor position as ABSOLUTE page coords ──────────────────────────
  const sendCursor = useCallback(async (pageX: number, pageY: number) => {
    const sessionId = mySessionId.current;
    if (!sessionId) return;
    try {
      await fetch("/api/cursors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // pageX/pageY = clientX + scrollX, so they don't change when others scroll
        body: JSON.stringify({ sessionId, pageX, pageY }),
      });
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    let lastSend = 0;

    function handleMouseMove(e: MouseEvent) {
      const now = Date.now();
      if (now - lastSend < 80) return; // ~12 fps
      lastSend = now;
      // Use pageX/pageY (= clientX + scrollX) — absolute document coordinates
      sendCursor(e.pageX, e.pageY);
    }

    // Remove cursor when mouse leaves the window
    function handleMouseLeave() {
      const sessionId = mySessionId.current;
      if (!sessionId) return;
      navigator.sendBeacon(
        "/api/cursors",
        new Blob([JSON.stringify({ sessionId })], { type: "application/json" })
      );
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [sendCursor]);

  // ── Poll for other cursors every 150 ms ──────────────────────────────────
  useEffect(() => {
    async function fetchCursors() {
      try {
        const res = await fetch("/api/cursors");
        const data = await res.json();
        if (!Array.isArray(data.cursors)) return;
        const myId = mySessionId.current ?? sessionStorage.getItem("kurian_tab_id");
        setCursors(data.cursors.filter((c: RemoteCursor) => c.sessionId !== myId));
      } catch { /* ignore */ }
    }

    const interval = setInterval(fetchCursors, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden"
      aria-hidden="true"
    >
      {cursors.map((cursor) => {
        // Convert absolute page coords → viewport coords for this viewer
        const viewportX = cursor.pageX - scrollX;
        const viewportY = cursor.pageY - scrollY;

        return (
          <div
            key={cursor.sessionId}
            className="absolute"
            style={{
              left: viewportX,
              top: viewportY,
              // Smooth out the ~150ms polling lag
              transition: "left 120ms linear, top 120ms linear",
              willChange: "left, top",
            }}
          >
            {/* Tiny neobrutalist arrow cursor */}
            <svg
              width="14"
              height="18"
              viewBox="0 0 14 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ filter: "drop-shadow(1px 1px 0px rgba(0,0,0,0.6))" }}
            >
              <path
                d="M1 1L1 14.5L4.5 11L7.5 17L9.5 16L6.5 10L12 10L1 1Z"
                fill={cursor.color}
                stroke="black"
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
            {/* Tiny color dot underneath as a subtle indicator */}
            <div
              className="absolute top-[14px] left-[1px] w-1.5 h-1.5 rounded-full border border-black/50"
              style={{ backgroundColor: cursor.color, opacity: 0.85 }}
            />
          </div>
        );
      })}
    </div>
  );
}
