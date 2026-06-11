import { featuredProjects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="pt-20">
      <div className="inline-block bg-ink text-white px-10 py-4 border-4 border-ink mb-20 shadow-[10px_10px_0px_0px_#5AC8D8] rotate-1">
        <h2 className="font-sans text-4xl font-black uppercase tracking-tighter">
          PROJECT_VAULT.v2
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {featuredProjects.map((project, i) => (
          <div
            key={i}
            className={`brutalist-card p-10 relative rotate-[${(i % 2 === 0 ? -1.5 : 2)}deg] group tape-hover hover:rotate-0 transition-transform duration-300 ${
              project.color === "electric-cyan" ? "bg-electric-cyan" : 
              project.color === "cyber-yellow" ? "bg-cyber-yellow" : 
              project.color === "punch-pink" ? "bg-punch-pink text-white" : "bg-white"
            }`}
          >
            <div className="tape-accent -top-4 left-1/2 -translate-x-1/2 bg-white/70 w-24"></div>
            {project.logo ? (
              <img
                src={project.logo}
                alt={project.title}
                className="absolute -top-6 -right-6 w-24 h-24 object-contain drop-shadow-[6px_6px_0px_0px_black] rotate-12 group-hover:rotate-0 transition-transform"
              />
            ) : (
              <div className="absolute -top-6 -right-6 bg-white border-4 border-ink w-16 h-16 flex items-center justify-center rounded shadow-[6px_6px_0px_0px_black] rotate-12 text-ink group-hover:rotate-0 transition-transform">
                <span className="material-symbols-outlined text-3xl">{project.icon}</span>
              </div>
            )}
            
            <h3 className="font-sans text-4xl font-black mb-2 uppercase tracking-tighter">
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
