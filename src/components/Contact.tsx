"use client";
import { useState } from "react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Failed to send');
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset after close animation
    setTimeout(() => { setStatus('idle'); setErrorMsg(''); }, 300);
  };

  return (
    <>
      <section className="pt-32 pb-10" id="contact">
        {/* Top Left Badge */}
        <div className="mb-16 md:mb-24">
          <div className="inline-block bg-cyber-yellow border-[6px] border-ink px-4 md:px-6 py-2 md:py-3 shadow-[6px_6px_0px_0px_black] md:shadow-[8px_8px_0px_0px_black]">
            <h2 className="font-sans text-2xl md:text-5xl font-black uppercase tracking-wide">
              GET IN TOUCH
            </h2>
          </div>
        </div>

        <div className="text-center mb-16 md:mb-20 px-4">
          <h3 className="font-sans text-xl md:text-4xl font-bold text-ink">
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
          <button onClick={() => setIsModalOpen(true)} className="relative group hover:-translate-y-2 transition-transform duration-300 w-72 h-56 block outline-none cursor-pointer">
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
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="bg-white border-[6px] border-ink p-6 md:p-12 shadow-[16px_16px_0px_0px_black] relative z-10 w-full max-w-3xl rotate-[0.5deg] max-h-[90vh] overflow-y-auto">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 md:top-6 md:right-6 bg-punch-pink border-4 border-ink w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-cyber-yellow hover:rotate-90 transition-all shadow-[4px_4px_0px_0px_black] cursor-pointer z-50"
              aria-label="Close contact form"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            <h2 className="font-sans text-3xl md:text-5xl font-black uppercase text-ink leading-[0.8] tracking-tighter mb-8 md:mb-10 mt-6 md:mt-0">
              SEND A TRANSMISSION
            </h2>

            {/* Success state */}
            {status === 'success' ? (
              <div className="text-center py-12 space-y-4">
                <div className="text-6xl">✓</div>
                <p className="font-mono text-xl font-bold text-ink">TRANSMISSION RECEIVED.</p>
                <p className="font-mono text-sm text-gray-600">I&apos;ll get back to you soon.</p>
                <button
                  onClick={closeModal}
                  className="mechanical-button bg-cyber-yellow px-8 py-3 font-sans text-lg font-black uppercase tracking-widest mt-6 cursor-pointer"
                >
                  CLOSE
                </button>
              </div>
            ) : (
              <form className="space-y-8" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="font-mono font-bold uppercase text-xs text-ink tracking-widest">
                      Identity // Name
                    </label>
                    <input
                      id="contact-name"
                      className="w-full bg-paper border-4 border-ink p-4 font-mono text-lg focus:ring-8 focus:ring-electric-cyan/30 outline-none transition-all shadow-[4px_4px_0px_0px_black]"
                      placeholder="WHO ARE YOU?"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      required
                      disabled={status === 'loading'}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="font-mono font-bold uppercase text-xs text-ink tracking-widest">
                      Relay // Email
                    </label>
                    <input
                      id="contact-email"
                      className="w-full bg-paper border-4 border-ink p-4 font-mono text-lg focus:ring-8 focus:ring-electric-cyan/30 outline-none transition-all shadow-[4px_4px_0px_0px_black]"
                      placeholder="REACH OUT VIA..."
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      required
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="font-mono font-bold uppercase text-xs text-ink tracking-widest">
                    The Objective // Problem
                  </label>
                  <textarea
                    id="contact-message"
                    className="w-full bg-paper border-4 border-ink p-4 font-mono text-lg focus:ring-8 focus:ring-electric-cyan/30 outline-none transition-all shadow-[4px_4px_0px_0px_black]"
                    placeholder="DESCRIBE THE WORKFLOW..."
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    required
                    disabled={status === 'loading'}
                  />
                </div>

                {/* Error message */}
                {status === 'error' && (
                  <p className="font-mono text-sm text-red-600 border-2 border-red-400 bg-red-50 p-3">
                    ✕ {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="mechanical-button bg-cyber-yellow w-full py-6 font-sans text-3xl font-black uppercase tracking-widest mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'TRANSMITTING…' : 'TRANSMIT DATA'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
