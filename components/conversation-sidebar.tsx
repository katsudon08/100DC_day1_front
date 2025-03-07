"use client"

import { useState } from "react"
import { MessageSquare, Search, PlusCircle } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface ConversationSidebarProps {
  onSelectConversation: () => void
  onNewChat: () => void
}

export default function ConversationSidebar({ onSelectConversation, onNewChat }: ConversationSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  // Sample conversation history
  const conversations = [
    { id: "1", title: "AIの基本について", date: "2024-03-07" },
    { id: "2", title: "機械学習の応用", date: "2024-03-06" },
    { id: "3", title: "自然言語処理の最新技術", date: "2024-03-05" },
    { id: "4", title: "画像認識AIの仕組み", date: "2024-03-04" },
    { id: "5", title: "AIと倫理について", date: "2024-03-03" },
    { id: "6", title: "強化学習の基礎", date: "2024-03-02" },
    { id: "7", title: "ニューラルネットワークの構造", date: "2024-03-01" },
    { id: "8", title: "AIの歴史と発展", date: "2024-02-29" },
    { id: "9", title: "生成AIの可能性", date: "2024-02-28" },
    { id: "10", title: "AIと人間の共存", date: "2024-02-27" },
  ]

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Button className="w-full mb-4 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={onNewChat}>
          <PlusCircle className="h-4 w-4 mr-2" />
          新しいチャット
        </Button>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="会話を検索..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredConversations.map((conv) => (
            <button
              key={conv.id}
              className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors mb-1 flex items-start"
              onClick={onSelectConversation}
            >
              <MessageSquare className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
              <div>
                <div className="font-medium truncate">{conv.title}</div>
                <div className="text-xs text-muted-foreground">{conv.date}</div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

