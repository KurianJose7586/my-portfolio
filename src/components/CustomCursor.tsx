"use client";

import { useState, useEffect } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState<"default" | "active" | "orb">("default");

  useEffect(() => {
    // Disable JS cursor logic on touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          'a, button, input, textarea, .brutalist-card, .group, .clickable, [role="button"], .kurian-orb'
        )
      ) {
        if (target.closest('.kurian-orb')) {
          setCursorType("orb");
        } else {
          setCursorType("active");
        }
      } else {
        setCursorType("default");
      }
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  let cursorClass = "";
  if (cursorType === "active") cursorClass = "active";
  if (cursorType === "orb") cursorClass = "orb-active";

  return (
    <div
      id="custom-cursor"
      className={cursorClass}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
}
