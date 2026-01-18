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
};

interface NavSectionProps {
  item: NavItem;
  pathname: string;
}

function NavSection({ item, pathname }: NavSectionProps) {
  const Icon = item.icon ? iconMap[item.icon] : null;
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
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        {Icon && <Icon className="h-4 w-4" />}
        <span>{item.title}</span>
      </Link>
    );
  }

  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          isActive || hasActiveChild
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <span className="flex items-center gap-3">
          {Icon && <Icon className="h-4 w-4" />}
          <span>{item.title}</span>
        </span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
      {isOpen && (
        <div className="ml-4 space-y-1 border-l pl-4">
          {item.children?.map((child) => {
            const isChildActive =
              pathname === child.href || pathname.startsWith(child.href + "/");
            return (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm transition-colors",
                  isChildActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
