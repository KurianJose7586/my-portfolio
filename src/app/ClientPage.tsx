"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import dynamic from "next/dynamic";
const RemoteCursors = dynamic(() => import("@/components/RemoteCursors"), { ssr: false });
const InteractionEffects = dynamic(() => import("@/components/InteractionEffects"), { ssr: false });
import SplashScreen from "@/components/SplashScreen";
import CustomCursor from "@/components/CustomCursor";
import ArcadeDock from "@/components/ArcadeDock";
import ProgressBar from "@/components/ProgressBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import About from "@/components/About";
import ResearchModal from "@/components/ResearchModal";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Terminal from "@/components/Terminal";

export default function ClientPage({ initialShowSplash }: { initialShowSplash: boolean }) {
  const [isLoading, setIsLoading] = useState(initialShowSplash);
  const [isResearchOpen, setIsResearchOpen] = useState(false);

  useEffect(() => {
    // Lock scroll while the splash is up
    document.body.style.overflow = isLoading ? "hidden" : "";
  }, [isLoading]);

  const handleFinishLoading = () => {
    setIsLoading(false);
    document.cookie = `kurian_splash_timestamp=${new Date().getTime()}; max-age=7200; path=/`;
  };

  return (
    <MotionConfig reducedMotion="user">
      <Terminal initialState="closed" isGlobalWidget={true} />
      <AnimatePresence mode="wait">
        {isLoading && <SplashScreen finishLoading={handleFinishLoading} />}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative pb-28 md:pb-0"
      >
        <CustomCursor />
        <ArcadeDock />
        <RemoteCursors />
        <InteractionEffects />
        <ProgressBar />

        <Navbar />

        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <Hero />
        </div>

        <Marquee />

        <div className="max-w-6xl mx-auto px-5 md:px-8 flex flex-col gap-28 md:gap-40 pt-24 md:pt-32">
          <ScrollReveal>
            <Projects />
          </ScrollReveal>
          <ScrollReveal>
            <Experience onOpenResearch={() => setIsResearchOpen(true)} />
          </ScrollReveal>
          <ScrollReveal>
            <About />
          </ScrollReveal>
          <ScrollReveal>
            <Gallery />
          </ScrollReveal>
          <ScrollReveal>
            <Contact />
          </ScrollReveal>
        </div>

        <Footer />
      </motion.main>

      <ResearchModal isOpen={isResearchOpen} onClose={() => setIsResearchOpen(false)} />
    </MotionConfig>
  );
}
