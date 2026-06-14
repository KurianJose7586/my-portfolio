"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GameWrapperProps {
  title: string;
  children: ReactNode;
  score?: number | string;
  onBack: () => void;
  accentColor?: string;
}

export default function GameWrapper({ title, children, score, onBack, accentColor = "bg-electric-cyan" }: GameWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <button
          onClick={onBack}
          className="mechanical-button bg-white px-4 py-2 text-sm flex items-center gap-2 cursor-pointer"
        >
          <span className="text-lg">←</span>
          <span>LOBBY</span>
        </button>

        <div className="flex items-center gap-4">
          <h2 className={`font-mono text-xl md:text-2xl font-bold uppercase tracking-wider ${accentColor} border-4 border-ink px-4 py-2 shadow-[4px_4px_0px_0px_black]`}>
            {title}
          </h2>
        </div>

        {score !== undefined && (
          <div className="bg-ink text-white font-mono text-lg font-bold px-6 py-2 border-4 border-ink shadow-[4px_4px_0px_0px_#F7D046]">
            SCORE: {score}
          </div>
        )}
      </div>

      {/* Game Area */}
      <div className="brutalist-card bg-canvas p-4 md:p-8">
        {children}
      </div>
    </motion.div>
  );
}
