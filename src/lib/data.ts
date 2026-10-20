// Full class names so Tailwind can see them; `color` fields below index into these.
export const accentBg: Record<string, string> = {
  "electric-cyan": "bg-electric-cyan",
  "cyber-yellow": "bg-cyber-yellow",
  "punch-pink": "bg-punch-pink",
  white: "bg-paper",
};

export const accentText: Record<string, string> = {
  "electric-cyan": "text-electric-cyan",
  "cyber-yellow": "text-cyber-yellow",
  "punch-pink": "text-punch-pink",
  white: "text-ink",
};

export const siteConfig = {
  name: "Kurian Jose",
  role: "CS Student · AI Engineer",
  email: "kurianjose005@gmail.com",
  github: "https://github.com/KurianJose7586",
  linkedin: "https://www.linkedin.com/in/kurianjose316",
  resume: "https://drive.google.com/file/d/1vW57HLq8cGeJr4fKsaDo_qvrBSRrcoGm/view?usp=sharing",
  timezone: "IST (India)",
  availability: "Open to internships, freelance AI projects and collaborations",
  education: "B.Tech in Computer Science and Engineering (AI & ML specialization), Galgotias University, Greater Noida — started 2023",
};

export const heroData = {
  typewriter: [
    "I build AI tools for law, finance, and automation",
    "Turning complex AI into practical business solutions",
    "Engineering next-gen agentic workflows.",
    "Hybrid retrieval is the future of RAG.",
    "Vigorously coding the Messy Real World.",
  ],
};

export const bioData = {
  headline: "Beyond the Notebook.",
  content: [
    "I build AI that actually works in the real world — not demo-ware, not generic chatbot wrappers. My focus is domain-specific: education, legal research, finance, business automation. If there's a messy, high-stakes workflow that professionals hate doing manually, that's where I want to put AI.",
    "I'm a Computer Science student who ships. Huzuri, my all-in-one office platform, runs live with 3,000+ automated tests behind it. At LrnAi I built ELIE, an NCERT-grounded voice tutor now on Google Play. On the side, TwinlyAI turns resumes into AI twins recruiters can chat with, and Agent Notch keeps every coding agent on my machine in one Dynamic-Island-style notch.",
    "I also do research: TriRank, a training-free retrieval pipeline that reranks fused BM25 + BGE-large candidates with ColBERTv2, reaches 0.3825 MRR@10 on MS MARCO.",
  ],
  footer: "(The only time my actual notebook comes out is during a 3am lightbulb moment when I'm supposed to be studying for midsems.)",
};

// Featured cards: keep this short. Everything else goes in moreProjects as a one-line row.
export const featuredProjects: {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  status?: string;
  links: { label: string; href: string }[];
  color: string;
  logo?: string;
}[] = [
  {
    title: "Huzuri",
    tagline: "The whole office, in one app.",
    description: "An all-in-one workspace for small Indian companies: tasks with automatic follow-ups, attendance, leave, meetings turned into minutes, AI email triage and resume screening. Its assistant runs on Claude tool use: every tool acts with the asking user's own permissions, and any citation that didn't come from a tool's results is dropped before it reaches you.",
    tech: ["FastAPI", "Next.js", "PostgreSQL", "Claude API", "Kotlin"],
    status: "Live with a demo login · team of 3, I wrote most of the backend",
    links: [{ label: "Try the demo", href: "https://huzuri.in/login" }],
    color: "cyber-yellow",
  },
  {
    title: "TwinlyAI",
    tagline: "Your resume, turned into an AI twin recruiters can talk to.",
    description: "Upload a resume and link your GitHub; TwinlyAI builds a chat-and-voice twin that answers recruiter questions from your actual work. Retrieval runs on MongoDB Atlas Vector Search, chat on Groq, and the backend ships to AWS App Runner through CI. 100+ users at MVP launch.",
    tech: ["Next.js", "FastAPI", "MongoDB Vector Search", "Groq", "AWS"],
    links: [
      { label: "Try TwinlyAI", href: "https://www.twinlyai.app" },
      { label: "GitHub", href: "https://github.com/KurianJose7586/TwinlyAI-frontend" },
    ],
    color: "electric-cyan",
    logo: "/twinlyAIlogo.png",
  },
  {
    title: "Agent Notch",
    tagline: "All your coding agents. One notch.",
    description: "A Dynamic-Island-style notch for Windows that tracks every coding agent (Claude Code, Copilot, OpenCode, Antigravity), lets you approve their requests with one key or from your phone, and lets agents on different PCs message each other over git, no server needed.",
    tech: ["Electron", "Node.js", "MCP", "PowerShell"],
    status: "v0.3.11 · open source (MIT)",
    links: [
      { label: "Website", href: "https://agent-notch-nine.vercel.app" },
      { label: "GitHub", href: "https://github.com/KurianJose7586/notch" },
    ],
    color: "white",
    logo: "/agent-notch.png",
  },
  {
    title: "CabLite",
    tagline: "Ride-hailing that works when the internet doesn't.",
    description: "Book a cab with zero data: requests travel as SMS, places are searched from an on-device SQLite FTS5 index, and PostGIS matches the nearest driver. A built-in ghost-driver simulator makes it demoable anywhere.",
    tech: ["React Native", "Node.js", "PostGIS", "SQLite FTS5", "SMS"],
    status: "Next up: ESP32 + SIM800L gateway to replace the cloud SMS relay",
    links: [
      { label: "Landing page", href: "https://cablite.vercel.app" },
      { label: "GitHub", href: "https://github.com/KurianJose7586/Cablite-offline" },
    ],
    color: "punch-pink",
    logo: "/cabliteicon.png",
  },
];

// One line each. The first few show; the rest sit behind a "show more" toggle.
export const moreProjects: { title: string; blurb: string; tech: string[]; href?: string; badge?: string }[] = [
  {
    title: "CursorOS",
    blurb: "A Windows overlay you talk to: ask for a file in plain English and it searches the Windows index and your open folders in parallel, or proposes a folder clean-up you approve first.",
    tech: ["Python", "Gemini", "Groq"],
    href: "https://github.com/KurianJose7586/CursorOS-backend",
  },
  {
    title: "SentraSec AI",
    blurb: "4-in-1 AI security toolkit: phishing, code vulnerabilities, config risk. Team build; I wrote the LLM tool router and the AI core.",
    tech: ["Gemini", "Python", "Next.js"],
    href: "https://github.com/Snehadas2005/devfest-security-suite",
    badge: "🏆 2nd Runner-Up · GDG Noida Buildethon",
  },
  {
    title: "SHIELD",
    blurb: "Smart India Hackathon: an AI layer over border-post CCTV that flags intrusions, number plates and odd behaviour. Team build; I built the behaviour-anomaly engine and the plate-reader benchmarks.",
    tech: ["YOLOv8", "OpenCV", "FastAPI", "Electron"],
    href: "https://github.com/Sarthaksinghcse/IBVAP",
  },
  {
    title: "Ops Desk",
    blurb: "An ops work tracker built to survive concurrency: row locks, version checks, idempotency keys, an outbox worker and an append-only audit log, all tested under parallel load.",
    tech: ["Node.js", "PostgreSQL", "React"],
    badge: "take-home",
  },
  {
    title: "Build_Trust",
    blurb: "A specialist marketplace where an AI project manager scopes your job one question at a time, then gates the estimate behind OTP sign-in.",
    tech: ["React", "FastAPI", "Groq", "Dataverse"],
    href: "https://build-trust-frontend.vercel.app",
  },
  {
    title: "BeaconBRD",
    blurb: "Turns Slack and Gmail threads into business requirement documents. Team build; I wrote the BRD generation engine.",
    tech: ["FastAPI", "Groq", "Google ADK"],
    href: "https://beacon-brd.vercel.app",
  },
  {
    title: "Sortpile",
    blurb: "GST paperwork for CA offices: files every bill by GSTIN, builds the purchase register and flags input-tax-credit risk.",
    tech: ["Flask", "Next.js", "Gemini"],
  },
  {
    title: "GPT-2 on a DGX",
    blurb: "Trained GPT-2 (124M) from scratch on FineWeb-Edu on the college DGX: val loss 3.03, HellaSwag 0.304.",
    tech: ["PyTorch", "Kubernetes", "DDP"],
  },
  {
    title: "VanDisha",
    blurb: "Smart India Hackathon: maps Forest Rights Act claims from scanned PDFs and recommends welfare schemes using satellite vegetation data.",
    tech: ["FastAPI", "PostGIS", "Sentinel-2", "Mapbox"],
  },
  {
    title: "Varia",
    blurb: "Scores how well a landing page matches its ad, then rewrites the copy above the fold: a six-agent pipeline with a validator.",
    tech: ["FastAPI", "Playwright", "Gemini"],
    badge: "take-home",
  },
  {
    title: "AI Lawyer",
    blurb: "RAG chatbot that answers questions from legal PDFs with DeepSeek-R1.",
    tech: ["LangChain", "FAISS", "Streamlit"],
    href: "https://github.com/KurianJose7586/Ai-lawyer-project",
  },
];

export const researchData = {
  title: "THE TRIRANK PAPER",
  subtitle: "RESEARCH PREPRINT / 2026",
  authors: ["Kurian Jose", "Jasith Kadian", "Shikhar Kulshreshtha", "Mohd Mohsin Ali", "Manish Raj", "Ankur Gogoi"],
  description: "A training-free 3-stage retrieval pipeline: BM25 and BGE-large-en-v1.5 candidates fused with RRF, then reranked by ColBERTv2. Evaluated on all 8.8M MS MARCO passages.",
  benchmark: {
    score: "0.3825",
    metric: "MRR@10 Score",
    dataset: "MS MARCO Dataset",
  },
  tags: [
    { label: "Sparse", value: "BM25" },
    { label: "Dense", value: "BGE" },
    { label: "Rerank", value: "ColBERT" },
    { label: "Fusion", value: "RRF" },
  ],
  cta: "GET THE FULL PDF",
  link: "https://drive.google.com/file/d/1szBawJBbm8d1DGUXkjNI1Z05Yz43rutk/view?usp=sharing",
};

export const techArsenal = [
  {
    category: "GEN_AI // NLP_STACK",
    skills: ["RAG Pipelines", "LangChain", "FAISS", "ColBERTv2", "BGE Embeddings", "Prompt Engineering"],
    color: "punch-pink",
  },
  {
    category: "BACKEND // CLOUD",
    skills: ["FastAPI", "Node.js", "Docker", "GCP", "AWS", "PostgreSQL", "Prisma"],
    color: "electric-cyan",
  },
  {
    category: "FRONTEND // PRODUCT",
    skills: ["Next.js", "React Native", "TypeScript", "Tailwind CSS", "Figma"],
    color: "cyber-yellow",
  },
];

export const experienceData = [
  {
    role: "Engineering Intern",
    company: "Enestock",
    period: "Sep 2026 – Present",
    description: "Building the software side of AI smart glasses that help technicians inspect railway overhead power lines.",
    highlights: [
      "Wrote the Kotlin library that drives DPVR smart glasses: a Bluetooth command queue and framing, photo transfer over Wi-Fi Direct and photo reassembly, tested against a fake-glasses double.",
      "Photos feed a vision-language model (Qwen3-VL on vLLM) that checks each mast against a 65-item checklist and speaks defects back to the technician.",
    ],
    tech: ["Kotlin", "Android", "Bluetooth LE", "Wi-Fi Direct", "vLLM"],
    color: "cyber-yellow"
  },
  {
    role: "AI and Product Engineering Intern",
    company: "LrnAi Technologies",
    period: "July 2026 – October 2026",
    description: "Built ELIE, the NCERT-grounded chat and voice AI tutor in the LrnAi learning app, live on the web and Google Play.",
    highlights: [
      "Replaced regex intent routing with a state-constrained LLM router: 37/55 → 50/55 correct on hand-labelled Hinglish student messages.",
      "Tuned pgvector search so textbook retrieval Recall@3 rose from 25% to 90% and empty results fell from 45% to 0%.",
      "Added a blind-solve verifier that catches 12 of 13 wrong answer keys in AI-generated quizzes, and roughly halved AI cost per student.",
    ],
    tech: ["Node.js", "PostgreSQL + pgvector", "Gemini", "Redis", "React + Capacitor"],
    color: "electric-cyan"
  },
  {
    role: "AI/ML Developer Intern",
    company: "Astron Financial Advisors",
    period: "June 2025 – August 2025",
    description: "My first dive into building AI systems that solved actual business problems instead of classroom assignments. I worked on legal-tech and financial automation tools, building everything from RAG pipelines to backend APIs.",
    highlights: [
      "Built a Legal Case Brief Generator that summarized 250+ page legal documents and cut review time by roughly 40%.",
      "Developed an AI legal research assistant capable of retrieving and ranking relevant Supreme Court judgments with 85% relevance accuracy.",
      "Automated GST reconciliation for 1,200+ invoices, helping identify financial discrepancies with minimal manual effort.",
      "Containerized and deployed backend services using Flask and Docker, making deployments far less painful."
    ],
    tech: ["Python", "Flask", "Docker", "RAG", "LLMs", "FAISS", "PostgreSQL"],
    color: "white"
  },
  {
    role: "Tech Lead & Core Member",
    company: "GDG on Campus — Galgotias University",
    period: "2025 – Present",
    description: "I helped build our university's Google Developer Groups chapter from the ground up. Besides organizing events, I spend most of my time mentoring students, reviewing projects, and convincing people that debugging is, in fact, part of programming.",
    highlights: [
      "Co-founded the GDG chapter at Galgotias University.",
      "Helped organize a 100+ participant hackathon.",
      "Mentored students in AI, backend engineering, and system design.",
      "Worked closely with teams to turn ideas into working products."
    ],
    tech: ["Leadership", "Mentorship", "System Design", "Event Organization"],
    color: "punch-pink"
  }
];

// Extra facts for KurianGPT (/api/chat) that the page doesn't show.
export const assistantNotes = [
  "Huzuri is Kurian's own project, separate from his Enestock internship. Its parts: a FastAPI + PostgreSQL backend, a Next.js web app, a Kotlin Android app, and an assistant on the Claude API.",
  "TwinlyAI internals: a LangGraph ReAct agent on Groq; GitHub code indexed in Qdrant; voice via Groq Whisper speech-to-text and edge-tts; CI/CD with GitHub Actions to Amazon ECR and AWS App Runner.",
  "At LrnAi, Kurian also built a Bayesian Knowledge Tracing model of what each student has mastered.",
  "Agent Notch is a solo project.",
  "Hackathon results: Kurian's team placed 2nd Runner-Up (third place) at GDG Noida Buildethon with SentraSec AI; Kurian wrote its AI core. He also built SHIELD and VanDisha for Smart India Hackathon.",
  "TriRank's status: a research preprint (2026), not yet published at a venue.",
  "TriRank: Kurian is first author. The work was done at Galgotias University and run on the college DGX, using bm25s and chunked exact GPU search over all 8.8M MS MARCO passages.",
  "At GDG on Campus, Kurian runs workshops, including 'Build Your Own Copilot' (FastAPI, LangChain, Ollama, Chroma RAG, CrewAI).",
  "Other skills: Python, TypeScript, Java, C, SQL, LangGraph, Qdrant, pgvector, OpenRouter, JWT/OAuth, Twilio, GitHub Actions, Expo, Streamlit, Electron, Kotlin.",
];
