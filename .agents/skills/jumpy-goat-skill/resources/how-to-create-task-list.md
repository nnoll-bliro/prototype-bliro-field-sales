---
description: Instructions for generating structured task lists from briefs
globs:
alwaysApply: false
---
# Creating Task Lists

## Purpose

Turn a goal, brief, or brain dump into a clear Markdown task list that can guide execution.

## Defaults

- **Format:** Markdown (`.md`)
- **Location:** `/tasks/todo/` in the project root
- **Filename:** `tasks-[topic].md`
- **Style:** Practical, concise, and outcome-focused

## Process

1. **Understand the goal:** Read the brief or user request and identify the desired outcome.
2. **Load project memory:** Read `glossary.md` if present. Read `tasks/changelog.md` if recent history may affect the plan.
3. **Clarify architecture first:** Before creating the task list, ask exactly 6 short, conversational clarifying questions, one at a time.
   Each question must use the previous answer to reduce implementation-architecture ambiguity and misunderstanding risk.
   Prefer questions that sharpen boundaries, data/control flow, lifecycle, source of truth, integration points, failure modes, and reversibility.
4. **Create the task list:** Use parent tasks and actionable subtasks.
5. **Call out decisions:** Add `Clarify` tasks only where a real decision is needed before execution.
6. **Plan memory updates:** If the work introduces reusable project language or durable decisions, include tasks to update `glossary.md` and/or `tasks/changelog.md`.
7. **Save the file:** Write to `/tasks/todo/tasks-[topic].md`.

## Output Format

```markdown
# [Task List Name]

## Goal

[Desired outcome in 1-3 sentences.]

## Notes

- Key context, constraints, dependencies, or assumptions

## Relevant Files

- `path/to/file` - Why it matters

## Tasks

- [ ] 1.0 Parent task
  - [ ] 1.1 Subtask
  - [ ] 1.2 Subtask
- [ ] 2.0 Parent task
  - [ ] 2.1 **Clarify:** [Decision needed before execution]?
  - [ ] 2.2 Subtask
```

## Optional Sections

Use only when helpful:

- `## Blockers` — unresolved issues preventing progress
- `## Decisions` — important choices made during the work
- `## Deep Dive` — links to durable research, specs, drafts, or analysis
- `## Changelog` — note `tasks/changelog.md` entries to add during execution

If durable artifacts are created, place them in `/deep-dives/[topic]/`. Skip this for normal implementation work where the code or changed files are the artifact.

## Guidelines

- Prefer complete useful plans over ceremony.
- Do not require a separate parent-task approval step unless the plan is high-risk or uncertain.
- Keep subtasks concrete and executable.
- Avoid adding clarification tasks by default; only add them where they reduce real risk.
- Use `glossary.md` for shared language and `tasks/changelog.md` for dated history. If they exist, respect them. If they do not exist, create them only when useful.
