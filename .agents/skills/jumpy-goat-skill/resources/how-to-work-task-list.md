---
description: Guidelines for working through task lists to track progress
globs:
alwaysApply: false
---
# Working Through Task Lists

## Execution Protocol

- Read `glossary.md` if present before changing names, workflows, or user-facing concepts.
- Work on the next logical chunk, usually 1-3 related subtasks.
- Update the task file as work progresses.
- Sharpen fuzzy language as it appears; ask concise questions when naming, boundaries, lifecycle, or source of truth would affect the work.
- Pause before destructive, irreversible, expensive, or ambiguous actions.
- If the user asks for one-at-a-time execution, complete one subtask and wait.
- If the user asks for batch mode, complete a larger related group and summarize before continuing.

## Task Marking

| Marker | Meaning | When to use |
|--------|---------|-------------|
| `[ ]` | Pending | Not started |
| `[x]` | Complete | Fully done |
| `[~]` | Skipped | Not needed; include reason |
| `[/]` | Partial | In progress; note remaining work |

Examples:

```markdown
- [x] 2.1 Write landing page copy
- [~] 2.2 Create video script - Skipped: using existing video instead
- [/] 2.3 Design email sequence (3 of 5 emails done)
```

## Maintenance Rules

1. Mark completed subtasks immediately.
2. Mark a parent `[x]` when all subtasks are `[x]` or `[~]`.
3. Add newly discovered work to the task list.
4. Keep `Relevant Files` current when files are created or modified.
5. Log blockers in `## Blockers` if they prevent progress.
6. Update `glossary.md` when the work introduces or clarifies reusable project language.
7. Update `tasks/changelog.md` with dated summaries for meaningful completed work, important decisions, scope changes, and tradeoffs. If a project explicitly names a different canonical changelog in `AGENTS.md`/the project agent map, use that instead. Do not create duplicate changelogs.

## Blockers

When blocked, record the issue briefly and continue with other unblocked work if possible.

```markdown
## Blockers

- **2026-05-08:** Waiting on API credentials.
```

## Completion

When all parent tasks are complete, ask whether to archive the task list. If confirmed:

1. Add a short completion summary near the top of the file.
2. Update `glossary.md` with any durable language discovered during the work.
3. Update `tasks/changelog.md` with a dated completion summary, unless the project explicitly names a different canonical changelog.
4. Move it from `/tasks/todo/tasks-[topic].md` to `/tasks/done/YYYY-MM-DD_tasks-[topic].md`.
5. Try to create a git commit for the finalized task work when inside a git repo and the user has not opted out. Stage only files you intentionally touched; avoid unrelated pre-existing changes; report clearly if a commit is blocked.
6. Confirm the archive path and commit hash/status.

If a `/deep-dives/[topic]/` folder exists, leave it in place.

## Error Handling

- If archiving fails, keep the original file and report the error.
- If uncertain whether the work is complete, ask the user to verify.
