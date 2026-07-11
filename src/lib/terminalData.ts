export const terminalCommands = {
  help: {
    title: "── available commands ───────────────────────────────",
    content: `  whoami              who is this guy
  projects            everything i've built
  research            the TriRank paper
  skills              tech stack
  open <name>         deep-dive into a project
  ask "<q>"           ask KurianGPT anything
  contact             how to reach me

  ls                  list files in current directory
  cd <dir>            change directory (try \`cd projects\`)
  cat <file>          read a file  (try \`cat about.txt\`)
  pwd                 print working directory
  clear               clear the terminal

pro tip: press Tab for smart autocomplete. backtick commands are clickable.`,
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

TriRank is a training-free 3-stage hybrid retrieval framework that 
combines sparse (BM25) and dense (BGE-large) retrievers with a 
ColBERTv2 reranker. It's designed to outperform standalone dense 
pipelines on out-of-domain data without any task-specific fine-tuning.

pipeline:  BM25 → BGE-large-en-v1.5 → ColBERTv2 + RRF
result:    nDCG@10  0.4638   MRR@10  0.3825
baseline:  BM25 standalone  0.2286
baseline:  dense-only        0.4376

validated across 4 BEIR datasets out-of-the-box.

here's the link if you wanna check it out for yourself:
https://drive.google.com/file/d/1szBawJBbm8d1DGUXkjNI1Z05Yz43rutk/view?usp=sharing`,
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
  linkedin  linkedin.com/in/kurianjose316

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

// ── Pseudo File System ────────────────────────────────────────────────────
export interface FsFile { type: 'file'; content: string; }
export interface FsDir  { type: 'dir';  children: Record<string, FsNode>; }
export type FsNode = FsFile | FsDir;

export const fileSystem: FsDir = {
  type: 'dir',
  children: {
    'about.txt': {
      type: 'file',
      content: `Kurian Jose — CS student · AI engineer · builder of things that actually work

focus:   legal AI, financial analysis, resume intelligence, automation
status:  open to internships, freelance, collabs
located: India (IST)
email:   kurianjose005@gmail.com`,
    },
    'resume.pdf': {
      type: 'file',
      content: `[binary file — can't render PDFs in the terminal]
view it here: https://drive.google.com/file/d/1vW57HLq8cGeJr4fKsaDo_qvrBSRrcoGm/view?usp=sharing`,
    },
    'contact.txt': {
      type: 'file',
      content: `email     kurianjose005@gmail.com
github    github.com/KurianJose7586
linkedin  linkedin.com/in/kurianjose316

open to: internships · freelance AI projects · collabs
if the problem is hard and the use case is real, let's talk.`,
    },
    'experience.txt': {
      type: 'file',
      content: `WORK HISTORY:

1. AI Intern @ Astron Financial Solutions (June 2025 – August 2025)
   - Built a Legal Case Brief Generator (cut review time by 40%)
   - Developed an AI legal research assistant (85% relevance accuracy)
   - Automated GST reconciliation for 1,200+ invoices
   - Containerized backend services with Flask & Docker

2. Tech Lead & Core Member @ GDG on Campus — Galgotias University (2025 – Present)
   - Co-founded the GDG chapter and organized a 100+ participant hackathon
   - Mentored students in AI, backend engineering, and system design
   - Turned ideas into working products

(Run \`open experience\` to view the full dossier on the site, or scroll down!)`,
    },
    'projects': {
      type: 'dir',
      children: {
        'twinlyai.md': {
          type: 'file',
          content: `TwinlyAI — Your resume, turned into an intelligent AI assistant.

turns resumes into personalized AI chatbots via custom RAG pipelines
100 users at MVP launch · 500+ resumes processed
stack: Next.js · JWT · OAuth · AWS · Custom RAG`,
        },
        'cursorosd.md': {
          type: 'file',
          content: `CursorOS — Your desktop, made agentic.

context-aware AI overlay for Windows: find, organize, summarize, move files
one hotkey. semantic intent. atomic rollback for safety.
dual-LLM: Gemini primary · Groq/Llama-3 fallback
tri-stream parallel retrieval · v2 (OmniParser vision) in progress
status: v1.2 stable`,
        },
        'cablite.md': {
          type: 'file',
          content: `CabLite — Ride-hailing that works when the internet doesn't.

offline-first platform: disaster recovery, rural, congested events
local SQLite FTS5 · SMS protocol · ESP32 + SIM800L hardware gateway
zero cloud dependency.
status: phase 2 — hardware assembly + firmware underway`,
        },
        'ailawyer.md': {
          type: 'file',
          content: `AI Lawyer — Constitutional law, answered instantly from source documents.

PDF-based legal chatbot. LangChain + FAISS + RAG.
no hallucination safety net — careful prompt engineering and retrieval only.`,
        },
        'beaconbrd.md': {
          type: 'file',
          content: `BeaconBRD — Transform unstructured comms into structured BRDs.

filters noise from Slack and Gmail, synthesizing high-confidence signals
into multi-agent Business Requirement Documents.
stack: FastAPI · Python · LLMs · LangChain · OAuth`,
        },
      },
    },
    'research': {
      type: 'dir',
      children: {
        'trirank.md': {
          type: 'file',
          content: `TriRank: A Hybrid Retrieval Framework
co-authored · Galgotias University

Training-free 3-stage hybrid retrieval combining sparse (BM25) and dense
(BGE-large) retrievers with a ColBERTv2 reranker.

pipeline:  BM25 → BGE-large-en-v1.5 → ColBERTv2 + RRF
result:    nDCG@10  0.4638   MRR@10  0.3825
baseline:  BM25 standalone  0.2286
baseline:  dense-only        0.4376

validated across 4 BEIR datasets. zero fine-tuning.
link: https://drive.google.com/file/d/1szBawJBbm8d1DGUXkjNI1Z05Yz43rutk/view?usp=sharing`,
        },
      },
    },
    'skills': {
      type: 'dir',
      children: {
        'ai-ml.txt': {
          type: 'file',
          content: `ai/ml stack:
  RAG Pipelines, LangChain, FAISS, ColBERTv2
  BGE Embeddings, Groq, Gemini, OpenRouter
  Prompt Engineering, Agentic Workflows`,
        },
        'backend.txt': {
          type: 'file',
          content: `backend/cloud:
  FastAPI, Node.js, Docker, GCP, AWS
  PostgreSQL, PostGIS, MongoDB, Redis, Prisma`,
        },
        'frontend.txt': {
          type: 'file',
          content: `frontend/product:
  Next.js, React, React Native
  TypeScript, Tailwind CSS, Figma, Expo`,
        },
        'systems.txt': {
          type: 'file',
          content: `systems/hardware:
  Python, Tkinter, ctypes
  ESP32, SIM800L, GSM/SMS
  PDF automation, multiagent pipelines`,
        },
      },
    },
  },
};

/** Walk cwd array using a path string, return new cwd or null if invalid */
export function resolvePath(cwd: string[], path: string): string[] | null {
  const parts = path.split('/').filter(Boolean);
  const next = [...cwd];
  for (const part of parts) {
    if (part === '..') { if (next.length > 0) next.pop(); }
    else if (part !== '.') { next.push(part); }
  }
  return next;
}

/** Return the FsNode at path[], or null */
export function getNode(path: string[]): FsNode | null {
  let node: FsNode = fileSystem;
  for (const seg of path) {
    if (node.type !== 'dir') return null;
    const child: FsNode = (node as FsDir).children[seg];
    if (!child) return null;
    node = child;
  }
  return node;
}

export const getEasterEggs = (): Record<string, string> => ({
  "sudo rm -rf /": "Permission denied. (also: please don't.)",
  "sudo rm -rf": "Permission denied. (also: please don't.)",
  vim: `opening vim...\n\njust kidding. how would you even exit.`,
  pwd: "use \`pwd\` — it's a real command now.",
  date: `${new Date().toUTCString()} · IST`,
});

export const easterEggs = getEasterEggs();

export const pixelArt = `
   ██╗  ██╗██╗   ██╗██████╗ ██╗ █████╗ ███╗   ██╗
   ██║ ██╔╝██║   ██║██╔══██╗██║██╔══██╗████╗  ██║
   █████╔╝ ██║   ██║██████╔╝██║███████║██╔██╗ ██║
   ██╔═██╗ ██║   ██║██╔══██╗██║██╔══██║██║╚██╗██║
   ██║  ██╗╚██████╔╝██║  ██║██║██║  ██║██║ ╚████║

   portfolio v2.0 — ai engineer · builder · thinker
`;

// Each entry: [text, delayMs] — delay BEFORE printing this line
export const bootSequence: [string, number][] = [
  // ASCII banner — shown first, fast
  [pixelArt, 0],

  // System init header
  [`BIOS v2.0.4 — kurian-portfolio kernel`, 180],
  [`Copyright (c) 2024 Kurian Jose. All rights reserved.`, 80],
  [``, 60],

  // Hardware check
  [`[ SYS ] scanning hardware...`, 220],
  [`[ SYS ] cpu:       curiosity × ambition @ 4.2GHz`, 90],
  [`[ SYS ] memory:    500+ hours of side-project RAM`, 90],
  [`[ SYS ] storage:   github.com/KurianJose7586`, 90],
  [`[ SYS ] display:   retina-grade attention to detail`, 90],
  [`[ OK  ] hardware check passed`, 140],
  [``, 60],

  // Kernel modules
  [`[ SYS ] loading kernel modules...`, 220],
  [`[ OK  ] mod: identity ................... loaded`, 110],
  [`[ OK  ] mod: rag-pipeline ............... loaded`, 110],
  [`[ OK  ] mod: colbertv2-reranker ......... loaded`, 110],
  [`[ OK  ] mod: next-js-14 ................. loaded`, 110],
  [`[ OK  ] mod: fastapi-backend ............ loaded`, 110],
  [`[ OK  ] mod: esp32-firmware ............. loaded`, 110],
  [`[ WARN ] mod: sleep ..................... not found`, 110],
  [`[ ERR  ] mod: that-one-bug .............. couldn't fix that one :(`, 600],
  [`[ SYS ] ignoring. moving on. it's fine. everything is fine.`, 180],
  [``, 60],

  // Projects mount
  [`[ SYS ] mounting projects filesystem...`, 240],
  [`[ OK  ] /projects/twinlyai    → resume AI assistant  [live]`, 110],
  [`[ OK  ] /projects/cursorosd   → agentic desktop overlay [v1.2]`, 110],
  [`[ OK  ] /projects/cablite     → offline ride-hailing  [phase 2]`, 110],
  [`[ OK  ] /projects/ailawyer    → legal PDF chatbot     [stable]`, 110],
  [``, 60],

  // Research
  [`[ SYS ] indexing research papers...`, 220],
  [`[ OK  ] TriRank: BM25 + BGE-large + ColBERTv2 + RRF`, 110],
  [`[ OK  ] nDCG@10: 0.4638  MRR@10: 0.3825  (BM25 baseline: 0.2286)`, 110],
  [`[ OK  ] validated: 4 BEIR datasets · zero fine-tuning`, 110],
  [``, 60],

  // NPM Install sequence simulation
  [`[ SYS ] resolving dependencies...`, 150],
  [`[ GET ] https://registry.npmjs.org/kurian-core/-/kurian-core-2.0.4.tgz`, 40],
  [`[ GET ] https://registry.npmjs.org/brutalism-ui/-/brutalism-ui-1.0.0.tgz`, 40],
  [`[ GET ] https://registry.npmjs.org/agentic-rag/-/agentic-rag-0.9.3.tgz`, 40],
  [`[ EXT ] extracting 1243 packages...`, 150],
  [`[ RUN ] postinstall scripts...`, 200],
  [`[ OK  ] added 1246 packages, and audited 1247 packages in 1.2s`, 100],
  [``, 60],

  // AI assistant
  [`[ SYS ] initializing KurianGPT...`, 260],
  [`[ OK  ] llm:       gemini-primary + groq-llama-3 fallback`, 100],
  [`[ OK  ] context:   4 projects · 1 paper · ∞ opinions on RAG`, 100],
  [`[ OK  ] KurianGPT online. try: ask "what makes you different?"`, 100],
  [``, 60],

  // Done
  [`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 300],
  [`  ✓ boot complete. welcome to the portfolio.`, 120],
  [`  type \`help\` to explore, or just start poking around.`, 80],
  [`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 80],
];

export const hints = [
  "whoami",
  "projects",
  "research",
  "skills",
  'ask "what makes you different?"',
  "help",
];
