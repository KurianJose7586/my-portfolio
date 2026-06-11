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
  return (
    <section className="relative pt-20" id="about">
      <div className="absolute -top-16 left-0 z-20">
        <div className="bg-cyber-yellow px-10 py-4 border-4 border-ink shadow-[12px_12px_0px_0px_black] inline-block transform -rotate-2">
          <h2 className="font-sans text-5xl font-black uppercase m-0 tracking-tighter">
            {bioData.headline}
          </h2>
        </div>
      </div>
      
      <div className="bg-white border-4 border-ink p-10 md:p-16 shadow-[32px_32px_0px_0px_#1b1b1b] relative mt-12 rotate-[-1deg] group tape-hover transition-transform hover:rotate-0 hover:translate-y-[-4px]">
        <div className="tape-accent -top-6 left-1/4 rotate-[-8deg] w-48"></div>
        <div className="tape-accent -bottom-6 right-1/3 rotate-[12deg] bg-electric-cyan/70 w-56"></div>
        
        {/* Scrapbook Doodle/Note */}
        <div className="absolute -left-16 top-12 font-caveat text-4xl text-punch-pink rotate-[-15deg] group-hover:rotate-[-20deg] group-hover:scale-110 transition-transform hidden lg:block opacity-90">
          ➔ Read this!
        </div>
        
        <div className="font-sans text-2xl font-medium leading-relaxed space-y-8 max-w-4xl">
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
          
          <div className="bg-paper border-4 border-ink p-8 italic font-mono text-lg mt-12 shadow-[8px_8px_0px_0px_black] rotate-[1deg]">
            {bioData.footer}
          </div>
        </div>
      </div>
    </section>
  );
}
