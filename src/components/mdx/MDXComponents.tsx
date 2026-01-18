"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, Info, Lightbulb, AlertTriangle } from "lucide-react";

interface CalloutProps {
  type?: "info" | "warning" | "tip" | "danger";
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const styles = {
    info: {
      container: "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800",
      icon: <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />,
      title: "text-blue-800 dark:text-blue-200",
    },
    warning: {
      container: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800",
      icon: <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />,
      title: "text-yellow-800 dark:text-yellow-200",
    },
    tip: {
      container: "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
      icon: <Lightbulb className="h-5 w-5 text-green-600 dark:text-green-400" />,
      title: "text-green-800 dark:text-green-200",
    },
    danger: {
      container: "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800",
      icon: <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />,
      title: "text-red-800 dark:text-red-200",
    },
  };

  const style = styles[type];

  return (
    <div className={cn("my-6 rounded-lg border p-4", style.container)}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5">{style.icon}</div>
        <div className="flex-1">
          {title && (
            <p className={cn("mb-2 font-semibold", style.title)}>{title}</p>
          )}
          <div className="text-sm text-muted-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
}

interface StepsProps {
  children: React.ReactNode;
}

export function Steps({ children }: StepsProps) {
  return (
    <div className="steps-container ml-4 border-l-2 border-muted pl-6 [counter-reset:step]">
      {children}
    </div>
  );
}

interface StepProps {
  title: string;
  children: React.ReactNode;
}

export function Step({ title, children }: StepProps) {
  return (
    <div className="step relative pb-8 last:pb-0 [counter-increment:step]">
      <div className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground before:content-[counter(step)]" />
      <h3 className="mb-2 font-semibold">{title}</h3>
      <div className="text-muted-foreground">{children}</div>
    </div>
  );
}

export const mdxComponents = {
  Callout,
  Steps,
  Step,
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="mt-6 scroll-m-20 text-xl font-semibold tracking-tight" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900" {...props}>
      {children}
    </pre>
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right" {...props}>
      {children}
    </td>
  ),
  a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="font-medium text-primary underline underline-offset-4" href={href} {...props}>
      {children}
    </a>
  ),
};
