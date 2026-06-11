"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function PaperPlane() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [scrollHeight, setScrollHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof document !== "undefined") {
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        setScrollHeight(docHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Paper plane flies from left to right across the viewport
  const xPosition = useTransform(scrollYProgress, [0, 1], [-100, 150]);
  const yPosition = useTransform(scrollYProgress, [0, 0.5, 1], [100, -50, 100]);
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.div
      ref={ref}
      className="fixed pointer-events-none z-40 top-1/3"
      style={{
        left: xPosition,
        top: yPosition,
      }}
    >
      <motion.div
        style={{ rotate: rotation }}
        className="text-6xl filter drop-shadow-lg"
      >
        ✈️
      </motion.div>
    </motion.div>
  );
}
