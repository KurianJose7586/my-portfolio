"use client";
import Link from "next/link";
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
    <>
      <motion.div 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-150%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:block sticky top-6 left-0 right-0 z-[100] px-4 md:px-10 pb-4"
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
          <div className="flex items-center gap-3">
            {/* Terminal icon — always visible */}
            <Link
              href="/arcade"
              title="Open Arcade"
              aria-label="Open arcade page"
              className="flex items-center justify-center gap-1.5 border-4 border-ink bg-punch-pink px-3 py-2 font-mono font-black text-sm shadow-[4px_4px_0px_0px_black] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black] transition-all cursor-pointer select-none"
            >
              <span className="text-base leading-none">🎮</span>
            </Link>
            <Link
              href="/terminal"
              title="Open Terminal"
              aria-label="Open terminal page"
              className="flex items-center justify-center gap-1.5 border-4 border-ink bg-electric-cyan px-3 py-2 font-mono font-black text-sm shadow-[4px_4px_0px_0px_black] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black] transition-all cursor-pointer select-none"
            >
              <span className="text-base leading-none">&gt;_</span>
            </Link>
            <button className="mechanical-button bg-white px-6 py-2 text-sm cursor-pointer">
              RESUME.PDF
            </button>
          </div>
        </nav>
      </motion.div>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-[90]">
        <nav className="bg-cyber-yellow border-4 border-ink rounded-xl px-2 py-3 flex justify-between items-center shadow-[6px_6px_0px_0px_black]">
          <a href="#" className="flex-1 flex flex-col items-center gap-1 active:translate-y-1 active:opacity-70 transition-all">
            <span className="text-xl">🏠</span>
            <span className="font-mono text-[10px] font-black tracking-tight text-ink">HOME</span>
          </a>
          <a href="#projects" className="flex-1 flex flex-col items-center gap-1 active:translate-y-1 active:opacity-70 transition-all">
            <span className="text-xl">📁</span>
            <span className="font-mono text-[10px] font-black tracking-tight text-ink">VAULT</span>
          </a>
          <a href="#about" className="flex-1 flex flex-col items-center gap-1 active:translate-y-1 active:opacity-70 transition-all">
            <span className="text-xl">👤</span>
            <span className="font-mono text-[10px] font-black tracking-tight text-ink">BIO</span>
          </a>
          <a href="#contact" className="flex-1 flex flex-col items-center gap-1 active:translate-y-1 active:opacity-70 transition-all">
            <span className="text-xl">✉️</span>
            <span className="font-mono text-[10px] font-black tracking-tight text-ink">CONTACT</span>
          </a>
        </nav>
      </div>
    </>
  );
}
