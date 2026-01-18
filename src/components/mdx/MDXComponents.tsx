import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Info,
  Lightbulb,
  AlertTriangle,
  BookOpen,
  ExternalLink,
} from "lucide-react";

// =============================================================================
// CALLOUT COMPONENT
// Alert boxes with type="tip", "warning", "info", "note", "danger"
// =============================================================================

interface CalloutProps {
  type?: "info" | "warning" | "tip" | "danger" | "note" | "error";
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  // Map "error" to "danger" for backward compatibility
  const normalizedType = type === "error" ? "danger" : type;

  const styles = {
    info: {
      container:
        "bg-blue-50 border-l-4 border-blue-500 dark:bg-blue-950/50 dark:border-blue-400",
      iconWrapper: "bg-blue-100 dark:bg-blue-900/50",
      icon: <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
      title: "text-blue-900 dark:text-blue-100",
      content: "text-blue-800 dark:text-blue-200",
    },
    warning: {
      container:
        "bg-amber-50 border-l-4 border-amber-500 dark:bg-amber-950/50 dark:border-amber-400",
      iconWrapper: "bg-amber-100 dark:bg-amber-900/50",
      icon: (
        <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      ),
      title: "text-amber-900 dark:text-amber-100",
      content: "text-amber-800 dark:text-amber-200",
    },
    tip: {
      container:
        "bg-emerald-50 border-l-4 border-emerald-500 dark:bg-emerald-950/50 dark:border-emerald-400",
      iconWrapper: "bg-emerald-100 dark:bg-emerald-900/50",
      icon: (
        <Lightbulb className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "text-emerald-900 dark:text-emerald-100",
      content: "text-emerald-800 dark:text-emerald-200",
    },
    danger: {
      container:
        "bg-red-50 border-l-4 border-red-500 dark:bg-red-950/50 dark:border-red-400",
      iconWrapper: "bg-red-100 dark:bg-red-900/50",
      icon: <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />,
      title: "text-red-900 dark:text-red-100",
      content: "text-red-800 dark:text-red-200",
    },
    note: {
      container:
        "bg-violet-50 border-l-4 border-violet-500 dark:bg-violet-950/50 dark:border-violet-400",
      iconWrapper: "bg-violet-100 dark:bg-violet-900/50",
      icon: <BookOpen className="h-4 w-4 text-violet-600 dark:text-violet-400" />,
      title: "text-violet-900 dark:text-violet-100",
      content: "text-violet-800 dark:text-violet-200",
    },
  };

  const style = styles[normalizedType];

  // Default titles if none provided
  const defaultTitles = {
    info: "Information",
    warning: "Warning",
    tip: "Tip",
    danger: "Danger",
    note: "Note",
  };

  const displayTitle = title || defaultTitles[normalizedType];

  return (
    <div className={cn("my-6 rounded-r-lg p-4 shadow-sm", style.container)}>
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
            style.iconWrapper
          )}
        >
          {style.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn("font-semibold text-sm mb-1", style.title)}>
            {displayTitle}
          </p>
          <div className={cn("text-sm leading-relaxed", style.content)}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// STEPS COMPONENT
// Container for numbered step-by-step instructions
// =============================================================================

interface StepsProps {
  children: React.ReactNode;
}

export function Steps({ children }: StepsProps) {
  return (
    <div className="steps-container my-8 ml-4 border-l-2 border-slate-200 pl-8 dark:border-slate-700 [counter-reset:step]">
      {children}
    </div>
  );
}

// =============================================================================
// STEP COMPONENT
// Individual step with visual number indicator
// =============================================================================

interface StepProps {
  title: string;
  children: React.ReactNode;
}

export function Step({ title, children }: StepProps) {
  return (
    <div className="step relative pb-8 last:pb-0 [counter-increment:step]">
      {/* Step number circle */}
      <div className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-md ring-4 ring-background before:content-[counter(step)]" />
      {/* Step content */}
      <div className="pt-0.5">
        <h3 className="mb-3 text-lg font-semibold text-foreground">{title}</h3>
        <div className="text-muted-foreground leading-relaxed prose-sm">
          {children}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// CODE BLOCK COMPONENT (Server-safe version without copy button)
// For copy functionality, use the client component wrapper
// =============================================================================

interface CodeBlockProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function CodeBlock({ children, className, title }: CodeBlockProps) {
  return (
    <div className="group relative my-6 overflow-hidden rounded-lg border border-slate-200 bg-slate-950 shadow-sm dark:border-slate-700">
      {/* Header with title */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2">
        <span className="text-xs font-medium text-slate-400">
          {title || "Code"}
        </span>
      </div>
      {/* Code content */}
      <pre
        className={cn(
          "overflow-x-auto p-4 text-sm leading-relaxed text-slate-200",
          className
        )}
      >
        {children}
      </pre>
    </div>
  );
}

// =============================================================================
// MDX COMPONENTS MAPPING
// All the styled components for MDX rendering
// =============================================================================

export const mdxComponents = {
  // Custom components
  Callout,
  Steps,
  Step,
  CodeBlock,

  // Headings with proper hierarchy and spacing
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-12 mb-4 scroll-m-20 border-b border-slate-200 pb-3 text-2xl font-semibold tracking-tight text-foreground first:mt-0 dark:border-slate-700"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-8 mb-3 scroll-m-20 text-xl font-semibold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className="mt-6 mb-2 scroll-m-20 text-lg font-semibold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h4>
  ),
  h5: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className="mt-4 mb-2 scroll-m-20 text-base font-semibold tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className="mt-4 mb-2 scroll-m-20 text-sm font-semibold tracking-tight text-muted-foreground"
      {...props}
    >
      {children}
    </h6>
  ),

  // Paragraphs with comfortable reading line height
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-4"
      {...props}
    >
      {children}
    </p>
  ),

  // Unordered lists with custom bullets
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="my-4 ml-6 list-none space-y-2 [&>li]:relative [&>li]:pl-6"
      {...props}
    >
      {children}
    </ul>
  ),

  // Ordered lists with proper numbering
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="my-4 ml-6 list-decimal space-y-2 marker:text-muted-foreground marker:font-medium [&>li]:pl-2"
      {...props}
    >
      {children}
    </ol>
  ),

  // List items with bullet styling
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li
      className="leading-7 text-muted-foreground before:absolute before:left-0 before:top-[0.6rem] before:h-1.5 before:w-1.5 before:rounded-full before:bg-slate-400 dark:before:bg-slate-500 [ol>&]:before:hidden"
      {...props}
    >
      {children}
    </li>
  ),

  // Blockquotes with distinctive left border
  blockquote: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-6 border-l-4 border-slate-300 bg-slate-50 py-4 pl-6 pr-4 italic text-slate-700 dark:border-slate-600 dark:bg-slate-800/50 dark:text-slate-300 [&>p]:mt-0"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Inline code styling
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // If it has a language class, it's a code block - let pre handle it
    if (className?.includes("language-")) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    // Inline code
    return (
      <code
        className="relative rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-sm font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-200"
        {...props}
      >
        {children}
      </code>
    );
  },

  // Code blocks
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    return (
      <div className="group relative my-6 overflow-hidden rounded-lg border border-slate-200 shadow-sm dark:border-slate-700">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-4 py-2 dark:border-slate-700 dark:bg-slate-800">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Code
          </span>
        </div>
        <pre
          className="overflow-x-auto bg-slate-950 p-4 text-sm leading-relaxed text-slate-200 dark:bg-slate-900"
          {...props}
        >
          {children}
        </pre>
      </div>
    );
  },

  // Tables with clean styling and alternating rows
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-slate-200 shadow-sm dark:border-slate-700">
      <table className="w-full border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  ),

  // Table head
  thead: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead
      className="bg-slate-50 dark:bg-slate-800/50"
      {...props}
    >
      {children}
    </thead>
  ),

  // Table body with alternating rows
  tbody: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody
      className="[&>tr:nth-child(even)]:bg-slate-50/50 dark:[&>tr:nth-child(even)]:bg-slate-800/25"
      {...props}
    >
      {children}
    </tbody>
  ),

  // Table rows
  tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className="border-b border-slate-200 transition-colors hover:bg-slate-50/50 dark:border-slate-700 dark:hover:bg-slate-800/50"
      {...props}
    >
      {children}
    </tr>
  ),

  // Table header cells
  th: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="px-4 py-3 text-left font-semibold text-slate-900 dark:text-slate-100 [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    >
      {children}
    </th>
  ),

  // Table data cells
  td: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="px-4 py-3 text-slate-600 dark:text-slate-300 [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    >
      {children}
    </td>
  ),

  // Links with clear hover states
  a: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http");
    return (
      <a
        className="inline-flex items-center gap-0.5 font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary/80 hover:decoration-primary/60"
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
        {isExternal && (
          <ExternalLink className="ml-0.5 h-3 w-3 shrink-0 opacity-70" />
        )}
      </a>
    );
  },

  // Strong/bold text
  strong: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),

  // Emphasized/italic text
  em: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className="italic text-inherit" {...props}>
      {children}
    </em>
  ),

  // Horizontal rule / divider
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr
      className="my-8 border-t border-slate-200 dark:border-slate-700"
      {...props}
    />
  ),

  // Images
  img: ({
    src,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="my-6 rounded-lg border border-slate-200 shadow-sm dark:border-slate-700"
      src={src}
      alt={alt || ""}
      {...props}
    />
  ),
};
