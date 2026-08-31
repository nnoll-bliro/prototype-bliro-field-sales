---
description: Review a Git commit and create an actionable follow-up task list when warranted
alwaysApply: false
---
# Reviewing a Commit

## Purpose

Review `HEAD` or a requested commit, report important improvement opportunities, and capture warranted follow-up work in the project's normal task-list format.

This is an evidence-based review, not a general planning interview. Do not ask the normal six clarification questions from the task-creation workflow unless a real ambiguity blocks the review.

## Argument Handling

When the request includes arguments:

1. Treat the first argument as a commit only when it is non-empty and `git rev-parse --verify "<argument>^{commit}"` succeeds.
2. If it resolves, review that commit and treat the remaining arguments as additional focus or instructions.
3. Otherwise, review `HEAD` and treat all arguments as additional focus or instructions.

This preserves requests such as `focus on documentation` without requiring a commit hash.

## Review Process

1. Read the repository's agent instructions and relevant co-located documentation.
2. Resolve the selected commit and record its subject and short hash.
3. Inspect the commit with `git show`, its diff and file list, and targeted reads of surrounding code or documentation. Handle an initial/root commit without assuming a parent exists.
4. Review only the selected commit's changes, while reading enough surrounding context to validate each finding.
5. Report concrete findings with file/line evidence, impact, and a practical suggestion.
6. Create a follow-up task list only when one or more findings are important enough to track.
7. Do not modify implementation code as part of the review.

## Findings Worth Tracking

- Security issues
- Missing or misleading documentation
- Bloat: unnecessary lines of code, duplicated logic, avoidable abstractions, or complexity
- Clear opportunities to reduce code or simplify control/data flow

Do not create tasks solely for:

- Missing tests
- Untreated edge cases

A test or edge-case concern may support a task when it provides evidence for a more important security, documentation, or complexity finding.

## Follow-up Task List

When warranted:

- Follow the format in `how-to-create-task-list.md`.
- Save it under `/tasks/todo/`, unless project instructions define another canonical location.
- Name it from the selected commit's subject plus `followup`, using a readable slug: `tasks/todo/tasks-[commit-subject-slug]-followup.md`.
- Use a title such as `# [Commit subject] Followup`.
- Add the short commit hash only when needed to prevent a filename collision.
- Tie every task to observed evidence and relevant files.
- Focus tasks on reducing risk, closing documentation gaps, or reducing code and complexity.
- Do not update the task changelog merely because a review-generated todo list was created. Update it when meaningful work is completed or archived according to `how-to-maintain-project-memory.md`, unless project instructions say otherwise.

If no finding warrants a task list, do not create one. State clearly that no list was created and briefly explain why.

## Response

Summarize:

- Commit reviewed
- Important findings, ordered by impact
- Follow-up task-list path, if created
- Why no task list was created, when applicable
