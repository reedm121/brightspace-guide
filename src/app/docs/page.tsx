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
  AlertCircle,
  ArrowRight,
  type LucideIcon
} from "lucide-react";

interface Section {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  iconColor: string;
  bgColor: string;
  hoverBorder: string;
}

const sections: Section[] = [
  {
    title: "Getting Started",
    description: "Learn the basics of Brightspace",
    href: "/docs/getting-started/overview",
    icon: Rocket,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/10 group-hover:bg-blue-500/20",
    hoverBorder: "hover:border-blue-500/50",
  },
  {
    title: "Course Setup",
    description: "Organize your course content",
    href: "/docs/course-setup/creating-modules",
    icon: FolderOpen,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10 group-hover:bg-emerald-500/20",
    hoverBorder: "hover:border-emerald-500/50",
  },
  {
    title: "Assignments",
    description: "Create and grade assignments",
    href: "/docs/assignments/creating-assignments",
    icon: FileText,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-500/10 group-hover:bg-orange-500/20",
    hoverBorder: "hover:border-orange-500/50",
  },
  {
    title: "Quizzes",
    description: "Build assessments and exams",
    href: "/docs/quizzes/creating-quizzes",
    icon: HelpCircle,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-500/10 group-hover:bg-purple-500/20",
    hoverBorder: "hover:border-purple-500/50",
  },
  {
    title: "Gradebook",
    description: "Track and calculate grades",
    href: "/docs/gradebook/setup-wizard",
    icon: BarChart3,
    iconColor: "text-teal-500",
    bgColor: "bg-teal-500/10 group-hover:bg-teal-500/20",
    hoverBorder: "hover:border-teal-500/50",
  },
  {
    title: "Discussions",
    description: "Facilitate online discussions",
    href: "/docs/discussions/forums-vs-topics",
    icon: MessageSquare,
    iconColor: "text-pink-500",
    bgColor: "bg-pink-500/10 group-hover:bg-pink-500/20",
    hoverBorder: "hover:border-pink-500/50",
  },
  {
    title: "Communication",
    description: "Announcements and messaging",
    href: "/docs/communication/announcements",
    icon: Mail,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-500/10 group-hover:bg-amber-500/20",
    hoverBorder: "hover:border-amber-500/50",
  },
  {
    title: "Troubleshooting",
    description: "Common issues and solutions",
    href: "/docs/troubleshooting/common-errors",
    icon: AlertCircle,
    iconColor: "text-red-500",
    bgColor: "bg-red-500/10 group-hover:bg-red-500/20",
    hoverBorder: "hover:border-red-500/50",
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
            <Link key={section.href} href={section.href} className="group">
              <Card className={`h-full transition-all duration-200 ${section.hoverBorder} hover:shadow-md`}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${section.bgColor}`}>
                      <Icon className={`h-6 w-6 ${section.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {section.title}
                        <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 text-muted-foreground" />
                      </CardTitle>
                      <CardDescription className="mt-0.5">{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="rounded-xl border bg-gradient-to-br from-primary/5 via-background to-background p-6">
        <h2 className="text-xl font-semibold">Need Help?</h2>
        <p className="mt-2 text-muted-foreground">
          Use the search bar (<kbd className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium">Cmd/Ctrl + K</kbd>) to quickly find what you&apos;re looking for,
          or ask our AI assistant for help with any Brightspace question.
        </p>
      </div>
    </div>
  );
}
