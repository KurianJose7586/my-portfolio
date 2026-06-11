"use client";
import { siteConfig } from "@/lib/data";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Keep it visible if we are near the top (Hero section)
    if (latest < 800) {
      setHidden(false);
    } else if (latest > lastY) {
      setHidden(true); // scrolling down past hero
    } else {
      setHidden(false); // scrolling up
    }
    setLastY(latest);
  });

  return (
    <motion.div 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-150%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="sticky top-6 left-0 right-0 z-[100] px-4 md:px-10 pb-4"
    >
      <nav className="bg-cyber-yellow border-4 border-ink rounded-lg px-6 py-4 flex justify-between items-center shadow-[8px_8px_0px_0px_black] transition-none w-full group/nav">
        <div className="font-sans text-2xl font-black tracking-tighter text-ink bg-white px-4 py-1 border-4 border-ink shadow-[4px_4px_0px_0px_black] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black] transition-all cursor-pointer">
          KURIAN.AI
        </div>
        <div className="hidden md:flex gap-8 items-center">
          <a className="font-mono text-sm font-bold text-ink hover:underline decoration-4 underline-offset-4 hover:-translate-y-1 transition-transform" href="#">Index</a>
          <a className="font-mono text-sm font-bold text-ink hover:underline decoration-4 underline-offset-4 hover:-translate-y-1 transition-transform" href="#about">Bio</a>
          <a className="font-mono text-sm font-bold text-ink hover:underline decoration-4 underline-offset-4 hover:-translate-y-1 transition-transform" href="#projects">Vault</a>
          <a className="font-mono text-sm font-bold text-ink hover:underline decoration-4 underline-offset-4 hover:-translate-y-1 transition-transform" href="#research">Papers</a>
        </div>
        <button className="mechanical-button bg-electric-cyan px-6 py-2 text-sm">
          RESUME.PDF
        </button>
      </nav>
    </motion.div>
  );
}
