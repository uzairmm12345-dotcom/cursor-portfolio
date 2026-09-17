"use client"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { FiSend, FiMessageCircle, FiX } from "react-icons/fi"
import ReactMarkdown from "react-markdown"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const getThreadId = (): string => {
  if (typeof window !== "undefined") {
    let threadId = localStorage.getItem("chat_thread_id");
    if (!threadId) {
      threadId = crypto.randomUUID?.() || Date.now().toString();
      localStorage.setItem("chat_thread_id", threadId);
    }
    return threadId;
  }
  return "default-session";
};

export default function Chatbot() {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<{ role: "bot" | "user"; text: string }[]>([
    { role: "bot", text: "Hi! I'm Uzair's assistant. Ask me anything about his skills, projects, experience, or how to reach him." }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  const handleSend = async () => {
    const userMessage = input.trim()
    if (!userMessage) return

    setMessages(prev => [...prev, { role: "user", text: userMessage }])
    setInput("")

    setMessages(prev => [...prev, { role: "bot", text: "" }])
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          thread_id: getThreadId()
        }),
      })

      if (!res.body) throw new Error("No response body from server")
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let aiText = ""

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        //@ts-ignore
        const chunk = decoder.decode(value, { stream: true })
        aiText += chunk

        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1].text = aiText
          return updated
        })
      }
    } catch (err) {
      console.error("Error streaming response:", err)
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1].text = "Sorry, something went wrong."
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) return null

  if (!open) {
    return (
      <div className="fixed right-4 bottom-4 xl:right-14 xl:bottom-12 z-50 animate-in fade-in duration-500">
        <button
          onClick={() => setOpen(true)}
          className="group relative bg-accent text-primary rounded-2xl flex items-center gap-2 px-4 py-2 xl:px-5 xl:py-3 font-semibold text-xs xl:text-sm hover:bg-accent-hover transition-colors"
          aria-label="Open chat"
        >
          <FiMessageCircle className="w-4 h-4 xl:w-5 xl:h-5" />
          <span>Ask AI</span>
        </button>
      </div>
    )
  }

  return (
    <div
      className="fixed right-4 bottom-4 z-50 w-[min(90vw,320px)] h-96 animate-in fade-in duration-500"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card shadow-card flex flex-col overflow-hidden h-full w-full"
      >
        <div className="bg-white/[0.04] border-b border-white/[0.06] p-3 flex justify-between items-center">
          <div>
            <span className="font-display font-semibold text-sm">Uzair&apos;s Assistant</span>
            <p className="text-[10px] text-white/40 font-primary uppercase tracking-wider">Powered by AI</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-white/50 hover:text-white transition-colors"
            type="button"
            aria-label="Close chat"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm scrollbar-dark">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl max-w-[85%] break-words text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-accent/20 text-white ml-auto border border-accent/20"
                  : "bg-white/[0.04] text-white/80 border border-white/[0.06]"
              }`}
            >
              {msg.role === "bot" && !msg.text && loading
                ? <span className="text-white/40">Typing...</span>
                : <ReactMarkdown>{msg.text}</ReactMarkdown>
              }
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="relative p-3 border-t border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !loading && handleSend()}
              className="flex-1 input-modern py-2.5 text-sm"
              placeholder="Ask about Uzair..."
              disabled={loading}
            />
            <button
              onClick={handleSend}
              className={`p-2.5 bg-accent text-primary rounded-xl hover:bg-accent-hover transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              <FiSend />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
