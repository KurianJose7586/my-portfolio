"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Github, Linkedin, Mail, ExternalLink, MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Portfolio() {
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I'm KurianGPT — Ask me anything about Kurian's skills, projects",
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const messagesRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [chatMessages, isTyping])

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // ✅ Hydration-safe dots
  const [dots, setDots] = useState<
    { left: string; top: string; duration: number; delay: number }[]
  >([])
  useEffect(() => {
    const newDots = Array.from({ length: 50 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }))
    setDots(newDots)
  }, [])

  const projects = [
    { title: "AI Lawyer", description: "PDF-based legal chatbot using LangChain + Groq for constitutional law queries", tech: ["LangChain", "Groq API", "FAISS", "Streamlit"], demo: "#", github: "#", blog: "#" },
    { title: "LLM Consolidator", description: "Compare outputs from OpenAI vs Gemini vs DeepSeek with unified interface", tech: ["OpenAI", "Gemini", "DeepSeek", "OpenRouter", "Flask"], demo: "#", github: "#" },
    { title: "GSTR Tool", description: "Purchase Register reconciliation automation using pandas and ML", tech: ["Pandas", "Python", "Selenium", "TensorFlow"], demo: "#", github: "#" },
    { title: "MCQ Generator", description: "LLM prompt-powered constitutional law quiz builder with adaptive difficulty", tech: ["Prompt Engineering", "NLP", "React", "Node.js"], demo: "#", github: "#", blog: "#" },
  ]

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
  ]

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim() || isTyping) return
    const userMessage = chatInput
    setChatInput("")
    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsTyping(true)
    try {
      const response = await fetch("http://localhost:5001/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      })
      if (!response.ok) throw new Error("Network response was not ok")
      const data = await response.json()
      setChatMessages((prev) => [...prev, { role: "assistant", content: data.reply }])
    } catch (error) {
      console.error("Error fetching chat response:", error)
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting to my brain right now." },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white overflow-x-hidden">
      {/* Animated Background */}
      {/* Animated Background */}
<motion.div className="fixed inset-0 opacity-50">
  {/* Gradient stays fixed */}
  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-cyan-900/30 to-blue-900/30" />

  {/* Particles move slightly with scroll */}
  <motion.div style={{ y: backgroundY }} className="absolute inset-0">
    {dots.map((dot, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-cyan-300 rounded-full"
        style={{ left: dot.left, top: dot.top }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1.2, 0],
        }}
        transition={{
          duration: dot.duration,
          repeat: Number.POSITIVE_INFINITY,
          delay: dot.delay,
        }}
      />
    ))}
  </motion.div>
</motion.div>


      {/* Hero Section */}
<section className="min-h-screen flex items-center justify-center relative px-4">
  <div className="text-center z-10">
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1, type: "spring" }}
      className="mb-8"
    >
      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-purple-500">
        <img
          src="/avatar.png"
          alt="Kurian Avatar"
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>

    <motion.h1
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
    >
      Hi, I'm Kurian
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto"
    >
      I build AI tools for law, finance, and automation
    </motion.p>

    {/* Social Links */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      className="flex justify-center gap-4"
    >
      <a
        href="https://github.com/KurianJose7586"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition"
      >
        <Github className="w-5 h-5" /> GitHub
      </a>
      <a
        href="https://www.linkedin.com/in/kurian-jose-862b30294/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition"
      >
        <Linkedin className="w-5 h-5" /> LinkedIn
      </a>
      <a
        href="https://drive.google.com/file/d/10AiIi3VbHbNgdp2LGo0-YQ4f3Qv0BB2l/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition"
      >
        <ExternalLink className="w-5 h-5" /> Resume
      </a>
    </motion.div>
  </div>
</section>


      {/* Featured Projects */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -10 }}>
                <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
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
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                        <ExternalLink className="w-3 h-3 mr-1" /> Demo
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                        <Github className="w-3 h-3 mr-1" /> Code
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Me */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            About Me
          </motion.h2>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-lg text-gray-300 space-y-6">
            <p>I'm passionate about building AI tools that solve real-world problems, particularly in law and finance.</p>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Skills & Tools
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {skills.map((skill, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }} whileHover={{ scale: 1.1, y: -5 }} className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 text-center backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                <div className="text-2xl mb-2">{skill.icon}</div>
                <div className="text-sm font-medium text-white">{skill.name}</div>
                <div className="text-xs text-gray-400 mt-1">{skill.category}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4 bg-gray-900/30">
        <div className="max-w-2xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Get In Touch
          </motion.h2>
          <motion.form initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Your Name" className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400" />
              <Input type="email" placeholder="Your Email" className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400" />
            </div>
            <Input placeholder="Subject" className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400" />
            <Textarea placeholder="Your Message" rows={5} className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400" />
            <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
              <Send className="w-4 h-4 mr-2" /> Send Message
            </Button>
          </motion.form>
        </div>
      </section>

      {/* Chatbot */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <Button onClick={() => setChatOpen(true)} className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 shadow-lg">
            <MessageCircle className="w-6 h-6" />
          </Button>
        ) : (
          <Card className="w-80 h-96 bg-gray-900/95 border-gray-700 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg text-white">KurianGPT</CardTitle>
                <Button size="sm" variant="ghost" onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription className="text-gray-400">Ask me anything about Kurian's work!</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col h-full px-3 pb-3 overflow-hidden">
              <div ref={messagesRef} className="flex-1 overflow-y-auto space-y-3 pr-1">
                {chatMessages.map((message, index) => (
                  <div key={index} className={`p-2 rounded-lg text-sm ${message.role === "user" ? "bg-purple-600 text-white ml-8" : "bg-gray-800 text-gray-200 mr-8"}`}>
                    {message.content}
                  </div>
                ))}
                {isTyping && (
                  <div className="bg-gray-800 text-gray-200 mr-8 p-2 rounded-lg text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleChatSubmit} className="mt-2 flex gap-2 items-center flex-shrink-0">
                <Input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask about projects, skills..." className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 text-sm" disabled={isTyping} />
                <Button type="submit" size="sm" className="bg-cyan-600 hover:bg-cyan-700" disabled={isTyping}>
                  <Send className="w-3 h-3" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}
