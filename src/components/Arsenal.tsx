import { labNotes, techArsenal } from "@/lib/data";
import { MoveRight } from "lucide-react";

export default function Arsenal() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 pt-20">
      {/* Lab Notes */}
      <div className="brutalist-card bg-white p-6 md:p-12 rotate-[-1deg] relative">
        <div className="tape-accent -top-4 -right-4 md:-top-6 md:-right-6 rotate-12 bg-electric-cyan/80 w-32 md:w-48"></div>
        <h3 className="font-sans text-3xl md:text-4xl font-black mb-8 md:mb-12 border-b-8 border-ink inline-block pb-2 tracking-tighter">
          LAB NOTES // SIDE BUILDS
        </h3>
        <div className="space-y-6">
          {labNotes.map((note, i) => (
            <div
              key={i}
              className={`scrapbook-note p-6 flex justify-between items-center transition-all cursor-pointer group clickable active:translate-x-1 active:translate-y-1 ${
                note.color === "electric-cyan" ? "hover:bg-electric-cyan" :
                note.color === "punch-pink" ? "hover:bg-punch-pink hover:text-white" :
                "hover:bg-cyber-yellow"
              } bg-paper hover:-translate-y-1 hover:rotate-1`}
            >
              <span className="font-caveat text-3xl font-bold text-ink/90 group-hover:text-ink">{note.id} {note.title}</span>
              <MoveRight className="group-hover:translate-x-4 transition-transform w-8 h-8 text-ink" />
            </div>
          ))}
        </div>
      </div>

      {/* Tech Arsenal */}
      <div className="brutalist-card bg-ink text-white p-6 md:p-12 rotate-[1deg] relative">
        <div className="absolute -top-4 -left-4 md:-top-8 md:-left-8 bg-white text-ink border-4 border-ink p-2 md:p-3 rotate-[-5deg] font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest z-20 shadow-[4px_4px_0px_0px_#F7D046] md:shadow-[6px_6px_0px_0px_#F7D046]">
          LOADED_MODULES.EXE
        </div>
        <h3 className="font-sans text-3xl md:text-4xl font-black mb-8 md:mb-12 border-b-8 border-cyber-yellow inline-block pb-2 tracking-tighter text-white">
          TECH ARSENAL
        </h3>
        <div className="space-y-10">
          {techArsenal.map((category, i) => (
            <div key={i}>
              <h4 className={`font-mono text-xs font-bold uppercase mb-4 tracking-[0.3em] ${
                category.color === "cyber-yellow" ? "text-cyber-yellow" :
                category.color === "electric-cyan" ? "text-electric-cyan" :
                "text-punch-pink"
              }`}>
                {category.category}
              </h4>
              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill, j) => (
                  <span
                    key={j}
                    className="bg-white text-ink border-2 border-ink px-3 py-1 md:px-4 md:py-1.5 font-mono text-xs md:text-sm font-bold shadow-[3px_3px_0px_0px_#EB5E93] md:shadow-[4px_4px_0px_0px_#EB5E93]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
