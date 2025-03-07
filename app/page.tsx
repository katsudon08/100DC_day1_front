"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import ChatMessage from "@/components/chat-message"
import ConversationSidebar from "@/components/conversation-sidebar"

export default function Home() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string; id: string }[]>([
    { role: "assistant", content: "こんにちは！何かお手伝いできることはありますか？", id: "1" },
  ])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === "") return

    // Add user message
    const userMessage = { role: "user" as const, content: input, id: Date.now().toString() }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        role: "assistant" as const,
        content: `${input}についてのご質問ありがとうございます。お手伝いします。`,
        id: (Date.now() + 1).toString(),
      }
      setMessages((prev) => [...prev, aiMessage])
    }, 1000)
  }

  const handleNewChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "新しい会話を始めましょう。何かお手伝いできることはありますか？",
        id: Date.now().toString(),
      },
    ])
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Sidebar - hidden on mobile unless toggled */}
      <div
        className={`${isMobileMenuOpen ? "block" : "hidden"} md:block w-full md:w-64 lg:w-80 border-r bg-background`}
      >
        <ConversationSidebar onSelectConversation={() => setIsMobileMenuOpen(false)} onNewChat={handleNewChat} />
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Mobile menu toggle */}
        <div className="md:hidden p-2 border-b">
          <Button variant="outline" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? "閉じる" : "会話履歴"}
          </Button>
        </div>

        {/* Chat messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input area */}
        <Card className="m-4 border rounded-lg">
          <CardContent className="p-2">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                placeholder="メッセージを入力..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">送信</span>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

