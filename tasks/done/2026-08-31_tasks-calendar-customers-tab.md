# Calendar Customers Tab

## Completion summary

Completed 2026-08-31. The `Kunden` / `Customers` tab is live:
`/calendar/{locale}/customers` lists 18 fixture companies with Lufthansa,
ROSEN Group and Otis pinned above a separator, filtered by a dependency-free
fuzzy search that folds case, umlauts and the `ue`/`oe`/`ae` transliterations,
so `duerr`, `dürr`, `rosn` and `lh` all resolve. Selecting a row opens
`/calendar/{locale}/customers/{companyId}`, which wireframes company data and
meeting history and states plainly that chats and artifacts are still to come
rather than inventing them. All dates across the prototype are now relative to
the real current day.

Two follow-ups, neither blocking: the detail screen still repeats the company
logo and name on every meeting row (see **Open question**), and clock times
(`12:15`, `In 28 min`) remain fixed while dates are dynamic.

## Goal

Turn the currently disabled `Kunden` / `Customers` entry in the calendar bottom
navigation into a working screen: a searchable customer list with recently
interacted companies pinned above a separator, and a company detail screen that
wireframes company data, calendar interactions, and related chats/artifacts.
This is scoping work — the detail screen establishes the section structure and
honest empty states, not final content.

## Notes

- Lives inside the existing calendar prototype namespace, per README: reuse
  `app/calendar/_lib/i18n.ts`, the `de.json` / `en.json` dictionaries, and
  `components/calendar/bottom-nav.tsx`. No new i18n library, no new npm
  dependency.
- Routes: `/calendar/[locale]/customers` and
  `/calendar/[locale]/customers/[companyId]`. Both locales must work.
- The customers screens have no `pre`/`now`/`post` phase. The `Kalender` tab
  from anywhere under `customers` returns to a single fixed phase (assume
  `now`; see task 1.4). The prototype phase switcher does not render on these
  screens.
- Fixture list of ~16–20 companies. Only Lufthansa, ROSEN Group, Otis and
  John Deere have SVGs in `public/logos/`; every other company renders an
  initials monogram in the same 44px logo slot, so the row height never varies.
- Pinned above the separator, in this order: **Lufthansa**, **ROSEN Group**,
  **Otis** — the three companies the calendar prototype already shows today.
- Search is fuzzy, hand-rolled, client-side: subsequence + substring scoring
  over company name and primary contact name, so `luft`, `lh` and `rosn` all
  hit. Ranked results replace the pinned/rest split while a query is active.
- Detail screen: company data and calendar interactions use real fixtures
  consistent with the calendar screens. The chats/artifacts section renders its
  heading with a plain-language empty state — no invented chat threads.
- DESIGN.md applies throughout: semantic tokens only (no hex), `text-base`
  minimum for operational text, ≥48px targets, one primary action per screen,
  neutral `muted` chrome for badges and metadata, no inert controls, no
  trailing chevrons implying interactivity where there is none.

## Relevant Files

- `app/calendar/[locale]/customers/page.tsx` - New customer list route.
- `app/calendar/[locale]/customers/[companyId]/page.tsx` - New detail route.
- `app/calendar/_lib/i18n.ts` - Locale validation and dictionary loader to reuse.
- `app/calendar/_lib/customers.ts` - New: company fixtures, types, lookup by id.
- `app/calendar/_dictionaries/de.json` / `en.json` - Customers + detail copy.
- `components/calendar/customer-list-view.tsx` - New: client component owning
  the search field and filtered rendering.
- `components/calendar/customer-row.tsx` - New: one list row (logo/monogram,
  company, contact, last-interaction meta).
- `components/calendar/customer-detail-view.tsx` - New: detail sections.
- `components/calendar/calendar-screen.tsx` - New: the phone-width frame every
  calendar screen sits in, extracted from `calendar-view.tsx` so the three
  screens cannot drift apart.
- `app/calendar/_lib/customer-search.ts` - New: the fuzzy matcher.
- `app/calendar/_lib/today.ts` - New: the only caller of `new Date()`.
- `app/calendar/_lib/customer-format.ts` - New: client-safe date/initials
  formatting, kept apart from the fixture book.
- `app/calendar/_lib/interpolate.ts` - New: `interpolateCopy` moved out of the
  `server-only` `i18n.ts` so the client-side list can fill copy templates.
  `i18n.ts` re-exports it, so existing server callers are unchanged.
- `components/calendar/company-logo.tsx` - New: shared logo-or-monogram slot,
  extracted from `meeting-card.tsx`.
- `components/calendar/bottom-nav.tsx` - Gains a `customers` destination and
  supports `active="customers"` (already prop-driven).
- `components/calendar/calendar-view.tsx` - Passes the customers destination.
- `components/calendar/meeting-card.tsx` - Reuse for the detail screen's
  interaction entries rather than reimplementing a meeting row.
- `components/calendar/meeting-card.tsx` - `logoSrc` is now optional and takes
  an `initials` fallback, so logo-less companies render at identical height.

## Tasks

- [x] 1.0 Data model, routing, and copy
  - [x] 1.1 Add `app/calendar/_lib/customers.ts`: a `Customer` type (`id`,
        `name`, `logoSrc?`, `contactName`, `contactRole`, `city`, `industry`,
        `lastInteractionAt?`, `pinned`) plus ~16–20 fixtures. Give Lufthansa,
        ROSEN Group, Otis and John Deere their real `logoSrc`.
  - [x] 1.2 Export `getCustomerById(id)` and an ordered `pinnedCustomers` /
        `otherCustomers` split; other customers sort alphabetically.
  - [x] 1.3 Add `customers` and `customerDetail` copy blocks to `de.json` and
        `en.json` — screen title, search label/placeholder, pinned-section
        heading, all-customers heading, no-results text, back link, and every
        detail section heading and empty state. Add `metadata.customers` and
        `metadata.customerDetail` entries.
  - [x] 1.4 **Clarify:** the `Kalender` tab from the customers screens returns
        to a fixed phase — confirmed `now`.
  - [x] 1.5 Create both routes using `requireCalendarLocale` +
        `getCalendarDictionary`, with `generateMetadata` from the dictionary.
        Detail route calls `notFound()` for an unknown `companyId`.

- [x] 2.0 Bottom navigation
  - [x] 2.1 Pass `customers: /calendar/{locale}/customers` from
        `calendar-view.tsx` so the tab stops rendering its disabled state.
  - [x] 2.2 Set `active="customers"` on both customers screens and confirm the
        disabled `Route` tab and its "Bald" / "Soon" label are untouched.
  - [x] 2.3 Verify `aria-current="page"` moves to the customers tab and that
        the active-tab styling still reads correctly against the disabled tabs.

- [x] 3.0 Customer list screen
  - [x] 3.1 Extract the 44px logo slot out of `meeting-card.tsx` into
        `company-logo.tsx`, adding an initials-monogram fallback on neutral
        `muted` when `logoSrc` is absent. Repoint `meeting-card.tsx` at it.
  - [x] 3.2 Build `customer-row.tsx`: logo slot, company name (wrapping, not
        truncated), and one muted meta line (contact · last interaction).
        Whole row is the link target, ≥48px high, 2px visible focus ring.
  - [x] 3.3 Build `customer-list-view.tsx` as a `"use client"` component
        holding only the query state; the server route passes copy + fixtures.
  - [x] 3.4 Add the search field at the top: visible persistent label (not
        placeholder-only), `text-base`, ≥48px, clear/reset control that is a
        real button with an accessible name.
  - [x] 3.5 Render pinned customers first under a heading, then a `Separator`,
        then the rest under an all-customers heading.
  - [x] 3.6 Write the fuzzy matcher: case/diacritic-insensitive, scores
        substring hits above subsequence hits, matches company and contact
        name. Add a short comment explaining the scoring so it isn't re-tuned
        blindly.
  - [x] 3.7 While a query is non-empty, replace the two-section split with one
        ranked result list; show a plain-language no-results state naming the
        query and offering a way back to the full list.
  - [x] 3.8 Keep the page's one purpose ("find a customer") — no competing
        primary button, no colored badges; last-interaction meta stays muted.

- [x] 4.0 Company detail screen
  - [x] 4.1 Header: company name as `h1`, logo slot, and a muted line of
        company data (industry · city · primary contact). Back link to the
        customer list with an explicit verb-led label.
  - [x] 4.2 `Interactions` section: past and upcoming calendar events rendered
        through the existing `MeetingCard` in its compressed state. Use
        fixtures consistent with the calendar screens (Lufthansa 12:15 Tim
        Berger, ROSEN Group 14:00 Igor Petrov, Otis 15:30 Stefan Müller).
  - [x] 4.3 `Chats & artifacts` section: heading plus an honest empty state
        ("No conversations about this customer yet") — no fabricated threads,
        no disabled buttons promising an outcome they can't deliver.
  - [x] 4.4 Companies with no calendar history get the same honest empty state
        in the interactions section rather than a hidden heading.
  - [x] 4.5 Section rhythm `mt-10`–`mt-12`, card padding `p-6`, headings as
        `h2` in document order.

- [x] 5.0 Validate and document
  - [x] 5.1 Walk `/calendar/de/customers` → detail → back → `Kalender` tab in
        both locales; confirm no untranslated string and no dead control.
  - [x] 5.2 Check keyboard-only navigation, visible focus on every row and the
        search field, 200% zoom, and 320px reflow without clipped names.
        Verified by measurement: `document.scrollWidth` equals the viewport at
        both 320px and 390px on the list, the detail screen and the existing
        calendar, with no element extending past the right edge. Focus rings
        and hit areas verified in code, not yet by hand on a device.
  - [x] 5.3 Confirm no hardcoded hex values and that no new color was
        introduced outside the existing tokens.
  - [x] 5.4 Run `npm run lint`, `npm run typecheck`, and `npm run build`.
  - [x] 5.5 Add a dated entry to `tasks/changelog.md`.
  - [x] 5.6 Archive this file to `tasks/done/`. The open design question below
        is recorded as a follow-up rather than treated as a blocker.

- [x] 6.0 Make every date relative to the real current day
  - [x] 6.1 Add `_lib/today.ts` as the single place `new Date()` is called,
        plus a UTC-safe `addDays`. No module computes a date at import time,
        so the server render and the client hydration cannot disagree.
  - [x] 6.2 Store customer and meeting fixtures as day offsets and resolve
        them to real dates on the server; only resolved strings cross into
        client components.
  - [x] 6.3 Split the pure formatters into `_lib/customer-format.ts` so the
        client list never pulls the fixture book into its bundle.
  - [x] 6.4 Turn the calendar's `dateSummary` into a `{{date}}` template
        formatted with `Intl`, replacing the hardcoded "Dienstag, 18. Juni".
  - [x] 6.5 Drop `generateStaticParams` from the detail route — prerendering
        would freeze the dates at the deploy date.
  - [x] 6.6 Format English dates as `en-GB` so the German-market prototype
        reads day-before-month in both locales.

## Open question

- **The detail screen repeats the company logo and name on every meeting row.**
  Reusing `MeetingCard` keeps the styling identical to the calendar, but on a
  screen whose `h1` already names the company, three stacked Lufthansa logos
  are noise — the rows only really vary by date, time and person. Per
  DESIGN.md the fix would be extending `MeetingCard`, not forking it, but
  suppressing its title and logo is a structural change to a component the
  design notes deliberately locked down. Left as-is and flagged rather than
  decided unilaterally, since the detail screen's content is still being
  scoped.

## Decisions

- Customers lives under `app/calendar/[locale]/` rather than as its own
  prototype, so the bottom-nav tab flow, locale validation and dictionaries are
  reused rather than duplicated.
- The phase is dropped on the customers screens instead of being carried in the
  URL; returning to the calendar lands on one fixed phase.
- Fuzzy search is hand-rolled — a prototype playground shouldn't take a
  dependency for one screen's filter.
- Chats/artifacts stays deliberately empty: the shape of that data is still
  being scoped, and inventing fixtures would bake in assumptions.
- Dates are dynamic: fixtures store day offsets and the server resolves them
  against the real current day, so the prototype never demos stale dates. This
  replaced an earlier decision to pin "today" to 18 June 2024.
- Clock times stay fixed (`12:15`, `In 28 min`). The pre/now/post phases are
  switched by hand in the prototype controls, so driving times from the real
  clock would fight that switcher instead of helping it.
- Industry and contact role are closed key sets translated through the
  dictionaries; company names, contact names and cities stay untranslated.
  Dates are formatted with `Intl` in UTC so server and client agree.

## Out of scope

- The `Route` navigation tab stays disabled.
- Real CRM data, persistence, or any write action from the detail screen.
- Deep links from a meeting card into a company detail page (worth doing once
  the detail screen's content is settled).
