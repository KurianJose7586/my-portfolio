"use client";
import { motion, useScroll } from "framer-motion";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();

  const checkpoints = [
    { id: "hero", label: "Hero", left: "0%" },
    { id: "about", label: "Beyond the NB", left: "20%" },
    { id: "projects", label: "Vault", left: "45%" },
    { id: "contact", label: "Reach Out", left: "99%" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full h-3 z-[9999] bg-white border-b-4 border-ink">
      <motion.div
        className="h-full bg-electric-cyan border-r-4 border-ink origin-left"
        style={{ width: "100%", scaleX: scrollYProgress }}
      />
      {checkpoints.map((cp, i) => (
        <div 
          key={i}
          className="absolute top-1/2 -translate-y-1/2 group"
          style={{ left: cp.left }}
        >
          <a
            href={`#${cp.id}`}
            className="block w-5 h-5 bg-cyber-yellow border-4 border-ink rounded-full hover:scale-150 hover:bg-punch-pink transition-all shadow-[2px_2px_0px_0px_black]"
            title={cp.label}
          />
          <span className="absolute top-6 left-1/2 -translate-x-1/2 bg-ink text-white font-mono text-[10px] font-bold px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {cp.label}
          </span>
        </div>
      ))}
    </div>
  );
}
