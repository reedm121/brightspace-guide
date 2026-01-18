import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, MessageCircle, ArrowRight, GraduationCap, Sparkles, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold">BrightspaceGuide</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/docs" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Documentation
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with gradient background */}
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
          <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 px-6 py-24 text-center sm:px-8 md:py-32 lg:px-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              <span>Your complete Brightspace resource</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Master Brightspace
                <br />
                <span className="bg-gradient-to-r from-primary via-primary to-chart-4 bg-clip-text text-transparent">
                  with Confidence
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
                The comprehensive guide to D2L Brightspace LMS for educators.
                Step-by-step documentation, instant search, and AI-powered assistance.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2 shadow-lg shadow-primary/25">
                <Link href="/docs/getting-started/overview">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/docs">
                  Browse Documentation
                </Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Verified steps</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Always up-to-date</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Teacher-focused</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section with colored icons */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Everything you need to succeed</h2>
              <p className="mt-3 text-muted-foreground">Powerful tools designed for educators</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="group space-y-4 rounded-xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 transition-colors group-hover:bg-blue-500/20">
                  <BookOpen className="h-7 w-7 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold">Comprehensive Guides</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Step-by-step documentation for every Brightspace feature teachers use,
                  verified against live systems.
                </p>
              </div>

              <div className="group space-y-4 rounded-xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-500/10 transition-colors group-hover:bg-emerald-500/20">
                  <Search className="h-7 w-7 text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold">Instant Search</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Find answers quickly with full-text search across all documentation.
                  Press <kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium">Cmd/Ctrl + K</kbd> anywhere.
                </p>
              </div>

              <div className="group space-y-4 rounded-xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-violet-500/10 transition-colors group-hover:bg-violet-500/20">
                  <MessageCircle className="h-7 w-7 text-violet-500" />
                </div>
                <h3 className="text-xl font-semibold">AI Assistant</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get contextual help from our AI chat assistant, always available
                  in the sidebar while you work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl rounded-2xl border bg-gradient-to-br from-primary/5 via-card to-card p-8 text-center shadow-sm md:p-12">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Built for Teachers, By Teachers
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              We understand the challenges of transitioning to a new LMS.
              This guide addresses the most common pain points with clear,
              actionable solutions.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link href="/docs">
                  Explore the Documentation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="border-t bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-semibold">BrightspaceGuide</span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Helping educators master Brightspace LMS with comprehensive, verified documentation.
              </p>
            </div>
            <div>
              <h4 className="mb-3 font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/docs/getting-started/overview" className="hover:text-primary transition-colors">
                    Getting Started
                  </Link>
                </li>
                <li>
                  <Link href="/docs/course-setup/creating-modules" className="hover:text-primary transition-colors">
                    Course Setup
                  </Link>
                </li>
                <li>
                  <Link href="/docs/assignments/creating-assignments" className="hover:text-primary transition-colors">
                    Assignments
                  </Link>
                </li>
                <li>
                  <Link href="/docs/gradebook/setup-wizard" className="hover:text-primary transition-colors">
                    Gradebook
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 font-semibold">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/docs" className="hover:text-primary transition-colors">
                    All Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/docs/troubleshooting/common-errors" className="hover:text-primary transition-colors">
                    Troubleshooting
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>BrightspaceGuide - Your trusted resource for Brightspace LMS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
