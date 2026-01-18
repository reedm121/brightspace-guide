import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Rocket,
  FolderOpen,
  FileText,
  HelpCircle,
  BarChart3,
  MessageSquare,
  Mail,
  AlertCircle
} from "lucide-react";

const sections = [
  {
    title: "Getting Started",
    description: "Learn the basics of Brightspace",
    href: "/docs/getting-started/overview",
    icon: Rocket,
  },
  {
    title: "Course Setup",
    description: "Organize your course content",
    href: "/docs/course-setup/creating-modules",
    icon: FolderOpen,
  },
  {
    title: "Assignments",
    description: "Create and grade assignments",
    href: "/docs/assignments/creating-assignments",
    icon: FileText,
  },
  {
    title: "Quizzes",
    description: "Build assessments and exams",
    href: "/docs/quizzes/creating-quizzes",
    icon: HelpCircle,
  },
  {
    title: "Gradebook",
    description: "Track and calculate grades",
    href: "/docs/gradebook/setup-wizard",
    icon: BarChart3,
  },
  {
    title: "Discussions",
    description: "Facilitate online discussions",
    href: "/docs/discussions/forums-vs-topics",
    icon: MessageSquare,
  },
  {
    title: "Communication",
    description: "Announcements and messaging",
    href: "/docs/communication/announcements",
    icon: Mail,
  },
  {
    title: "Troubleshooting",
    description: "Common issues and solutions",
    href: "/docs/troubleshooting/common-errors",
    icon: AlertCircle,
  },
];

export default function DocsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Documentation</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Welcome to BrightspaceGuide. Find step-by-step instructions for every
          Brightspace feature teachers use.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link key={section.href} href={section.href}>
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="rounded-lg border bg-muted/50 p-6">
        <h2 className="text-xl font-semibold">Need Help?</h2>
        <p className="mt-2 text-muted-foreground">
          Use the search bar (Cmd/Ctrl + K) to quickly find what you're looking for,
          or ask our AI assistant for help with any Brightspace question.
        </p>
      </div>
    </div>
  );
}
