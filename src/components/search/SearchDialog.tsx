"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search, FileText, BookOpen, GraduationCap, Settings, MessageSquare, BarChart } from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Badge } from "@/components/ui/badge"

/**
 * Interface for search results
 */
export interface SearchResult {
  slug: string
  title: string
  description: string
  category: string
  excerpt: string
}

/**
 * Hardcoded sample search results for development
 * This will be replaced with actual search index data
 */
const SAMPLE_RESULTS: SearchResult[] = [
  {
    slug: "getting-started/brightspace-overview",
    title: "Brightspace Overview",
    description: "Introduction to the D2L Brightspace LMS interface",
    category: "Getting Started",
    excerpt: "Learn the basics of navigating the Brightspace learning management system and understand its key features.",
  },
  {
    slug: "getting-started/logging-in",
    title: "Logging In and Account Settings",
    description: "How to access Brightspace and configure your account",
    category: "Getting Started",
    excerpt: "Step-by-step guide to logging into Brightspace and customizing your profile and notification settings.",
  },
  {
    slug: "course-setup/creating-modules",
    title: "Creating and Organizing Modules",
    description: "Build your course structure with modules",
    category: "Course Setup",
    excerpt: "Learn how to create, organize, and manage content modules to structure your course effectively.",
  },
  {
    slug: "course-setup/uploading-content",
    title: "Uploading Files and Content",
    description: "Add files to your Brightspace course",
    category: "Course Setup",
    excerpt: "Multiple methods for uploading content including drag-drop, OneDrive, and Google Drive integration.",
  },
  {
    slug: "assignments/creating-assignments",
    title: "Creating Assignment Folders",
    description: "Set up assignment dropboxes for student submissions",
    category: "Assignments",
    excerpt: "Configure assignment folders with submission types, due dates, and availability settings.",
  },
  {
    slug: "assignments/grading-submissions",
    title: "Grading Student Submissions",
    description: "Review and grade student work",
    category: "Assignments",
    excerpt: "Use the annotation tools and feedback options to efficiently grade and return student submissions.",
  },
  {
    slug: "quizzes/creating-quizzes",
    title: "Creating Quizzes",
    description: "Build assessments with the quiz tool",
    category: "Quizzes",
    excerpt: "Create quizzes with various question types, time limits, and randomization options.",
  },
  {
    slug: "gradebook/setup-wizard",
    title: "Gradebook Setup Wizard",
    description: "Configure your course gradebook",
    category: "Gradebook",
    excerpt: "Use the setup wizard to configure grade calculation methods, categories, and items.",
  },
  {
    slug: "discussions/creating-forums",
    title: "Creating Discussion Forums",
    description: "Set up discussions for student interaction",
    category: "Discussions",
    excerpt: "Create forums and topics for class discussions with grading and moderation options.",
  },
  {
    slug: "communication/announcements",
    title: "Creating Announcements",
    description: "Communicate with your students",
    category: "Communication",
    excerpt: "Post announcements to keep students informed about course updates and important information.",
  },
]

/**
 * Category icon mapping
 */
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Getting Started":
      return BookOpen
    case "Course Setup":
      return Settings
    case "Assignments":
      return FileText
    case "Quizzes":
      return GraduationCap
    case "Gradebook":
      return BarChart
    case "Discussions":
      return MessageSquare
    case "Communication":
      return MessageSquare
    default:
      return FileText
  }
}

/**
 * Group search results by category
 */
const groupResultsByCategory = (results: SearchResult[]): Record<string, SearchResult[]> => {
  return results.reduce((groups, result) => {
    const category = result.category
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(result)
    return groups
  }, {} as Record<string, SearchResult[]>)
}

/**
 * SearchDialog Component
 *
 * A command palette-style search dialog that can be triggered with Cmd/Ctrl+K.
 * Displays search results grouped by category with navigation to guide pages.
 */
export function SearchDialog() {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const router = useRouter()

  // Filter results based on search query
  const filteredResults = React.useMemo(() => {
    if (!searchQuery.trim()) {
      return SAMPLE_RESULTS
    }

    const query = searchQuery.toLowerCase()
    return SAMPLE_RESULTS.filter(
      (result) =>
        result.title.toLowerCase().includes(query) ||
        result.description.toLowerCase().includes(query) ||
        result.excerpt.toLowerCase().includes(query) ||
        result.category.toLowerCase().includes(query)
    )
  }, [searchQuery])

  // Group filtered results by category
  const groupedResults = React.useMemo(
    () => groupResultsByCategory(filteredResults),
    [filteredResults]
  )

  // Listen for Cmd/Ctrl+K keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Handle result selection
  const handleSelect = (slug: string) => {
    setOpen(false)
    setSearchQuery("")
    router.push(`/guides/${slug}`)
  }

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Search Guides"
      description="Search for Brightspace guides and documentation"
    >
      <CommandInput
        placeholder="Search guides..."
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList>
        <CommandEmpty>
          <div className="flex flex-col items-center gap-2 py-6">
            <Search className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No guides found for &quot;{searchQuery}&quot;
            </p>
          </div>
        </CommandEmpty>

        {Object.entries(groupedResults).map(([category, results]) => {
          const CategoryIcon = getCategoryIcon(category)

          return (
            <CommandGroup key={category} heading={category}>
              {results.map((result) => (
                <CommandItem
                  key={result.slug}
                  value={`${result.title} ${result.description} ${result.excerpt}`}
                  onSelect={() => handleSelect(result.slug)}
                  className="flex flex-col items-start gap-1 py-3"
                >
                  <div className="flex w-full items-center gap-2">
                    <CategoryIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="font-medium">{result.title}</span>
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {result.category}
                    </Badge>
                  </div>
                  <p className="ml-6 line-clamp-1 text-xs text-muted-foreground">
                    {result.excerpt}
                  </p>
                </CommandItem>
              ))}
            </CommandGroup>
          )
        })}
      </CommandList>
    </CommandDialog>
  )
}

export default SearchDialog
