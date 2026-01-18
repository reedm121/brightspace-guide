import type { NavItem } from "@/types/content";

export const navigation: NavItem[] = [
  {
    title: "Getting Started",
    href: "/docs/getting-started",
    icon: "rocket",
    children: [
      { title: "Overview", href: "/docs/getting-started/overview" },
      { title: "Logging In", href: "/docs/getting-started/logging-in" },
      { title: "Interface Tour", href: "/docs/getting-started/interface-tour" },
      { title: "Course Homepage", href: "/docs/getting-started/course-homepage" },
    ],
  },
  {
    title: "Course Setup",
    href: "/docs/course-setup",
    icon: "folder",
    children: [
      { title: "Creating Modules", href: "/docs/course-setup/creating-modules" },
      { title: "Uploading Files", href: "/docs/course-setup/uploading-files" },
      { title: "HTML Editor", href: "/docs/course-setup/html-editor" },
      { title: "Release Conditions", href: "/docs/course-setup/release-conditions" },
    ],
  },
  {
    title: "Assignments",
    href: "/docs/assignments",
    icon: "file-text",
    children: [
      { title: "Creating Assignments", href: "/docs/assignments/creating-assignments" },
      { title: "Submission Settings", href: "/docs/assignments/submission-settings" },
      { title: "Turnitin", href: "/docs/assignments/turnitin" },
      { title: "Grading Submissions", href: "/docs/assignments/grading-submissions" },
    ],
  },
  {
    title: "Quizzes",
    href: "/docs/quizzes",
    icon: "help-circle",
    children: [
      { title: "Creating Quizzes", href: "/docs/quizzes/creating-quizzes" },
      { title: "Question Types", href: "/docs/quizzes/question-types" },
      { title: "Quiz Settings", href: "/docs/quizzes/quiz-settings" },
      { title: "Grading Quizzes", href: "/docs/quizzes/grading-quizzes" },
    ],
  },
  {
    title: "Gradebook",
    href: "/docs/gradebook",
    icon: "bar-chart",
    children: [
      { title: "Setup Wizard", href: "/docs/gradebook/setup-wizard" },
      { title: "Grade Categories", href: "/docs/gradebook/grade-categories" },
      { title: "Grade Items", href: "/docs/gradebook/grade-items" },
      { title: "Quick Eval", href: "/docs/gradebook/quick-eval" },
    ],
  },
  {
    title: "Discussions",
    href: "/docs/discussions",
    icon: "message-square",
    children: [
      { title: "Forums vs Topics", href: "/docs/discussions/forums-vs-topics" },
      { title: "Creating Discussions", href: "/docs/discussions/creating-discussions" },
      { title: "Moderating", href: "/docs/discussions/moderating" },
      { title: "Grading Discussions", href: "/docs/discussions/grading-discussions" },
    ],
  },
  {
    title: "Communication",
    href: "/docs/communication",
    icon: "mail",
    children: [
      { title: "Announcements", href: "/docs/communication/announcements" },
      { title: "Email", href: "/docs/communication/email" },
      { title: "Intelligent Agents", href: "/docs/communication/intelligent-agents" },
    ],
  },
  {
    title: "Accessibility",
    href: "/docs/accessibility",
    icon: "accessibility",
    children: [
      { title: "Making Content Accessible", href: "/docs/accessibility/making-content-accessible" },
    ],
  },
  {
    title: "Troubleshooting",
    href: "/docs/troubleshooting",
    icon: "alert-circle",
    children: [
      { title: "Common Errors", href: "/docs/troubleshooting/common-errors" },
      { title: "Browser Issues", href: "/docs/troubleshooting/browser-issues" },
      { title: "Video Problems", href: "/docs/troubleshooting/video-problems" },
    ],
  },
];
