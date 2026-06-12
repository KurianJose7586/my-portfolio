import { featuredProjects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="pt-20">
      <div className="inline-block bg-ink text-white px-6 py-3 md:px-10 md:py-4 border-4 border-ink mb-10 md:mb-20 shadow-[6px_6px_0px_0px_#5AC8D8] md:shadow-[10px_10px_0px_0px_#5AC8D8] rotate-1">
        <h2 className="font-sans text-2xl md:text-4xl font-black uppercase tracking-tighter">
          PROJECT_VAULT.v2
        </h2>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory pb-12 -mx-4 px-4 md:grid md:grid-cols-2 gap-8 md:gap-16 md:overflow-visible md:mx-0 md:px-0 scrollbar-hide">
        {featuredProjects.map((project, i) => (
          <div
            key={i}
            className={`brutalist-card p-6 md:p-10 relative flex-shrink-0 w-[85vw] md:w-auto snap-center rotate-0 md:rotate-[${(i % 2 === 0 ? -1.5 : 2)}deg] group tape-hover md:hover:rotate-0 transition-transform duration-300 ${
              project.color === "electric-cyan" ? "bg-electric-cyan" : 
              project.color === "cyber-yellow" ? "bg-cyber-yellow" : 
              project.color === "punch-pink" ? "bg-punch-pink text-white" : "bg-white"
            }`}
          >
            <div className="tape-accent -top-4 left-1/2 -translate-x-1/2 bg-white/70 w-16 md:w-24"></div>
            {project.logo ? (
              <img
                src={project.logo}
                alt={project.title}
                className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-[4px_4px_0px_0px_black] md:drop-shadow-[6px_6px_0px_0px_black] rotate-12 group-hover:rotate-0 transition-transform"
              />
            ) : (
              <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 bg-white border-4 border-ink w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded shadow-[4px_4px_0px_0px_black] md:shadow-[6px_6px_0px_0px_black] rotate-12 text-ink group-hover:rotate-0 transition-transform">
                <span className="material-symbols-outlined text-2xl md:text-3xl">{project.icon}</span>
              </div>
            )}
            
            <h3 className="font-sans text-3xl md:text-4xl font-black mb-2 uppercase tracking-tighter pr-8">
              {project.title}
            </h3>
            
            <p className={`font-mono text-sm font-bold mb-6 tracking-widest border-b-2 border-ink inline-block pb-1 uppercase ${
              project.color === "punch-pink" ? "border-white" : "text-ink/80"
            }`}>
              {project.tagline}
            </p>
            
            <p className="font-sans text-lg leading-relaxed mb-8 font-medium">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              {project.tech.map((tech, j) => (
                <span
                  key={j}
                  className="bg-white text-ink border-2 border-ink px-3 py-1 font-mono text-xs font-bold uppercase shadow-[3px_3px_0px_0px_black]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <button className="mechanical-button bg-white text-ink px-6 py-4 text-base w-full">
              {project.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
