---
name: jumpy-goat-skill
description: Create and work through structured task lists, review Git commits into actionable follow-up lists, and maintain project changelogs. Use for planning, todos, commit reviews, incremental execution, and task completion.
---

## Overview

A lightweight productivity system for turning goals into actionable task lists, executing them incrementally, and preserving project language/decisions in reusable docs.

## Voice

Be concise, direct, and action-oriented. Treat the user as the orchestrator. Ask when blocked or when assumptions could cause rework. Prefer doing over explaining.

## When to Use

- User wants to plan a project or goal
- User has a brief/objective to break into tasks
- User wants to work through an existing task list
- User wants to review a Git commit and capture important follow-up work
- User wants the agent to ask better planning questions before implementation
- User wants to capture or refine shared project language, glossary terms, or task history
- User mentions "task list", "todo", "glossary", "changelog", or working incrementally

## Resources

- `resources/how-to-create-task-list.md` - Instructions for generating task lists from goals or brief
- `resources/how-to-work-task-list.md` - Protocol for executing tasks one at a time
- `resources/how-to-review-commit.md` - Review a Git commit and create a follow-up task list when warranted
- `resources/how-to-maintain-project-memory.md` - Protocol for maintaining `glossary.md` and `tasks/changelog.md`

## Quick Reference

**Creating:** Read `glossary.md` if present, then ask the 6-question sequential clarification flow from `resources/how-to-create-task-list.md` before creating a practical task list in `/tasks/todo/`.

**Executing:** Work in small logical chunks, update task status, sharpen unclear language, and pause before risky or ambiguous actions.

**Commit review:** Inspect `HEAD` or a requested commit using `resources/how-to-review-commit.md`. Create a focused follow-up list only for findings important enough to track; skip the normal six-question planning flow unless blocked.

**Project memory:** Maintain `glossary.md` for shared language and `tasks/changelog.md` for dated task/decision history. Create them when useful and absent.

**Completion:** When done, update `tasks/changelog.md` with a dated summary and archive to `/tasks/done/` with a date prefix.
