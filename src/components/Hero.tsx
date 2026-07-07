"use client";

import { heroData, siteConfig } from "@/lib/data";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const currentString = heroData.typewriter[textIndex];
    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayedText(currentString.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setDisplayedText(currentString.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }

      if (!isDeleting && charIndex === currentString.length) {
        setTimeout(() => setIsDeleting(true), 3000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % heroData.typewriter.length);
      }
    }, isDeleting ? 30 : 60);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-8 min-h-[calc(100vh-150px)] pt-0 lg:pt-0 pb-10">
      <div className="flex-1 space-y-6 max-w-3xl relative z-10">
        <motion.div 
          initial={{ rotate: -5, scale: 0.9, opacity: 0 }}
          animate={{ rotate: -1, scale: 1, opacity: 1 }}
          className="inline-block bg-punch-pink text-ink px-4 py-2 md:px-6 md:py-2 border-4 border-ink shadow-[4px_4px_0px_0px_black] md:shadow-[6px_6px_0px_0px_black]"
        >
          <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-widest text-ink">
            SYSTEM STATUS: OPERATIONAL ⚡
          </span>
        </motion.div>
        
        <h1 className="font-sans text-5xl md:text-8xl font-black leading-tight md:leading-[0.85] tracking-tighter">
          I'm <br />
          <span className="text-punch-pink bg-cyber-yellow/20 px-2 leading-none inline-block mt-2 md:mt-0">{siteConfig.name}.</span>
        </h1>

        <div className="bg-white border-4 border-ink p-4 sm:p-6 md:p-10 shadow-[8px_8px_0px_0px_black] md:shadow-[16px_16px_0px_0px_black] max-w-xl relative rotate-[0.5deg]">
          <div className="tape-accent -top-4 -left-4 md:-top-6 md:-left-6 rotate-[-15deg] bg-cyber-yellow/80"></div>
          <p className="font-mono text-lg md:text-xl leading-relaxed min-h-[4rem]">
            {displayedText}
            <span className="animate-pulse font-bold">|</span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <a href="#projects" className="mechanical-button bg-cyber-yellow px-6 py-3 md:px-10 md:py-4 text-lg md:text-xl inline-block group text-center active:translate-y-1 active:shadow-none transition-all">
            <span className="inline-block group-hover:-rotate-3 transition-transform">ACCESS VAULT</span>
          </a>
          <a href="#contact" className="mechanical-button bg-white px-6 py-3 md:px-10 md:py-4 text-lg md:text-xl inline-block group text-center active:translate-y-1 active:shadow-none transition-all">
            <span className="inline-block group-hover:rotate-3 transition-transform">TRANSMIT SIGNAL</span>
          </a>
        </div>
        
        {/* Quick Links */}
        <div className="flex flex-wrap gap-4 pt-4">
          <a href="https://github.com/KurianJose7586" target="_blank" className="font-mono text-sm font-bold bg-white border-2 border-ink p-3 hover:-translate-y-1 hover:bg-electric-cyan hover:shadow-[4px_4px_0px_0px_black] transition-all shadow-[2px_2px_0px_0px_black] uppercase flex items-center justify-center rounded-sm" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path><path d="M12 18v4"></path></svg>
          </a>
          <a href="https://www.linkedin.com/in/kurianjose316" target="_blank" className="font-mono text-sm font-bold bg-white border-2 border-ink p-3 hover:-translate-y-1 hover:bg-cyber-yellow hover:shadow-[4px_4px_0px_0px_black] transition-all shadow-[2px_2px_0px_0px_black] uppercase flex items-center justify-center rounded-sm" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="mailto:kurianjose005@gmail.com" className="font-mono text-sm font-bold bg-white border-2 border-ink p-3 hover:-translate-y-1 hover:bg-punch-pink hover:text-white hover:shadow-[4px_4px_0px_0px_black] transition-all shadow-[2px_2px_0px_0px_black] uppercase flex items-center justify-center rounded-sm" aria-label="Email">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
          </a>
        </div>
        
        {/* Core Arsenal */}
        <div className="pt-4 w-full max-w-xl">
          <h4 className="font-mono text-xs uppercase font-bold text-ink/50 mb-3 tracking-widest">
            Core Arsenal
          </h4>
          <div className="flex flex-wrap gap-2">
            {["Next.js", "TypeScript", "Python", "PyTorch", "LangChain", "Docker", "AWS"].map(tech => (
              <span key={tech} className="bg-paper border-2 border-ink px-3 py-1 font-mono text-xs font-bold shadow-[2px_2px_0px_0px_black] hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_black] transition-all cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-none relative lg:mt-10 self-center lg:self-start">
        <div className="relative group tape-hover wiggle-on-hover">
          <div className="tape-accent -top-4 left-1/2 -translate-x-1/2 bg-white/80 w-32 border-2 border-ink"></div>
          <div className="absolute -top-8 -left-8 w-full h-full bg-electric-cyan border-4 border-ink z-0 rotate-[-4deg] group-hover:rotate-[-8deg] transition-transform duration-300"></div>
          <div className="absolute -bottom-8 -right-8 w-full h-full bg-cyber-yellow border-4 border-ink z-0 rotate-[2deg] group-hover:rotate-[6deg] transition-transform duration-300"></div>
          <div className="relative z-10 p-4 pb-12 bg-white border-4 border-ink shadow-[20px_20px_0px_0px_black] transition-transform duration-300 group-hover:-translate-y-2 group-hover:-translate-x-2">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCHb2LeGW4K9o7bcWvbzvIENggSL_2-zjMz_aBz9xeEhflkWZQSxdX5P97G6TKdip2tqMyi30W6nDx5JLyw-Ga6sdq-3DA6zfrwoboYMP7dPKcQMgV_NPuYrXZsuplcdoTXubP9iQu7Drdqw50LTnhCHFU5WuG9840ggefrLjchs7VeShFj-MYzcgIQ6knoiiR35_cOchoiUW3aPSD3yR29XbQGmhXn2TRzILy02sLVy4j_jVpEv1bneDXOYIiDwa2cHxhEGVoVB0" 
              alt={siteConfig.name}
              className="w-64 md:w-80 object-contain grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-ink"
            />
            <div className="absolute bottom-4 left-0 w-full text-center font-caveat font-bold text-2xl rotate-[-2deg] opacity-80 group-hover:opacity-100 transition-opacity">
              Me at work!
            </div>
            <div className="absolute -bottom-6 -left-4 bg-ink text-white border-2 border-white px-4 py-2 font-mono text-xs font-bold uppercase z-20 shadow-[4px_4px_0px_0px_#EB5E93] group-hover:rotate-[-5deg] transition-transform">
              ENGINEERED_WITH_VIGOR
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
