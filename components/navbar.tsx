"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="border-b bg-background z-10">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-bold text-xl">
            AI Chat
          </Link>
        </div>

        <nav className="flex items-center gap-2">
          <Button variant={pathname === "/" ? "default" : "ghost"} size="icon" asChild>
            <Link href="/">
              <Home className="h-5 w-5" />
              <span className="sr-only">ホーム</span>
            </Link>
          </Button>

          <Button variant={pathname === "/settings" ? "default" : "ghost"} size="icon" asChild>
            <Link href="/settings">
              <Settings className="h-5 w-5" />
              <span className="sr-only">設定</span>
            </Link>
          </Button>

          <ModeToggle />
        </nav>
      </div>
    </header>
  )
}

