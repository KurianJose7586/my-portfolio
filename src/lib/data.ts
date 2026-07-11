export const siteConfig = {
  name: "Kurian Jose",
  role: "CS Student · AI Engineer",
  email: "kurianjose005@gmail.com",
  github: "https://github.com/KurianJose7586",
  linkedin: "https://www.linkedin.com/in/kurianjose316",
  resume: "https://drive.google.com/file/d/1vW57HLq8cGeJr4fKsaDo_qvrBSRrcoGm/view?usp=sharing",
  timezone: "IST (India)",
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
    "I build AI that actually works in the real world — not demo-ware, not generic chatbot wrappers. My focus is domain-specific: legal research, financial analysis, resume intelligence, business automation. If there's a messy, high-stakes workflow that professionals hate doing manually, that's where I want to put AI.",
    "I'm a Computer Science student with deep experience in agentic workflows, RAG pipelines, and taking LLM ideas from prototype to deployed product. TwinlyAI, my AI-powered resume assistant, onboarded 100 users in its MVP launch and processed 500+ resumes during development. The AI Lawyer handles constitutional law queries over PDF — no hallucination safety net, just careful prompt engineering and retrieval.",
    "I also published research: TriRank, a hybrid retrieval framework combining BM25, BGE-large-en-v1.5, and ColBERTv2, achieved 0.4638 nDCG@10 on MS MARCO — outperforming standalone dense retrieval pipelines without any task-specific training.",
  ],
  footer: "(The only time my actual notebook comes out is during a 3am lightbulb moment when I'm supposed to be studying for midsems.)",
};

export const featuredProjects = [
  {
    title: "TwinlyAI",
    tagline: "Your resume, turned into an intelligent AI assistant.",
    description: "Transforms resumes into personalized AI assistants using custom RAG pipelines. Onboarded 100 users at MVP launch, processed 500+ resumes during development.",
    tech: ["Next.js", "JWT", "OAuth", "AWS", "Custom RAG"],
    cta: "Try TwinlyAI",
    link: "#",
    color: "electric-cyan",
    icon: "description",
    logo: "/twinlyAIlogo.png",
  },
  {
    title: "CursorOS",
    tagline: "Your desktop, made agentic.",
    description: "A context-aware AI overlay for Windows that understands semantic intent and automates complex file workflows — find, organize, summarize, and move files via a single hotkey. Dual-LLM stack (Gemini + Groq fallback), tri-stream parallel retrieval, and atomic rollback for safe file operations.",
    tech: ["Python", "Gemini", "Groq", "Threading", "Ctypes"],
    status: "v1.2 Stable — v2 (OmniParser) in progress",
    cta: "View Project",
    link: "#",
    color: "cyber-yellow",
    icon: "terminal",
    logo: "/CursorOS.png",
  },
  {
    title: "CabLite",
    tagline: "Ride-hailing that works when the internet doesn't.",
    description: "Offline-first ride-hailing platform built for zero-connectivity environments. Uses local SQLite FTS5 search, SMS-based communication protocol, and a self-hosted ESP32 + SIM800L hardware gateway.",
    tech: ["React Native", "Node.js", "PostGIS", "Prisma", "ESP32"],
    status: "Phase 2 (hardware assembly) underway",
    cta: "View Project",
    link: "#",
    color: "punch-pink",
    icon: "offline_bolt",
    logo: "/cabliteicon.png",
  },
  {
    title: "AI Lawyer",
    tagline: "Constitutional law, answered instantly from source documents.",
    description: "PDF-based legal chatbot for constitutional law. Built with careful prompt engineering and retrieval — no hallucination safety net.",
    tech: ["LangChain", "FAISS", "Node.js", "RAG", "Prompt Engineering"],
    cta: "View Project",
    link: "#",
    color: "white",
    icon: "gavel",
    logo: "/file.svg",
  },
  {
    title: "BeaconBRD",
    tagline: "Transform unstructured comms into structured BRDs.",
    description: "An automated intelligence engine that filters noise from Slack and Gmail, synthesizing high-confidence signals into multi-agent Business Requirement Documents.",
    tech: ["FastAPI", "Python", "LLMs", "LangChain", "OAuth"],
    cta: "View Project",
    link: "#",
    color: "electric-cyan",
    icon: "document_scanner",
  },
  {
    title: "Build_Trust",
    tagline: "Enterprise data marketplace with agentic workflows.",
    description: "A production-ready CRM connecting 100k+ records via Dataverse. Features an interactive AI Project Manager that maps scoping to real specialists with live cost estimates.",
    tech: ["FastAPI", "React", "Dataverse", "Gemma-2-9b", "OData"],
    cta: "View Project",
    link: "#",
    color: "punch-pink",
    icon: "handshake",
  },
];

export const researchData = {
  title: "THE TRIRANK PAPER",
  subtitle: "PUBLISHED_RESEARCH / 2024",
  authors: ["Kurian Jose", "Jasith Kadian", "Shikhar Kulshreshtha", "Mohd Mohsin Ali", "Manish Raj", "Ankur Gogoi"],
  description: "A training-free 3-stage hybrid retrieval framework combining BM25, BGE-large-en-v1.5, and ColBERTv2. Outperforms standalone dense pipelines on MS MARCO benchmark.",
  benchmark: {
    score: "0.4638",
    metric: "nDCG@10 Score",
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

export const labNotes = [
  { id: "05", title: "BRD Generation Engine", color: "electric-cyan" },
  { id: "06", title: "AICryptoBalancer", color: "punch-pink" },
  { id: "07", title: "Case Text Finder", color: "cyber-yellow" },
];

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
    role: "AI Intern",
    company: "Astron Financial Solutions",
    period: "June 2025 – August 2025",
    description: "My first dive into building AI systems that solved actual business problems instead of classroom assignments. I worked on legal-tech and financial automation tools, building everything from RAG pipelines to backend APIs.",
    highlights: [
      "Built a Legal Case Brief Generator that summarized 250+ page legal documents and cut review time by roughly 40%.",
      "Developed an AI legal research assistant capable of retrieving and ranking relevant Supreme Court judgments with 85% relevance accuracy.",
      "Automated GST reconciliation for 1,200+ invoices, helping identify financial discrepancies with minimal manual effort.",
      "Containerized and deployed backend services using Flask and Docker, making deployments far less painful."
    ],
    tech: ["Python", "Flask", "Docker", "RAG", "LLMs", "FAISS", "PostgreSQL"],
    color: "electric-cyan"
  },
  {
    role: "Tech Lead & Founding Core Member",
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
