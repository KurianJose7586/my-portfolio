"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const SLAT_COUNT = 12;

export default function ArcadeDock() {
  const [isOpening, setIsOpening] = useState(false);
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => router.push("/arcade"), 950);
  };

  return (
    <>
      {/* ── Left Dock ─────────────────────────────────────────────────── */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[200]">
        <motion.button
          onClick={handleClick}
          disabled={isOpening}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          initial={{ x: -4 }}
          whileHover={{ x: 8 }}
          whileTap={{ x: 2, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="relative flex flex-col items-center justify-center cursor-pointer select-none outline-none group"
          aria-label="Open Arcade"
          title="Open Arcade"
          style={{ borderLeft: "none" }}
        >
          {/* Cabinet body */}
          <div
            className="relative flex flex-col items-center gap-3 px-3 pt-5 pb-5 border-4 border-l-0 border-ink"
            style={{
              background: hovered
                ? "linear-gradient(160deg, #1a0a2e 0%, #0d0d0d 100%)"
                : "linear-gradient(160deg, #111111 0%, #000000 100%)",
              boxShadow: hovered
                ? "6px 0 0 0 #000, 0 0 24px 4px rgba(90,200,216,0.25)"
                : "6px 6px 0px 0px #000",
              transition: "background 0.3s, box-shadow 0.3s",
            }}
          >
            {/* Top LED strip */}
            <div className="flex gap-1 mb-1">
              {["bg-punch-pink", "bg-cyber-yellow", "bg-electric-cyan"].map((c, i) => (
                <motion.div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${c}`}
                  animate={{ opacity: hovered ? [1, 0.3, 1] : [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>

            {/* Pixel art icon */}
            <motion.img
              src="/Arcade_Pixel_Art-removebg-preview.svg"
              alt="Arcade"
              className="w-12 h-12"
              draggable={false}
              animate={{ scale: hovered ? [1, 1.08, 1] : 1 }}
              transition={{ duration: 0.5, repeat: hovered ? Infinity : 0 }}
              style={{
                filter: hovered
                  ? "drop-shadow(0 0 8px rgba(90,200,216,0.9)) drop-shadow(0 0 16px rgba(90,200,216,0.4))"
                  : "drop-shadow(0 0 4px rgba(90,200,216,0.3))",
                transition: "filter 0.3s",
              }}
            />

            {/* Scanline overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 3px)",
                backgroundSize: "100% 3px",
              }}
            />

            {/* ARCADE label */}
            <div
              className="flex flex-col items-center gap-0.5"
              style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
            >
              <span
                className="font-mono text-[10px] font-black tracking-[0.25em] uppercase"
                style={{
                  color: hovered ? "#5AC8D8" : "#ffffff60",
                  textShadow: hovered ? "0 0 8px rgba(90,200,216,0.8)" : "none",
                  transition: "color 0.3s, text-shadow 0.3s",
                }}
              >
                ARCADE
              </span>
            </div>

            {/* INSERT COIN hint — appears on hover */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  transition={{ duration: 0.15 }}
                  className="overflow-hidden"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  <motion.span
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                    className="font-mono text-[8px] font-bold tracking-widest"
                    style={{ color: "#F7D046" }}
                  >
                    PRESS
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Right edge accent */}
            <div className="absolute right-0 top-4 bottom-4 w-[3px]"
              style={{
                background: hovered
                  ? "linear-gradient(to bottom, #EB5E93, #5AC8D8, #F7D046)"
                  : "rgba(255,255,255,0.08)",
                transition: "background 0.4s",
              }}
            />
          </div>

          {/* Tab connector wedge */}
          <div
            className="absolute left-0 top-0 bottom-0 w-1"
            style={{ background: "rgba(0,0,0,0.6)" }}
          />
        </motion.button>
      </div>

      {/* ── Shutter Overlay ─────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpening && (
          <div
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 9998 }}
            aria-hidden="true"
          >
            {Array.from({ length: SLAT_COUNT }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-0 right-0 bg-ink"
                style={{
                  top: `${(i / SLAT_COUNT) * 100}%`,
                  height: `${100 / SLAT_COUNT + 0.2}%`,
                  transformOrigin: "top center",
                }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{
                  delay: i * 0.055,
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            ))}

            {/* Arcade title reveal */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.62, duration: 0.25 }}
            >
              <div className="font-sans text-5xl md:text-7xl font-black tracking-tighter flex gap-1">
                <span style={{ color: "#F7D046" }}>AR</span>
                <span style={{ color: "#EB5E93" }}>CA</span>
                <span style={{ color: "#5AC8D8" }}>DE</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
