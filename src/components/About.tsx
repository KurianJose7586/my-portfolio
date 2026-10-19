"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { accentText, bioData, techArsenal } from "@/lib/data";
import SectionHeader from "./SectionHeader";

// Keyword highlights sweep in once the paragraph is on screen
const HIGHLIGHTS: [RegExp, string, string][] = [
  [/(not demo-ware, not generic chatbot wrappers)/g, "bg-cyber-yellow-highlight", "0.2s"],
  [/(agentic workflows, RAG pipelines)/g, "bg-electric-cyan-highlight", "0.4s"],
  [/(TriRank)/g, "bg-punch-pink-highlight", "0.4s"],
];

function AnimatedParagraph({ text }: { text: string }) {
  const [inView, setInView] = useState(false);
  const html = HIGHLIGHTS.reduce(
    (acc, [re, cls, delay]) =>
      acc.replace(re, `<span class="highlight-on-scroll ${cls} px-0.5 font-bold" style="transition-delay: ${delay}">$1</span>`),
    text
  );
  return (
    <motion.p
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, amount: 0.6 }}
      className={inView ? "in-view" : ""}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function About() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className="scroll-mt-32">
      <SectionHeader index="03" label="About" title={bioData.headline} />

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        <div className="lg:col-span-7 brutalist-card p-6 md:p-10">
          <div className={`relative text-lg md:text-xl leading-relaxed space-y-6 ${!isExpanded ? "max-h-72 md:max-h-none overflow-hidden" : ""}`}>
            {bioData.content.map((paragraph) => (
              <AnimatedParagraph key={paragraph} text={paragraph} />
            ))}

            {!isExpanded && (
              <div className="md:hidden absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-white to-transparent flex items-end justify-center">
                <button onClick={() => setIsExpanded(true)} className="mechanical-button bg-cyber-yellow px-5 py-2.5 text-xs">
                  Read more
                </button>
              </div>
            )}
          </div>

          <p className="mt-8 bg-paper border-2 border-ink p-5 font-caveat text-2xl leading-snug -rotate-1">
            {bioData.footer}
          </p>
        </div>

        <div className="lg:col-span-5 bg-ink text-white border-3 border-ink shadow-brutal shadow-cyber-yellow p-6 md:p-8">
          <p className="eyebrow text-white/50 mb-2">Loaded modules</p>
          <h3 className="text-3xl font-black tracking-tight mb-8">Tech Arsenal</h3>
          <div className="space-y-8">
            {techArsenal.map((category) => (
              <div key={category.category}>
                <h4 className={`eyebrow mb-3 ${accentText[category.color]}`}>{category.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="chip">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
