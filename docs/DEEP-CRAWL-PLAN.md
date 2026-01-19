# Brightspace Documentation Deep Crawl Plan

## Scope
- **Pages:** All navigation pages listed in `src/lib/navigation.ts` (64 total).
- **Audience:** Instructor workflows only (exclude student/admin-only details).
- **Size target:** ~600 words per page maximum.

## Goals
1. Ensure each page fully supports the instructor task it covers.
2. Remove redundancy and keep pages concise.
3. Standardize structure for quick scanning and consistent maintenance.

## Navigation Page Inventory (64)

### Getting Started (6)
- [ ] Overview
- [ ] Logging In
- [ ] Interface Tour
- [ ] Course Homepage
- [ ] Navbar & Tools
- [ ] Using the Sandbox

### Content (7)
- [ ] Overview
- [ ] Creating Modules/Units
- [ ] Uploading Files
- [ ] HTML Editor
- [ ] Web Links
- [ ] Manage Files
- [ ] Release Conditions
- [ ] Learning Paths

### Assignments (6)
- [ ] Overview
- [ ] Creating Assignments
- [ ] Submission Settings
- [ ] Special Access
- [ ] Turnitin
- [ ] Grading Submissions

### Quizzes (6)
- [ ] Overview
- [ ] Creating Quizzes
- [ ] Question Types
- [ ] Question Library
- [ ] Quiz Settings
- [ ] Grading Quizzes

### Discussions (5)
- [ ] Overview
- [ ] Forums vs Topics
- [ ] Creating Discussions
- [ ] Moderating
- [ ] Grading Discussions

### Classlist (1)
- [ ] Overview

### Grades (5)
- [ ] Overview
- [ ] Setup Wizard
- [ ] Grade Items
- [ ] Entering Grades
- [ ] Final Grades

### Class Progress (3)
- [ ] Overview
- [ ] Using Class Progress
- [ ] Content Completion

### Course Admin (4)
- [ ] Overview
- [ ] Copying Courses
- [ ] Course Templates
- [ ] Backup & Restore

### Communication (5)
- [ ] Announcements
- [ ] Email
- [ ] Calendar
- [ ] Notifications
- [ ] Intelligent Agents

### Groups (2)
- [ ] Creating Groups
- [ ] Group Assignments

### Rubrics (2)
- [ ] Creating Rubrics
- [ ] Using Rubrics

### Video & Multimedia (3)
- [ ] Recording Video
- [ ] Video Assignments
- [ ] Virtual Classroom

### Integrations (3)
- [ ] External Tools
- [ ] Zoom & Teams
- [ ] Publisher Content

### Accessibility (2)
- [ ] Making Content Accessible
- [ ] Accessibility Checker

### Troubleshooting (4)
- [ ] Common Issues
- [ ] Browser Compatibility
- [ ] Mobile App
- [ ] Video Problems

## Per-Page Checklist (Instructor Focus)
Use this checklist when reviewing each page:

### Required Structure
- **Overview:** 2–4 sentences defining the task and when to use it.
- **Prerequisites (optional):** Only if required for success.
- **Steps:** Numbered steps with concise, action-first wording.
- **Tips / Best Practices:** Optional, 2–5 bullets.
- **Troubleshooting:** Only if common instructor issues exist.
- **Related Pages:** 2–5 relevant links to adjacent workflows.

### Completeness (Instructor-Only)
- Covers core instructor workflow from start to finish.
- Includes key settings/decisions instructors must make.
- Calls out high-impact options (visibility, grading impact, due dates).
- Avoids student-only or admin-only UI steps.

### Conciseness / Bloat Control
- Stay under ~600 words where possible.
- Remove repeated UI navigation (“click here then there”) when obvious.
- Consolidate redundant explanations across pages; reference instead.
- Use short callouts instead of long paragraphs.

### Visuals
- Use screenshots only when they clarify a complex UI choice.
- Prefer 1–2 screenshots per page; none if the text is sufficient.

## Deep Crawl Workflow
1. **Inventory & setup**
   - Create a per-page audit sheet (table) using the inventory list above.
   - Capture current word count and section presence.
2. **Page review pass**
   - Apply the checklist per page.
   - Log gaps, bloat, missing links, or unclear steps.
3. **Consolidate findings**
   - Group issues into **Quick Wins**, **Medium**, **Large** updates.
   - Identify cross-cutting fixes (terminology, structure, repeated sections).
4. **Edit execution**
   - Tackle Quick Wins first for immediate quality gains.
   - Schedule Medium/Large updates by topic area.

## Prioritization Rubric
- **Quick Wins (≤30 min/page):** Typos, missing links, small clarifications.
- **Medium (1–2 hrs/page):** Add missing sections, reorganize steps, tighten text.
- **Large (3+ hrs/page):** Major rework, content gaps that require new screenshots.

## Deliverables
- **Audit sheet** with per-page checklist status and notes.
- **Prioritized edit backlog** grouped by Quick Wins / Medium / Large.
- **Execution order** by topic (highest-impact instructor workflows first).
