"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FileText, FolderOpen, Gamepad2, House, Mail, Terminal, User } from "lucide-react";
import { siteConfig } from "@/lib/data";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "irl", label: "IRL" },
  { id: "contact", label: "Contact" },
];

const TABS = [
  { id: "top", label: "Home", Icon: House },
  { id: "work", label: "Work", Icon: FolderOpen },
  { id: "about", label: "About", Icon: User },
  { id: "contact", label: "Contact", Icon: Mail },
];

const iconButton =
  "w-11 h-11 flex items-center justify-center border-3 border-ink bg-white shadow-brutal-sm hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-[translate,box-shadow] duration-100";

export default function Navbar() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    // A section is "active" while it crosses the middle of the viewport.
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["top", ...LINKS.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="hidden md:block sticky top-0 z-[100] pt-4 pb-3 bg-paper/85 backdrop-blur-sm">
        <nav className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="bg-white border-3 border-ink shadow-brutal-sm px-4 py-2.5 flex justify-between items-center gap-6">
            <a href="#top" className="flex items-center gap-3 shrink-0">
              <span className="w-9 h-9 rounded-full border-2 border-ink overflow-hidden">
                <video src="/waving-avatar-final.webm" autoPlay loop muted playsInline className="w-full h-full object-cover" />
              </span>
              <span className="font-sans text-xl font-black tracking-tighter">KURIAN.AI</span>
            </a>

            <div className="flex gap-1 lg:gap-2 items-center">
              {LINKS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`relative font-mono text-sm font-bold uppercase tracking-wider px-3 py-2 transition-colors ${
                    active === id ? "text-ink" : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {label}
                  <span
                    className={`absolute left-3 right-3 bottom-0.5 h-1 bg-cyber-yellow border border-ink origin-left transition-transform duration-200 ease-out-quint ${
                      active === id ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link href="/terminal" title="Open terminal" aria-label="Open terminal" className={iconButton}>
                <Terminal size={20} strokeWidth={2.5} />
              </Link>
              <Link href="/arcade" title="Open arcade" aria-label="Open arcade" className={`${iconButton} xl:hidden`}>
                <Gamepad2 size={20} strokeWidth={2.5} />
              </Link>
              <a href={siteConfig.resume} target="_blank" rel="noreferrer" className="mechanical-button bg-cyber-yellow h-11 px-4 text-sm">
                <FileText size={18} strokeWidth={2.5} /> Resume
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile bottom tab bar */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-[90] bg-white border-3 border-ink shadow-brutal-sm p-1.5 flex gap-1">
        {TABS.map(({ id, label, Icon }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={() => navigator.vibrate?.(30)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 transition-colors ${
              active === id ? "bg-ink text-white" : "text-ink active:bg-ink/10"
            }`}
          >
            <Icon size={20} strokeWidth={2.5} />
            <span className="font-mono text-[10px] font-bold uppercase">{label}</span>
          </a>
        ))}
      </nav>
    </>
  );
}
