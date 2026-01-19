"use client";

import * as React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Send, MessageCircle, X, Sparkles, Loader2, FileText } from "lucide-react";
import { useChatStore } from "@/stores/chat-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { ChatSource } from "@/types/content";

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

interface ChatMessageItemProps {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  sources?: ChatSource[];
}

function ChatMessageItem({
  role,
  content,
  timestamp,
  sources,
}: ChatMessageItemProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 px-4 py-3",
        isUser ? "items-end" : "items-start"
      )}
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        {isUser ? (
          <>
            <span className="font-medium">You</span>
            <span>{formatTime(timestamp)}</span>
          </>
        ) : (
          <>
            <Sparkles className="size-3 text-primary" />
            <span className="font-medium">Assistant</span>
            <span>{formatTime(timestamp)}</span>
          </>
        )}
      </div>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-muted/80 text-foreground border border-border/50 rounded-bl-md"
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-headings:my-2 prose-code:bg-slate-200 prose-code:text-slate-800 dark:prose-code:bg-slate-700 dark:prose-code:text-slate-200 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-pre:bg-slate-800 prose-pre:text-slate-200 prose-pre:p-2 prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            <ReactMarkdown
              components={{
                // Override links to use Next.js Link for internal navigation
                a: ({ href, children }) => {
                  if (href?.startsWith("/")) {
                    return (
                      <Link href={href} className="text-primary hover:underline">
                        {children}
                      </Link>
                    );
                  }
                  return (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
      {sources && sources.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1.5 max-w-[85%]">
          {sources.map((source) => (
            <Link
              key={source.url}
              href={source.url}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-medium hover:bg-primary/20 transition-colors"
            >
              <FileText className="size-3" />
              <span className="truncate max-w-[120px]">{source.title}</span>
              {source.section && (
                <span className="text-primary/70 truncate max-w-[80px]">
                  → {source.section}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex flex-col gap-1.5 px-4 py-3 items-start">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Sparkles className="size-3 text-primary" />
        <span className="font-medium">Assistant</span>
      </div>
      <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-muted/80 border border-border/50 px-4 py-2.5 shadow-sm">
        <Loader2 className="size-4 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground">Thinking...</span>
      </div>
    </div>
  );
}

export function ChatSidebar() {
  const {
    messages,
    isOpen,
    isLoading,
    currentPage,
    addMessage,
    setOpen,
    setLoading,
  } = useChatStore();

  const [inputValue, setInputValue] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Focus input when sheet opens
  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedValue = inputValue.trim();
    if (!trimmedValue || isLoading) return;

    // Add user message
    addMessage({
      role: "user",
      content: trimmedValue,
    });

    setInputValue("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmedValue,
          currentPage: currentPage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to get response");
      }

      const data = await response.json();

      // Format sources with full metadata for clickable links
      const formattedSources: ChatSource[] = (data.sources || []).map(
        (s: { title: string; slug: string; section?: string; url?: string }) => ({
          title: s.title,
          slug: s.slug,
          section: s.section,
          url: s.url || `/docs/${s.slug}`,
        })
      );

      addMessage({
        role: "assistant",
        content: data.message,
        sources: formattedSources.length > 0 ? formattedSources : undefined,
      });
    } catch (error) {
      console.error("Chat error:", error);
      addMessage({
        role: "assistant",
        content:
          error instanceof Error
            ? `Sorry, I encountered an error: ${error.message}. Please try again.`
            : "Sorry, I encountered an error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAskAboutPage = async () => {
    if (!currentPage || isLoading) return;

    const question = `Can you summarize and help me understand the content on this page: ${currentPage}?`;
    addMessage({
      role: "user",
      content: question,
    });

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
          currentPage: currentPage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to get response");
      }

      const data = await response.json();

      // Format sources with full metadata for clickable links
      const formattedSources: ChatSource[] = (data.sources || []).map(
        (s: { title: string; slug: string; section?: string; url?: string }) => ({
          title: s.title,
          slug: s.slug,
          section: s.section,
          url: s.url || `/docs/${s.slug}`,
        })
      );

      addMessage({
        role: "assistant",
        content: data.message,
        sources: formattedSources.length > 0 ? formattedSources : undefined,
      });
    } catch (error) {
      console.error("Chat error:", error);
      addMessage({
        role: "assistant",
        content:
          error instanceof Error
            ? `Sorry, I encountered an error: ${error.message}. Please try again.`
            : "Sorry, I encountered an error. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <MessageCircle className="size-5 text-primary" />
            <SheetTitle>Brightspace Assistant</SheetTitle>
          </div>
          <SheetDescription>
            Ask questions about Brightspace LMS
          </SheetDescription>
        </SheetHeader>

        {/* Ask about this page button */}
        {currentPage && (
          <div className="border-b px-4 py-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAskAboutPage}
              disabled={isLoading}
              className="w-full justify-start gap-2"
            >
              <Sparkles className="size-4" />
              Ask about this page
              {currentPage && (
                <span className="ml-auto truncate text-xs text-muted-foreground">
                  {currentPage}
                </span>
              )}
            </Button>
          </div>
        )}

        {/* Messages area */}
        <ScrollArea className="flex-1 overflow-hidden">
          <div ref={scrollRef} className="flex flex-col">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <MessageCircle className="size-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Start a conversation</h3>
                <p className="text-sm text-muted-foreground max-w-[240px]">
                  Ask any question about Brightspace and I&apos;ll help you find the answer.
                </p>
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessageItem
                    key={message.id}
                    role={message.role}
                    content={message.content}
                    timestamp={message.timestamp}
                    sources={message.sources}
                  />
                ))}
                {isLoading && <TypingIndicator />}
              </>
            )}
          </div>
        </ScrollArea>

        {/* Input area */}
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about Brightspace..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!inputValue.trim() || isLoading}
            >
              <Send className="size-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Export a trigger button component for use in other parts of the app
export function ChatTriggerButton() {
  const { setOpen, isOpen } = useChatStore();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setOpen(!isOpen)}
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {isOpen ? (
        <X className="size-4" />
      ) : (
        <MessageCircle className="size-4" />
      )}
    </Button>
  );
}
