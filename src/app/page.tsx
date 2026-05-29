"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Github, Linkedin, ExternalLink, MessageCircle, X, Send, Workflow, Database, Bot, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { SiFastapi, SiDocker, SiGooglecloud, SiMongodb, SiFlask, SiNextdotjs, SiTypescript, SiFigma, SiTailwindcss, SiLangchain, SiReact } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

const subheadings = [
  "I build AI tools for law, finance, and automation",
  "Teaching AI to speak legal, crunch numbers, and automate the boring stuff",
  "Turning complex AI into practical business solutions",
  "Building TwinlyAI: Your AI-powered resume assistant",
];

function BugSquasher() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [bugPos, setBugPos] = useState({ x: 50, y: 50 });
  const [squishMarks, setSquishMarks] = useState<{ id: number, x: number, y: number }[]>([]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(15);
    setSquishMarks([]);
    setBugPos({ x: 50, y: 50 });
  };

  const moveBug = () => {
    setBugPos({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10
    });
  };

  const squish = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isPlaying) return;
    
    const newId = Date.now();
    setSquishMarks(prev => [...prev, { id: newId, x: bugPos.x, y: bugPos.y }]);
    
    // Clean up explosion particle
    setTimeout(() => {
      setSquishMarks(prev => prev.filter(mark => mark.id !== newId));
    }, 400);

    setScore(s => s + 1);
    moveBug();
  };

  useEffect(() => {
    // Only countdown if they clicked the first bug
    if (isPlaying && score > 0 && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
  }, [isPlaying, timeLeft, score]);

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4 w-full max-w-md mx-auto shadow-2xl relative z-10 transition-transform hover:scale-[1.02] duration-300">
      <div className="flex justify-between items-center mb-3 px-2">
        <h3 className="font-mono text-cyan-400 text-xs md:text-sm">&gt; root@prod: ./squish_bugs.sh</h3>
        {isPlaying && <span className="font-mono text-purple-400 text-xs md:text-sm bg-purple-900/30 px-2 py-0.5 rounded border border-purple-500/20">TIME: {timeLeft}s</span>}
      </div>
      
      <div className="relative w-full h-48 bg-[#050505] rounded-lg overflow-hidden border border-gray-800 cursor-crosshair shadow-inner">
        {!isPlaying ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center bg-gradient-to-b from-transparent to-red-900/10">
            {timeLeft === 0 ? (
              <>
                <p className="text-white mb-1 font-mono text-lg text-red-400">System critical!</p>
                <p className="text-gray-400 mb-5 font-mono text-sm">Bugs squashed: {score}</p>
                <button 
                  onClick={startGame}
                  className="px-6 py-2 bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 font-mono text-sm rounded border border-purple-500/50 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                >
                  [ retry.exe ]
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-400 mb-5 font-mono text-sm max-w-[250px] leading-relaxed">Warning: Unhandled exceptions detected. Squish bugs before deployment.</p>
                <button 
                  onClick={startGame}
                  className="px-6 py-2 bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-400 font-mono text-sm rounded border border-cyan-500/50 transition-colors shadow-[0_0_15px_rgba(8,145,178,0.2)]"
                >
                  [ start_debug.exe ]
                </button>
              </>
            )}
          </div>
        ) : (
          <>
             <div className="absolute top-3 left-3 text-white/30 font-mono text-xs select-none pointer-events-none">SCORE: {String(score).padStart(3, '0')}</div>
             
             {score === 0 && (
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                 <span className="font-mono text-yellow-500/70 text-sm md:text-base animate-pulse tracking-widest uppercase">Quick, Start Smashing!</span>
               </div>
             )}

             <AnimatePresence>
               {squishMarks.map((mark) => (
                  <motion.div 
                    key={mark.id}
                    initial={{ opacity: 1, scale: 0.5 }}
                    animate={{ opacity: 0, scale: 2.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="absolute text-5xl pointer-events-none select-none z-10 drop-shadow-2xl"
                    style={{ left: `${mark.x}%`, top: `${mark.y}%`, x: '-50%', y: '-50%' }}
                  >
                    💥
                  </motion.div>
               ))}
             </AnimatePresence>

             <div 
               onMouseDown={squish}
               className="absolute text-4xl cursor-crosshair hover:scale-125 active:scale-90 transition-transform select-none z-20"
               style={{ left: `${bugPos.x}%`, top: `${bugPos.y}%`, transform: 'translate(-50%, -50%)', textShadow: '0 0 10px rgba(255,255,255,0.3)' }}
             >
               🐛
             </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "Hi, I'm KurianGPT — Ask me anything about Kurian's skills, projects" },
  ]);
  const [avatarVisible, setAvatarVisible] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesRef = useRef<HTMLDivElement | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chatbot when messages change
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  // --- Mouse Position State for Glow Effect ---
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);
  // ------------------------------------------------

  // Typewriter Effect
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typingSpeed = isDeleting ? 40 : 80;
    const delayBetween = 1500;

    if (!isDeleting && charIndex < subheadings[currentIndex].length) {
      const timeout = setTimeout(() => {
        setCurrentText(subheadings[currentIndex].slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setCurrentText(subheadings[currentIndex].slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && charIndex === subheadings[currentIndex].length) {
      const timeout = setTimeout(() => setIsDeleting(true), delayBetween);
      return () => clearTimeout(timeout);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % subheadings.length);
    }
  }, [charIndex, isDeleting, currentIndex]);

  // Avatar animation
  useEffect(() => {
    const interval = setInterval(() => {
      setAvatarVisible(true);
      setTimeout(() => setAvatarVisible(false), 2500);
    }, 4000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  // Background scroll effect
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Background floating dots
  const [dots, setDots] = useState<{ left: string; top: string; duration: number; delay: number }[]>([]);
  useEffect(() => {
    const newDots = Array.from({ length: 50 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setDots(newDots);
  }, []);

  // Projects
  const projects = [
    { title: "TwinlyAI", description: "TwinlyAI transforms your resume into an intelligent AI assistant that can answer questions about your career, skills, and experience.", tech: ["JWT", "OAuth", "AWS", "Next.js", "Custom RAG"], github: "https://github.com/KurianJose7586/Twinly-consolidated.git" },
    { title: "AI Lawyer", description: "PDF-based legal chatbot using LangChain + Groq for constitutional law queries.", tech: ["Prompt Engineering", "LangChain", "FAISS", "Node.js", "RAG"], github: "https://github.com/KurianJose7586/Ai-lawyer-project.git" },
    { title: "Cablite (in progress)", description: "A modern ride-sharing application with offline-first design, SMS integration, and real-time driver matching.", tech: ["React Native", "Redis", "Twilio", "Prisma", "Zustand", "Expo"], github: "https://github.com/KurianJose7586/Cablite-offline.git" },
    { title: "BRD Generation", description: "AI-powered Business Requirements Document (BRD) generation from real-world communication sources.", tech: ["Python", "Postgres", "Uvicorn", "Multiagent", "PDF Automation"], github: "https://github.com/KurianJose7586/HackfestFinetuners.git" },
    { title: "AICryptoPortfolioBalancer", description: "Intelligent, AI-driven analysis and rebalancing suggestions for your cryptocurrency portfolio using Gemini LLM.", tech: ["Gemini LLM", "AI", "Web App"], github: "https://github.com/KurianJose7586/AICryptoPortfolioBalancer.git" },
    { title: "AI Model Consolidator", description: "Streamlit-based interface that consolidates responses from multiple AI models using OpenRouter and Gemini.", tech: ["Streamlit", "OpenRouter", "Google Gemini", "Python"], github: "https://github.com/KurianJose7586/LLMConsolidator.git" },
    { title: "Case Text Finder", description: "Retrieve Supreme Court case titles and download judgments based on natural language queries.", tech: ["Python", "Selenium", "OpenRouter", "Claude"], github: "https://github.com/KurianJose7586/CaseTextFinder.git" },
    { title: "Legal Question Generator", description: "Reads Indian constitutional law case briefs and generates scenario-based multiple choice questions via Groq API.", tech: ["Streamlit", "Agentic AI", "Llama-4", "Regex", "Groq API"], github: "https://github.com/KurianJose7586/LegalQuestionGenerator.git" },
  ];

  // Categorized Skills Data
  const skillCategories = [
    {
      title: "Generative AI & NLP",
      description: "Building the brains behind the software",
      skills: [
        { name: "RAG Pipelines", icon: <Workflow /> },
        { name: "LangChain", icon: <SiLangchain /> },
        { name: "Vector Databases", icon: <Database /> },
        { name: "LLMs & Transformers", icon: <Bot /> },
        { name: "Prompt Engineering", icon: <MessageSquare /> },
      ]
    },
    {
      title: "Backend & Cloud",
      description: "Scalable infrastructure & deployment",
      skills: [
        { name: "FastAPI", icon: <SiFastapi /> },
        { name: "Docker", icon: <SiDocker /> },
        { name: "Google Cloud (GCP)", icon: <SiGooglecloud /> },
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "Flask", icon: <SiFlask /> },
      ]
    },
    {
      title: "Frontend & Product",
      description: "Crafting intuitive user experiences",
      skills: [
        { name: "Next.js / React", icon: <div className="flex gap-2"><SiNextdotjs /><SiReact /></div> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "Figma", icon: <SiFigma /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      ]
    }
  ];

  // Chat submit handler
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;
    const userMessage = chatInput;
    setChatInput("");
    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      setChatMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setChatMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I'm having trouble connecting to my brain right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Contact form state
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        toast.success("Message sent successfully! 🚀");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch {
      toast.error("Failed to send message.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white overflow-x-hidden font-sans">

      {/* --- Ambient Glow Effect --- */}
      {/* Large ambient glow following mouse */}
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none z-0"
        animate={{ x: mousePosition.x - 192, y: mousePosition.y - 192 }}
        transition={{ type: "spring", stiffness: 150, damping: 50, mass: 1 }}
      />
      {/* ------------------------------- */}

      {/* Background */}
      <motion.div className="fixed inset-0 opacity-50 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-cyan-900/30 to-blue-900/30" />
        <motion.div style={{ y: backgroundY }} className="absolute inset-0">
          {dots.map((dot, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-300 rounded-full"
              style={{ left: dot.left, top: dot.top }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
              transition={{ duration: dot.duration, repeat: Number.POSITIVE_INFINITY, delay: dot.delay }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center relative z-10 px-4">
        <div className="text-center z-10">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1 }} className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.5)]">
              <Image 
                src="/avatar.png" 
                alt="Kurian Jose - AI Engineer Portrait" 
                width={128} 
                height={128} 
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Hi, I'm Kurian
          </h1>
          <p className="text-xl mb-8 text-gray-300 min-h-[2.5rem]">
            {currentText}
            <span className="border-r-2 border-cyan-400 animate-pulse"></span>
          </p>

          <div className="flex justify-center gap-4">
            <a href="https://github.com/KurianJose7586" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all border border-transparent hover:border-gray-600 hover:scale-105">
              <Github className="w-5 h-5" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/kurian-jose-862b30294/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition-all shadow-lg hover:shadow-blue-900/50 hover:scale-105">
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
            <a href="https://drive.google.com/file/d/14yJsIi4JeeR3w0hmauDle2r3LtKPbtzE/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-900/50 hover:scale-105">
              <ExternalLink className="w-5 h-5" /> Resume
            </a>
          </div>
        </div>
      </section>

      {/* Bio / About section */}
      <section className="min-h-[80vh] flex flex-col justify-center py-24 px-4 relative z-10" id="about">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-center">

            {/* Left side: Graphic / Header ground */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:col-span-5 flex flex-col items-start relative"
            >
              {/* Background huge text effect */}
              <div className="absolute -left-6 -top-20 text-[180px] md:text-[220px] font-black text-white/[0.02] pointer-events-none select-none -z-10 leading-none">
                AI
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                Beyond the <br />
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Notebook.</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-8 shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
              <p className="text-gray-400 text-lg left-aligned">
                Bridging the gap between theoretical AI models and practical, production-ready software.
              </p>
            </motion.div>

            {/* Right side: Staggered flowing text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
              }}
              className="md:col-span-7 space-y-6"
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 p-6 rounded-2xl hover:bg-gray-800/40 hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex gap-5">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-cyan-900/30 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(8,145,178,0.2)]">
                      <Bot className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-lg text-gray-300 font-light leading-relaxed">
                    I’m a Computer Science student who enjoys building AI systems that actually <span className="relative group/egg inline-block cursor-help"><span className="text-white font-medium italic border-b border-dashed border-gray-500 transition-colors group-hover/egg:text-cyan-300">do something useful</span><span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/egg:opacity-100 transition-all duration-300 whitespace-nowrap text-[11px] font-mono bg-[#0a0a0a] text-cyan-400 py-1.5 px-3 rounded-lg border border-cyan-900 pointer-events-none scale-95 group-hover/egg:scale-100 z-50 shadow-2xl flex items-center gap-2"><span>&#62;_</span> no more generic wrapper apps please</span></span>—not just sit in notebooks.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 p-6 rounded-2xl hover:bg-gray-800/40 hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex gap-5">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-purple-900/30 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                      <Workflow className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-lg text-gray-300 font-light leading-relaxed">
                    I’m especially interested in <span className="text-cyan-400 font-medium">agentic workflows</span>, <span className="text-purple-400 font-medium">RAG-based systems</span>, and figuring out how to turn LLM ideas into real, usable products. I like working on problems where there are multiple moving parts, messy inputs, and no obvious solution—and then designing systems that make it all work smoothly.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 p-6 rounded-2xl hover:bg-gray-800/40 hover:border-gray-700 transition-all duration-300"
              >
                <div className="flex gap-5">
                  <div className="mt-1 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-900/30 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                      <Database className="w-6 h-6" />
                    </div>
                  </div>
                  <p className="text-lg text-gray-300 font-light leading-relaxed">
                    I lean more toward building and shipping than getting stuck in theory—the only time my notebook comes out is during a <span className="relative group/egg inline-block cursor-pointer" onClick={() => toast("Coffee level critical. Deploying to prod anyway ☕🚀", { style: { background: '#1f2937', color: '#e5e7eb', border: '1px solid #374151', borderRadius: '12px' } })}><span className="text-yellow-100 hover:text-yellow-400 transition-colors duration-300 font-medium italic border-b border-dashed border-yellow-700/50">3 a.m. lightbulb moment</span><span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover/egg:opacity-100 transition-all duration-300 whitespace-nowrap text-[11px] font-mono bg-[#0a0a0a] text-yellow-500 py-1.5 px-3 rounded-lg border border-yellow-900/50 pointer-events-none scale-95 group-hover/egg:scale-100 z-50 flex items-center gap-1.5 shadow-2xl">💡 click me</span></span> while I’m supposed to be studying <span className="text-gray-500 text-sm line-through hover:text-red-400 transition-colors cursor-help" title="Sorry professor!">(for midsems)</span>. If it involves making AI <span className="text-white font-medium">practical, reliable, and a little smarter</span> in how it behaves, I’m probably already working on something like it.
                  </p>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Things I've Built
          </h2>

          {/* Carousel container */}
          <div className="relative group/carousel">
            {/* Nav buttons */}
            <Button
              variant="default"
              size="icon"
              aria-label="Previous project"
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-gray-700 bg-gray-900/80 hover:bg-gray-800 text-white shadow-2xl opacity-0 group-hover/carousel:opacity-100 transition-opacity backdrop-blur-md hidden sm:flex"
              onClick={() => {
                if (carouselRef.current) {
                  carouselRef.current.scrollBy({ left: -340, behavior: 'smooth' });
                }
              }}
            >
              <ChevronLeft className="w-6 h-6 text-gray-300" />
            </Button>
            <Button
              variant="default"
              size="icon"
              aria-label="Next project"
              className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-gray-700 bg-gray-900/80 hover:bg-gray-800 text-white shadow-2xl opacity-0 group-hover/carousel:opacity-100 transition-opacity backdrop-blur-md hidden sm:flex"
              onClick={() => {
                if (carouselRef.current) {
                  carouselRef.current.scrollBy({ left: 340, behavior: 'smooth' });
                }
              }}
            >
              <ChevronRight className="w-6 h-6 text-gray-300" />
            </Button>

            {/* Carousel Scroll Area */}
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 px-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {projects.map((project, index) => (
                <Card
                  key={index}
                  className="min-w-[280px] sm:min-w-[340px] max-w-[280px] sm:max-w-[340px] shrink-0 snap-center bg-gray-900/40 backdrop-blur-md border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 group flex flex-col"
                >
                  <CardHeader className="flex-none">
                    <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors flex items-center justify-between">
                      <span className="truncate pr-2">{project.title}</span>
                    </CardTitle>
                    <CardDescription className="text-gray-300 min-h-[60px] line-clamp-3 leading-relaxed mt-2">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="bg-purple-900/30 text-purple-200 border border-purple-500/20 text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex-none mt-auto">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-800 hover:text-white w-full sm:w-auto">
                          <Github className="w-4 h-4 mr-2" /> View Source
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#121212] to-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Technical Arsenal
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A full-stack toolkit focused on building scalable AI solutions and intuitive interfaces.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 group hover:-translate-y-1"
              >
                {/* Category Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium">
                    {category.description}
                  </p>
                </div>

                {/* Skills List */}
                <div className="space-y-3">
                  {category.skills.map((skill, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-3 rounded-xl bg-gray-800/30 border border-gray-700/30 hover:bg-gray-800/80 hover:border-gray-600 transition-all duration-200"
                    >
                      <span className="text-xl filter drop-shadow-md">{skill.icon}</span>
                      <span className="text-gray-300 font-medium text-sm">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4 bg-gray-900/30 relative z-10" id="contact">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-gray-400 mb-12">
            Have a project in mind or just want to talk AI? Drop me a message — I’ll get back to you soon.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleContactSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-6 bg-gray-800/40 p-8 rounded-xl border border-gray-700 backdrop-blur-sm"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              type="text"
              name="name"
              aria-label="Your Name"
              value={form.name}
              onChange={handleFormChange}
              placeholder="Your Name *"
              className="bg-gray-900/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500"
            />
            <Input
              type="email"
              name="email"
              aria-label="Your Email"
              value={form.email}
              onChange={handleFormChange}
              placeholder="Your Email *"
              className="bg-gray-900/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <Input
            type="text"
            name="subject"
            aria-label="Subject"
            value={form.subject}
            onChange={handleFormChange}
            placeholder="Subject"
            className="bg-gray-900/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500"
          />
          <Textarea
            name="message"
            aria-label="Your Message"
            value={form.message}
            onChange={handleFormChange}
            placeholder="Your Message *"
            rows={5}
            className="bg-gray-900/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
          >
            {loading ? "Sending..." : (
              <>
                <Send className="w-4 h-4 mr-2" /> Send Message
              </>
            )}
          </Button>
        </motion.form>
      </section>

      {/* Minigame Section */}
      <section className="py-20 px-4 relative z-10 border-t border-white/5 bg-gray-900/20 overflow-hidden">
        {/* Decorative background blurs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-[100px] pointer-events-none" />

         <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 justify-between relative z-10">
            <div className="text-center lg:text-left max-w-lg">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">Pipeline Blocked!</h3>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                The deployment is hanging because of undocumented bugs. Do me a favor and squash a few before we ship to production?
              </p>
              <div className="flex justify-center lg:justify-start gap-3">
                <Badge variant="outline" className="bg-red-500/10 text-red-400 border-red-500/30">Severity: High</Badge>
                <Badge variant="outline" className="bg-orange-500/10 text-orange-400 border-orange-500/30">Status: Squashing</Badge>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <BugSquasher />
            </div>
         </div>
      </section>

      {/* Page Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-800/50 bg-[#0a0a0a]">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://github.com/KurianJose7586" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/kurian-jose-862b30294/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="mailto:your-email@example.com" className="hover:text-white transition-colors">Email</a>
        </div>
        <p>© {new Date().getFullYear()} Kurian Jose. Built with love. glad you could take a look.😊 </p>
      </footer>

      {/* Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence mode="wait">
          {!chatOpen ? (
            <motion.div
              key="chat-button"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="relative w-14 h-14 group"
            >
              {/* Tooltip */}
              <span className="absolute left-[-140px] top-1/2 -translate-y-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Talk to KurianGPT
              </span>

              {/* Animated avatar */}
              <div className="absolute -top-12 right-1 w-16 h-16 overflow-hidden rounded-full pointer-events-none">
                <motion.video
                  src="/waving-avatar-final.webm"
                  autoPlay
                  muted
                  playsInline
                  loop
                  className="w-full h-full"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={avatarVisible ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                />
              </div>

              {/* Chat open button */}
              <Button
                onClick={() => setChatOpen(true)}
                aria-label="Open chat"
                className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 shadow-[0_0_20px_rgba(8,145,178,0.5)] hover:shadow-[0_0_30px_rgba(8,145,178,0.7)] transition-all"
              >
                <MessageCircle className="w-6 h-6" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="chat-window"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-[340px] h-[450px]"
            >
              <Card className="w-full h-full bg-gray-900/90 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden rounded-2xl ring-1 ring-white/10">
                <CardHeader className="pb-2 pt-3 border-b border-white/10 bg-gradient-to-r from-gray-900 to-gray-800 flex-none">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white">KurianGPT</CardTitle>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setChatOpen(false)}
                      className="text-gray-400 hover:text-white hover:bg-white/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardDescription className="text-gray-400 text-xs">
                    Ask me anything about Kurian's work!
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 px-3 pb-3 pt-3 overflow-hidden">
                  {/* Scrollable messages */}
                  <div
                    ref={messagesRef}
                    className="flex-1 flex flex-col overflow-y-auto space-y-3 pr-2 mb-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent scroll-smooth"
                  >
                    {chatMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-xl text-sm break-words ${msg.role === "assistant"
                            ? "bg-white/10 text-white self-start border border-white/5"
                            : "bg-gradient-to-r from-purple-600 to-cyan-600 text-white self-end shadow-md"
                          } max-w-[85%]`}
                      >
                        {msg.content}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="p-3 rounded-xl text-sm bg-white/5 text-gray-300 italic self-start max-w-[75%] animate-pulse border border-white/5">
                        KurianGPT is typing...
                      </div>
                    )}
                  </div>

                  {/* Fixed input */}
                  <form
                    onSubmit={handleChatSubmit}
                    className="flex gap-2 items-center flex-none"
                  >
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask about projects..."
                      className="bg-black/40 border-white/10 text-white placeholder-gray-500 text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all rounded-lg"
                      disabled={isTyping}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      aria-label="Send message"
                      className="bg-cyan-600 hover:bg-cyan-500 text-white transition-colors rounded-lg w-10 h-10 shrink-0 shadow-lg shadow-cyan-900/20"
                      disabled={isTyping}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>

                  {/* Chatbot Footer */}
                  <div className="mt-2 pt-2 border-t border-white/5 text-[10px] flex justify-center items-center text-gray-500 flex-none">
                    <span>Powered by</span>
                    <a href="https://twinly-ai.vercel.app/" target="_blank" rel="noopener noreferrer" className="ml-1 text-cyan-400 hover:underline hover:text-cyan-300 transition-colors font-medium">TwinlyAI Chat</a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}