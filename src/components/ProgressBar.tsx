"use client";
import { motion, useScroll } from "framer-motion";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] bg-electric-cyan origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
