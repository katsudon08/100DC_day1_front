import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

interface ChatMessageProps {
  message: {
    role: "user" | "assistant"
    content: string
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} gap-2 max-w-[80%]`}>
        <Avatar className={`h-8 w-8 ${isUser ? "bg-primary" : "bg-muted"}`}>
          <AvatarImage src={isUser ? "/user-avatar.png" : "/ai-avatar.png"} />
          <AvatarFallback>{isUser ? "U" : "AI"}</AvatarFallback>
        </Avatar>
        <Card className={`${isUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
          <CardContent className="p-3">
            <p className="whitespace-pre-wrap">{message.content}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

