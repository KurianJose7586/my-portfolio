"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { getOrCreateSessionId } from "@/lib/session";

// ── Constants ─────────────────────────────────────────────────────────────────
const EMOJIS = ["⚡", "👾", "🛠️", "🔥", "🎯", "💡"];
const COLORS = [
  "#EB5E93", "#00D4FF", "#7C3AED", "#10B981",
  "#F59E0B", "#EF4444", "#3B82F6", "#EC4899",
  "#14B8A6", "#F97316",
];
const LASER_FADE_MS = 2500;

// ── Helpers ───────────────────────────────────────────────────────────────────
function sessionColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return COLORS[hash % COLORS.length];
}

function sessionShapeVariant(id: string): 0 | 1 | 2 {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  return (hash % 3) as 0 | 1 | 2;
}


function isTypingTarget(target: EventTarget | null): boolean {
  if (!target) return false;
  const el = target as HTMLElement;
  return (
    el.tagName === "INPUT" ||
    el.tagName === "TEXTAREA" ||
    el.tagName === "SELECT" ||
    el.tagName === "CANVAS" ||
    !!el.isContentEditable
  );
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface ActiveEvent {
  id: string;
  type: "emoji" | "click";
  sessionId: string;
  // vx/vy: viewport coords at the moment of creation — don't change with scroll
  vx: number;
  vy: number;
  color: string;
  emoji?: string;
  expiresAt: number;
}

interface LaserPoint {
  pageX: number;
  pageY: number;
  t: number;
}

interface LaserTrail {
  sessionId: string;
  color: string;
  points: LaserPoint[];
}

// ── Shape SVGs ────────────────────────────────────────────────────────────────
function StarShape({ color }: { color: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 2L19.4 11.6H29.8L21.7 17.4L25.1 27L16 21.2L6.9 27L10.3 17.4L2.2 11.6H12.6Z"
        fill={color} stroke="black" strokeWidth="2.5" strokeLinejoin="round"
      />
    </svg>
  );
}

function CircleShape({ color }: { color: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="16" stroke="black" strokeWidth="5" />
      <circle cx="20" cy="20" r="16" stroke={color} strokeWidth="3" />
      <circle cx="20" cy="20" r="7" fill={color} stroke="black" strokeWidth="2.5" />
    </svg>
  );
}

function CrossShape({ color }: { color: string }) {
  return (
    <svg width="44" height="44" viewBox="0 0 40 40" fill="none">
      <line x1="7" y1="7" x2="33" y2="33" stroke="black" strokeWidth="9" strokeLinecap="round" />
      <line x1="33" y1="7" x2="7" y2="33" stroke="black" strokeWidth="9" strokeLinecap="round" />
      <line x1="7" y1="7" x2="33" y2="33" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <line x1="33" y1="7" x2="7" y2="33" stroke={color} strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

function ClickShape({ sessionId, color }: { sessionId: string; color: string }) {
  const v = sessionShapeVariant(sessionId);
  if (v === 0) return <StarShape color={color} />;
  if (v === 1) return <CircleShape color={color} />;
  return <CrossShape color={color} />;
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function InteractionEffects() {
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [menuViewport, setMenuViewport] = useState({ x: 0, y: 0 });
  const [menuPage, setMenuPage] = useState({ x: 0, y: 0 });
  const [laserMode, setLaserMode] = useState(false);
  const [localLaser, setLocalLaser] = useState<LaserPoint[]>([]);
  const [events, setEvents] = useState<ActiveEvent[]>([]);
  const [remoteLasers, setRemoteLasers] = useState<LaserTrail[]>([]);

  const myId = useRef<string | null>(null);
  const laserModeRef = useRef(false);
  const localLaserRef = useRef<LaserPoint[]>([]);
  const lastLaserPostRef = useRef(0);
  const laserFadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mouseRef = useRef({ clientX: 0, clientY: 0, pageX: 0, pageY: 0 });

  useEffect(() => {
    myId.current = getOrCreateSessionId();
  }, []);

  // ── Track scroll (needed for laser viewport conversion) ───────────────────
  useEffect(() => {
    const onScroll = () => {
      setScrollX(window.scrollX);
      setScrollY(window.scrollY);
    };
    setScrollX(window.scrollX);
    setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── API helper ────────────────────────────────────────────────────────────
  const postInteraction = useCallback(async (body: object) => {
    try {
      await fetch("/api/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch { /* ignore */ }
  }, []);

  // ── Mouse tracking, laser recording, keyboard ─────────────────────────────
  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      mouseRef.current = { clientX: e.clientX, clientY: e.clientY, pageX: e.pageX, pageY: e.pageY };
      if (!laserModeRef.current) return;

      const point: LaserPoint = { pageX: e.pageX, pageY: e.pageY, t: Date.now() };
      const updated = [...localLaserRef.current.slice(-49), point];
      localLaserRef.current = updated;
      setLocalLaser(updated);

      const now = Date.now();
      if (now - lastLaserPostRef.current > 200) {
        lastLaserPostRef.current = now;
        postInteraction({ type: "laser", sessionId: myId.current, points: updated });
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (
        isTypingTarget(e.target) ||
        isTypingTarget(document.activeElement) ||
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if ((e.key === "e" || e.key === "E") && !e.repeat) {
        e.preventDefault();
        setMenuViewport({ x: mouseRef.current.clientX, y: mouseRef.current.clientY });
        setMenuPage({ x: mouseRef.current.pageX, y: mouseRef.current.pageY });
        setShowMenu(true);
      }

      if (e.key === "Shift" && !laserModeRef.current && !e.repeat) {
        laserModeRef.current = true;
        setLaserMode(true);
        localLaserRef.current = [];
        setLocalLaser([]);
        if (laserFadeTimerRef.current) clearTimeout(laserFadeTimerRef.current);
      }
    }

    function onKeyUp(e: KeyboardEvent) {
      if (e.key === "Shift") {
        laserModeRef.current = false;
        setLaserMode(false);
        // Let local trail age out naturally, clear after LASER_FADE_MS
        if (laserFadeTimerRef.current) clearTimeout(laserFadeTimerRef.current);
        laserFadeTimerRef.current = setTimeout(() => {
          localLaserRef.current = [];
          setLocalLaser([]);
        }, LASER_FADE_MS + 200);
      }
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [postInteraction]);

  // ── Click-splosion ────────────────────────────────────────────────────────
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (e.button !== 0) return;
      if (isTypingTarget(e.target)) return;
      const menu = document.getElementById("kurian-emoji-menu");
      if (menu?.contains(e.target as Node)) return;

      const sessionId = myId.current;
      if (!sessionId) return;

      // Optimistically add locally
      const ev: ActiveEvent = {
        id: crypto.randomUUID(),
        type: "click",
        sessionId,
        vx: e.clientX,
        vy: e.clientY,
        color: sessionColor(sessionId),
        expiresAt: Date.now() + 1500,
      };
      setEvents(prev => [...prev, ev]);
      postInteraction({ type: "click", sessionId, pageX: e.pageX, pageY: e.pageY });
    }

    window.addEventListener("mousedown", onMouseDown);
    return () => window.removeEventListener("mousedown", onMouseDown);
  }, [postInteraction]);

  // ── Close menu on outside click ───────────────────────────────────────────
  useEffect(() => {
    if (!showMenu) return;
    function onOutside(e: MouseEvent) {
      const menu = document.getElementById("kurian-emoji-menu");
      if (!menu?.contains(e.target as Node)) setShowMenu(false);
    }
    window.addEventListener("mousedown", onOutside);
    return () => window.removeEventListener("mousedown", onOutside);
  }, [showMenu]);

  // ── Poll for remote events ────────────────────────────────────────────────
  useEffect(() => {
    async function poll() {
      try {
        const res = await fetch("/api/interactions");
        const data = await res.json();
        const now = Date.now();
        const mySessionId = myId.current;

        if (Array.isArray(data.events)) {
          setEvents(prev => {
            const existingIds = new Set(prev.map(e => e.id));
            type RawEvent = {
              id: string; type: "emoji" | "click"; sessionId: string;
              pageX: number; pageY: number; color: string; emoji?: string; expiresAt: number;
            };
            const newRemote: ActiveEvent[] = (data.events as RawEvent[])
              .filter(e => e.sessionId !== mySessionId && !existingIds.has(e.id) && e.expiresAt > now)
              .map(e => ({
                ...e,
                vx: e.pageX - window.scrollX,
                vy: e.pageY - window.scrollY,
              }));
            return [...prev.filter(e => e.expiresAt > now), ...newRemote];
          });
        }

        if (Array.isArray(data.lasers)) {
          setRemoteLasers((data.lasers as LaserTrail[]).filter(l => l.sessionId !== mySessionId));
        }
      } catch { /* ignore */ }
    }

    const interval = setInterval(poll, 400);
    return () => clearInterval(interval);
  }, []);

  // ── Emit emoji ────────────────────────────────────────────────────────────
  function handleEmojiClick(emoji: string) {
    const sessionId = myId.current;
    if (!sessionId) return;
    setShowMenu(false);

    const ev: ActiveEvent = {
      id: crypto.randomUUID(),
      type: "emoji",
      sessionId,
      vx: menuViewport.x,
      vy: menuViewport.y,
      color: sessionColor(sessionId),
      emoji,
      expiresAt: Date.now() + 2800,
    };
    setEvents(prev => [...prev, ev]);
    postInteraction({ type: "emoji", sessionId, pageX: menuPage.x, pageY: menuPage.y, emoji });
  }

  // ── Render ────────────────────────────────────────────────────────────────
  const now = Date.now();

  // All laser trails: remote + own local trail
  const allLasers: LaserTrail[] = [
    ...remoteLasers,
    ...(localLaser.length > 1
      ? [{ sessionId: myId.current ?? "", color: sessionColor(myId.current ?? ""), points: localLaser }]
      : []),
  ];

  return (
    <>
      {/* ── Laser SVG Layer ─────────────────────────────────────────────── */}
      <svg
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9997, width: "100vw", height: "100vh", overflow: "visible" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="kurian-laser-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {allLasers.map(trail =>
          trail.points.slice(1).map((pt, i) => {
            const prev = trail.points[i];
            const age = now - pt.t;
            const opacity = Math.max(0, 1 - age / LASER_FADE_MS) * 0.92;
            if (opacity <= 0.01) return null;
            return (
              <line
                key={`${trail.sessionId}-${i}`}
                x1={prev.pageX - scrollX}
                y1={prev.pageY - scrollY}
                x2={pt.pageX - scrollX}
                y2={pt.pageY - scrollY}
                stroke={trail.color}
                strokeWidth="3"
                strokeLinecap="round"
                opacity={opacity}
                filter="url(#kurian-laser-glow)"
              />
            );
          })
        )}
      </svg>

      {/* ── Emoji + Click-splosion Events ────────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9999 }}
        aria-hidden="true"
      >
        {events.map(event => {
          if (event.type === "emoji") {
            return (
              <div
                key={event.id}
                style={{
                  position: "absolute",
                  left: event.vx - 14,
                  top: event.vy - 14,
                  fontSize: "28px",
                  lineHeight: 1,
                  userSelect: "none",
                  animation: "kurian-emoji-float 2.8s ease-out forwards",
                  pointerEvents: "none",
                  willChange: "transform, opacity",
                }}
              >
                {event.emoji}
              </div>
            );
          }

          if (event.type === "click") {
            return (
              <div
                key={event.id}
                style={{
                  position: "absolute",
                  left: event.vx - 22,
                  top: event.vy - 22,
                  animation: "kurian-stamp-pop 1.4s ease-out forwards",
                  pointerEvents: "none",
                  willChange: "transform, opacity",
                }}
              >
                <ClickShape sessionId={event.sessionId} color={event.color} />
              </div>
            );
          }

          return null;
        })}
      </div>

      {/* ── Emoji Radial Menu ─────────────────────────────────────────────── */}
      {showMenu && (
        <div
          id="kurian-emoji-menu"
          className="fixed pointer-events-auto"
          style={{ zIndex: 10000, left: menuViewport.x, top: menuViewport.y }}
        >
          {/* Center pip */}
          <div
            className="absolute w-3 h-3 rounded-full bg-ink border-2 border-cyber-yellow shadow-lg"
            style={{ transform: "translate(-50%, -50%)" }}
          />

          {/* Emoji buttons arranged in a circle */}
          {EMOJIS.map((emoji, i) => {
            const angle = (i / EMOJIS.length) * 360 - 90; // start at top
            const rad = (angle * Math.PI) / 180;
            const radius = 70;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            return (
              <div
                key={emoji}
                style={{
                  position: "absolute",
                  left: x,
                  top: y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <button
                  onClick={() => handleEmojiClick(emoji)}
                  className="flex items-center justify-center w-11 h-11 bg-white border-[3px] border-ink shadow-[3px_3px_0px_0px_black] hover:bg-cyber-yellow hover:scale-110 transition-colors text-xl"
                  style={{
                    animation: `kurian-menu-in 0.2s ease-out ${i * 0.03}s both`,
                    cursor: "pointer",
                  }}
                  title={emoji}
                  aria-label={`React with ${emoji}`}
                >
                  {emoji}
                </button>
              </div>
            );
          })}

          {/* Label hint */}
          <div
            className="absolute whitespace-nowrap font-mono text-[10px] font-black uppercase tracking-widest bg-ink text-cyber-yellow px-2 py-1"
            style={{ top: 92, left: "50%", transform: "translateX(-50%)" }}
          >
            REACT [E]
          </div>
        </div>
      )}

      {/* ── Laser Mode Badge ──────────────────────────────────────────────── */}
      {laserMode && (
        <div
          className="fixed left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ bottom: "7rem", zIndex: 10001 }}
        >
          <div className="bg-ink text-electric-cyan font-mono text-xs font-black uppercase tracking-widest px-3 py-1.5 border-2 border-electric-cyan shadow-[0_0_14px_rgba(90,200,216,0.5)] animate-pulse select-none">
            ⚡ LASER ON — RELEASE SHIFT TO STOP
          </div>
        </div>
      )}
    </>
  );
}
