import { QdrantClient } from "@qdrant/js-client-rest";
import OpenAI from "openai";

const COLLECTION_NAME = "brightspace_guides";
const EMBEDDING_MODEL = "text-embedding-3-small";
const EMBEDDING_DIMENSIONS = 1536;

// Lazy-initialize clients to avoid build-time errors
let _openai: OpenAI | null = null;
let _qdrant: QdrantClient | null = null;

function getOpenAI(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return _openai;
}

function getQdrant(): QdrantClient {
  if (!_qdrant) {
    const qdrantUrl = process.env.QDRANT_URL || "http://localhost:6333";

    // Parse the URL to handle Railway's HTTPS setup correctly
    const url = new URL(qdrantUrl);
    const isHttps = url.protocol === "https:";

    _qdrant = new QdrantClient({
      host: url.hostname,
      port: isHttps ? 443 : (parseInt(url.port) || 6333),
      https: isHttps,
      apiKey: process.env.QDRANT_API_KEY,
    });
  }
  return _qdrant;
}

export interface DocumentChunk {
  id: string;
  content: string;
  metadata: {
    title: string;
    slug: string;
    category: string;
    section?: string;
    url: string;
    tags?: string[];
  };
}

export interface SearchResult {
  content: string;
  score: number;
  metadata: {
    title: string;
    slug: string;
    category: string;
    section?: string;
    url: string;
  };
}

/**
 * Generate embeddings for text using OpenAI
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await getOpenAI().embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
  });
  return response.data[0].embedding;
}

/**
 * Initialize the Qdrant collection if it doesn't exist
 */
export async function initializeCollection(): Promise<void> {
  try {
    const qdrant = getQdrant();
    const collections = await qdrant.getCollections();
    const exists = collections.collections.some(
      (c) => c.name === COLLECTION_NAME
    );

    if (!exists) {
      await qdrant.createCollection(COLLECTION_NAME, {
        vectors: {
          size: EMBEDDING_DIMENSIONS,
          distance: "Cosine",
        },
      });
      console.log(`Created collection: ${COLLECTION_NAME}`);
    }
  } catch (error) {
    console.error("Error initializing collection:", error);
    throw error;
  }
}

/**
 * Clear/delete the entire collection (for --clear flag)
 */
export async function clearCollection(): Promise<void> {
  try {
    const qdrant = getQdrant();
    const collections = await qdrant.getCollections();
    const exists = collections.collections.some(
      (c) => c.name === COLLECTION_NAME
    );

    if (exists) {
      await qdrant.deleteCollection(COLLECTION_NAME);
      console.log(`Deleted collection: ${COLLECTION_NAME}`);
    }
  } catch (error) {
    console.error("Error clearing collection:", error);
    throw error;
  }
}

/**
 * Generate a unique numeric ID from a string (for Qdrant which requires numeric IDs)
 */
function hashStringToNumber(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * Upsert documents into Qdrant
 */
export async function upsertDocuments(
  documents: DocumentChunk[]
): Promise<void> {
  await initializeCollection();

  // Process embeddings in smaller batches to avoid rate limits
  const embeddingBatchSize = 20;
  const points: Array<{
    id: number;
    vector: number[];
    payload: Record<string, unknown>;
  }> = [];

  for (let i = 0; i < documents.length; i += embeddingBatchSize) {
    const batch = documents.slice(i, i + embeddingBatchSize);
    const batchPoints = await Promise.all(
      batch.map(async (doc) => {
        const embedding = await generateEmbedding(doc.content);
        return {
          id: hashStringToNumber(doc.id),
          vector: embedding,
          payload: {
            content: doc.content,
            title: doc.metadata.title,
            slug: doc.metadata.slug,
            category: doc.metadata.category,
            section: doc.metadata.section || "",
            url: doc.metadata.url,
            tags: doc.metadata.tags || [],
          },
        };
      })
    );
    points.push(...batchPoints);
    console.log(`Generated embeddings: ${Math.min(i + embeddingBatchSize, documents.length)}/${documents.length}`);
  }

  // Upsert in batches of 100
  const qdrant = getQdrant();
  const upsertBatchSize = 100;
  for (let i = 0; i < points.length; i += upsertBatchSize) {
    const batch = points.slice(i, i + upsertBatchSize);
    await qdrant.upsert(COLLECTION_NAME, {
      points: batch,
    });
    console.log(`Upserted batch ${Math.floor(i / upsertBatchSize) + 1}/${Math.ceil(points.length / upsertBatchSize)}`);
  }
}

/**
 * Search for relevant documents
 */
export async function searchDocuments(
  query: string,
  limit: number = 5
): Promise<SearchResult[]> {
  const queryEmbedding = await generateEmbedding(query);

  const results = await getQdrant().search(COLLECTION_NAME, {
    vector: queryEmbedding,
    limit,
    with_payload: true,
  });

  return results.map((result) => ({
    content: (result.payload?.content as string) || "",
    score: result.score,
    metadata: {
      title: (result.payload?.title as string) || "",
      slug: (result.payload?.slug as string) || "",
      category: (result.payload?.category as string) || "",
      section: (result.payload?.section as string) || undefined,
      url: (result.payload?.url as string) || `/docs/${result.payload?.slug || ""}`,
    },
  }));
}

/**
 * Generate a chat response using RAG
 */
export async function generateChatResponse(
  query: string,
  currentPage?: string
): Promise<{ response: string; sources: SearchResult[] }> {
  // Search for relevant documents
  const searchResults = await searchDocuments(query, 5);

  // Build context from search results
  const context = searchResults
    .map(
      (result, i) =>
        `[Source ${i + 1}: ${result.metadata.title}]\n${result.content}`
    )
    .join("\n\n---\n\n");

  // Build the system prompt
  const systemPrompt = `You are a helpful assistant for BrightspaceGuide, a resource for teachers learning the D2L Brightspace LMS.

Your role:
- Answer questions about Brightspace clearly and accurately
- Provide step-by-step instructions when appropriate
- ALWAYS cite your sources using the format "Source: [Guide Title]"
- If you're unsure or the information isn't in the provided context, say "I couldn't find this in our guides" and suggest contacting IT support
- Never make up information - accuracy is critical
- Keep responses concise and actionable

${currentPage ? `The user is currently viewing: ${currentPage}` : ""}

Use the following documentation to answer the question:

${context}`;

  // Generate response using GPT-4
  const completion = await getOpenAI().chat.completions.create({
    model: "gpt-4-turbo-preview",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: query },
    ],
    temperature: 0.3,
    max_tokens: 1000,
  });

  const response = completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response. Please try again.";

  return {
    response,
    sources: searchResults.filter((r) => r.score > 0.7), // Only return high-confidence sources
  };
}

/**
 * Check if Qdrant is accessible
 */
export async function checkQdrantHealth(): Promise<boolean> {
  try {
    await getQdrant().getCollections();
    return true;
  } catch {
    return false;
  }
}
