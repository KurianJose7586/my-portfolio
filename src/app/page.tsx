"use client"

import type React from "react"

import { useState } from "react"
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
        "Hi, I'm KurianGPT — Ask me anything about my skills, projects, or whether I prefer TensorFlow or PyTorch!",
    },
  ])
  const [chatInput, setChatInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const { scrollYProgress } = useScroll()
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const projects = [
    {
      title: "AI Lawyer",
      description: "PDF-based legal chatbot using LangChain + Groq for constitutional law queries",
      tech: ["LangChain", "Groq API", "FAISS", "Streamlit"],
      demo: "#",
      github: "#",
      blog: "#",
    },
    {
      title: "LLM Consolidator",
      description: "Compare outputs from OpenAI vs Gemini vs DeepSeek with unified interface",
      tech: ["OpenAI", "Gemini", "DeepSeek", "OpenRouter", "Flask"],
      demo: "#",
      github: "#",
    },
    {
      title: "GSTR Tool",
      description: "Purchase Register reconciliation automation using pandas and ML",
      tech: ["Pandas", "Python", "Selenium", "TensorFlow"],
      demo: "#",
      github: "#",
    },
    {
      title: "MCQ Generator",
      description: "LLM prompt-powered constitutional law quiz builder with adaptive difficulty",
      tech: ["Prompt Engineering", "NLP", "React", "Node.js"],
      demo: "#",
      github: "#",
      blog: "#",
    },
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

  const simulateResponse = (message: string) => {
    const responses = {
      resume:
        "I'm an AI developer with experience in LangChain, RAG systems, and legal tech. Currently interning at Astron Financials, working on automation and ML projects. I've built several AI tools including legal chatbots and LLM comparison platforms.",
      projects:
        "I've worked on AI Lawyer (legal chatbot), LLM Consolidator (model comparison), GSTR Tool (financial automation), and MCQ Generator (educational AI). Each project showcases different aspects of AI/ML development.",
      langchain:
        "LangChain is my go-to framework for building AI applications. I've used it extensively in my AI Lawyer project to create RAG systems that can query legal documents and provide contextual answers.",
      tensorflow:
        "Honestly, I prefer PyTorch for research and experimentation, but TensorFlow for production. TensorFlow's ecosystem is more mature for deployment, especially with TensorFlow Serving.",
      pytorch:
        "PyTorch is my favorite for rapid prototyping and research. The dynamic computation graph makes debugging much easier, and the community is fantastic.",
      internship:
        "At Astron Financials, I'm working on automating financial processes using ML and building tools for data reconciliation. It's been great applying AI to real-world financial problems.",
      easteregg:
        "🎉 You found it! Here's a secret: I once trained a model to predict which coffee shop has the shortest queue. It was 73% accurate, but by the time I got there, the queue had changed. Classic ML problem! ☕",
    }

    const lowerMessage = message.toLowerCase()
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response
      }
    }

    return "That's an interesting question! I'm still learning about Kurian's work. Try asking about his resume, projects, LangChain experience, or his current internship at Astron Financials."
  }

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage = chatInput
    setChatInput("")
    setChatMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = simulateResponse(userMessage)
      setChatMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white overflow-x-hidden">
      {/* Animated Background */}
      <motion.div className="fixed inset-0 opacity-20" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-cyan-900/20 to-blue-900/20" />
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
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
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-4xl font-bold">
              KJ
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Mail className="w-4 h-4 mr-2" />
              Resume
            </Button>
            <Button
              variant="outline"
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black bg-transparent"
            >
              <Github className="w-4 h-4 mr-2" />
              GitHub
            </Button>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white bg-transparent"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
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
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Demo
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 bg-transparent">
                        <Github className="w-3 h-3 mr-1" />
                        Code
                      </Button>
                      {project.blog && (
                        <Button size="sm" variant="ghost" className="text-purple-400">
                          Blog
                        </Button>
                      )}
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
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            About Me
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-lg text-gray-300 space-y-6"
          >
            <p>
              I'm passionate about building AI tools that solve real-world problems, particularly in law and finance. My
              journey started with hackathons and collaborative projects, where I discovered the power of combining
              machine learning with practical applications.
            </p>
            <p>
              Currently interning at <span className="text-cyan-400 font-semibold">Astron Financials</span>, I'm working
              on automation solutions and ML-driven financial tools. I love the challenge of making complex AI
              accessible and useful for everyday business problems.
            </p>
            <p>
              What drives me is the intersection of technology and human needs — whether it's helping lawyers find
              relevant case law faster or automating tedious financial reconciliation processes. I believe AI should
              augment human capabilities, not replace them.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Skills & Tools
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 text-center backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300"
              >
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
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Get In Touch
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center text-gray-300 mb-12"
          >
            Send me an email. Or train an LLM on my resume and let it explain why I'm a good hire. Your call.
          </motion.p>

          <motion.form initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Your Name"
                className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400"
              />
              <Input
                type="email"
                placeholder="Your Email"
                className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400"
              />
            </div>
            <Input placeholder="Subject" className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400" />
            <Textarea
              placeholder="Your Message"
              rows={5}
              className="bg-gray-900/50 border-gray-700 text-white placeholder-gray-400"
            />
            <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </motion.form>
        </div>
      </section>

      {/* Chatbot */}
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <Button
            onClick={() => setChatOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        ) : (
          <Card className="w-80 h-96 bg-gray-900/95 border-gray-700 backdrop-blur-sm">
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
              <CardDescription className="text-gray-400">Ask me anything about Kurian's work!</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {chatMessages.map((message, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg text-sm ${
                      message.role === "user" ? "bg-purple-600 text-white ml-8" : "bg-gray-800 text-gray-200 mr-8"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
                {isTyping && (
                  <div className="bg-gray-800 text-gray-200 mr-8 p-2 rounded-lg text-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about projects, skills..."
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 text-sm"
                />
                <Button type="submit" size="sm" className="bg-cyan-600 hover:bg-cyan-700">
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
