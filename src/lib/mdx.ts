import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Content directory path
const contentDirectory = path.join(process.cwd(), "src/content");

// Interface for frontmatter data
export interface Frontmatter {
  title: string;
  description: string;
  category?: string;
  order?: number;
  tags?: string[];
}

// Interface for a guide with metadata
export interface Guide {
  slug: string[];
  frontmatter: Frontmatter;
  content: string;
}

/**
 * Get all MDX file paths recursively
 */
function getAllMdxFiles(dir: string, basePath: string[] = []): string[][] {
  const paths: string[][] = [];

  if (!fs.existsSync(dir)) {
    return paths;
  }

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively get files from subdirectories
      paths.push(...getAllMdxFiles(filePath, [...basePath, file]));
    } else if (file.endsWith(".mdx")) {
      // Add MDX file path (without extension)
      const slug = file.replace(/\.mdx$/, "");
      paths.push([...basePath, slug]);
    }
  }

  return paths;
}

/**
 * Get all guide slugs for static generation
 */
export function getAllGuideSlugs(): string[][] {
  return getAllMdxFiles(contentDirectory);
}

/**
 * Get a single guide by its slug
 */
export function getGuideBySlug(slug: string[]): Guide | null {
  const filePath = path.join(contentDirectory, ...slug) + ".mdx";

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as Frontmatter,
    content,
  };
}

/**
 * Get all guides with their metadata (for index pages)
 */
export function getAllGuides(): Guide[] {
  const slugs = getAllGuideSlugs();
  const guides: Guide[] = [];

  for (const slug of slugs) {
    const guide = getGuideBySlug(slug);
    if (guide) {
      guides.push(guide);
    }
  }

  // Sort by category and order
  return guides.sort((a, b) => {
    // First by category
    const categoryCompare = (a.frontmatter.category || "").localeCompare(
      b.frontmatter.category || ""
    );
    if (categoryCompare !== 0) return categoryCompare;

    // Then by order
    return (a.frontmatter.order || 0) - (b.frontmatter.order || 0);
  });
}

/**
 * Get guides by category
 */
export function getGuidesByCategory(category: string): Guide[] {
  return getAllGuides().filter(
    (guide) =>
      guide.frontmatter.category?.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Get adjacent guides (previous and next) for navigation
 */
export function getAdjacentGuides(
  currentSlug: string[]
): { prev: Guide | null; next: Guide | null } {
  const allGuides = getAllGuides();
  const currentSlugStr = currentSlug.join("/");
  const currentIndex = allGuides.findIndex(
    (g) => g.slug.join("/") === currentSlugStr
  );

  return {
    prev: currentIndex > 0 ? allGuides[currentIndex - 1] : null,
    next:
      currentIndex < allGuides.length - 1 ? allGuides[currentIndex + 1] : null,
  };
}
