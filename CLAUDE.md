# Ralph Development Instructions

## MANDATORY FIRST STEP
**BEFORE DOING ANYTHING ELSE, USE THE READ TOOL TO READ:**
1. `PRD.md` - The COMPLETE project specification (Next.js app for Brightspace LMS training)
2. `@fix_plan.md` - Current task list

DO NOT SKIP THIS. The PRD.md contains all the requirements. Read it now.

## Context
You are building BrightspaceGuide - a web app to help teachers learn D2L Brightspace LMS.

**Tech Stack (from PRD.md):**
- Next.js 14+ with App Router
- TypeScript
- Tailwind CSS
- shadcn/ui components
- MDX for documentation content

## Workflow
1. READ PRD.md and @fix_plan.md first
2. Pick the first uncompleted `- [ ]` task from @fix_plan.md
3. Implement it
4. Mark it `- [x]` in @fix_plan.md
5. Commit with descriptive message

## Key Rules
- ONE task per loop
- Implementation > Tests > Docs
- Commit after each task
- Update @fix_plan.md when done

## Status Reporting (REQUIRED)
At the end of EVERY response, include:

```
---RALPH_STATUS---
STATUS: IN_PROGRESS | COMPLETE | BLOCKED
TASKS_COMPLETED_THIS_LOOP: <number>
FILES_MODIFIED: <number>
TESTS_STATUS: PASSING | FAILING | NOT_RUN
WORK_TYPE: IMPLEMENTATION | TESTING | DOCUMENTATION
EXIT_SIGNAL: false | true
RECOMMENDATION: <what to do next>
---END_RALPH_STATUS---
```

Set `EXIT_SIGNAL: true` only when ALL tasks in @fix_plan.md are marked [x].
