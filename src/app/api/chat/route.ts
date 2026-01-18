import { NextRequest, NextResponse } from "next/server";
import { generateChatResponse, checkQdrantHealth } from "@/lib/rag";

export const runtime = "nodejs";
export const maxDuration = 30;

interface ChatRequest {
  message: string;
  currentPage?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: ChatRequest = await request.json();

    if (!body.message || typeof body.message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Check if required env vars are set
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    if (!process.env.QDRANT_URL) {
      return NextResponse.json(
        { error: "Qdrant URL not configured" },
        { status: 500 }
      );
    }

    // Check Qdrant health
    const isQdrantHealthy = await checkQdrantHealth();
    if (!isQdrantHealthy) {
      return NextResponse.json(
        { error: "Vector database is not available" },
        { status: 503 }
      );
    }

    // Generate response using RAG
    const { response, sources } = await generateChatResponse(
      body.message,
      body.currentPage
    );

    // Format sources for the response (includes url for clickable links)
    const formattedSources = sources.map((source) => ({
      title: source.metadata.title,
      slug: source.metadata.slug,
      section: source.metadata.section,
      url: source.metadata.url,
      score: source.score,
    }));

    return NextResponse.json({
      message: response,
      sources: formattedSources,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    // Handle specific errors
    if (error instanceof Error) {
      if (error.message.includes("rate limit")) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  const isQdrantHealthy = await checkQdrantHealth();

  return NextResponse.json({
    status: isQdrantHealthy ? "healthy" : "degraded",
    services: {
      qdrant: isQdrantHealthy,
      openai: !!process.env.OPENAI_API_KEY,
    },
  });
}
