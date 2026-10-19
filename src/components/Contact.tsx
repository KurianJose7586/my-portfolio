"use client";
import { useState } from "react";
import { Check, Copy, Send } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import SectionHeader from "./SectionHeader";

interface FormState {
  name: string;
  email: string;
  message: string;
}

type Status = "idle" | "loading" | "success" | "error";

const fieldClass =
  "w-full bg-paper border-3 border-ink p-4 font-mono text-base outline-none transition-shadow focus:shadow-brutal-sm focus:shadow-electric-cyan disabled:opacity-60";

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Failed to send");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="scroll-mt-32">
      <SectionHeader index="05" label="Contact" title="Let's build" subtitle="Internships, collaborations, and messy workflows welcome" />

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <span className="w-16 h-16 rounded-full border-3 border-ink overflow-hidden shrink-0">
              <video src="/waving-avatar-final.webm" autoPlay loop muted playsInline className="w-full h-full object-cover" />
            </span>
            <p className="text-xl md:text-2xl font-bold leading-snug">
              If professionals hate doing it by hand, I want to hear about it.
            </p>
          </div>

          <div>
            <p className="eyebrow text-ink/60 mb-2">Email</p>
            <div className="flex items-stretch border-3 border-ink bg-white shadow-brutal-sm">
              <a href={`mailto:${siteConfig.email}`} className="flex-1 min-w-0 px-4 py-3 font-mono font-bold truncate hover:bg-cyber-yellow transition-colors">
                {siteConfig.email}
              </a>
              <button onClick={copyEmail} aria-label="Copy email address" className="w-12 border-l-3 border-ink flex items-center justify-center hover:bg-ink hover:text-white transition-colors cursor-pointer">
                {copied ? <Check size={18} strokeWidth={3} /> : <Copy size={18} strokeWidth={2.5} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" className="relative brutalist-card lift bg-electric-cyan -rotate-2 p-5 flex flex-col items-center gap-3">
              <span className="tape-accent -top-3 left-1/2 -translate-x-1/2 w-16 h-6 -rotate-3" />
              <LinkedinIcon size={36} />
              <span className="font-caveat text-2xl font-bold">LinkedIn</span>
            </a>
            <a href={siteConfig.github} target="_blank" rel="noreferrer" className="relative brutalist-card lift bg-cyber-yellow rotate-2 p-5 flex flex-col items-center gap-3">
              <span className="tape-accent -top-3 left-1/2 -translate-x-1/2 w-16 h-6 rotate-3 bg-white/70" />
              <GithubIcon size={36} />
              <span className="font-caveat text-2xl font-bold">GitHub</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 brutalist-card p-6 md:p-10">
          {status === "success" ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 mx-auto bg-cyber-yellow border-3 border-ink flex items-center justify-center">
                <Check size={32} strokeWidth={3} />
              </div>
              <p className="font-mono text-xl font-bold">Transmission received.</p>
              <p className="text-ink/60">I&apos;ll get back to you soon.</p>
              <button onClick={() => setStatus("idle")} className="mechanical-button bg-white px-6 py-3 text-sm mt-4">
                Send another
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Send a transmission</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <label className="space-y-2 block">
                  <span className="eyebrow">Name</span>
                  <input
                    className={fieldClass}
                    placeholder="Who are you?"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                    disabled={status === "loading"}
                  />
                </label>
                <label className="space-y-2 block">
                  <span className="eyebrow">Email</span>
                  <input
                    className={fieldClass}
                    placeholder="you@company.com"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                    disabled={status === "loading"}
                  />
                </label>
              </div>
              <label className="space-y-2 block">
                <span className="eyebrow">The problem</span>
                <textarea
                  className={fieldClass}
                  placeholder="Describe the workflow..."
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  required
                  disabled={status === "loading"}
                />
              </label>

              {status === "error" && (
                <p className="font-mono text-sm text-red-700 border-2 border-red-700 bg-red-50 p-3">✕ {errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="mechanical-button bg-cyber-yellow w-full py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Transmitting…" : <>Transmit <Send size={18} strokeWidth={2.5} /></>}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
