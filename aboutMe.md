**HERO & IDENTITY**

Name: Kurian Jose
Role: CS Student · AI Engineer

Typewriter strings:
1. "I build AI tools for law, finance, and automation"
2. "Turning complex AI into practical business solutions"

---

**BIO / ABOUT**

Headline: Beyond the Notebook.

Body:
I build AI that actually works in the real world — not demo-ware, not generic chatbot wrappers. My focus is domain-specific: legal research, financial analysis, resume intelligence, business automation. If there's a messy, high-stakes workflow that professionals hate doing manually, that's where I want to put AI.

I'm a Computer Science student with deep experience in agentic workflows, RAG pipelines, and taking LLM ideas from prototype to deployed product. TwinlyAI, my AI-powered resume assistant, onboarded 100 users in its MVP launch and processed 500+ resumes during development. The AI Lawyer handles constitutional law queries over PDF — no hallucination safety net, just careful prompt engineering and retrieval.

I also published research: TriRank, a hybrid retrieval framework combining BM25, BGE-large-en-v1.5, and ColBERTv2, achieved 0.4638 nDCG@10 on MS MARCO — outperforming standalone dense retrieval pipelines without any task-specific training.

Currently open to internships, freelance AI projects, and collaborations where the problem is hard and the use case is real.

(The only time my actual notebook comes out is during a 3am lightbulb moment when I'm supposed to be studying for midsems.)

---

**PROJECTS — FEATURED (full cards)**

1. TwinlyAI
Tagline: Your resume, turned into an intelligent AI assistant.
Description: Transforms resumes into personalized AI assistants using custom RAG pipelines. Onboarded 100 users at MVP launch, processed 500+ resumes during development.
Tech: Next.js, JWT, OAuth, AWS, Custom RAG
CTA: Try TwinlyAI

2. CursorOS
Tagline: Your desktop, made agentic.
Description: A context-aware AI overlay for Windows that understands semantic intent and automates complex file workflows — find, organize, summarize, and move files via a single hotkey. Currently extending to hardware-independent operation. Dual-LLM stack (Gemini + Groq fallback), tri-stream parallel retrieval, and atomic rollback for safe file operations.
Tech: Python, Tkinter, Gemini, Groq (Llama-3), ADODB, pystray, threading, ctypes
Status: v1.2 Stable — v2 (OmniParser vision integration) in progress
CTA: View Project

3. CabLite
Tagline: Ride-hailing that works when the internet doesn't.
Description: Offline-first ride-hailing platform built for zero-connectivity environments — disaster recovery, rural areas, network-congested events. Uses local SQLite FTS5 search, SMS-based communication protocol, and a self-hosted ESP32 + SIM800L hardware gateway to eliminate cloud dependency entirely. Hardware independence layer currently in active development.
Tech: React Native, Node.js, PostGIS, Redis, Prisma, Expo, ESP32, SIM800L
Status: Phase 2 (hardware assembly + firmware) underway
CTA: View Project

4. AI Lawyer
Tagline: Constitutional law, answered instantly from source documents.
Description: PDF-based legal chatbot for constitutional law. Built with careful prompt engineering and retrieval — no hallucination safety net.
Tech: LangChain, FAISS, Node.js, RAG, Prompt Engineering
CTA: View Project

---

**PROJECTS — RESEARCH**

TriRank: A Hybrid Retrieval Framework
Co-authored with Jasith Kadian, Shikhar Kulshreshtha, Mohd Mohsin Ali, Manish Raj, Ankur Gogoi — Galgotias University.
Description: A training-free 3-stage hybrid retrieval pipeline combining BM25 sparse retrieval, BGE-large-en-v1.5 dense retrieval via chunked exact search, and ColBERTv2 token-level reranking fused with Reciprocal Rank Fusion. Achieved 0.4638 nDCG@10 and 0.3825 MRR@10 on MS MARCO. Outperforms standalone BM25 (0.2286) and dense-only baselines (0.4376). Zero-shot generalization validated across 4 BEIR datasets without fine-tuning.
Tech: Python, PyTorch, BM25 (bm25s), BGE-large-en-v1.5, ColBERTv2, Pyserini, RRF
Contact email (for paper): kurianjose005@gmail.com
CTA: Read Paper

---

**PROJECTS — MORE (collapsed list)**

5. BRD Generation — AI-powered Business Requirements Document generator from emails, chats, and notes. (Python, PostgreSQL, Uvicorn, Multiagent, PDF Automation)
6. AICryptoPortfolioBalancer — AI-driven crypto portfolio analysis and rebalancing using Gemini LLM.
7. AI Model Consolidator — Streamlit interface consolidating responses from multiple AI models (OpenRouter & Gemini).
8. Case Text Finder — Natural language retrieval of Supreme Court case titles and judgments. (Python, Selenium, OpenRouter, Claude)
9. Legal Question Generator — Scenario-based MCQ generator from case briefs. (Streamlit, Agentic AI, Llama-4, Groq API)

---

**TECHNICAL SKILLS**

Generative AI & NLP:
RAG Pipelines (TwinlyAI, AI Lawyer, TriRank, Case Text Finder), LangChain (AI Lawyer), Vector Databases / FAISS, LLMs & Transformers, Prompt Engineering, ColBERTv2, BGE Embeddings, Reciprocal Rank Fusion, Groq API, OpenRouter, Gemini LLM

Backend & Cloud:
FastAPI, Node.js, Docker, Google Cloud (GCP), MongoDB, PostgreSQL, PostGIS, Flask, Uvicorn, Prisma, Redis

Frontend & Product:
Next.js / React, React Native, TypeScript, Tailwind CSS, Figma, Streamlit, Expo

Systems & Hardware:
Python, Tkinter, ctypes, winreg, ADODB, pystray, ESP32, SIM800L, GSM/SMS protocols, Selenium, PDF Automation, Multiagent Pipelines

Auth & Infrastructure:
JWT, OAuth, AWS, Twilio

---

**INTERACTIVE ELEMENTS**

KurianGPT: An AI assistant that answers questions about Kurian's work, projects, and skills.
Note for dev: Keep knowledge base updated — include TriRank paper, CursorOS v1.2, CabLite hardware phase.

BugSquasher: Terminal-themed minigame — squash bugs before deployment.

Waving Avatar: Animated avatar that greets first-time visitors in the hero section, then appears near the chat button.

---

**SOCIAL & CONTACT**

GitHub: github.com/KurianJose7586
LinkedIn: linkedin.com/in/[your-slug]
Resume: [host PDF on your own domain]
Email: kurianjose005@gmail.com
Timezone: IST (India)

Contact form fields: Name, Email, Subject, Message

CTA text: Open to internships, freelance AI projects, and collaborations. Let's build something.

---

**Two things worth flagging before you hand this off:**

The TriRank paper deserves its own section — not buried in the projects list. A published research paper as a CS student is rare enough that it should be visually distinct from your other projects. Consider a "Research" section between Featured Projects and the collapsed list.

CursorOS jumped to a featured project because it's your most technically complex build — dual-LLM, parallel retrieval, rollback, and now hardware independence. It also directly mirrors the skills from your TriRank paper (retrieval architecture), which makes for a strong narrative thread across your portfolio.