# Embedding & Indexing Plan for RAG

## Overview

This document outlines how we'll chunk, embed, and store the Brightspace guide content in Qdrant for retrieval-augmented generation (RAG).

---

## Content Sources

We have **two types of content** to index:

| Source | Location | Count | Description |
|--------|----------|-------|-------------|
| MDX Guides | `src/content/**/*.mdx` | ~24 files | Structured how-to guides with frontmatter |
| Research Doc | `brightspace-guide.md` | 1 file | Research log (mostly placeholders currently) |

---

## Qdrant Collection Schema

**Collection Name:** `brightspace_guides`

### Point Structure

Each point (vector) in Qdrant will have:

```typescript
{
  id: number,                    // Auto-incremented unique ID
  vector: number[],              // 1536-dim embedding (text-embedding-3-small)
  payload: {
    // Content
    content: string,             // The actual chunk text (for retrieval display)

    // Source identification
    source_type: "mdx_guide" | "research_doc",
    file_path: string,           // e.g., "src/content/assignments/creating-assignments.mdx"

    // Document metadata (from frontmatter)
    title: string,               // e.g., "Creating Assignment Folders"
    description: string,         // e.g., "Set up assignment submission folders..."
    category: string,            // e.g., "Assignments"
    slug: string,                // e.g., "assignments/creating-assignments"
    tags: string[],              // e.g., ["assignments", "dropbox", "submissions"]

    // Chunk metadata
    section_heading: string,     // e.g., "## Setting Due Dates and Availability"
    chunk_index: number,         // Position within the document (0, 1, 2...)
    chunk_type: "overview" | "steps" | "callout" | "table" | "general",

    // For linking back
    url: string,                 // e.g., "/docs/assignments/creating-assignments"
  }
}
```

---

## Chunking Strategy

### Why Chunking Matters

- **Too small**: Loses context, retrieves fragments that don't make sense
- **Too large**: Dilutes relevance, wastes tokens, hits embedding limits
- **Goal**: Semantic units that can stand alone and answer a question

### Chunk Size Target

| Metric | Value |
|--------|-------|
| Target chunk size | 500-800 tokens (~2000-3200 chars) |
| Maximum chunk size | 1000 tokens (~4000 chars) |
| Minimum chunk size | 100 tokens (~400 chars) |
| Overlap between chunks | 50-100 tokens (for context continuity) |

### Chunking Rules

#### 1. **Section-Based Splitting (Primary)**

Split on markdown headers (`##`, `###`) to preserve semantic boundaries:

```
# Creating Assignment Folders    → Don't split on H1 (title)
## Overview                      → CHUNK 1: Overview section
## Before You Begin              → CHUNK 2: Prerequisites
## Creating a New Assignment     → CHUNK 3: Main steps
### File Submission              → Include with parent or separate if long
## Common Issues                 → CHUNK N: Troubleshooting
```

#### 2. **Component-Aware Splitting**

Recognize and preserve MDX components:

| Component | Handling |
|-----------|----------|
| `<Steps>...</Steps>` | Keep together if <800 tokens, split by `<Step>` if longer |
| `<Callout>...</Callout>` | Keep with surrounding context, never split mid-callout |
| Tables | Keep entire table together |
| Code blocks | Keep entire block together |
| Lists | Try to keep together; split at list item boundaries if needed |

#### 3. **Overlap Strategy**

Add the last ~100 tokens of the previous chunk to the start of the next chunk:

```
CHUNK 1: "## Overview\n\nAssignment folders allow you to collect student work..."
CHUNK 2: "...collect student work and provide feedback.\n\n## Before You Begin\n\n- Ensure you have..."
```

This helps the LLM understand context when a chunk is retrieved.

---

## Chunk Types

Classify each chunk to help with retrieval and response formatting:

| Type | Description | Example |
|------|-------------|---------|
| `overview` | Introduction/summary of a topic | "What is Brightspace?" section |
| `steps` | Step-by-step instructions | `<Steps>` component content |
| `callout` | Tips, warnings, important notes | `<Callout>` content |
| `table` | Comparison or reference tables | Settings comparison table |
| `general` | General explanatory content | Body paragraphs |

---

## Processing Pipeline

### Step 1: Parse MDX Files

```typescript
interface ParsedDocument {
  filePath: string;
  frontmatter: {
    title: string;
    description: string;
    category: string;
    order: number;
    tags: string[];
  };
  content: string;        // Raw MDX content
  sections: Section[];    // Parsed sections
}

interface Section {
  heading: string;        // "## Creating a New Assignment"
  level: number;          // 2 for ##, 3 for ###
  content: string;        // Content under this heading
  components: Component[]; // Detected MDX components
}
```

### Step 2: Chunk Content

```typescript
interface Chunk {
  content: string;
  metadata: {
    source_type: "mdx_guide" | "research_doc";
    file_path: string;
    title: string;
    description: string;
    category: string;
    slug: string;
    tags: string[];
    section_heading: string;
    chunk_index: number;
    chunk_type: ChunkType;
    url: string;
  };
}
```

### Step 3: Generate Embeddings

- Use OpenAI `text-embedding-3-small` (1536 dimensions)
- Batch requests (max 100 texts per API call)
- Rate limit: ~3000 requests/min

### Step 4: Upsert to Qdrant

- Batch upserts of 100 points at a time
- Use incremental IDs (or hash-based UUIDs for idempotency)

---

## Example Chunks

### Example 1: Overview Chunk

```json
{
  "id": 1,
  "vector": [0.023, -0.041, ...],
  "payload": {
    "content": "## Overview\n\nAssignment folders (historically called \"Dropbox\" in Brightspace) allow you to collect student work, provide feedback, and assign grades all in one place. This guide covers everything you need to know about creating and configuring assignment submission folders.\n\n> **Note:** You may see both terms used interchangeably. \"Dropbox\" was the original name for the assignment submission tool in Brightspace. D2L has since renamed it to \"Assignments,\" but many institutions and documentation still reference the Dropbox name. They are the same feature.",
    "source_type": "mdx_guide",
    "file_path": "src/content/assignments/creating-assignments.mdx",
    "title": "Creating Assignment Folders",
    "description": "Set up assignment submission folders (Dropbox) in Brightspace",
    "category": "Assignments",
    "slug": "assignments/creating-assignments",
    "tags": ["assignments", "dropbox", "submissions", "folders"],
    "section_heading": "Overview",
    "chunk_index": 0,
    "chunk_type": "overview",
    "url": "/docs/assignments/creating-assignments"
  }
}
```

### Example 2: Steps Chunk

```json
{
  "id": 5,
  "vector": [0.018, -0.033, ...],
  "payload": {
    "content": "## Creating a New Assignment Folder\n\n1. From your course navbar, click **Assessments** and select **Assignments** from the dropdown menu. This opens the Assignments tool where you can manage all submission folders.\n\n2. Click the **New Assignment** button at the top of the page. You will be taken to the assignment creation screen with several configuration options.\n\n3. Enter Basic Information:\n   - **Name**: Enter a clear, descriptive title for the assignment\n   - **Grade Out Of**: Set the maximum points (leave blank for ungraded)\n   - **Instructions**: Use the HTML editor to provide detailed submission instructions\n\n4. Add Attachments (Optional): Click **Add a File** to attach rubrics, templates, or supplementary materials.\n\n5. Configure Settings: Expand the various settings panels to configure submission type, availability dates, and other options.\n\n6. Set Visibility: Toggle the **Visibility** switch to make the assignment visible to students.\n\n7. Click **Save and Close** to create the assignment.",
    "source_type": "mdx_guide",
    "file_path": "src/content/assignments/creating-assignments.mdx",
    "title": "Creating Assignment Folders",
    "description": "Set up assignment submission folders (Dropbox) in Brightspace",
    "category": "Assignments",
    "slug": "assignments/creating-assignments",
    "tags": ["assignments", "dropbox", "submissions", "folders"],
    "section_heading": "Creating a New Assignment Folder",
    "chunk_index": 2,
    "chunk_type": "steps",
    "url": "/docs/assignments/creating-assignments#creating-a-new-assignment-folder"
  }
}
```

---

## Retrieval Strategy

When a user asks a question:

1. **Embed the query** using same model (`text-embedding-3-small`)
2. **Search Qdrant** with cosine similarity, retrieve top 5-8 chunks
3. **Filter by score** (threshold: 0.7) to avoid irrelevant results
4. **Deduplicate** by document (don't return 5 chunks from same doc)
5. **Build context** for LLM with source citations

### Search Enhancements (Future)

- **Hybrid search**: Combine vector + keyword (BM25) for better recall
- **Metadata filtering**: Filter by category when context is clear
- **Reranking**: Use a cross-encoder to rerank top results

---

## Indexing Script Requirements

The script (`scripts/index-content.ts`) should:

1. **Read all MDX files** from `src/content/`
2. **Parse frontmatter** using `gray-matter`
3. **Split into chunks** following the rules above
4. **Strip MDX components** to plain text for embedding (but keep structure for display)
5. **Generate embeddings** via OpenAI API
6. **Upsert to Qdrant** with full payload
7. **Report progress** and any errors
8. **Be idempotent** - can re-run without duplicating data

### CLI Usage

```bash
# Index all content
npx tsx scripts/index-content.ts

# Index specific category
npx tsx scripts/index-content.ts --category assignments

# Dry run (no API calls)
npx tsx scripts/index-content.ts --dry-run

# Clear and reindex
npx tsx scripts/index-content.ts --clear
```

---

## Estimated Numbers

| Metric | Estimate |
|--------|----------|
| Total MDX files | 24 |
| Avg sections per file | 6-8 |
| Estimated total chunks | 150-200 |
| Embedding cost | ~$0.02 (text-embedding-3-small: $0.02/1M tokens) |
| Qdrant storage | <10MB |

---

## Clickable Source Links

### How It Works

When the AI returns sources, each source includes:
- `title`: Display name (e.g., "Creating Assignment Folders")
- `slug`: Route path (e.g., "assignments/creating-assignments")
- `section`: Section heading anchor (e.g., "setting-due-dates")
- `url`: Full clickable URL (e.g., "/docs/assignments/creating-assignments#setting-due-dates")

### URL Generation

Each chunk stores a pre-computed `url` with anchor:

```typescript
// During indexing, generate URL with anchor from section heading
function generateUrl(slug: string, sectionHeading: string): string {
  const anchor = sectionHeading
    .toLowerCase()
    .replace(/^#+\s*/, '')           // Remove markdown heading prefix
    .replace(/[^\w\s-]/g, '')        // Remove special chars
    .replace(/\s+/g, '-');           // Spaces to hyphens

  return `/docs/${slug}#${anchor}`;
}

// Example:
// slug: "assignments/creating-assignments"
// sectionHeading: "## Setting Due Dates and Availability"
// → url: "/docs/assignments/creating-assignments#setting-due-dates-and-availability"
```

### Chat UI Updates

Sources become clickable Next.js Links:

```tsx
// ChatMessageItem sources rendering
{sources.map((source) => (
  <Link
    key={source.url}
    href={source.url}
    className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-medium hover:bg-primary/20 transition-colors"
  >
    <FileText className="size-3" />
    {source.title}
    {source.section && (
      <span className="text-primary/70">→ {source.section}</span>
    )}
  </Link>
))}
```

### Chat State Persistence

Since `useChatStore` uses Zustand (client-side state), the chat persists across navigation:
- User clicks source link → navigates to doc with anchor
- Chat sidebar stays open with full conversation history
- Page scrolls to the relevant section

---

## Next Steps

1. [ ] Create `scripts/index-content.ts` with chunking logic
2. [ ] Add MDX parsing utilities
3. [ ] Test chunking on sample files
4. [ ] Run full indexing
5. [ ] Update ChatMessage type to include structured sources
6. [ ] Update ChatSidebar to render clickable source links
7. [ ] Test RAG responses with navigation
