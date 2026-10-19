import { ArrowRight, FlaskConical } from "lucide-react";
import { accentBg, accentText, experienceData } from "@/lib/data";
import SectionHeader from "./SectionHeader";

interface ExperienceProps {
  onOpenResearch?: () => void;
}

export default function Experience({ onOpenResearch }: ExperienceProps) {
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

      <ol className="relative border-l-3 border-ink ml-3 md:ml-4 space-y-14">
        {experienceData.map((job) => (
          <li key={job.role} className="relative pl-8 md:pl-12">
            <span className={`absolute -left-[11px] top-8 w-5 h-5 rotate-45 border-3 border-ink ${accentBg[job.color]}`} />

            <article className="brutalist-card p-6 md:p-10">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-3xl md:text-4xl font-black tracking-tight">{job.role}</h3>
                  <p className="font-mono font-bold uppercase text-ink/70 mt-1">{job.company}</p>
                </div>
                <span className="chip bg-paper shrink-0 self-start">{job.period}</span>
              </div>

              <p className="text-lg leading-relaxed mb-6">{job.description}</p>

              <ul className="space-y-3 mb-8">
                {job.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 items-start">
                    <ArrowRight size={20} strokeWidth={3} className={`mt-0.5 shrink-0 ${accentText[job.color]}`} />
                    <span className="leading-snug">{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {job.tech.map((t) => (
                  <span key={t} className="chip bg-ink text-white">{t}</span>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
