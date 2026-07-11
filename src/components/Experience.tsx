import { experienceData } from "@/lib/data";

interface ExperienceProps {
  onOpenResearch?: () => void;
}

export default function Experience({ onOpenResearch }: ExperienceProps) {
  return (
    <section id="experience" className="pt-20">
      <div className="flex flex-col gap-12">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-8 border-ink pb-6">
          <div>
            <h2 className="font-sans text-6xl md:text-8xl font-black leading-none tracking-tighter uppercase">
              Dossier
            </h2>
            <p className="font-mono text-xl font-bold uppercase mt-2 opacity-80">
              Work History & Experience
            </p>
          </div>
          
          {/* Action button to open research paper */}
          {onOpenResearch && (
            <button 
              onClick={onOpenResearch}
              className="group flex items-center gap-3 bg-cyber-yellow border-4 border-ink px-6 py-3 shadow-[6px_6px_0px_0px_black] hover:shadow-[2px_2px_0px_0px_black] hover:translate-x-[4px] hover:translate-y-[4px] transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-xl">science</span>
              </div>
              <div className="text-left">
                <div className="font-mono text-[10px] font-black uppercase tracking-widest opacity-60">Published 2024</div>
                <div className="font-sans font-black text-lg leading-tight uppercase group-hover:underline decoration-2">View TriRank Paper</div>
              </div>
            </button>
          )}
        </div>

        {/* Experience Timeline */}
        <div className="relative pl-8 md:pl-12">
          {/* Vertical Timeline Line */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-ink"></div>

          <div className="space-y-16">
            {experienceData.map((job, idx) => (
              <div key={idx} className="relative">
                {/* Timeline Node */}
                <div className={`absolute -left-12 md:-left-[52px] top-6 w-8 h-8 md:w-10 md:h-10 border-4 border-ink bg-${job.color} rounded-none rotate-45 z-10`}></div>

                {/* Content Card */}
                <div className={`bg-white border-4 border-ink p-8 md:p-10 shadow-[16px_16px_0px_0px_black] transform transition-transform hover:-translate-y-2`}>
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 pb-6 border-b-4 border-ink/20">
                    <div>
                      <h3 className="font-sans text-3xl md:text-4xl font-black tracking-tight">{job.role}</h3>
                      <div className="font-mono text-lg font-bold text-ink/80 uppercase mt-1">{job.company}</div>
                    </div>
                    <div className={`bg-paper border-4 border-ink px-4 py-2 font-mono text-sm font-black uppercase shadow-[4px_4px_0px_0px_black] rotate-[${idx % 2 === 0 ? 2 : -2}deg]`}>
                      {job.period}
                    </div>
                  </div>

                  <p className="font-sans text-xl font-medium leading-relaxed mb-6">
                    {job.description}
                  </p>

                  <div className="bg-paper border-4 border-ink p-6 mb-8">
                    <div className="font-mono text-xs font-black uppercase tracking-widest mb-4 opacity-60">Highlights</div>
                    <ul className="space-y-3">
                      {job.highlights.map((highlight, i) => (
                        <li key={i} className="flex gap-4 items-start">
                          <span className={`text-${job.color} mt-1 material-symbols-outlined text-xl shrink-0 font-black`}>
                            arrow_right_alt
                          </span>
                          <span className="font-sans text-lg font-medium leading-snug">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {job.tech.map((t, i) => (
                      <span key={i} className="bg-ink text-white font-mono text-sm px-3 py-1 uppercase tracking-wider font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
