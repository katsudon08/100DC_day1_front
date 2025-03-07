"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"

export default function Settings() {
  const router = useRouter()
  const [aiModel, setAiModel] = useState("gpt-4")
  const [responseLength, setResponseLength] = useState([50])
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [username, setUsername] = useState("ユーザー")
  const [email, setEmail] = useState("user@example.com")

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center p-6 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">戻る</span>
        </Button>
        <h1 className="text-2xl font-bold">設定</h1>
      </div>

      <ScrollArea className="flex-1">
        <div className="container max-w-4xl py-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AIモデル設定</CardTitle>
              <CardDescription>使用するAIモデルを選択してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={aiModel} onValueChange={setAiModel}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gpt-4" id="gpt-4" />
                  <Label htmlFor="gpt-4">GPT-4 (高性能・低速)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gpt-3.5" id="gpt-3.5" />
                  <Label htmlFor="gpt-3.5">GPT-3.5 (標準・高速)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom">カスタム</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>回答の長さ</CardTitle>
              <CardDescription>AIの回答の長さを調整します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>短い</span>
                  <span>{responseLength[0]}%</span>
                  <span>長い</span>
                </div>
                <Slider value={responseLength} onValueChange={setResponseLength} max={100} step={1} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>表示設定</CardTitle>
              <CardDescription>アプリの表示に関する設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">ダークモード</Label>
                <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>通知設定</CardTitle>
              <CardDescription>通知に関する設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">通知を有効にする</Label>
                <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="pt-2">
                <Label htmlFor="notification-type">通知タイプ</Label>
                <Select disabled={!notifications}>
                  <SelectTrigger id="notification-type" className="mt-1">
                    <SelectValue placeholder="すべての通知" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべての通知</SelectItem>
                    <SelectItem value="mentions">メンションのみ</SelectItem>
                    <SelectItem value="none">通知なし</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Add more cards to demonstrate scrolling */}
          <Card>
            <CardHeader>
              <CardTitle>詳細設定</CardTitle>
              <CardDescription>その他の詳細設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-save">自動保存</Label>
                <Switch id="auto-save" checked={true} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="analytics">分析データの送信</Label>
                <Switch id="analytics" checked={false} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>アカウント設定</CardTitle>
              <CardDescription>アカウントに関する設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>ユーザー名</Label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>メールアドレス</Label>
                <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <Button className="mt-2">保存</Button>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  )
}

