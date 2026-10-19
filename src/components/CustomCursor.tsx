"use client";

import { useState, useEffect } from "react";

type CursorType = "default" | "active" | "orb" | "hidden";

const CLASS: Record<CursorType, string> = {
  default: "",
  active: "active",
  orb: "orb-active",
  hidden: "hidden-cursor",
};

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<CursorType>("default");

  useEffect(() => {
    // Touch devices keep the native cursor
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("input, textarea")) setCursorType("hidden");
      else if (target.closest(".kurian-orb")) setCursorType("orb");
      else if (target.closest('a, button, .lift, .clickable, [role="button"]')) setCursorType("active");
      else setCursorType("default");
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  return (
    <div
      id="custom-cursor"
      className={CLASS[cursorType]}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
}
