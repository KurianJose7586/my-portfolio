"use client";
import Link from "next/link";
import { siteConfig } from "@/lib/data";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import dynamic from "next/dynamic";
const LiveStatus = dynamic(() => import("@/components/LiveStatus"), { ssr: false });

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.2 });

    const sections = ['projects', 'about', 'contact'].map(id => document.getElementById(id));
    sections.forEach(el => el && observer.observe(el));

    const handleScroll = () => {
      if (window.scrollY < 400) setActiveSection("home");
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getMobileLinkClass = (section: string) => {
    const isActive = activeSection === section;
    return `flex-1 flex flex-col items-center gap-1 py-1 rounded-lg transition-all ${
      isActive ? 'bg-ink text-white shadow-inner scale-105' : 'text-ink active:translate-y-1 active:opacity-70 hover:bg-ink/10'
    }`;
  };

  return (
    <>
      <div className="hidden md:block sticky top-0 z-[100] px-4 md:px-10 pt-6 pb-4 bg-paper/30 backdrop-blur-sm">
        <nav className="bg-cyber-yellow border-4 border-ink rounded-lg px-6 py-4 flex justify-between items-center shadow-[8px_8px_0px_0px_black] transition-none w-full group/nav">
          <div className="flex items-center gap-4">
            <div className="font-sans text-2xl font-black tracking-tighter text-ink bg-white px-4 py-1 border-4 border-ink shadow-[4px_4px_0px_0px_black] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black] transition-all cursor-pointer">
              KURIAN.AI
            </div>
            
            <div className="hidden lg:block bg-ink text-paper px-3 py-1.5 border-2 border-ink">
              <LiveStatus variant="navbar" />
            </div>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <a className="font-mono text-sm font-bold text-ink uppercase tracking-wider hover:underline decoration-4 underline-offset-4 hover:-translate-y-1 transition-transform" href="#">Index</a>
            <a className="font-mono text-sm font-bold text-ink uppercase tracking-wider hover:underline decoration-4 underline-offset-4 hover:-translate-y-1 transition-transform" href="#about">Bio</a>
            <a className="font-mono text-sm font-bold text-ink uppercase tracking-wider hover:underline decoration-4 underline-offset-4 hover:-translate-y-1 transition-transform" href="#projects">Vault</a>
            <a className="font-mono text-sm font-bold text-ink uppercase tracking-wider hover:underline decoration-4 underline-offset-4 hover:-translate-y-1 transition-transform" href="#research">Papers</a>
          </div>
          <div className="flex items-center gap-3">
            {/* Terminal icon — always visible */}
            <Link
              href="/arcade"
              title="Open Arcade"
              aria-label="Open arcade page"
              className="flex items-center justify-center gap-1.5 border-4 border-ink bg-punch-pink px-3 py-2 font-mono font-black text-sm shadow-[4px_4px_0px_0px_black] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black] transition-all cursor-pointer select-none"
            >
              <span className="text-base leading-none">🎮</span>
            </Link>
            <Link
              href="/terminal"
              title="Open Terminal"
              aria-label="Open terminal page"
              className="flex items-center justify-center gap-1.5 border-4 border-ink bg-electric-cyan px-3 py-2 font-mono font-black text-sm shadow-[4px_4px_0px_0px_black] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_black] transition-all cursor-pointer select-none"
            >
              <span className="text-base leading-none">&gt;_</span>
            </Link>
            <a href={siteConfig.resume} target="_blank" rel="noreferrer" className="mechanical-button bg-white px-6 py-2 text-sm cursor-pointer text-ink hover:text-ink no-underline block text-center flex items-center justify-center">
              RESUME.PDF
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <div className="md:hidden fixed bottom-4 left-4 right-[22px] z-[90]">
        <nav className="bg-cyber-yellow border-4 border-ink rounded-xl px-1 py-2 flex justify-between items-center shadow-[6px_6px_0px_0px_black] gap-1">
          <a href="#" onClick={() => navigator.vibrate?.(50)} className={getMobileLinkClass("home")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-current"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            <span className="font-mono text-[10px] font-black tracking-tight text-current uppercase">HOME</span>
          </a>
          <a href="#projects" onClick={() => navigator.vibrate?.(50)} className={getMobileLinkClass("projects")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-current"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
            <span className="font-mono text-[10px] font-black tracking-tight text-current uppercase">VAULT</span>
          </a>
          <a href="#about" onClick={() => navigator.vibrate?.(50)} className={getMobileLinkClass("about")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-current"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            <span className="font-mono text-[10px] font-black tracking-tight text-current uppercase">BIO</span>
          </a>
          <a href="#contact" onClick={() => navigator.vibrate?.(50)} className={getMobileLinkClass("contact")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-current"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
            <span className="font-mono text-[10px] font-black tracking-tight text-current uppercase">CONTACT</span>
          </a>
        </nav>
      </div>
    </>
  );
}
