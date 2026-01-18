"use client"

import * as React from "react"
import { Search, MessageCircle, Menu, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface HeaderProps {
  onToggleChat?: () => void
  isChatOpen?: boolean
}

export function Header({ onToggleChat, isChatOpen }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // Handle search shortcut trigger
  const handleSearchClick = () => {
    // Dispatch a keyboard event to trigger Cmd/Ctrl+K
    const event = new KeyboardEvent("keydown", {
      key: "k",
      metaKey: true,
      ctrlKey: navigator.platform.toLowerCase().includes("win"),
      bubbles: true,
    })
    document.dispatchEvent(event)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        {/* Logo and Title - Left */}
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="hidden sm:inline-block">BrightspaceGuide</span>
            <span className="sm:hidden">BSG</span>
          </a>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Desktop Navigation - Right */}
        <nav className="hidden md:flex items-center gap-2">
          {/* Search Button */}
          <Button
            variant="outline"
            size="sm"
            className="relative h-8 w-full justify-start text-sm text-muted-foreground sm:w-64 md:w-80"
            onClick={handleSearchClick}
          >
            <Search className="mr-2 h-4 w-4" />
            <span className="hidden lg:inline-flex">Search documentation...</span>
            <span className="lg:hidden">Search...</span>
            <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          {/* AI Chat Toggle Button */}
          <Button
            variant={isChatOpen ? "default" : "outline"}
            size="sm"
            onClick={onToggleChat}
            className="gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            <span className="hidden lg:inline-block">AI Assistant</span>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleSearchClick}
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Mobile AI Chat Button */}
          <Button
            variant={isChatOpen ? "default" : "ghost"}
            size="icon"
            onClick={onToggleChat}
            aria-label="Toggle AI Assistant"
          >
            <MessageCircle className="h-4 w-4" />
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-sm" aria-label="Open menu">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  BrightspaceGuide
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-6">
                <a
                  href="/"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </a>
                <a
                  href="/getting-started"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Getting Started
                </a>
                <a
                  href="/course-setup"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Course Setup
                </a>
                <a
                  href="/assignments"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Assignments
                </a>
                <a
                  href="/quizzes"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Quizzes
                </a>
                <a
                  href="/gradebook"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Gradebook
                </a>
                <a
                  href="/discussions"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Discussions
                </a>
                <a
                  href="/troubleshooting"
                  className="text-sm font-medium hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Troubleshooting
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
