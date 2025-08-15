# Kurian Jose - AI Developer Portfolio

![Next.js](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Vercel](https://img.shields.io/badge/Vercel-black?style=for-the-badge&logo=Vercel&logoColor=white)

This repository contains the source code for my personal portfolio, a dynamic and interactive website designed to showcase my skills and projects as an AI Developer. The standout feature is **KurianGPT**, a custom AI chatbot that provides information about my professional background by leveraging a Retrieval-Augmented Generation (RAG) pipeline.

### Screenshots

![Portfolio Hero Section](http://googleusercontent.com/file_content/3)
*The main landing page with an animated hero section.*

![KurianGPT Chatbot](http://googleusercontent.com/file_content/4)
*The custom AI chatbot, KurianGPT, ready to answer questions.*

---

## ✨ Features

-   **Interactive Hero Section**: A welcoming introduction with an animated avatar and a typewriter effect that cycles through key skills.
-   **AI Chatbot (KurianGPT)**: An integrated chatbot that can answer questions about my skills, projects, and experience. It connects to a custom Python backend that uses a RAG chain to provide context-aware responses from a knowledge base.
-   **Dynamic Project Showcase**: A grid of my featured projects, each with a description, tech stack badges, and a link to the GitHub repository.
-   **Skills & Tools Overview**: A categorized display of my technical skills and the tools I frequently use.
-   **Contact Form**: A fully functional contact form that uses Nodemailer for email submissions.
-   **Smooth Animations**: The UI is enhanced with Framer Motion for a fluid and engaging user experience.
-   **Responsive Design**: A mobile-first design that ensures a seamless experience across all devices.

---

## 🛠️ Tech Stack

This portfolio is built with a modern, full-stack architecture, combining a Next.js frontend with a powerful Python backend for AI capabilities.

| Area         | Technologies                                                                                                                                                                                                                         |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | **Next.js** and **React** for the core framework, **TypeScript** for type safety, **Tailwind CSS** for styling, **Framer Motion** for animations, and **Shadcn/ui** for accessible components. |
| **Backend** | The AI chatbot is powered by a **Python** backend using **Flask** and **Gunicorn**. The frontend interacts with it through **Next.js API Routes** which act as a proxy.                               |
| **AI/ML** | The RAG (Retrieval-Augmented Generation) chain for the chatbot is built with **LangChain**. It uses **Hugging Face Transformers** for embeddings, **FAISS** for the vector store, and the **Groq API** for fast LLM inference.                                            |
| **Deployment**| The entire application is containerized using **Docker** and deployed on **Vercel**, which handles both the Next.js frontend and the Python serverless backend seamlessly. |
