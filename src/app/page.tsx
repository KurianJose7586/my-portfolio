"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, ExternalLink, MessageCircle, X, Send } from "lucide-react";
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

export default function Portfolio() {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "Hi, I'm KurianGPT — Ask me anything about Kurian's skills, projects" },
  ]);
  const [avatarVisible, setAvatarVisible] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesRef = useRef<HTMLDivElement | null>(null);

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
    { title: "TwinlyAI", description: "TwinlyAI transforms your resume into an intelligent AI assistant that can answer questions about your career, skills, and experience", tech: ["JWT", "OAuth", "AWS", "Next.js","Custom RAG"], github: "https://github.com/KurianJose7586/Twinly-consolidated.git" },
    { title: "LLM Consolidator", description: "Compare outputs from OpenAI vs Gemini vs DeepSeek with unified interface", tech: ["OpenAI", "Gemini", "DeepSeek", "OpenRouter", "Flask"], github: "https://github.com/KurianJose7586/LLMConsolidator.git" },
    { title: "Case Text Finder", description: "Built a tool to retrieve and summarize Supreme Court of India judgments from plain-English queries using LLMs.", tech: ["LLM", "Flask", "Selenium","Docker"], github: "https://github.com/KurianJose7586/CaseTextFinder.git" },
    { title: "AI Lawyer", description: "PDF-based legal chatbot using LangChain + Groq for constitutional law queries", tech: ["Prompt Engineering", "LangChain", "FAISS", "Node.js","RAG"], github: "https://github.com/KurianJose7586/Ai-lawyer-project.git" },
  ];

  // Categorized Skills Data
  const skillCategories = [
    {
      title: "Generative AI & NLP",
      description: "Building the brains behind the software",
      skills: [
        { name: "RAG Pipelines", icon: "⚙️" },
        { name: "LangChain", icon: "🔗" },
        { name: "Vector Databases", icon: "🗄️" },
        { name: "LLMs & Transformers", icon: "🤖" },
        { name: "Prompt Engineering", icon: "💭" },
      ]
    },
    {
      title: "Backend & Cloud",
      description: "Scalable infrastructure & deployment",
      skills: [
        { name: "FastAPI", icon: "⚡" },
        { name: "Docker", icon: "🐳" },
        { name: "Google Cloud (GCP)", icon: "☁️" },
        { name: "MongoDB", icon: "🍃" },
        { name: "Flask", icon: "🌶️" },
      ]
    },
    {
      title: "Frontend & Product",
      description: "Crafting intuitive user experiences",
      skills: [
        { name: "Next.js / React", icon: "⚛️" },
        { name: "TypeScript", icon: "📘" },
        { name: "Figma", icon: "🎨" },
        { name: "Tailwind CSS", icon: "🌊" },
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
              <img src="/avatar.png" alt="Kurian Avatar" className="w-full h-full object-cover" />
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
            <a href="https://github.com/KurianJose7586" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all border border-transparent hover:border-gray-600">
              <Github className="w-5 h-5" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/kurian-jose-862b30294/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition-all shadow-lg hover:shadow-blue-900/50">
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
            <a href="https://drive.google.com/file/d/14yJsIi4JeeR3w0hmauDle2r3LtKPbtzE/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-900/50">
              <ExternalLink className="w-5 h-5" /> Resume
            </a>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={index} 
                className="bg-gray-900/40 backdrop-blur-md border border-white/10 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 group"
              >
                <CardHeader>
                  <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors">{project.title}</CardTitle>
                  <CardDescription className="text-gray-300">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="bg-purple-900/30 text-purple-200 border border-purple-500/20">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent hover:bg-gray-800 hover:text-white">
                      <Github className="w-3 h-3 mr-1" /> Code
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section - Redesigned */}
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
                className="bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300 group"
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
              value={form.name}
              onChange={handleFormChange}
              placeholder="Your Name *"
              className="bg-gray-900/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500"
            />
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleFormChange}
              placeholder="Your Email *"
              className="bg-gray-900/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <Input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleFormChange}
            placeholder="Subject"
            className="bg-gray-900/50 border-gray-700 focus:border-purple-500 focus:ring-purple-500"
          />
          <Textarea
            name="message"
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

      {/* Page Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm border-t border-gray-800/50 bg-[#0a0a0a]">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://github.com/KurianJose7586" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/kurian-jose-862b30294/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="mailto:your-email@example.com" className="hover:text-white transition-colors">Email</a>
        </div>
        <p>© {new Date().getFullYear()} Kurian Jose. Built with Next.js, Flask & LLMs.</p>
      </footer>

      {/* Chatbot */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <div className="relative w-14 h-14 group">
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
              className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 shadow-[0_0_20px_rgba(8,145,178,0.5)] hover:shadow-[0_0_30px_rgba(8,145,178,0.7)] transition-all"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </div>
        ) : (
          <Card className="w-80 h-96 bg-gray-900/90 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col overflow-hidden rounded-2xl">
            <CardHeader className="pb-2 pt-3 border-b border-white/10">
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
                className="flex-1 flex flex-col overflow-y-auto space-y-3 pr-1 mb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
              >
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2.5 rounded-lg text-sm break-words ${
                      msg.role === "assistant"
                        ? "bg-white/10 text-white self-start border border-white/5"
                        : "bg-gradient-to-r from-purple-600 to-cyan-600 text-white self-end shadow-md"
                    } max-w-[80%]`}
                  >
                    {msg.content}
                  </div>
                ))}

                {isTyping && (
                  <div className="p-2.5 rounded-lg text-sm bg-white/5 text-gray-300 italic self-start max-w-[75%] animate-pulse">
                    KurianGPT is typing...
                  </div>
                )}
              </div>

              {/* Fixed input */}
              <form
                onSubmit={handleChatSubmit}
                className="flex gap-2 items-center"
              >
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about projects..."
                  className="bg-black/30 border-white/10 text-white placeholder-gray-500 text-sm focus:border-cyan-500/50"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white px-3"
                  disabled={isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              
              {/* Chatbot Footer */}
              <div className="mt-1 pt-1 border-t border-white/5 text-[9px] text-center text-gray-500">
                Powered by <a href="https://twinly-ai.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline hover:text-cyan-300 transition-colors">TwinlyAI Chat Engine</a>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  );
}