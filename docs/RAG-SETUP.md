# RAG Setup Guide

This guide explains how to set up the AI chat assistant with Qdrant on Railway.

## Architecture

```
User Query → Chat API → OpenAI Embeddings → Qdrant Search → Context Retrieval → GPT-4 Response
```

## Prerequisites

- Railway account (https://railway.app)
- OpenAI API key (https://platform.openai.com/api-keys)

## Step 1: Deploy Qdrant on Railway

1. Go to Railway Dashboard
2. Click "New Project" → "Deploy a Template"
3. Search for "Qdrant" and select it
4. Click "Deploy"
5. Wait for deployment to complete

### Configure Qdrant

1. In Railway, click on your Qdrant service
2. Go to "Variables" tab
3. Add an API key for security:
   - `QDRANT__SERVICE__API_KEY` = `your-secure-api-key` (generate a random string)
4. Go to "Settings" → "Networking"
5. Click "Generate Domain" to get a public URL
6. Note your URL (e.g., `https://qdrant-production-xxxx.up.railway.app`)

## Step 2: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# OpenAI API Key
OPENAI_API_KEY=sk-your-openai-api-key

# Qdrant Configuration
QDRANT_URL=https://qdrant-production-xxxx.up.railway.app
QDRANT_API_KEY=your-secure-api-key
```

## Step 3: Generate Embeddings

Run the embedding script to index all MDX content:

```bash
npm run embeddings
```

This will:
1. Read all MDX files from `src/content/`
2. Split them into chunks (by sections)
3. Generate embeddings using OpenAI's `text-embedding-3-small`
4. Upload to Qdrant

**Note**: Run this script whenever you add or update content.

## Step 4: Deploy the App

### On Railway

1. Connect your GitHub repo to Railway
2. Add environment variables:
   - `OPENAI_API_KEY`
   - `QDRANT_URL`
   - `QDRANT_API_KEY`
3. Deploy

### On Vercel

1. Import your GitHub repo
2. Add the same environment variables
3. Deploy

## Testing

1. Start the dev server: `npm run dev`
2. Open the chat sidebar
3. Ask a question about Brightspace

## API Endpoints

### POST /api/chat

Send a chat message:

```json
{
  "message": "How do I create an assignment?",
  "currentPage": "getting-started/overview" // optional
}
```

Response:

```json
{
  "message": "To create an assignment in Brightspace...",
  "sources": [
    {
      "title": "Creating Assignments",
      "slug": "assignments/creating-assignments",
      "score": 0.85
    }
  ]
}
```

### GET /api/chat

Health check endpoint:

```json
{
  "status": "healthy",
  "services": {
    "qdrant": true,
    "openai": true
  }
}
```

## Troubleshooting

### "Vector database is not available"

- Check if Qdrant is running on Railway
- Verify `QDRANT_URL` is correct
- Ensure `QDRANT_API_KEY` matches the one set in Railway

### "OpenAI API key not configured"

- Check that `OPENAI_API_KEY` is set
- Verify the key is valid at https://platform.openai.com

### Empty or irrelevant responses

- Run `npm run embeddings` to re-index content
- Check that the collection has data in Qdrant dashboard
- Increase the `limit` in `searchDocuments()` if needed

## Cost Estimates

### Railway (Qdrant)
- Free tier: 500MB RAM, 1GB disk
- Hobby: ~$5/month for small workloads

### OpenAI
- Embeddings: ~$0.02 per 1M tokens (very cheap)
- GPT-4 Turbo: ~$0.01 per 1K input tokens, $0.03 per 1K output tokens
- Expected cost: $5-20/month depending on usage

## Updating Content

When you add or modify MDX files:

1. Update the MDX content
2. Run `npm run embeddings`
3. The new content will be available in chat

For production, consider automating this in your CI/CD pipeline.
