"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
const PlayhtmlWrapper = dynamic(() => import("@/components/PlayhtmlWrapper"), { ssr: false });
const RemoteCursors = dynamic(() => import("@/components/RemoteCursors"), { ssr: false });
const InteractionEffects = dynamic(() => import("@/components/InteractionEffects"), { ssr: false });
import SplashScreen from "@/components/SplashScreen";
import CustomCursor from "@/components/CustomCursor";
import ProgressBar from "@/components/ProgressBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Bio from "@/components/Bio";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import ResearchModal from "@/components/ResearchModal";
import Arsenal from "@/components/Arsenal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import PaperPlane from "@/components/PaperPlane";
import Terminal from "@/components/Terminal";

export default function ClientPage({ initialShowSplash }: { initialShowSplash: boolean }) {
  const [isLoading, setIsLoading] = useState(initialShowSplash);
  const [isResearchOpen, setIsResearchOpen] = useState(false);

  // We no longer need the client-side check since the server component passed it as a prop.


  useEffect(() => {
    // Lock scroll while loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isLoading]);

  const handleFinishLoading = () => {
    setIsLoading(false);
    document.cookie = `kurian_splash_timestamp=${new Date().getTime()}; max-age=7200; path=/`;
  };

  return (
    <PlayhtmlWrapper>
      <Terminal initialState="closed" isGlobalWidget={true} />
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen finishLoading={handleFinishLoading} />
        )}
      </AnimatePresence>

      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="paper-grid relative"
      >
        <CustomCursor />
        <RemoteCursors />
        <InteractionEffects />
        <ProgressBar />
        <PaperPlane />
        
        {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] font-mono text-4xl opacity-[0.15] rotate-[-5deg] text-outline font-bold">0.4638 nDCG@10</div>
        <div className="absolute top-[40%] right-[2%] font-mono text-3xl opacity-[0.15] rotate-[10deg] text-outline font-bold">BM25 + BGE-LARGE</div>
        <div className="absolute top-[70%] left-[10%] font-mono text-2xl opacity-[0.15] rotate-[-15deg] text-outline font-bold">AGENTIC_WORKFLOW_v2.0</div>
        <div className="absolute top-[15%] right-[15%] font-mono text-5xl opacity-[0.15] rotate-[5deg] text-outline font-bold">TRIRANK</div>
        
        {/* Floating Shapes */}
        <div className="absolute top-[20%] right-[30%] w-40 h-40 border-[8px] border-ink/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute top-[60%] left-[20%] w-32 h-32 border-[8px] border-ink/10 rotate-45 animate-[pulse_4s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[20%] right-[10%] font-sans text-9xl font-black text-ink/10 rotate-[-20deg]">
          *
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto py-8 md:py-20 pl-4 pr-8 md:px-12 relative z-10">
        <div className="blueprint-grid border-[8px] md:border-[12px] border-ink flex flex-col md:flex-row min-h-screen relative shadow-[16px_16px_0px_0px_rgba(0,0,0,0.15)] md:shadow-[32px_32px_0px_0px_rgba(0,0,0,0.15)]">
          
          {/* Sidebar Chrome */}
          <div className="w-[60px] bg-ink text-white border-r-[6px] border-ink hidden lg:flex items-center justify-center relative z-50">
            <div className="[writing-mode:vertical-rl] transform rotate-180 font-mono font-bold text-base uppercase tracking-[4px] py-12 whitespace-nowrap">
              KURIAN.AI // KINETIC LAB // SYSTEMS & AUTOMATION
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 relative flex flex-col min-w-0">
            <div className="noise-bg absolute inset-0 z-0"></div>
            
            <Navbar />

            <div className="px-6 md:px-16 space-y-40 pb-20 relative z-10">
              <ScrollReveal>
                <Hero />
              </ScrollReveal>
              
              <Marquee />
              
              <ScrollReveal>
                <Bio />
              </ScrollReveal>
              
              <ScrollReveal>
                <Projects />
              </ScrollReveal>
              
              <ScrollReveal>
                <Experience onOpenResearch={() => setIsResearchOpen(true)} />
              </ScrollReveal>
              
              <ScrollReveal>
                <Arsenal />
              </ScrollReveal>
              
              <ScrollReveal>
                <Contact />
              </ScrollReveal>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </motion.main>
      
      <ResearchModal isOpen={isResearchOpen} onClose={() => setIsResearchOpen(false)} />
    </PlayhtmlWrapper>
  );
}
