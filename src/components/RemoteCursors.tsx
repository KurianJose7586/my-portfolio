"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getOrCreateSessionId } from "@/lib/session";

interface RemoteCursor {
  sessionId: string;
  pageX: number;
  pageY: number;
  color: string;
}

export default function RemoteCursors() {
  const [cursors, setCursors] = useState<RemoteCursor[]>([]);
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const mySessionId = useRef<string>("");

  // Create/read session ID on mount
  useEffect(() => {
    mySessionId.current = getOrCreateSessionId();
  }, []);

  // Track scroll so we can convert absolute pageCoords → viewport coords
  useEffect(() => {
    function onScroll() {
      setScrollX(window.scrollX);
      setScrollY(window.scrollY);
    }
    setScrollX(window.scrollX);
    setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Send cursor position (absolute page coords, scroll-independent)
  const sendCursor = useCallback(async (pageX: number, pageY: number) => {
    const sessionId = mySessionId.current;
    if (!sessionId) return;
    try {
      await fetch("/api/cursors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, pageX, pageY }),
      });
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    let lastSend = 0;

    function handleMouseMove(e: MouseEvent) {
      const now = Date.now();
      if (now - lastSend < 60) return; // ~16 fps
      lastSend = now;
      sendCursor(e.pageX, e.pageY);
    }

    // On mouse leave: stop sending. The 3s Redis TTL will auto-remove the cursor.
    // No need for an explicit DELETE beacon — avoids the sendBeacon/DELETE bug.

    // On page hide (tab close / navigate away): explicitly remove cursor
    function handlePageHide() {
      const sessionId = mySessionId.current;
      if (!sessionId) return;
      navigator.sendBeacon(
        "/api/cursors",
        new Blob([JSON.stringify({ sessionId })], { type: "application/json" })
      );
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("pagehide", handlePageHide);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [sendCursor]);

  // Poll for other cursors every 200ms (was 150ms — slightly less aggressive)
  useEffect(() => {
    async function fetchCursors() {
      try {
        const res = await fetch("/api/cursors");
        const data = await res.json();
        if (!Array.isArray(data.cursors)) return;
        const myId = mySessionId.current;
        setCursors(data.cursors.filter((c: RemoteCursor) => c.sessionId !== myId));
      } catch { /* ignore */ }
    }

    const interval = setInterval(fetchCursors, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    // No overflow-hidden — that was clipping cursors near edges
    <div
      className="fixed inset-0 pointer-events-none z-[9998]"
      aria-hidden="true"
    >
      {cursors.map((cursor) => {
        const viewportX = cursor.pageX - scrollX;
        const viewportY = cursor.pageY - scrollY;

        return (
          <div
            key={cursor.sessionId}
            className="absolute"
            style={{
              left: viewportX,
              top: viewportY,
              transition: "left 100ms linear, top 100ms linear",
              willChange: "left, top",
            }}
          >
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
