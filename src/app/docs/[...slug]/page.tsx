import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// This will be replaced with actual MDX content loading
// For now, we'll use placeholder content

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

// Placeholder content for guides - will be replaced with actual MDX loading
const guides: Record<string, { title: string; content: React.ReactNode }> = {
  "getting-started/overview": {
    title: "Brightspace Overview",
    content: (
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="lead">
          A comprehensive introduction to D2L Brightspace LMS and its key features for educators.
        </p>
        <h2>What is Brightspace?</h2>
        <p>
          Brightspace is a cloud-based Learning Management System (LMS) developed by D2L (Desire2Learn).
          It provides a comprehensive platform for creating, managing, and delivering educational content to students.
        </p>
        <h2>Key Features</h2>
        <ul>
          <li><strong>Content Management</strong>: Organize course materials into structured modules</li>
          <li><strong>Assessment Tools</strong>: Create assignments, quizzes, and discussions</li>
          <li><strong>Gradebook</strong>: Track and calculate student grades</li>
          <li><strong>Communication</strong>: Send announcements and manage notifications</li>
        </ul>
        <div className="rounded-lg border bg-blue-50 p-4 dark:bg-blue-950">
          <p className="text-sm">
            <strong>Tip:</strong> If you&apos;re new to Brightspace, we recommend starting with the Interface Tour
            guide to familiarize yourself with the layout and navigation.
          </p>
        </div>
      </div>
    ),
  },
  "getting-started/logging-in": {
    title: "Logging In to Brightspace",
    content: (
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <p className="lead">
          Step-by-step instructions for accessing your Brightspace account.
        </p>
        <h2>Before You Begin</h2>
        <ul>
          <li>You need your institution credentials (username/email and password)</li>
          <li>A modern web browser (Chrome, Firefox, Safari, or Edge recommended)</li>
          <li>A stable internet connection</li>
        </ul>
        <h2>Step-by-Step Instructions</h2>
        <ol>
          <li>Navigate to your institution&apos;s Brightspace URL</li>
          <li>Enter your credentials (username and password)</li>
          <li>Complete any additional authentication (MFA if required)</li>
          <li>Access your courses from the homepage</li>
        </ol>
      </div>
    ),
  },
};

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = slug.join("/");
  const guide = guides[slugPath];

  if (!guide) {
    notFound();
  }

  return (
    <article className="space-y-8">
      <div className="space-y-2">
        <nav className="flex items-center text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <ChevronRight className="mx-1 h-4 w-4" />
          {slug.map((segment, index) => (
            <span key={segment} className="flex items-center">
              {index > 0 && <ChevronRight className="mx-1 h-4 w-4" />}
              <span className={index === slug.length - 1 ? "text-foreground" : ""}>
                {segment.split("-").map(word =>
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(" ")}
              </span>
            </span>
          ))}
        </nav>
        <h1 className="text-4xl font-bold tracking-tight">{guide.title}</h1>
      </div>

      {guide.content}

      <div className="flex items-center justify-between pt-8 border-t">
        <Button variant="ghost" asChild>
          <Link href="/docs">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Docs
          </Link>
        </Button>
      </div>
    </article>
  );
}

export function generateStaticParams() {
  return Object.keys(guides).map((slug) => ({
    slug: slug.split("/"),
  }));
}
