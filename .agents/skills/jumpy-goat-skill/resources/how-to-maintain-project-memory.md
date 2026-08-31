---
description: Protocol for maintaining shared project language and dated task history
alwaysApply: false
---
# Maintaining Project Memory

## Purpose

Preserve reusable project understanding while working through tasks, without adding heavy process.

Use two lightweight files in the project root:

- `glossary.md` — shared language, domain terms, repo-specific concepts, naming conventions, and non-obvious meanings.
- `tasks/changelog.md` — dated entries for completed work, important decisions, scope changes, and notable tradeoffs.

Do not use `context.md` for this protocol. Prefer `glossary.md`.

## When to Read

At the start of task planning or execution:

1. Read `glossary.md` if it exists.
2. Read `tasks/changelog.md` if it exists and recent history may affect the work.
3. Use these docs to avoid re-asking already answered questions.

If the files do not exist, proceed normally. Create them only when the work reveals reusable language or durable history worth keeping.

## Asking the Right Questions

Ask questions when the answer would change implementation, naming, task structure, or user-facing behavior.

Prioritize questions about:

- **Terms:** "What should we call this concept?" / "Is there already a name for this?"
- **Boundaries:** "Is X part of Y, or separate?"
- **Cardinality:** "Can one X have many Y? Can Y exist without X?"
- **Status/lifecycle:** "What states can this move through? Are transitions enforced or manual?"
- **Ownership/source of truth:** "Which file/system owns this?"
- **Reversibility:** "Is this easy to change later, or should we document the tradeoff?"
- **User-visible language:** "Will users see this term, or is it internal only?"

Keep questions batched and concise. Ask up to 3 at a time unless the user asks for a deeper grilling session.

## Updating `glossary.md`

Update the glossary when:

- A new reusable term is introduced.
- A fuzzy term is clarified.
- The user corrects naming or says "there's already a term for that."
- A term affects filenames, APIs, UI labels, content workflow, or future agent behavior.

Suggested format:

```markdown
# Glossary

Shared language for this project.

## Terms

### Term Name

Definition in plain language.

- **Use when:** When this term should be used.
- **Do not use for:** Nearby concepts this should not mean.
- **Notes:** Optional implementation, naming, or workflow notes.
```

Keep entries short. Prefer useful clarity over exhaustive documentation.

## Updating `tasks/changelog.md`

Update the changelog when:

- A task list is completed or archived.
- A meaningful chunk of work lands.
- A decision would be surprising without context.
- Scope changes materially.
- A tradeoff is accepted.

Suggested format:

```markdown
# Task Changelog

Dated history of meaningful task work and decisions.

## 2026-05-17

- Completed `tasks/todo/tasks-example.md`: short outcome summary.
- Decided to use `glossary.md` for shared project language instead of `context.md`.
```

Rules:

- Prefer one concise bullet per outcome or decision.
- Include file paths when helpful.
- Do not duplicate detailed task lists; link to them.
- Keep newest entries near the top.

## During Execution

When a term or decision emerges:

1. Pause only if the ambiguity can cause rework.
2. Ask the smallest useful question.
3. Apply the answer to the task.
4. Update `glossary.md` and/or `tasks/changelog.md` if the answer is reusable.

## Completion Checklist

Before archiving a completed task list:

- Task file statuses are current.
- `glossary.md` includes any new durable terms.
- `tasks/changelog.md` has a dated completion summary.
- The user has approved archiving when required by the execution protocol.
