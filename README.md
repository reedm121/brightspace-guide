# BrightspaceGuide

A web application to help teachers learn and master D2L Brightspace LMS. Features step-by-step documentation, instant search, and an AI chat assistant.

## Tech Stack

- **Next.js 14+** with App Router
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** components
- **MDX** for documentation content
- **Zustand** for state management

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── chat/         # AI chat sidebar
│   ├── layout/       # Header, Sidebar, etc.
│   ├── mdx/          # MDX rendering components
│   └── search/       # Search dialog
├── content/          # MDX documentation files
└── lib/              # Utilities and helpers
```

## Features

- **Documentation Browser**: Hierarchical navigation through Brightspace guides
- **Search**: Cmd/Ctrl+K to quickly find guides
- **AI Chat Sidebar**: Ask questions about Brightspace (when configured)
- **Mobile Responsive**: Works on all devices

## License

MIT
