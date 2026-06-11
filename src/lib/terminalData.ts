export const terminalCommands = {
  help: {
    title: "── available commands ───────────────────────────────",
    content: `  whoami              who is this guy
  projects            everything i've built
  research            the TriRank paper
  skills              tech stack
  open       deep-dive into a project
  ask ""    ask KurianGPT anything
  contact             how to reach me
  clear               clear the terminal

pro tip: try \`open twinlyai\` or \`ask "what's CursorOS?"\``,
  },

  whoami: {
    title: "Kurian Jose",
    content: `CS student · AI engineer · builder of things that actually work

focus:   legal AI, financial analysis, resume intelligence, automation
status:  open to internships, freelance, collabs
located: India (IST)
email:   kurianjose005@gmail.com`,
  },

  projects: {
    title: "── featured projects ───────────────────────────────",
    content: `  twinlyai    resume → personalized AI assistant  [live]
  cursorosd   context-aware AI overlay for Windows [v1.2]
  cablite     offline-first ride-hailing platform   [phase 2]
  ailawyer    constitutional law PDF chatbot         [stable]

run \`open twinlyai\`, \`open cursorosd\` etc. for more info`,
  },

  research: {
    title: "── research ────────────────────────────────────────",
    content: `TriRank: A Hybrid Retrieval Framework
co-authored · Galgotias University

pipeline:  BM25 → BGE-large-en-v1.5 → ColBERTv2 + RRF
result:    nDCG@10  0.4638   MRR@10  0.3825
baseline:  BM25 standalone  0.2286
baseline:  dense-only        0.4376
▲ outperforms both. zero fine-tuning.

validated across 4 BEIR datasets out-of-the-box.
contact: kurianjose005@gmail.com for paper access`,
  },

  skills: {
    title: "── technical skills ────────────────────────────────",
    content: `ai/ml      RAG, LangChain, FAISS, ColBERTv2, BGE, RRF,
           LLMs, Groq, Gemini, OpenRouter, prompt eng.
backend    FastAPI, Node.js, Docker, GCP, MongoDB,
           PostgreSQL, PostGIS, Redis, Prisma
frontend   Next.js, React, React Native, TypeScript,
           Tailwind, Expo, Streamlit
systems    Python, Tkinter, ctypes, ESP32, SIM800L,
           GSM/SMS, PDF automation, multiagent pipelines
auth       JWT, OAuth, AWS, Twilio`,
  },

  contact: {
    title: "── contact ─────────────────────────────────────────",
    content: `  email     kurianjose005@gmail.com
  github    github.com/KurianJose7586
  linkedin  linkedin.com/in/kurian-jose

open to: internships · freelance AI projects · collabs
if the problem is hard and the use case is real, let's talk.`,
  },
};

export const projectDetails: Record<string, { title: string; content: string }> = {
  twinlyai: {
    title: "TwinlyAI — Your resume, turned into an intelligent AI assistant.",
    content: `turns resumes into personalized AI chatbots via custom RAG pipelines
100 users at MVP launch · 500+ resumes processed
stack: Next.js · JWT · OAuth · AWS · Custom RAG`,
  },

  cursorosd: {
    title: "CursorOS — Your desktop, made agentic.",
    content: `context-aware AI overlay for Windows: find, organize, summarize, move files
one hotkey. semantic intent. atomic rollback for safety.
dual-LLM: Gemini primary · Groq/Llama-3 fallback
tri-stream parallel retrieval · v2 (OmniParser vision) in progress
▲ status: v1.2 stable`,
  },

  cablite: {
    title: "CabLite — Ride-hailing that works when the internet doesn't.",
    content: `offline-first platform: disaster recovery, rural, congested events
local SQLite FTS5 · SMS protocol · ESP32 + SIM800L hardware gateway
zero cloud dependency.
▲ status: phase 2 — hardware assembly + firmware underway`,
  },

  ailawyer: {
    title: "AI Lawyer — Constitutional law, answered instantly from source documents.",
    content: `PDF-based legal chatbot. LangChain + FAISS + RAG.
no hallucination safety net — careful prompt engineering and retrieval only.`,
  },
};

export const getEasterEggs = (): Record<string, string> => ({
  "sudo rm -rf /": "Permission denied. (also: please don't.)",
  "sudo rm -rf": "Permission denied. (also: please don't.)",
  vim: `opening vim...

just kidding. how would you even exit.`,
  ls: `projects/   research/   skills/   contact.txt   resume.pdf

(try \`projects\` or \`open \` instead of poking around with ls)`,
  pwd: "/home/kurian/portfolio",
  "cat resume.pdf": "binary file. try \`contact\` to get the real thing.",
  "git log": `commit a3f9d1e  fix: CursorOS v1.2 rollback edge case
commit 77bc220  feat: TriRank ColBERTv2 reranking stage
commit 2e841aa  init: TwinlyAI RAG pipeline

(these are fake but the spirit is accurate)`,
  date: `${new Date().toUTCString()} · IST`,
});

export const easterEggs = getEasterEggs();

export const pixelArt = `
   ██╗  ██╗██╗   ██╗██████╗ ██╗ █████╗ ██╗     
   ██║ ██╔╝██║   ██║██╔══██╗██║██╔══██╗██║     
   █████╔╝ ██║   ██║██████╔╝██║███████║██║     
   ██╔═██╗ ██║   ██║██╔══██╗██║██╔══██║██║     
   ██║  ██╗╚██████╔╝██║  ██║██║██║  ██║███████╗

   portfolio v2.0 — ai engineer · builder · thinker
`;

export const bootSequence = [
  pixelArt,
  "▶ kurian-portfolio v2.0 booting...",
  "loading: identity ..................... ok",
  "loading: 4 featured projects ......... ok",
  "loading: TriRank paper (nDCG 0.4638) . ok",
  "loading: KurianGPT ................... ok",
  "✓ ready. type `help` to explore, or just poke around.",
];

export const hints = [
  "whoami",
  "projects",
  "research",
  "skills",
  'ask "what makes you different?"',
  "help",
];
