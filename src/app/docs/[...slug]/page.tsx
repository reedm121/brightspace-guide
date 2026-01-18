import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getGuideBySlug, getAllGuideSlugs, getAdjacentGuides } from "@/lib/mdx";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const { prev, next } = getAdjacentGuides(slug);

  // Format the breadcrumb segments
  const formatSegment = (segment: string) =>
    segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <article className="mdx-content animate-fade-in space-y-8">
      {/* Breadcrumb navigation */}
      <div className="space-y-4">
        <nav
          aria-label="breadcrumb"
          className="flex items-center text-sm text-muted-foreground"
        >
          <Link
            href="/docs"
            className="transition-colors hover:text-foreground"
          >
            Docs
          </Link>
          {slug.map((segment, index) => (
            <span key={segment} className="flex items-center">
              <ChevronRight className="mx-1.5 h-4 w-4 opacity-50" />
              {index < slug.length - 1 ? (
                <Link
                  href={`/docs/${slug.slice(0, index + 1).join("/")}`}
                  className="transition-colors hover:text-foreground"
                >
                  {formatSegment(segment)}
                </Link>
              ) : (
                <span className="font-medium text-foreground">
                  {formatSegment(segment)}
                </span>
              )}
            </span>
          ))}
        </nav>

        {/* Page header */}
        <div className="space-y-2">
          {guide.frontmatter.category && (
            <p className="text-sm font-medium text-primary">
              {guide.frontmatter.category}
            </p>
          )}
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            {guide.frontmatter.title}
          </h1>
          {guide.frontmatter.description && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {guide.frontmatter.description}
            </p>
          )}
        </div>

        {/* Separator after header */}
        <hr className="border-t border-slate-200 dark:border-slate-700" />
      </div>

      {/* MDX Content */}
      <div className="prose-documentation">
        <MDXRemote
          source={guide.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [
                  rehypePrettyCode,
                  {
                    theme: "github-dark",
                    keepBackground: true,
                    defaultLang: "plaintext",
                  },
                ],
              ],
            },
          }}
        />
      </div>

      {/* Tags */}
      {guide.frontmatter.tags && guide.frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200 dark:border-slate-700">
          <span className="text-sm text-muted-foreground">Tags:</span>
          {guide.frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Navigation footer */}
      <div className="flex items-center justify-between gap-4 pt-8 border-t border-slate-200 dark:border-slate-700">
        {prev ? (
          <Button variant="ghost" asChild className="group">
            <Link
              href={`/docs/${prev.slug.join("/")}`}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Previous</p>
                <p className="text-sm font-medium">{prev.frontmatter.title}</p>
              </div>
            </Link>
          </Button>
        ) : (
          <Button variant="ghost" asChild>
            <Link href="/docs" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span>Back to Docs</span>
            </Link>
          </Button>
        )}

        {next && (
          <Button variant="ghost" asChild className="group ml-auto">
            <Link
              href={`/docs/${next.slug.join("/")}`}
              className="flex items-center gap-2"
            >
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Next</p>
                <p className="text-sm font-medium">{next.frontmatter.title}</p>
              </div>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
        )}
      </div>
    </article>
  );
}

// Generate static params for all guides
export function generateStaticParams() {
  const slugs = getAllGuideSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each guide
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: `${guide.frontmatter.title} | BrightspaceGuide`,
    description: guide.frontmatter.description,
  };
}
