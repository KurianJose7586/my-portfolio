"use client";

import { useState, useEffect } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState<"default" | "active" | "orb">("default");

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('kurian-orb') || target.closest('.kurian-orb')) {
        setCursorType("orb");
      } else {
        setCursorType("active");
      }
    };
    const onMouseLeave = () => setCursorType("default");

    document.addEventListener("mousemove", onMouseMove);
    
    const attachListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, input, textarea, .brutalist-card, .group, .clickable, [role="button"], .kurian-orb'
      );
      
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });
    };

    attachListeners();
    // Re-attach periodically in case of dynamic DOM updates (like the Terminal widget mounting)
    const interval = setInterval(attachListeners, 1000);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      clearInterval(interval);
      const interactives = document.querySelectorAll(
        'a, button, input, textarea, .brutalist-card, .group, .clickable, [role="button"], .kurian-orb'
      );
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
      });
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
