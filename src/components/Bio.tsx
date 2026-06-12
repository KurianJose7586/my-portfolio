"use client";
import { bioData } from "@/lib/data";
import { useState } from "react";
import { motion } from "framer-motion";

function AnimatedParagraph({ html }: { html: string }) {
  const [inView, setInView] = useState(false);
  return (
    <motion.p
      onViewportEnter={() => {
        setTimeout(() => setInView(true), 300);
      }}
      viewport={{ once: true, amount: 0.5 }}
      className={inView ? "in-view" : ""}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function Bio() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="relative pt-20" id="about">
      <div className="absolute -top-16 left-0 z-20">
        <div className="bg-cyber-yellow px-6 py-3 md:px-10 md:py-4 border-4 border-ink shadow-[8px_8px_0px_0px_black] md:shadow-[12px_12px_0px_0px_black] inline-block transform -rotate-2">
          <h2 className="font-sans text-3xl md:text-5xl font-black uppercase m-0 tracking-tighter">
            {bioData.headline}
          </h2>
        </div>
      </div>
      
      <div className="bg-white border-4 border-ink p-6 md:p-16 shadow-[16px_16px_0px_0px_#1b1b1b] md:shadow-[32px_32px_0px_0px_#1b1b1b] relative mt-12 rotate-[-1deg] group tape-hover transition-transform hover:rotate-0 hover:translate-y-[-4px]">
        <div className="tape-accent -top-4 md:-top-6 left-1/4 rotate-[-8deg] w-32 md:w-48"></div>
        <div className="tape-accent -bottom-4 md:-bottom-6 right-1/3 rotate-[12deg] bg-electric-cyan/70 w-40 md:w-56"></div>
        
        {/* Scrapbook Doodle/Note */}
        <div className="absolute -left-8 md:-left-16 top-12 font-caveat text-2xl md:text-4xl text-punch-pink rotate-[-15deg] group-hover:rotate-[-20deg] group-hover:scale-110 transition-transform hidden sm:block opacity-90">
          ➔ Read this!
        </div>
        
        <div className={`font-sans text-lg md:text-2xl font-medium leading-relaxed space-y-6 md:space-y-8 max-w-4xl relative ${!isExpanded ? 'h-64 md:h-auto overflow-hidden' : ''}`}>
          {bioData.content.map((paragraph, i) => {
            // Highlighting logic for specific keywords based on aboutMe.md
            const highlighted = paragraph
              .replace(/(not demo-ware, not generic chatbot wrappers)/g, '<span class="highlight-on-scroll bg-cyber-yellow-highlight border-b-4 border-ink px-1 font-bold" style="transition-delay: 0.2s">$1</span>')
              .replace(/(agentic workflows, RAG pipelines)/g, '<span class="highlight-on-scroll bg-electric-cyan-highlight border-b-4 border-ink px-1 font-bold" style="transition-delay: 1.4s">$1</span>')
              .replace(/(TriRank)/g, '<span class="highlight-on-scroll bg-punch-pink-highlight border-b-4 border-ink px-1 font-bold" style="transition-delay: 2.2s">$1</span>');

            return (
              <AnimatedParagraph key={i} html={highlighted} />
            );
          })}
          
          <div className="bg-paper border-4 border-ink p-6 md:p-8 italic font-mono text-base md:text-lg mt-8 md:mt-12 shadow-[8px_8px_0px_0px_black] rotate-[1deg]">
            {bioData.footer}
          </div>

          {!isExpanded && (
            <div className="md:hidden absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white to-transparent flex items-end justify-center pb-2 z-10">
              <button 
                onClick={() => setIsExpanded(true)} 
                className="mechanical-button bg-cyber-yellow px-6 py-2 text-sm font-bold shadow-[4px_4px_0px_0px_black] border-2 border-ink"
              >
                READ MORE
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
