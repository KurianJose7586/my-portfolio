"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADING_STEPS = [
  "INITIALIZING KINETIC LAB...",
  "LOADING NEURAL WEIGHTS...",
  "CALIBRATING SENSORS...",
  "ESTABLISHING SECURE LINK...",
  "OPTIMIZING WORKFLOWS...",
  "SYSTEMS ONLINE."
];

const FAKE_LOGS = [
  { id: "e3f4a1", addr: "0x4f2a" },
  { id: "9b2c8d", addr: "0x1e5c" },
  { id: "7a6e5f", addr: "0x9d2b" }
];

export default function SplashScreen({ finishLoading }: { finishLoading: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(finishLoading, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 200);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [finishLoading]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-md">
        {/* Terminal Header */}
        <div className="bg-paper border-4 border-ink p-2 flex justify-between items-center mb-0">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-punch-pink border-2 border-ink"></div>
            <div className="w-3 h-3 bg-cyber-yellow border-2 border-ink"></div>
            <div className="w-3 h-3 bg-electric-cyan border-2 border-ink"></div>
          </div>
          <span className="font-mono text-xs font-bold text-ink uppercase">system_boot.exe</span>
        </div>

        {/* Terminal Body */}
        <div className="bg-white border-x-4 border-b-4 border-ink p-6 shadow-[12px_12px_0px_0px_rgba(247,208,70,1)]">
          <div className="space-y-2 mb-8 h-24 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentStep}
                initial={{ opacity: 0, x: -10 }}
                animate={{ 
                  opacity: [0, 1, 0.8, 1],
                  x: 0 
                }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-sm md:text-base text-ink font-bold"
              >
                {">"} {LOADING_STEPS[currentStep]}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  _
                </motion.span>
              </motion.p>
            </AnimatePresence>
            <div className="opacity-40 font-mono text-xs">
              {FAKE_LOGS.map((log, i) => (
                <p key={i}>
                  [{log.id}] 0x{log.addr} OK
                </p>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between font-mono text-xs font-bold uppercase">
              <span>Loading Protocol</span>
              <span>{Math.min(progress, 100)}%</span>
            </div>
            <div className="h-8 border-4 border-ink bg-paper relative overflow-hidden">
              <motion.div
                className="h-full bg-electric-cyan"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ type: "spring", bounce: 0, duration: 0.2 }}
              />
              {/* Grid Overlay on Progress */}
              <div className="absolute inset-0 flex">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="flex-1 border-r-2 border-ink/20 last:border-r-0"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Text */}
        <motion.div 
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-8 text-center"
        >
          <span className="font-mono text-cyber-yellow text-xs tracking-widest uppercase">
            ESTABLISHING KINETIC CONNECTION
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
