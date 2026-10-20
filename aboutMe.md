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
I build AI that actually works in the real world — not demo-ware, not generic chatbot wrappers. My focus is domain-specific: education, legal research, finance, business automation. If there's a messy, high-stakes workflow that professionals hate doing manually, that's where I want to put AI.

I'm a Computer Science student who ships. Huzuri, my all-in-one office platform, runs live with 3,000+ automated tests behind it. At LrnAi I built ELIE, an NCERT-grounded voice tutor now on Google Play. On the side, TwinlyAI turns resumes into AI twins recruiters can chat with, and Agent Notch keeps every coding agent on my machine in one Dynamic-Island-style notch.

I also do research: TriRank, a training-free retrieval pipeline that reranks fused BM25 + BGE-large candidates with ColBERTv2, reaches 0.3825 MRR@10 on MS MARCO.

Currently open to internships, freelance AI projects, and collaborations where the problem is hard and the use case is real.

(The only time my actual notebook comes out is during a 3am lightbulb moment when I'm supposed to be studying for midsems.)

---

**EXPERIENCE**

1. Engineering Intern — Enestock (Sep 2026 – Present)
Builds the software side of AI smart glasses that help technicians inspect railway overhead power lines. Wrote the Kotlin library that drives DPVR smart glasses (Bluetooth command queue and framing, photo transfer over Wi-Fi Direct, photo reassembly), tested against a fake-glasses double. Photos feed a vision-language model (Qwen3-VL on vLLM) that checks each mast against a 65-item checklist and speaks defects back. Team project.
Tech: Kotlin, Android, Bluetooth LE, Wi-Fi Direct, vLLM

2. AI and Product Engineering Intern — LrnAi Technologies (14 July 2026 – 6 October 2026)
Built ELIE, the NCERT-grounded chat and voice AI tutor in the LrnAi learning app (app.lrnai.in and Google Play). Replaced regex intent routing with a state-constrained LLM router (37/55 → 50/55 correct on hand-labelled Hinglish messages). Tuned pgvector search so textbook retrieval Recall@3 rose from 25% to 90% and empty results fell from 45% to 0%. Added a blind-solve verifier that catches 12 of 13 wrong answer keys in AI-generated quizzes, built a Bayesian Knowledge Tracing mastery model, and roughly halved AI cost per student.
Tech: Node.js, PostgreSQL + pgvector, Gemini, Redis, React + Capacitor

3. AI/ML Developer Intern — Astron Financial Advisors (June 2025 – August 2025)
Built a legal case brief generator for 250+ page judgments (about 40% less review time), an AI legal research assistant that ranks Supreme Court judgments, GST reconciliation for 1,200+ invoices, and Dockerised Flask backends.
Tech: Python, Flask, Docker, RAG, LLMs, FAISS, PostgreSQL

4. Tech Lead & Core Member — GDG on Campus, Galgotias University (2025 – Present)
Co-founded the chapter, helped organise a 100+ participant hackathon, ran workshops (including "Build Your Own Copilot"), and mentors students in AI and backend engineering.

---

**PROJECTS — FEATURED (full cards)**

1. Huzuri
Tagline: The whole office, in one app.
Description: All-in-one workspace for small Indian companies: tasks with automatic follow-ups, attendance, leave, meetings turned into minutes, AI email triage and resume screening. The assistant runs on Claude tool use: every tool acts with the asking user's own permissions, and the server drops any citation no tool returned. 3,000+ automated tests in CI. Built by a team of 3; Kurian wrote most of the backend. Separate from his Enestock internship.
Tech: FastAPI, Next.js, PostgreSQL, Claude API, Kotlin (Android app)
Link: https://huzuri.in/login (demo login available)

2. TwinlyAI
Tagline: Your resume, turned into an AI twin recruiters can talk to.
Description: Candidates upload a resume and connect GitHub; recruiters chat or talk with the resulting AI twin. Resume retrieval on MongoDB Atlas Vector Search, GitHub code in Qdrant, a LangGraph ReAct agent on Groq, voice via Whisper + edge-tts, deployed to AWS App Runner via GitHub Actions. 100+ users at MVP launch.
Tech: Next.js, FastAPI, MongoDB Vector Search, Groq, AWS
Links: https://www.twinlyai.app · https://github.com/KurianJose7586/TwinlyAI-frontend

3. Agent Notch
Tagline: All your coding agents. One notch.
Description: A Dynamic-Island-style notch for Windows that tracks every coding agent (Claude Code, Copilot, OpenCode, Antigravity), lets you approve requests with one key or from your phone, and lets agents on different PCs message each other over git with no server. Solo, open source (MIT), v0.3.11.
Tech: Electron, Node.js, MCP, PowerShell
Links: https://agent-notch-nine.vercel.app · https://github.com/KurianJose7586/notch

4. CabLite
Tagline: Ride-hailing that works when the internet doesn't.
Description: Book a cab with zero data: requests travel as SMS, places are searched from an on-device SQLite FTS5 index, PostGIS matches the nearest driver, and a ghost-driver simulator makes it demoable anywhere. Today SMS goes through a cloud relay; an ESP32 + SIM800L hardware gateway to replace it is in progress.
Tech: React Native (Expo), Node.js, PostGIS, SQLite FTS5, Redis, SMS
Links: https://cablite.vercel.app · https://github.com/KurianJose7586/Cablite-offline

---

**PROJECTS — RESEARCH**

TriRank: A Hybrid Retrieval Framework (research preprint, 2026)
First author, with Jasith Kadian, Shikhar Kulshreshtha, Mohd Mohsin Ali, Manish Raj, Ankur Gogoi — Galgotias University.
Description: A training-free 3-stage retrieval pipeline: BM25 (bm25s) and BGE-large-en-v1.5 candidates (chunked exact GPU search over all 8.8M MS MARCO passages) fused with Reciprocal Rank Fusion, then reranked with ColBERTv2. Reaches 0.3825 MRR@10 on MS MARCO. Run on the college DGX.
Tech: Python, PyTorch, bm25s, BGE-large-en-v1.5, ColBERTv2, RRF

---

**PROJECTS — MORE (compact list)**

5. CursorOS — Windows overlay you talk to: finds files in plain English by searching the Windows index and open folders in parallel, or proposes a folder clean-up you approve first. (Python, Gemini, Groq)
6. SentraSec AI — 4-in-1 AI security toolkit; 2nd Runner-Up at GDG Noida Buildethon. Team build; Kurian wrote the LLM tool router and AI core. (Gemini, Python, Next.js)
7. SHIELD — Smart India Hackathon: AI layer over border-post CCTV. Team build; Kurian built the behaviour-anomaly engine and the plate-reader benchmarks. (YOLOv8, OpenCV, FastAPI, Electron)
8. Ops Desk — take-home: ops work tracker built for concurrency (row locks, version checks, idempotency keys, outbox worker, append-only audit log). (Node.js, PostgreSQL, React)
9. Build_Trust — specialist marketplace with an AI project manager that scopes jobs one question at a time, OTP sign-in. (React, FastAPI, Groq, Dataverse)
10. BeaconBRD — turns Slack and Gmail threads into business requirement documents. Team build; Kurian wrote the BRD generation engine. (FastAPI, Groq, Google ADK)
11. Sortpile — GST paperwork for CA offices: files bills by GSTIN, builds the purchase register, flags input-tax-credit risk. (Flask, Next.js, Gemini)
12. GPT-2 on a DGX — trained GPT-2 (124M) from scratch on FineWeb-Edu: val loss 3.03, HellaSwag 0.304. (PyTorch, Kubernetes, DDP)
13. VanDisha — Smart India Hackathon: maps Forest Rights Act claims from scanned PDFs, recommends welfare schemes from satellite vegetation data. (FastAPI, PostGIS, Sentinel-2, Mapbox)
14. Varia — take-home: scores ad-to-landing-page match and rewrites above-the-fold copy with a six-agent pipeline. (FastAPI, Playwright, Gemini)
15. AI Lawyer — RAG chatbot over legal PDFs with DeepSeek-R1. (LangChain, FAISS, Streamlit)

---

**TECHNICAL SKILLS**

Generative AI & NLP:
RAG Pipelines (TwinlyAI, LrnAi ELIE, TriRank, AI Lawyer), LLM tool use / agents (Huzuri, SentraSec), LangChain / LangGraph, Vector databases (pgvector, MongoDB Atlas Vector Search, Qdrant, FAISS), ColBERTv2, BGE Embeddings, Reciprocal Rank Fusion, Claude API, Groq, Gemini, OpenRouter, vLLM

Backend & Cloud:
FastAPI, Node.js, Docker, GCP, AWS App Runner, MongoDB, PostgreSQL, PostGIS, Flask, Prisma, Redis

Frontend & Product:
Next.js / React, React Native, Electron, TypeScript, Tailwind CSS, Figma, Streamlit, Expo

Systems & Hardware:
Python, Kotlin (Android, Bluetooth LE, Wi-Fi Direct), Tkinter, ctypes, winreg, ESP32, SIM800L, GSM/SMS protocols, Selenium, YOLOv8 / OpenCV

Auth & Infrastructure:
JWT, OAuth, Twilio, GitHub Actions CI/CD, Kubernetes (DGX)

---

**INTERACTIVE ELEMENTS**

KurianGPT: An AI assistant that answers questions about Kurian's work, projects, and skills.

BugSquasher: Terminal-themed minigame — squash bugs before deployment.

Waving Avatar: Animated avatar that greets first-time visitors in the hero section, then appears near the chat button.

---

**SOCIAL & CONTACT**

GitHub: github.com/KurianJose7586
LinkedIn: linkedin.com/in/kurianjose316
Resume: https://drive.google.com/file/d/1vW57HLq8cGeJr4fKsaDo_qvrBSRrcoGm/view?usp=sharing
Email: kurianjose005@gmail.com
Timezone: IST (India)

Contact form fields: Name, Email, Subject, Message

CTA text: Open to internships, freelance AI projects, and collaborations. Let's build something.
