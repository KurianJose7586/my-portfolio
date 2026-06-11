"use client";
import { useState } from "react";

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="pt-32 pb-10" id="contact">
        {/* Top Left Badge */}
        <div className="mb-24">
          <div className="inline-block bg-cyber-yellow border-[6px] border-ink px-6 py-3 shadow-[8px_8px_0px_0px_black]">
            <h2 className="font-sans text-3xl md:text-5xl font-black uppercase tracking-wide">
              GET IN TOUCH
            </h2>
          </div>
        </div>

        <div className="text-center mb-20">
          <h3 className="font-sans text-2xl md:text-4xl font-bold text-ink">
            Let&apos;s build something amazing together
          </h3>
        </div>

        {/* Sticky Notes Grid */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-10 max-w-6xl mx-auto">
          
          {/* LinkedIn Note */}
          <a href="https://linkedin.com/in/kurian-jose" target="_blank" rel="noreferrer" className="relative group hover:-translate-y-2 transition-transform duration-300 w-72 h-56 block">
            <div className="absolute inset-0 bg-electric-cyan border-[6px] border-ink shadow-[12px_12px_0px_0px_black] rotate-[-2deg] flex flex-col items-center justify-center gap-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              <span className="font-caveat text-4xl font-bold">LinkedIn</span>
            </div>
            {/* Tape */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-10 bg-yellow-300/70 rotate-[-5deg] z-10 backdrop-blur-sm shadow-sm"></div>
          </a>

          {/* GitHub Note */}
          <a href="https://github.com/KurianJose7586" target="_blank" rel="noreferrer" className="relative group hover:-translate-y-2 transition-transform duration-300 w-72 h-56 block">
            <div className="absolute inset-0 bg-cyber-yellow border-[6px] border-ink shadow-[12px_12px_0px_0px_black] rotate-[1deg] flex flex-col items-center justify-center gap-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path><path d="M12 18v4"></path></svg>
              <span className="font-caveat text-4xl font-bold">GitHub</span>
            </div>
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-24 h-10 bg-yellow-300/70 rotate-[6deg] z-10 backdrop-blur-sm shadow-sm"></div>
          </a>

          {/* Mail Note - Triggers Modal */}
          <button onClick={() => setIsModalOpen(true)} className="relative group hover:-translate-y-2 transition-transform duration-300 w-72 h-56 block outline-none">
            <div className="absolute inset-0 bg-punch-pink border-[6px] border-ink shadow-[12px_12px_0px_0px_black] rotate-[-1deg] flex flex-col items-center justify-center gap-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
              <span className="font-caveat text-4xl font-bold">Mail</span>
            </div>
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-10 bg-yellow-300/70 rotate-[-3deg] z-10 backdrop-blur-sm shadow-sm"></div>
          </button>

        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white border-[6px] border-ink p-8 md:p-12 shadow-[16px_16px_0px_0px_black] relative z-10 w-full max-w-3xl rotate-[0.5deg]">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 bg-punch-pink border-4 border-ink w-12 h-12 flex items-center justify-center hover:bg-cyber-yellow hover:rotate-90 transition-all shadow-[4px_4px_0px_0px_black]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <h2 className="font-sans text-4xl md:text-5xl font-black uppercase text-ink leading-[0.8] tracking-tighter mb-10">
              SEND A TRANSMISSION
            </h2>
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-mono font-bold uppercase text-xs text-ink tracking-widest">Identity // Name</label>
                  <input className="w-full bg-paper border-4 border-ink p-4 font-mono text-lg focus:ring-8 focus:ring-electric-cyan/30 outline-none transition-all shadow-[4px_4px_0px_0px_black]" placeholder="WHO ARE YOU?" type="text" />
                </div>
                <div className="space-y-2">
                  <label className="font-mono font-bold uppercase text-xs text-ink tracking-widest">Relay // Email</label>
                  <input className="w-full bg-paper border-4 border-ink p-4 font-mono text-lg focus:ring-8 focus:ring-electric-cyan/30 outline-none transition-all shadow-[4px_4px_0px_0px_black]" placeholder="REACH OUT VIA..." type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-mono font-bold uppercase text-xs text-ink tracking-widest">The Objective // Problem</label>
                <textarea className="w-full bg-paper border-4 border-ink p-4 font-mono text-lg focus:ring-8 focus:ring-electric-cyan/30 outline-none transition-all shadow-[4px_4px_0px_0px_black]" placeholder="DESCRIBE THE WORKFLOW..." rows={4}></textarea>
              </div>
              <button className="mechanical-button bg-cyber-yellow w-full py-6 font-sans text-3xl font-black uppercase tracking-widest mt-4">
                TRANSMIT DATA
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
