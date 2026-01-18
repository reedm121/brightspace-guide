import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="rounded-full bg-slate-100 dark:bg-slate-800 p-4 mb-6">
        <FileQuestion className="h-12 w-12 text-slate-400" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Content Coming Soon
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        This guide is currently being written. Check back soon for comprehensive
        documentation on this topic.
      </p>
      <div className="flex gap-3">
        <Button asChild variant="default">
          <Link href="/docs">Browse All Guides</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
