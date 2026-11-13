import { useState } from "react";
import { ArrowRight, FlaskConical } from "lucide-react";
import { accentBg, accentText, experienceData } from "@/lib/data";
import SectionHeader from "./SectionHeader";

interface ExperienceProps {
  onOpenResearch?: () => void;
}

// On mobile each role shows this many highlights until expanded; md+ always shows all
const MOBILE_HIGHLIGHTS = 2;

export default function Experience({ onOpenResearch }: ExperienceProps) {
  const [expanded, setExpanded] = useState<string[]>([]);

  return (
    <section id="experience" className="scroll-mt-32">
      <SectionHeader
        index="02"
        label="Experience"
        title="Dossier"
        subtitle="Work history & leadership"
        action={
          onOpenResearch && (
            <button onClick={onOpenResearch} className="mechanical-button bg-cyber-yellow px-5 py-3 text-sm self-start md:self-auto">
              <FlaskConical size={18} strokeWidth={2.5} />
              Read the TriRank paper
            </button>
          )
        }
      />

      <ol className="relative border-l-3 border-ink ml-2 md:ml-4 space-y-10 md:space-y-14">
        {experienceData.map((job) => {
          const hidden = expanded.includes(job.role) ? 0 : Math.max(0, job.highlights.length - MOBILE_HIGHLIGHTS);
          return (
            <li key={job.role} className="relative pl-6 md:pl-12">
              <span className={`absolute -left-[11px] top-8 w-5 h-5 rotate-45 border-3 border-ink ${accentBg[job.color]}`} />

              <article className="brutalist-card p-5 md:p-10">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3 md:gap-4 mb-5 md:mb-6">
                  <div>
                    <h3 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">{job.role}</h3>
                    <p className="font-mono text-sm md:text-base font-bold uppercase text-ink/70 mt-1">{job.company}</p>
                  </div>
                  <span className="chip bg-paper shrink-0 self-start">{job.period}</span>
                </div>

                <p className="md:text-lg leading-relaxed mb-5 md:mb-6">{job.description}</p>

                <ul className="space-y-3 mb-6 md:mb-8">
                  {job.highlights.map((highlight, i) => (
                    <li key={highlight} className={`gap-3 items-start ${hidden && i >= MOBILE_HIGHLIGHTS ? "hidden md:flex" : "flex"}`}>
                      <ArrowRight size={20} strokeWidth={3} className={`mt-0.5 shrink-0 ${accentText[job.color]}`} />
                      <span className="leading-snug">{highlight}</span>
                    </li>
                  ))}
                  {hidden > 0 && (
                    <li className="md:hidden">
                      <button
                        onClick={() => setExpanded((e) => [...e, job.role])}
                        className="font-mono text-xs font-bold uppercase underline decoration-cyber-yellow decoration-4 underline-offset-4 pl-8"
                      >
                        Show {hidden} more
                      </button>
                    </li>
                  )}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {job.tech.map((t) => (
                    <span key={t} className="chip bg-ink text-white">{t}</span>
                  ))}
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
