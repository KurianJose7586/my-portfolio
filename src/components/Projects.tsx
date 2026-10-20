import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { accentBg, featuredProjects, moreProjects } from "@/lib/data";
import { projectDetails } from "@/lib/projectDetails";
import ProjectModal from "./ProjectModal";
import SectionHeader from "./SectionHeader";

// Rows shown before the "show all" toggle — keeps the section short.
const VISIBLE_ROWS = 5;

function ProjectRow({ project }: { project: (typeof moreProjects)[number] }) {
  const title = <span className="font-bold text-lg">{project.title}</span>;
  return (
    <li className="flex flex-col md:flex-row md:items-center gap-2 md:gap-5 px-5 py-4">
      <div className="flex-1 min-w-0">
        <p className="flex flex-wrap items-center gap-2">
          {project.href ? (
            <a href={project.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:underline">
              {title} <ArrowUpRight size={16} strokeWidth={3} />
            </a>
          ) : (
            title
          )}
          {project.badge && <span className="chip bg-cyber-yellow">{project.badge}</span>}
        </p>
        <p className="text-ink/70 leading-snug mt-1">{project.blurb}</p>
      </div>
      <div className="flex flex-wrap gap-2 md:justify-end md:max-w-[40%]">
        {project.tech.map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </div>
    </li>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  return (
    <section id="work" className="scroll-mt-32">
      <SectionHeader index="01" label="Work" title="Selected Work" subtitle="Shipped products, research, and things still on the bench" />

      <div className="grid md:grid-cols-2 gap-8">
        {featuredProjects.map((project, i) => {
          // First card spans both columns; so does the last one when the count is even, so no card sits alone.
          const featured = i === 0 || (i === featuredProjects.length - 1 && featuredProjects.length % 2 === 0);
          return (
            <article
              key={project.title}
              className={`brutalist-card lift flex flex-col ${featured ? "md:col-span-2 md:flex-row" : ""}`}
            >
              <div
                className={`${accentBg[project.color]} border-ink p-6 md:p-8 flex flex-col gap-5 ${
                  featured ? "border-b-3 md:border-b-0 md:border-r-3 md:w-2/5 md:justify-between" : "border-b-3"
                }`}
              >
                {project.logo && (
                  <div className="w-14 h-14 bg-white border-2 border-ink p-1.5 shrink-0">
                    <Image src={project.logo} alt="" width={56} height={56} className="w-full h-full object-contain" />
                  </div>
                )}
                <div>
                  <h3 className={`font-black uppercase tracking-tight leading-none ${featured ? "text-4xl md:text-5xl" : "text-3xl"}`}>
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs font-bold uppercase tracking-wider mt-3 text-ink/80">{project.tagline}</p>
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col gap-6 flex-1">
                {project.status && (
                  <p className="eyebrow flex items-center gap-2 text-ink/70">
                    <span className="w-2 h-2 bg-green-500 border border-ink" />
                    {project.status}
                  </p>
                )}
                <p className="text-lg leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="chip">{tech}</span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3 mt-auto">
                  {project.links.map((link, j) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`mechanical-button px-5 py-3 text-sm ${j === 0 ? "bg-ink text-white" : "bg-white"}`}
                    >
                      {link.label} <ArrowUpRight size={18} strokeWidth={3} />
                    </a>
                  ))}
                  {projectDetails[project.title] && (
                    <button onClick={() => setSelectedProject(project.title)} className="mechanical-button bg-white px-5 py-3 text-sm">
                      Write-up <BookOpen size={18} strokeWidth={3} />
                    </button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-16">
        <p className="eyebrow text-ink/60 mb-4">More builds</p>
        <ul className="bg-white border-3 border-ink divide-y-3 divide-ink">
          {moreProjects.slice(0, VISIBLE_ROWS).map((p) => (
            <ProjectRow key={p.title} project={p} />
          ))}
        </ul>
        {moreProjects.length > VISIBLE_ROWS && (
          <details className="group">
            <summary className="mechanical-button bg-white px-5 py-3 text-sm mt-4 list-none [&::-webkit-details-marker]:hidden">
              <span className="group-open:hidden">Show {moreProjects.length - VISIBLE_ROWS} more</span>
              <span className="hidden group-open:inline">Show less</span>
            </summary>
            <ul className="bg-white border-3 border-ink divide-y-3 divide-ink mt-4">
              {moreProjects.slice(VISIBLE_ROWS).map((p) => (
                <ProjectRow key={p.title} project={p} />
              ))}
            </ul>
          </details>
        )}
      </div>

      <ProjectModal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        title={selectedProject || ""}
        markdownContent={selectedProject ? projectDetails[selectedProject] : ""}
      />
    </section>
  );
}
