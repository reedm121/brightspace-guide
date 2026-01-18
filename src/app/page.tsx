import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, MessageCircle, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            <span className="font-semibold">BrightspaceGuide</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Documentation
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="container flex flex-col items-center justify-center gap-8 py-24 text-center md:py-32">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Master Brightspace
              <br />
              <span className="text-muted-foreground">with Confidence</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
              The comprehensive guide to D2L Brightspace LMS for educators.
              Step-by-step documentation, instant search, and AI-powered assistance.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/docs/getting-started/overview">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/docs">
                Browse Documentation
              </Link>
            </Button>
          </div>
        </section>

        <section className="border-t bg-muted/50">
          <div className="container py-16">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Comprehensive Guides</h3>
                <p className="text-muted-foreground">
                  Step-by-step documentation for every Brightspace feature teachers use,
                  verified against live systems.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Instant Search</h3>
                <p className="text-muted-foreground">
                  Find answers quickly with full-text search across all documentation.
                  Press Cmd/Ctrl + K anywhere.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">AI Assistant</h3>
                <p className="text-muted-foreground">
                  Get contextual help from our AI chat assistant, always available
                  in the sidebar while you work.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Built for Teachers, By Teachers
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We understand the challenges of transitioning to a new LMS.
              This guide addresses the most common pain points with clear,
              actionable solutions.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>BrightspaceGuide - Helping educators master Brightspace LMS</p>
        </div>
      </footer>
    </div>
  );
}
