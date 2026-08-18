# Visual Prototype Playground

A small internal Next.js app for building and sharing visual prototypes.

## Included

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS
- Reusable shadcn/Radix primitives in `components/ui/shadcn/`
- Lucide icons and Recharts
- The existing backlog in `ai-product-craft/todo/`

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

It will be available at `/my-prototype`. Use nested folders for multi-screen flows and `next/link` for navigation.

## Commands

```bash
npm run dev        # Start the development server
npm run build      # Create a production build
npm run lint       # Run ESLint
npm run typecheck  # Check TypeScript
```
