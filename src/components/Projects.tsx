import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { accentBg, featuredProjects, labNotes } from "@/lib/data";
import { projectDetails } from "@/lib/projectDetails";
import ProjectModal from "./ProjectModal";
import SectionHeader from "./SectionHeader";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<{ title: string; markdown: string } | null>(null);

  const openProjectDetails = (title: string) => {
    // AI Lawyer is written up as part of the internship project
    const detailsKey = title === "AI Lawyer" ? "Internship Project" : title;
    setSelectedProject({ title, markdown: projectDetails[detailsKey] || "" });
  };

  return (
    <section id="work" className="scroll-mt-32">
      <SectionHeader index="01" label="Work" title="Selected Work" subtitle="Shipped products, research, and things still on the bench" />

      <div className="grid md:grid-cols-2 gap-8">
        {featuredProjects.map((project, i) => {
          const featured = i === 0;
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
                <button
                  onClick={() => openProjectDetails(project.title)}
                  className="mechanical-button bg-white px-6 py-3.5 text-sm mt-auto self-start"
                >
                  {project.cta} <ArrowUpRight size={18} strokeWidth={3} />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-16">
        <p className="eyebrow text-ink/60 mb-4">Side builds</p>
        <ul className="bg-white border-3 border-ink divide-y-3 divide-ink">
          {labNotes.map((note) => (
            <li key={note.id} className="flex items-center gap-5 px-5 py-4">
              <span className="font-mono text-sm font-bold text-ink/40">{note.id}</span>
              <span className="font-bold text-lg">{note.title}</span>
              <span className={`ml-auto w-3 h-3 border-2 border-ink ${accentBg[note.color]}`} />
            </li>
          ))}
        </ul>
      </div>

      <ProjectModal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ""}
        markdownContent={selectedProject?.markdown || ""}
      />
    </section>
  );
}
