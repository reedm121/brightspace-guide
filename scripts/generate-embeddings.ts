/**
 * Script to generate embeddings for all MDX content and upload to Qdrant
 *
 * Usage: npx tsx scripts/generate-embeddings.ts [--clear] [--dry-run] [--force]
 *
 * Options:
 *   --clear    Delete existing collection before indexing
 *   --dry-run  Parse and chunk content without uploading
 *   --force    Reindex all files even if unchanged
 *
 * Required environment variables:
 * - OPENAI_API_KEY: Your OpenAI API key
 * - QDRANT_URL: Your Qdrant instance URL (e.g., https://your-qdrant.railway.app)
 * - QDRANT_API_KEY: Your Qdrant API key (optional for local dev)
 */

import { config } from "dotenv";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Load .env.local
config({ path: ".env.local" });
import { upsertDocuments, DocumentChunk, initializeCollection, clearCollection } from "../src/lib/rag";

const contentDirectory = path.join(process.cwd(), "src/content");

interface Frontmatter {
  title: string;
  description: string;
  category?: string;
  tags?: string[];
}

/**
 * Generate a URL-friendly anchor from a section heading
 */
function generateAnchor(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/^#+\s*/, "") // Remove markdown heading prefix
    .replace(/[^\w\s-]/g, "") // Remove special chars
    .replace(/\s+/g, "-") // Spaces to hyphens
    .replace(/-+/g, "-") // Collapse multiple hyphens
    .replace(/^-|-$/g, ""); // Trim hyphens from ends
}

/**
 * Generate a full URL with optional anchor for a document section
 */
function generateUrl(slug: string, sectionHeading?: string): string {
  const basePath = `/docs/${slug}`;
  if (!sectionHeading) return basePath;

  const anchor = generateAnchor(sectionHeading);
  return anchor ? `${basePath}#${anchor}` : basePath;
}

/**
 * Strip MDX components to plain text for better embeddings
 * Keeps the content readable but removes JSX syntax
 */
function stripMdxComponents(content: string): string {
  return content
    // Remove import statements
    .replace(/^import\s+.*$/gm, "")
    // Convert <Callout> to blockquote-style text
    .replace(/<Callout[^>]*title="([^"]*)"[^>]*>([\s\S]*?)<\/Callout>/g, "> **$1**: $2")
    .replace(/<Callout[^>]*>([\s\S]*?)<\/Callout>/g, "> $1")
    // Convert <Steps> and <Step> to numbered format
    .replace(/<Steps>/g, "")
    .replace(/<\/Steps>/g, "")
    .replace(/<Step\s+title="([^"]*)"[^>]*>/g, "\n**Step: $1**\n")
    .replace(/<\/Step>/g, "\n")
    // Remove other self-closing components
    .replace(/<[A-Z][a-zA-Z]*\s*\/>/g, "")
    // Remove other component tags but keep content
    .replace(/<\/?[A-Z][a-zA-Z]*[^>]*>/g, "")
    // Clean up extra whitespace
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Split content into chunks for better retrieval
 * We split by sections (## headings) to keep related content together
 */
function splitIntoChunks(
  content: string,
  frontmatter: Frontmatter,
  slug: string
): DocumentChunk[] {
  const chunks: DocumentChunk[] = [];
  const category = frontmatter.category || slug.split("/")[0] || "general";

  // Strip MDX components for cleaner text
  const cleanContent = stripMdxComponents(content);

  // Split by ## headings (keep the heading with its content)
  const sections = cleanContent.split(/(?=^## )/m);

  for (const section of sections) {
    const trimmed = section.trim();
    if (!trimmed || trimmed.length < 50) continue; // Skip very short sections

    // Extract section title if it starts with ##
    const sectionMatch = trimmed.match(/^## (.+)/);
    const sectionTitle = sectionMatch ? sectionMatch[1].trim() : undefined;

    // Create a chunk with document context prepended
    const chunkContent = `# ${frontmatter.title}\n\n${trimmed}`;

    // Generate URL with anchor for this section
    const url = generateUrl(slug, sectionTitle);

    chunks.push({
      id: `${slug}-${chunks.length}`,
      content: chunkContent,
      metadata: {
        title: frontmatter.title,
        slug,
        category,
        section: sectionTitle,
        url,
        tags: frontmatter.tags || [],
      },
    });
  }

  // If no sections were created (short document), create one chunk for the whole doc
  if (chunks.length === 0 && cleanContent.trim().length > 0) {
    chunks.push({
      id: `${slug}-0`,
      content: `# ${frontmatter.title}\n\n${frontmatter.description}\n\n${cleanContent}`,
      metadata: {
        title: frontmatter.title,
        slug,
        category,
        url: generateUrl(slug),
        tags: frontmatter.tags || [],
      },
    });
  }

  return chunks;
}

/**
 * Recursively get all MDX files with their modification times
 */
interface FileInfo {
  slugParts: string[];
  filePath: string;
  mtime: Date;
}

function getAllMdxFiles(dir: string, basePath: string[] = []): FileInfo[] {
  const files: FileInfo[] = [];

  if (!fs.existsSync(dir)) {
    return files;
  }

  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const filePath = path.join(dir, entry);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      files.push(...getAllMdxFiles(filePath, [...basePath, entry]));
    } else if (entry.endsWith(".mdx")) {
      const slug = entry.replace(/\.mdx$/, "");
      files.push({
        slugParts: [...basePath, slug],
        filePath,
        mtime: stat.mtime,
      });
    }
  }

  return files;
}

/**
 * Tracking file to remember what we've indexed
 */
const TRACKING_FILE = path.join(process.cwd(), ".embedding-index.json");

interface IndexedDoc {
  slug: string;
  mtime: string; // ISO date string
  chunkCount: number;
}

interface TrackingData {
  lastRun: string;
  documents: IndexedDoc[];
}

function loadTrackingData(): TrackingData {
  try {
    if (fs.existsSync(TRACKING_FILE)) {
      return JSON.parse(fs.readFileSync(TRACKING_FILE, "utf8"));
    }
  } catch {
    console.log("⚠️  Could not load tracking file, starting fresh");
  }
  return { lastRun: "", documents: [] };
}

function saveTrackingData(data: TrackingData): void {
  fs.writeFileSync(TRACKING_FILE, JSON.stringify(data, null, 2));
}

/**
 * Parse command line arguments
 */
function parseArgs(): { clear: boolean; dryRun: boolean; force: boolean } {
  const args = process.argv.slice(2);
  return {
    clear: args.includes("--clear"),
    dryRun: args.includes("--dry-run"),
    force: args.includes("--force"),
  };
}

async function main() {
  const { clear, dryRun, force } = parseArgs();

  console.log("🚀 Starting embedding generation...\n");

  if (dryRun) {
    console.log("📋 DRY RUN MODE - No changes will be made\n");
  }

  // Check for required env vars (skip for dry run)
  if (!dryRun) {
    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ OPENAI_API_KEY is required");
      process.exit(1);
    }

    if (!process.env.QDRANT_URL) {
      console.error("❌ QDRANT_URL is required");
      process.exit(1);
    }
  }

  // Load tracking data to see what's already indexed
  const tracking = loadTrackingData();
  const indexedMap = new Map(tracking.documents.map((d) => [d.slug, d]));

  // Handle --clear flag
  if (clear && !dryRun) {
    console.log("🗑️  Clearing existing collection...");
    await clearCollection();
    indexedMap.clear();
    tracking.documents = [];
  }

  // Initialize collection
  if (!dryRun) {
    console.log("📦 Initializing Qdrant collection...");
    await initializeCollection();
  }

  // Get all MDX files
  const allFiles = getAllMdxFiles(contentDirectory);
  console.log(`📄 Found ${allFiles.length} MDX files\n`);

  // Determine which files need indexing
  const filesToIndex: FileInfo[] = [];
  const unchangedFiles: string[] = [];

  for (const file of allFiles) {
    const slug = file.slugParts.join("/");
    const indexed = indexedMap.get(slug);

    if (force || !indexed) {
      // Not indexed yet, or force reindex
      filesToIndex.push(file);
    } else {
      // Check if file was modified since last index
      const indexedMtime = new Date(indexed.mtime);
      if (file.mtime > indexedMtime) {
        filesToIndex.push(file);
        console.log(`  📝 ${slug} - modified since last index`);
      } else {
        unchangedFiles.push(slug);
      }
    }
  }

  if (unchangedFiles.length > 0) {
    console.log(`⏭️  Skipping ${unchangedFiles.length} unchanged files`);
  }

  if (filesToIndex.length === 0) {
    console.log("\n✅ All documents are up to date! Nothing to index.");
    return;
  }

  console.log(`\n📝 Processing ${filesToIndex.length} files...\n`);

  const allChunks: DocumentChunk[] = [];
  const newTracking: IndexedDoc[] = [];

  // Process each file that needs indexing
  for (const file of filesToIndex) {
    const slug = file.slugParts.join("/");
    console.log(`Processing: ${slug}`);

    const fileContents = fs.readFileSync(file.filePath, "utf8");
    const { data, content } = matter(fileContents);
    const frontmatter = data as Frontmatter;

    const chunks = splitIntoChunks(content, frontmatter, slug);
    allChunks.push(...chunks);

    console.log(`  → Created ${chunks.length} chunks`);

    // Track this document
    newTracking.push({
      slug,
      mtime: file.mtime.toISOString(),
      chunkCount: chunks.length,
    });
  }

  console.log(`\n📊 Total new chunks: ${allChunks.length}`);

  if (dryRun) {
    console.log("\n📋 DRY RUN - would have indexed the following:");
    for (const chunk of allChunks.slice(0, 3)) {
      console.log(`\n--- Chunk: ${chunk.id} ---`);
      console.log(`Title: ${chunk.metadata.title}`);
      console.log(`Section: ${chunk.metadata.section || "(none)"}`);
      console.log(`URL: ${chunk.metadata.url}`);
      console.log(`Content preview: ${chunk.content.slice(0, 200)}...`);
    }
    if (allChunks.length > 3) {
      console.log(`\n... and ${allChunks.length - 3} more chunks`);
    }
    return;
  }

  console.log("\n🔄 Generating embeddings and uploading to Qdrant...\n");

  // Upsert all documents
  await upsertDocuments(allChunks);

  // Update tracking data
  // Merge new tracking with existing (for unchanged files)
  const finalDocuments: IndexedDoc[] = [];
  const newSlugs = new Set(newTracking.map((d) => d.slug));

  // Keep unchanged files in tracking
  for (const doc of tracking.documents) {
    if (!newSlugs.has(doc.slug)) {
      finalDocuments.push(doc);
    }
  }
  // Add newly indexed files
  finalDocuments.push(...newTracking);

  // Sort for consistent output
  finalDocuments.sort((a, b) => a.slug.localeCompare(b.slug));

  saveTrackingData({
    lastRun: new Date().toISOString(),
    documents: finalDocuments,
  });

  console.log("\n✅ Embedding generation complete!");
  console.log(`📊 Indexed: ${filesToIndex.length} files, ${allChunks.length} chunks`);
  console.log(`📁 Tracking saved to ${TRACKING_FILE}`);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});
