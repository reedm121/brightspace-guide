# BrightspaceGuide - Product Requirements Document

## Overview

BrightspaceGuide is a comprehensive web application designed to help teachers learn and master the D2L Brightspace Learning Management System (LMS). Many educators are struggling with the transition to Brightspace, facing a steep learning curve and difficulty finding answers to common questions. This guide aims to be the definitive resource for teachers, providing step-by-step documentation for every important action, instant search capabilities, and an always-available AI chat assistant.

### Problem Statement
- Teachers report significant learning difficulties when transitioning to Brightspace
- Common pain points include: setup complexity, notification management, interface navigation, and integration challenges
- Existing documentation is scattered across university help sites with inconsistent quality
- Teachers need quick, contextual answers while actively working in Brightspace

### Solution
An internal tool providing:
- Comprehensive, accurate guides for every Brightspace feature teachers use
- Fast full-text search across all documentation
- AI-powered chat assistant always visible in sidebar for contextual help
- Simple, functional design that prioritizes readability

---

## Tech Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (clean, accessible, markdown-friendly)
- **Markdown Rendering**: MDX with syntax highlighting
- **Search**: Flexsearch (client-side) or Algolia (if scaling needed)
- **State Management**: React Context + Zustand for chat state

### Backend / API
- **AI Chat**: OpenAI API (GPT-4) or Anthropic Claude API
- **Vector Search** (for AI context): Pinecone or Supabase pgvector
- **Content Storage**: Static MDX files (version controlled)
- **Pre-scraped Knowledge Base**: Curated document of scraped Brightspace guides (primary source for AI)

### Infrastructure
- **Hosting**: Vercel (optimal for Next.js)
- **Analytics**: None required (internal tool)

---

## Features

### Phase 1: Foundation & Research

#### Research Tasks
- [ ] **Deep-dive Brightspace documentation audit**: Catalog all official D2L documentation, university help sites, and video tutorials to ensure we cover everything
- [ ] **Teacher pain point research**: Identify the most common questions and struggles through Reddit, faculty forums, and G2/Capterra reviews
- [ ] **Existing guide analysis**: Review existing Brightspace help resources (Purdue, Carleton, Leiden University guides) for accuracy and gaps
- [ ] **Complete feature inventory**: Create exhaustive list of all Brightspace features teachers interact with - miss nothing
- [ ] **Verify against live Brightspace**: Get access to a Brightspace instance to verify all documentation against actual UI/behavior

#### Core Setup
- [ ] Initialize Next.js project with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Set up MDX processing pipeline
- [ ] Create base layout with sidebar navigation
- [ ] Set up Git repository

### Phase 2: Documentation Engine

#### Search Implementation
- [ ] Implement full-text search indexing for all MDX content
- [ ] Build search UI with keyboard shortcuts (Cmd/Ctrl + K)
- [ ] Add search result highlighting and previews
- [ ] Ensure search finds content even with typos/partial matches

#### Navigation & Structure
- [ ] Build hierarchical sidebar navigation matching Brightspace's actual tool structure
- [ ] Implement breadcrumb navigation
- [ ] Add table of contents for long articles
- [ ] Create "related guides" linking system
- [ ] Add print-friendly view for guides (teachers often print instructions)

### Phase 3: AI Chat Assistant

#### Chat Interface
- [ ] Design persistent sidebar chat panel (collapsible, always accessible)
- [ ] Implement chat message UI with markdown support
- [ ] Add typing indicators and loading states
- [ ] Create conversation history (session-based)
- [ ] Implement "Ask about this page" context awareness

#### AI Backend
- [ ] Set up vector embeddings for all documentation
- [ ] Implement RAG (Retrieval Augmented Generation) pipeline
- [ ] Create prompt engineering for Brightspace-specific responses
- [ ] **Critical**: AI must cite sources and link to relevant guides (no hallucinated answers)
- [ ] AI should say "I don't know" rather than guess when uncertain
- [ ] Implement rate limiting and error handling

#### AI Knowledge Source Hierarchy
The AI chat should search for answers in this order:
1. **Pre-scraped Brightspace guides document** (our curated, verified content - primary source)
2. **Our own MDX guide content** (the guides we've written for this site)
3. **Web search for official Brightspace documentation** (fallback when answer not in local sources)
4. **If still not found**: Clearly state "I couldn't find this in our guides" and suggest the teacher contact IT support

### Phase 4: Content Creation - Core Guides

**Note**: Every guide must be verified against a live Brightspace instance. No guide should be published without confirmation that the steps actually work.

#### Getting Started
- [ ] Brightspace overview and interface tour
- [ ] Logging in and account settings
- [ ] Understanding the Course Homepage
- [ ] Navigating the Navbar and tools
- [ ] Using the Sandbox for practice

#### Course Setup & Content
- [ ] Creating and organizing modules
- [ ] Uploading files (all methods: drag-drop, OneDrive, Google Drive)
- [ ] Using the HTML editor
- [ ] Adding web links and external content
- [ ] Using HTML templates for styling
- [ ] Managing files (Manage Files area)
- [ ] Content visibility and release conditions
- [ ] Creating learning paths with prerequisites

#### Assignments & Dropbox
- [ ] Creating assignment folders (Dropbox)
- [ ] Configuring submission types (file, text, observed)
- [ ] Setting due dates and availability
- [ ] Managing special access for individual students
- [ ] Enabling Turnitin for plagiarism detection
- [ ] Viewing and downloading submissions
- [ ] Annotating submissions in the viewer
- [ ] Providing feedback and grades

#### Quizzes & Assessments
- [ ] Creating quizzes (New Quiz Creation Experience)
- [ ] Question types overview (multiple choice, written, matching, etc.)
- [ ] Building question libraries
- [ ] Quiz settings (time limits, attempts, randomization)
- [ ] Quiz availability and release conditions
- [ ] Quiz Results Display configuration
- [ ] Grading quizzes and viewing attempts
- [ ] Using Quiz Interactives (H5P)

#### Gradebook
- [ ] Using the Setup Wizard
- [ ] Understanding grade calculation methods
- [ ] Creating grade categories
- [ ] Creating grade items
- [ ] Linking assignments/quizzes to grade items
- [ ] Managing ungraded items
- [ ] Entering grades manually
- [ ] Using Quick Eval for efficient grading
- [ ] Exporting grades
- [ ] Final grade calculation and release

#### Rubrics
- [ ] Creating rubrics (holistic vs. analytic)
- [ ] Attaching rubrics to assignments
- [ ] Attaching rubrics to discussions
- [ ] Attaching rubrics to quizzes
- [ ] Grading with rubrics
- [ ] Rubric score transfer to gradebook

#### Discussions
- [ ] Understanding Forums vs. Topics vs. Threads
- [ ] Creating discussion forums
- [ ] Creating discussion topics
- [ ] Group discussions setup
- [ ] Discussion restrictions and availability
- [ ] Moderating discussions (approval required)
- [ ] Grading discussions
- [ ] Discussion analytics

#### Communication
- [ ] Creating and managing announcements
- [ ] Email integration
- [ ] Understanding notification limitations
- [ ] Using Intelligent Agents for automated messages
- [ ] Calendar integration

#### Groups & Sections
- [ ] Creating group categories
- [ ] Setting up groups (manual vs. self-enrollment)
- [ ] Group assignments
- [ ] Group discussions
- [ ] Restricting content by group

#### Class Progress & Analytics
- [ ] Using Class Progress tool
- [ ] Individual student progress tracking
- [ ] Content completion tracking
- [ ] Identifying at-risk students
- [ ] Using Performance+ analytics (if available)

### Phase 5: Content Creation - Advanced Topics

#### Automation & Personalization
- [ ] Release conditions deep-dive
- [ ] Creating custom learning paths
- [ ] Intelligent Agents configuration
- [ ] Automated reminders setup

#### Video & Multimedia
- [ ] Recording video in Brightspace
- [ ] Video assignments
- [ ] Virtual classroom setup
- [ ] Video feedback for students

#### Integrations
- [ ] Google Classroom integration
- [ ] OneDrive/Google Drive connections
- [ ] External Learning Tools (LTI)
- [ ] Publisher content integration (McGraw Hill, Pearson, etc.)
- [ ] Zoom/Teams integration

#### Course Management
- [ ] Copying courses between terms
- [ ] Course templates
- [ ] Bulk course operations
- [ ] Course backup and restore

#### Accessibility
- [ ] Making content accessible (WCAG compliance)
- [ ] Using accessibility checker
- [ ] Alternative text for images
- [ ] Accessible document formatting

#### Troubleshooting
- [ ] Common error messages and solutions
- [ ] Browser compatibility issues
- [ ] Mobile app limitations
- [ ] Video playback problems
- [ ] Turnitin issues
- [ ] When to contact IT support

### Phase 6: Verification & Quality Assurance

#### Content Accuracy Review
- [ ] Have actual teachers test every guide against live Brightspace
- [ ] Document any discrepancies between guide and actual Brightspace behavior
- [ ] Update guides based on tester feedback
- [ ] Cross-reference all guides with official D2L documentation for accuracy
- [ ] Verify all screenshots match current Brightspace UI

#### Usability Testing
- [ ] Test with teachers unfamiliar with Brightspace - can they follow guides successfully?
- [ ] Test search - do teachers find what they're looking for?
- [ ] Test AI chat - are answers accurate and helpful?
- [ ] Add feedback mechanism ("Was this helpful?" / "Report an error")

#### Gap Analysis
- [ ] Identify any Brightspace features not yet documented
- [ ] Review AI chat logs for questions we couldn't answer
- [ ] Add missing guides based on findings

### Phase 7: Ongoing Maintenance

- [ ] **Monitor for Brightspace updates**: D2L regularly updates the UI - guides must stay current
- [ ] Track AI chat questions that couldn't be answered - create new guides for gaps
- [ ] Quarterly accuracy audit: re-verify guides against live Brightspace
- [ ] Process for teachers to report inaccurate/outdated information
- [ ] Version tracking: note which Brightspace version each guide was verified against

---

## Content Structure

### Guide Format Standard
Each guide should follow this template:
```markdown
# [Action Title]

## Overview
Brief description of what this guide covers and when you'd use it.

## Before You Begin
- Prerequisites
- Required permissions
- What you'll need

## Step-by-Step Instructions
1. Numbered steps with screenshots
2. Clear, concise language
3. Tips and warnings in callout boxes

## Common Issues
- Troubleshooting common problems
- Links to related guides

## Related Guides
- Links to related topics

## Video Tutorial (if applicable)
Embedded video walkthrough
```

### Information Architecture
```
/
├── getting-started/
│   ├── brightspace-overview
│   ├── logging-in
│   ├── interface-tour
│   └── using-sandbox
├── course-setup/
│   ├── creating-modules
│   ├── uploading-content
│   ├── release-conditions
│   └── ...
├── assignments/
│   ├── creating-assignments
│   ├── turnitin
│   ├── grading-submissions
│   └── ...
├── quizzes/
├── gradebook/
├── discussions/
├── communication/
├── groups/
├── analytics/
├── integrations/
├── accessibility/
└── troubleshooting/
```

---

## Design Guidelines

### Visual Style
- Simple, readable design - function over form
- Clean white/light gray background
- System fonts for readability
- Lucide icons (matches shadcn/ui)

### UI Principles
- **Readability is paramount** - guides must be easy to scan and follow
- Clear visual hierarchy for steps
- Sticky navigation for long articles
- Always-visible (but collapsible) AI chat sidebar
- Print-friendly (teachers often print guides)

### Accessibility
- Keyboard navigable
- Screen reader friendly
- Sufficient color contrast

---

## AI Chat Specifications

### Knowledge Source Priority
1. **Pre-scraped Brightspace guides document** - Our curated, scraped content from official Brightspace sources. This is the primary and most trusted source.
2. **Site MDX guides** - The guides we've written for this site
3. **Live web search** - Search official D2L/Brightspace documentation online when local sources don't have the answer
4. **Explicit fallback** - If answer still not found, say so clearly and suggest contacting IT

### Behavior
- Always available in collapsible right sidebar
- Persists across page navigation
- Can reference current page content ("How do I do what's described here?")
- Provides step-by-step answers with links to relevant guides
- **Must cite which source the answer came from** (scraped doc, site guide, or web search)
- Admits uncertainty rather than hallucinating
- Suggests related guides after answering

### Context Awareness
- Knows which page user is viewing
- Can access all documentation content via RAG
- Has full access to pre-scraped Brightspace guides document
- Understands Brightspace-specific terminology
- Can clarify ambiguous questions

### Response Format
- Concise, scannable answers
- Bullet points for steps
- Links to full guides for detailed information
- Code/settings in monospace formatting
- Source citation (e.g., "Source: Scraped Brightspace Guide" or "Source: Web search - D2L Community")

---

## Success Metrics

### Primary Goal: Accuracy
- **Zero tolerance for incorrect information** - every guide must work as written
- Teachers can successfully complete tasks by following guides without external help
- AI chat provides correct answers or explicitly says "I don't know"

### Secondary Goals
- Teachers can find relevant guides quickly via search
- Comprehensive coverage - no common Brightspace task left undocumented
- Guides stay up-to-date with Brightspace changes

---

## Constraints

### Technical
- Must work on school networks (no blocked resources)
- Must work on modern browsers (Edge/Chrome/Firefox/Safari)
- Mobile-responsive (teachers may reference on phones/tablets)

### Content Accuracy Requirements
- **Every guide must be tested against live Brightspace before publishing**
- Include Brightspace version number that guide was verified against
- Note when features may differ based on institution settings
- Update or flag guides immediately when Brightspace UI changes
- Regular updates needed when Brightspace releases new features

### Scope
- This is an internal tool, not a public product
- No need for SEO, marketing, or promotional features
- Focus resources on content accuracy, not polish

---

## Future Considerations

### Potential Enhancements (only if needed)
- Institution-specific customization (different schools may have different Brightspace configurations)
- Offline access (PWA) for teachers without reliable internet
- Video tutorials for complex multi-step processes

### Content Expansion (based on teacher needs)
- Student-focused guides (if teachers want to share with students)
- Administrator guides (if admins also need help)
- Coverage of additional integrations as schools adopt them

---

## Research Log: brightspace-guide.md

### Purpose
The AI assistant must maintain a living research document at `brightspace-guide.md` in the project root. This serves as:
- A **running log of all research findings** as we build this project
- A **knowledge dump** of useful Brightspace information discovered during development
- A **progress tracker** showing what we've learned and what gaps remain
- An **eventual source** for the final site content

### What to Add to brightspace-guide.md
Every time the AI researches Brightspace topics, it should add relevant findings to this document:
- Step-by-step instructions discovered from official docs or university guides
- Common pain points and their solutions
- UI descriptions and navigation paths
- Tips and tricks for teachers
- Integration details
- Troubleshooting information
- Screenshots descriptions (note: actual screenshots should be in `/docs/images/`)
- Links to useful external resources with summaries

### Document Structure
```markdown
# Brightspace Guide - Research Log

## Last Updated: [date]

## Table of Contents
[Auto-generated or manually maintained]

## Getting Started
### Logging In
[Research findings...]

### Interface Overview
[Research findings...]

## Course Setup
### Creating Modules
[Research findings...]

[...additional sections matching the PRD structure...]

## Research Notes
### Sources Consulted
[List of URLs and documents reviewed]

### Open Questions
[Things we still need to research]

### Verified Information
[Things we've confirmed against live Brightspace]
```

### Workflow
1. **Before researching**: Check brightspace-guide.md for existing information
2. **While researching**: Add new findings immediately - don't wait
3. **After completing a task**: Update relevant sections with what was learned
4. **When finding gaps**: Add to "Open Questions" section
5. **When verifying**: Move information to "Verified Information" section

### Rules
- **Always append, rarely delete** - keep a record of what we've learned
- **Date important updates** - helps track currency of information
- **Note sources** - where did this information come from?
- **Flag uncertainty** - mark things that need verification with `[UNVERIFIED]`
- **Keep it organized** - follow the section structure matching the PRD

This document will grow throughout development and eventually be transformed into the polished MDX guides for the final site.

---

## Research Resources

### Our Pre-Scraped Content
We have already scraped and curated content from official Brightspace guides into a local document. This serves as:
- The primary knowledge base for the AI chat
- The foundation for writing our own guides
- A verified source of accurate Brightspace information

The AI should always check this document first before searching the web.

**This document is a living resource** - it should be expanded over time:
- Add new content when we find useful Brightspace documentation online
- When the AI finds good answers via web search, add that content to the scraped document for future use
- When teachers ask questions we can't answer, research and add the answers to the document
- Keep the document updated when Brightspace releases new features or UI changes

### Official Sources (for web search fallback)
- [D2L Brightspace Official Site](https://www.d2l.com/brightspace/)
- [D2L Community Knowledge Base](https://community.d2l.com/brightspace/kb/)
- [D2L Blog - Tips and Tricks](https://www.d2l.com/blog/d2l-brightspace-tools-tips-and-tricks/)

### University Help Sites (Quality Examples)
- [Leiden University Brightspace Support](https://universiteitleiden.screenstepslive.com/)
- [Carleton University Brightspace Instructors](https://carleton.ca/brightspace/instructors/)
- [Purdue Brightspace Documentation](https://www.purdue.edu/brightspace/)
- [TU Delft Teaching Support](https://www.tudelft.nl/en/teaching-support/educational-tools/brightspace/)
- [University of Calgary eLearning](https://elearn.ucalgary.ca/)
- [Stony Brook IT Brightspace](https://it.stonybrook.edu/services/brightspace/)

### User Feedback Sources
- [G2 Brightspace Reviews](https://www.g2.com/products/d2l-brightspace/reviews)
- [Capterra Brightspace Reviews](https://www.capterra.com/p/122854/Brightspace/)
- [Gartner Peer Insights](https://www.gartner.com/reviews/market/higher-education-learning-management-systems/vendor/d2l/product/brightspace)

### Common Pain Points Identified
1. Steep learning curve during initial setup
2. Interface can feel cluttered
3. Notification management friction
4. Third-party integration complexity (McGraw Hill, etc.)
5. Mobile toggle menus blocking content
6. Track Changes in Word causing Turnitin issues
7. Video playback/login issues
8. Announcement email notifications not enabled by default for students

---

## Notes

- **Accuracy over everything** - a guide that doesn't work is worse than no guide at all
- Teachers have limited time - guides must be scannable and actionable
- The AI chat must never hallucinate - it should cite sources or admit uncertainty
- Get access to a live Brightspace instance early - essential for verification
- Regular Brightspace updates mean content maintenance is ongoing work
- Different institutions may have different Brightspace configurations - note where settings may vary
