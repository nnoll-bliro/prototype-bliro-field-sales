# Visual Prototype Playground

A small internal Next.js app for building and sharing visual prototypes.

## Included

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS
- Reusable shadcn/Radix primitives in `components/ui/shadcn/`
- Lucide icons and Recharts

There is no authentication, database, payment integration, analytics, or API setup.

## Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Add a prototype

Create a route using the App Router:

```text
app/
  my-prototype/
    page.tsx
```

It will be available at `/my-prototype`. Use nested folders for multi-screen flows and `next/link` for navigation. Add user-facing prototypes to the index in `app/page.tsx`.

Growing prototypes keep every screen under one namespace. For example, `app/calendar/[locale]/pre`, `now`, and `post` are one prototype; route-local copy lives in `app/calendar/_dictionaries/`, while shared UI lives in `components/calendar/`. Use `app/page.tsx`—not links between prototypes—as the prototype switcher.

## Repository map

- `app/<prototype>/` — routes and nested screens.
- `components/<feature>/` — prototype-specific or feature-shared UI.
- `components/ui/shadcn/` — generic UI primitives; reuse before creating new ones.
- `DESIGN.md` — design rules; `app/globals.css` and `tailwind.config.js` implement the shared styling tokens.
- `public/` — static images and icons; `libs/` and `hooks/` — shared data, utilities, and hooks.
- `tasks/todo/` — active tickets; `tasks/done/` — dated archives; `tasks/changelog.md` — one-line outcomes and decisions. `ai-product-craft/` is legacy.

The canonical task skill is `.agents/skills/jumpy-goat-skill/`; `.claude/skills/jumpy-goat-skill` links to it for Claude Code.

## Commands

```bash
npm run dev        # Start the development server
npm run build      # Create a production build
npm run lint       # Run ESLint
npm run typecheck  # Check TypeScript
```
