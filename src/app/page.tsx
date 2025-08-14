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
  "Turning complex AI into practical business solutions"
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
    { title: "AI Lawyer", description: "PDF-based legal chatbot using LangChain + Groq for constitutional law queries", tech: ["LangChain", "Groq API", "FAISS", "Streamlit","RAG"], github: "https://github.com/KurianJose7586/Ai-lawyer-project.git" },
    { title: "LLM Consolidator", description: "Compare outputs from OpenAI vs Gemini vs DeepSeek with unified interface", tech: ["OpenAI", "Gemini", "DeepSeek", "OpenRouter", "Flask"], github: "https://github.com/KurianJose7586/LLMConsolidator.git" },
    { title: "Case Text Finder", description: "Built a tool to retrieve and summarize Supreme Court of India judgments from plain-English queries using LLMs.", tech: ["LLM", "Flask", "Selenium","Docker"], github: "https://github.com/KurianJose7586/CaseTextFinder.git" },
    { title: "MCQ Generator", description: "LLM prompt-powered constitutional law quiz builder with adaptive difficulty", tech: ["Prompt Engineering", "NLP", "React", "Node.js","RAG"], github: "https://github.com/KurianJose7586/LegalQuestionGenerator.git" },
  ];

  // Skills
  const skills = [
    { name: "LangChain", icon: "🔗", category: "AI/ML" },
    { name: "FAISS", icon: "🔍", category: "AI/ML" },
    { name: "Groq API", icon: "⚡", category: "AI/ML" },
    { name: "OpenAI", icon: "🤖", category: "AI/ML" },
    { name: "Prompt Engineering", icon: "💭", category: "AI/ML" },
    { name: "NLP", icon: "📝", category: "AI/ML" },
    { name: "BiLSTM", icon: "🧠", category: "AI/ML" },
    { name: "TensorFlow", icon: "🔥", category: "AI/ML" },
    { name: "Streamlit", icon: "🚀", category: "Frontend" },
    { name: "Flask", icon: "🌶️", category: "Backend" },
    { name: "Selenium", icon: "🕷️", category: "Automation" },
    { name: "Git", icon: "📚", category: "Tools" },
    { name: "VSCode", icon: "💻", category: "Tools" },
    { name: "Pandas", icon: "🐼", category: "Data" },
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
    <div className="min-h-screen bg-[#121212] text-white overflow-x-hidden">
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
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-purple-500">
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
            <a href="https://github.com/KurianJose7586" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700">
              <Github className="w-5 h-5" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/kurian-jose-862b30294/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800">
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
            <a href="https://drive.google.com/file/d/10AiIi3VbHbNgdp2LGo0-YQ4f3Qv0BB2l/view" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700">
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
              <Card key={index} className="bg-gray-900/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                  <CardDescription className="text-gray-300">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <Badge key={i} variant="secondary" className="bg-purple-900/50 text-purple-300">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                      <Github className="w-3 h-3 mr-1" /> Code
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Skills & Tools
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 text-center hover:border-purple-500/50 transition-all duration-300">
                <div className="text-2xl mb-2">{skill.icon}</div>
                <div className="text-sm font-medium text-white">{skill.name}</div>
                <div className="text-xs text-gray-400 mt-1">{skill.category}</div>
              </div>
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
    className="max-w-2xl mx-auto space-y-6 bg-gray-800/40 p-8 rounded-xl border border-gray-700"
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
        className="absolute bottom-0 right-0 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    </div>
  ) : (
    <Card className="w-80 h-96 bg-gray-900/95 border-gray-700">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-white">KurianGPT</CardTitle>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setChatOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        <CardDescription className="text-gray-400">
          Ask me anything about Kurian's work!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 px-3 pb-3">
  <div ref={messagesRef} className="flex-1 overflow-y-auto space-y-3 pr-1">
    {/* messages */}
  </div>

  {/* Chat input */}
  <form onSubmit={handleChatSubmit} className="mt-2 flex gap-2 items-center">
    <Input
      value={chatInput}
      onChange={(e) => setChatInput(e.target.value)}
      placeholder="Ask about projects, skills..."
      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 text-sm"
      disabled={isTyping}
    />
    <Button
      type="submit"
      size="sm"
      className="bg-cyan-600 hover:bg-cyan-700"
      disabled={isTyping}
    >
      <Send className="w-3 h-3" />
    </Button>
  </form>
</CardContent>

    </Card>
  )}
</motion.div>
    </div>
  );
}