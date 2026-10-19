"use client";

import { heroData, siteConfig } from "@/lib/data";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
const LiveStatus = dynamic(() => import("@/components/LiveStatus"), { ssr: false });
const VisitsCounter = dynamic(() => import("@/components/VisitsCounter"), { ssr: false });

const socialClass =
  "w-11 h-11 flex items-center justify-center border-3 border-ink bg-white shadow-brutal-sm hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-[translate,box-shadow] duration-100";

export default function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const full = heroData.typewriter[textIndex];
    const done = !isDeleting && text === full;
    const empty = isDeleting && text === "";
    const t = setTimeout(() => {
      if (done) setIsDeleting(true);
      else if (empty) {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % heroData.typewriter.length);
      } else setText(full.slice(0, text.length + (isDeleting ? -1 : 1)));
    }, done ? 2500 : isDeleting ? 30 : 55);
    return () => clearTimeout(t);
  }, [text, isDeleting, textIndex]);

  return (
    <section id="top" className="scroll-mt-32 grid lg:grid-cols-[1fr_auto] gap-14 lg:gap-20 items-center py-12 md:py-20 lg:min-h-[calc(100svh-6rem)]">
      <div className="max-w-2xl">
        <p className="eyebrow text-ink/60 mb-6">AI &amp; Systems Engineer · {siteConfig.timezone}</p>

        <h1 className="text-display">
          Kurian <span className="text-punch-pink">Jose.</span>
        </h1>

        <p className="font-mono text-lg md:text-xl mt-6 min-h-[3.5rem] md:min-h-[2rem]" aria-live="polite">
          {text}
          <span className="animate-pulse">▍</span>
        </p>

        <div className="flex flex-wrap gap-4 mt-10">
          <a href="#work" className="mechanical-button bg-cyber-yellow px-7 py-4 text-base">
            See the work <ArrowDown size={18} strokeWidth={3} />
          </a>
          <a href="#contact" className="mechanical-button bg-white px-7 py-4 text-base">
            Get in touch
          </a>
        </div>

        <div className="flex items-center gap-3 mt-8">
          <a href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={socialClass}>
            <GithubIcon size={20} />
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={socialClass}>
            <LinkedinIcon size={20} />
          </a>
          <a href={`mailto:${siteConfig.email}`} aria-label="Email" className={socialClass}>
            <Mail size={20} />
          </a>
        </div>

        <div className="mt-10 inline-flex border-3 border-ink bg-white font-mono text-xs font-bold uppercase tracking-wider divide-x-3 divide-ink">
          {/* only:flex — on mobile, show this when presence cells are absent so the strip isn't empty */}
          <span className="hidden sm:flex only:flex items-center gap-2 px-3 py-2">
            <span className="w-2.5 h-2.5 bg-green-500 border border-ink" />
            Operational
          </span>
          <LiveStatus />
          <VisitsCounter />
        </div>
      </div>

      <div className="relative w-60 md:w-80 mx-auto lg:mx-0 rotate-2 group">
        <div className="absolute inset-0 translate-x-4 translate-y-4 bg-electric-cyan border-3 border-ink transition-transform duration-300 ease-out-quint group-hover:translate-x-5 group-hover:translate-y-5" />
        <div className="relative bg-white border-3 border-ink p-3 pb-14">
          <div className="tape-accent -top-4 left-1/2 -translate-x-1/2 -rotate-3 w-28" />
          <Image
            src="/profile.png"
            alt={siteConfig.name}
            width={320}
            height={400}
            priority
            className="w-full object-contain border-2 border-ink grayscale group-hover:grayscale-0 transition-[filter] duration-500"
          />
          <p className="absolute bottom-3 inset-x-0 text-center font-caveat font-bold text-2xl -rotate-2">Me at work!</p>
        </div>
      </div>
    </section>
  );
}
