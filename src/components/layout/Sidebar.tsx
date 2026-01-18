"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Rocket,
  Folder,
  FileText,
  HelpCircle,
  BarChart,
  MessageSquare,
  Mail,
  AlertCircle,
  Accessibility,
  ChevronDown,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { navigation } from "@/lib/navigation";
import type { NavItem } from "@/types/content";

// Map icon strings to Lucide components
const iconMap: Record<string, LucideIcon> = {
  rocket: Rocket,
  folder: Folder,
  "file-text": FileText,
  "help-circle": HelpCircle,
  "bar-chart": BarChart,
  "message-square": MessageSquare,
  mail: Mail,
  "alert-circle": AlertCircle,
  accessibility: Accessibility,
};

// Map icon strings to colors for visual distinction
const iconColorMap: Record<string, string> = {
  rocket: "text-blue-500",
  folder: "text-emerald-500",
  "file-text": "text-orange-500",
  "help-circle": "text-purple-500",
  "bar-chart": "text-teal-500",
  "message-square": "text-pink-500",
  mail: "text-amber-500",
  "alert-circle": "text-red-500",
  accessibility: "text-indigo-500",
};

interface NavSectionProps {
  item: NavItem;
  pathname: string;
}

function NavSection({ item, pathname }: NavSectionProps) {
  const Icon = item.icon ? iconMap[item.icon] : null;
  const iconColor = item.icon ? iconColorMap[item.icon] : "";
  const hasChildren = item.children && item.children.length > 0;

  // Check if this section or any of its children is active
  const isActive = pathname === item.href;
  const hasActiveChild = item.children?.some(
    (child) => pathname === child.href || pathname.startsWith(child.href + "/")
  );

  const [isOpen, setIsOpen] = React.useState(hasActiveChild);

  // Auto-expand section if it contains the active page
  React.useEffect(() => {
    if (hasActiveChild) {
      setIsOpen(true);
    }
  }, [hasActiveChild]);

  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        {Icon && <Icon className={cn("h-4 w-4", isActive ? "" : iconColor)} />}
        <span>{item.title}</span>
      </Link>
    );
  }

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all",
          isActive || hasActiveChild
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <span className="flex items-center gap-3">
          {Icon && <Icon className={cn("h-4 w-4", iconColor)} />}
          <span>{item.title}</span>
        </span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {isOpen && (
        <div className="ml-4 space-y-1 border-l border-border/50 pl-4">
          {item.children?.map((child) => {
            const isChildActive =
              pathname === child.href || pathname.startsWith(child.href + "/");
            return (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm transition-all",
                  isChildActive
                    ? "bg-primary text-primary-foreground font-medium shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:translate-x-0.5"
                )}
              >
                {child.title}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="space-y-2 px-4">
      {navigation.map((item) => (
        <NavSection key={item.href} item={item} pathname={pathname} />
      ))}
    </nav>
  );
}

export default Sidebar;
