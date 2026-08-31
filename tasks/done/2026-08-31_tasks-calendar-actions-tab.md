---
STATUS: COMPLETED
COMPLETED_DATE: 2026-08-31
TOPIC: calendar-actions-tab
---

# Calendar Actions Tab

## Goal

Replace the disabled `Route` entry in the calendar bottom navigation with a
working `Aktionen` / `Actions` screen: a short, calm to-do list of the open
actions a field rep owes, grouped by customer, with three honest states — open,
waiting for review, and done. The screen's one purpose is getting one of those
actions done — not browsing, not filtering, not reporting.

## Background: where actions come from (not built here)

Direction from the product owner, recorded so the data model doesn't have to be
redone later. None of this is implemented in this task:

- An **action** is the granular primitive: one discrete thing a person does.
  It is the only unit this screen lists.
- A **wrap-up** (`Nachbereitung`) is a *parent*: a time-bound activity after an
  event that contains two or three actions. `Vorbereitung` is its pre-event
  counterpart. Parents are containers, not to-dos.
- The intended flow is that a wrap-up event triggers a voice agent, the agent
  walks the rep through what has to happen, and the agent produces the work —
  e.g. drafting the visit report and the follow-up email, which is two actions.
- What lands in the app is then the *visual review surface* for that agent
  output. Hence the `review` state below: the agent already did it, a human
  still has to look at it.
- Actions may have no parent event, and may have no customer at all.

## Action states

Three states, and the ordering rule that follows from them:

| State | Meaning | Treatment |
| --- | --- | --- |
| `review` | An agent prepared this; a human still has to check it. | Listed first — lowest-effort path to progress. Neutral `muted` badge naming who prepared it. |
| `open` | Human-generated, or still needs real input. | Listed after review items. No badge. |
| `done` | Finished. | Visible but quiet — behind a plainly labelled disclosure, never in the main flow. |

`done` is *visible but not prominent*: collapsed under one labelled toggle, not
deleted, not silently dropped from the list.

## Notes

- Route navigation is not planned for the foreseeable future; if it ever
  returns it folds into the `Heute` / `Today` tab. This task removes the `route`
  destination from the nav model rather than leaving a second disabled tab.
- Lives inside the existing calendar prototype namespace, per README: reuse
  `app/calendar/_lib/i18n.ts`, the `de.json` / `en.json` dictionaries,
  `components/calendar/bottom-nav.tsx` and `calendar-screen.tsx`. No new i18n
  library, no new npm dependency.
- Route: `/calendar/[locale]/actions`. Both locales must work. Like the
  customers screens, actions has no `pre`/`now`/`post` phase — the `Heute` tab
  returns to the fixed `now` phase and the prototype phase switcher does not
  render here.
- **These to-dos are generic and standalone.** They are deliberately *not*
  synced with the `post`-phase `1 offene Nachbereitung` card or any other
  calendar-screen follow-up. That card stays exactly as it is; no counts are
  derived across the two screens. Wiring them together waits until the wrap-up
  concept is actually built.
- Three action kinds only, rendered from the dictionary so both locales read
  naturally: **review the visit report**, **send the follow-up email**,
  **review the quote**. A fourth kind is a scope change, not a fixture tweak.
- Fixture volume: 2–5 customers, 1–3 actions each, ~6–9 actions total, covering
  all three states — at least two `review`, at least three `open`, at least two
  `done`, and at least one action with no customer. Companies and contacts must
  be ones that already exist in `app/calendar/_lib/customers.ts`; do not invent
  a parallel customer book.
- Grouped by customer: one group heading per company (logo slot + company
  name), its open and review actions underneath, and one final group for
  actions with no customer.
- The only interactions are completing an open action and marking a review
  action as reviewed — both in place, both undoable. There is no action detail
  screen and no wrap-up screen yet (see Out of scope), so no row navigates
  anywhere and no row gets a trailing chevron.
- DESIGN.md applies throughout: semantic tokens only (no hex), `text-base`
  minimum for operational text (the review badge included — no `text-xs`
  carrying status), ≥48px targets with ≥8px between them, one primary action
  per screen, neutral `muted` chrome for metadata, `success` only for the done
  state, never status by color alone, no inert controls.

## Relevant Files

- `app/calendar/[locale]/actions/page.tsx` - New actions route (server
  component: locale validation, dictionary, `generateMetadata`, fixtures).
- `app/calendar/_lib/actions.ts` - New: `Action` type, action-kind union,
  state union, the fixture list, and `groupActionsByCustomer()`.
- `app/calendar/_lib/customers.ts` - Source of the companies actions attach to;
  reuse `getCustomerById`. Note the recent refactor: `getCustomerInitials` and
  the date formatters now live in `customer-format.ts`, and "today" comes from
  `today.ts` (`getPrototypeToday`).
- `app/calendar/_dictionaries/de.json` / `en.json` - `actions` copy block plus
  `metadata.actions`; `navigation.route` becomes `navigation.actions`.
  `calendar.followUp` is left untouched.
- `components/calendar/actions-view.tsx` - New `"use client"` component owning
  the completed/reviewed ids and the done-disclosure open state.
- `components/calendar/action-item.tsx` - New: one action row (kind label,
  meta line, state badge, its control, and its done treatment). Neither control
  takes a leading icon — one check mark repeated down the list says nothing
  about which of the two outcomes a row offers.
- `components/calendar/company-logo.tsx` - Reuse for the per-customer group
  heading; do not reimplement the logo/monogram slot.
- `components/calendar/bottom-nav.tsx` - `route` nav item replaced by
  `actions`; `NavItemId`, `BottomNavCopy` and `BottomNavDestinations` updated.
- `components/calendar/calendar-view.tsx` - Passes the actions destination.
- `components/wiki-chat/wiki-chat-view.tsx` - Borrows this nav with its own
  copy: `route` label renamed to `actions`, still with no destination.
- `app/calendar/[locale]/customers/page.tsx` and
  `.../customers/[companyId]/page.tsx` - Pass the actions destination too.

## Tasks

- [x] 1.0 Data model, routing, and copy
  - [x] 1.1 Add `app/calendar/_lib/actions.ts`: an `ActionKind` union
        (`reviewVisitReport` | `sendFollowUpEmail` | `reviewQuote`), an
        `ActionState` union (`review` | `open` | `done`), and an `Action` type —
        `id`, `kind`, `state`, `customerId?`, `preparedBy?`, `createdAt`.
        `customerId` is optional by design; don't make it required to simplify
        the first render.
  - [x] 1.2 `preparedBy` names the agent that produced a `review` item (the
        prototype has one: Vicky). It is only meaningful with `state:
        "review"` — encode that in the type if it's cheap, otherwise assert it
        in the fixture loader rather than trusting the fixtures.
  - [x] 1.3 Write ~6–9 fixtures covering all three states per the Notes,
        including at least one customer that has both a `review` and an `open`
        action, and at least one action with no customer. No customer gets
        three of the same kind.
  - [x] 1.4 Export `groupActionsByCustomer()` returning
        `{ customer, actions }[]` plus a separate bucket for customer-less
        actions. Sort actions within a group `review` → `open`; `done` items
        are returned separately for the disclosure, not inline.
        **Changed during build:** `done` items stay inside their group instead
        of being returned separately. Which rows sit in the disclosure depends
        on session state — a reopened item has to move back into its group —
        so that split belongs to the client. Grouping does not. Order customer
        groups by the customer's most recent interaction so today's meetings
        surface first; the customer-less group always renders last. Skip
        unknown customer ids loudly (throw in dev) rather than rendering an
        orphan group.
  - [x] 1.5 Add an `actions` copy block to `de.json` and `en.json`: screen
        title, summary line (`{{count}} offene Aktionen` / `{{count}} open
        actions`, plus a singular variant), a `kinds` map for the three action
        kinds, the review badge (`Von {{agent}} vorbereitet` / `Prepared by
        {{agent}}`), the review control label, the complete control label, done
        status text, undo label, the done-disclosure label with its count, the
        no-customer group heading, and empty-state title and body. Add
        `metadata.actions`.
  - [x] 1.6 Rename `navigation.route` to `navigation.actions` in both
        dictionaries (`Aktionen` / `Actions`). Remove `unavailable` /
        `unavailableShort` only if no disabled tab remains after 2.0.
  - [x] 1.7 Create `app/calendar/[locale]/actions/page.tsx` with
        `requireCalendarLocale` + `getCalendarDictionary` and
        `generateMetadata`, following the customers route as the template.

- [x] 2.0 Bottom navigation
  - [x] 2.1 In `bottom-nav.tsx`, replace the `route` nav item with `actions`:
        `NavItemId`, `BottomNavCopy`, `BottomNavDestinations` and the `items`
        array. Pick an icon that reads as a checklist (`ListChecks`) rather
        than a generic document.
  - [x] 2.2 Pass `actions: /calendar/{locale}/actions` from `calendar-view.tsx`
        and from both customers routes, so no screen renders a disabled tab.
  - [x] 2.3 Set `active="actions"` on the actions screen; verify
        `aria-current="page"` moves correctly and the active styling still
        reads against the now-all-enabled tabs.
  - [x] 2.4 If the disabled-tab branch in `NavItemControl` now has no user,
        decide explicitly: keep it for the mic fallback state or delete it.
        Don't leave dead-but-styled code without a reason in the diff.
        **Kept:** the `Vicky` tab still has no destination on every calendar
        screen, and `wiki-chat` reuses this nav with its own copy and no
        actions screen. The branch has two live users, so it stays.

- [x] 3.0 Actions screen
  - [x] 3.1 Header: `h1` with the screen title and one muted summary sentence
        with the open count (review + open, not done). No greeting, no eyebrow,
        no colored count chip.
  - [x] 3.2 Build `action-item.tsx`: the action-kind label as the operational
        line (`text-base`, bold), one muted meta line (contact name where there
        is one), the state badge for `review` items, and the row's control.
        Row ≥48px, 2px visible focus ring, whole labelled control clickable. An
        action with neither badge nor contact renders the kind label alone — no
        filler text.
  - [x] 3.3 Review items: neutral `muted` badge naming the agent — words plus
        an icon, never a colored dot alone — and a control labelled as a review
        outcome (`Als geprüft markieren` / `Mark as reviewed`). Since there is
        no detail screen, marking reviewed is the honest available outcome; do
        not label it `Öffnen` or imply content the row can't show.
  - [x] 3.4 Open items: a complete control with an accessible name that names
        the action and its customer (`Besuchsbericht für Lufthansa
        abschließen`), not a bare `Erledigt`. No trailing chevron, no
        navigation.
  - [x] 3.5 On completing or reviewing, the row stays where it is for the
        session, marked with `success` plus a visible word (`Erledigt` /
        `Done`) and an icon, with an explicit undo next to it. Rows must not
        jump into the collapsed section the instant they're tapped — undo has
        to stay reachable where the user's attention already is.
  - [x] 3.6 Fixtures that arrive already `done` render inside one collapsed
        disclosure at the bottom of the screen, labelled with its count
        (`2 erledigt` / `2 done`). Closed by default, a real `<button>` with
        `aria-expanded`, ≥48px, and the rows inside keep their undo control.
  - [x] 3.7 Build `actions-view.tsx` as the one `"use client"` boundary; it
        holds the completed/reviewed id set and the disclosure's open state,
        and nothing else. Copy, fixtures and grouping come from the server
        route.
  - [x] 3.8 Render one group per customer: `h2` group heading with the shared
        `CompanyLogo` slot and the company name, actions in a `ul` underneath;
        the customer-less group uses the same heading treatment with a
        plain-language label and no logo slot. Group rhythm `mt-10`–`mt-12`,
        cards `p-6`, ≥8px between adjacent rows.
  - [x] 3.9 The summary count reflects *not-done* actions and updates as items
        are completed; say `Alle erledigt` / `All done` in place of a zero
        count rather than rendering `0 offene Aktionen`.
  - [x] 3.10 Empty state (no fixtures, or everything done): plain-language
        title and body, with the done disclosure still available underneath so
        the work isn't gone. No illustration, no disabled button.
  - [x] 3.11 Keep the screen to one purpose: no filter chips, no sort control,
        no search, no second primary button, no colored due-date badges. Due
        context, if shown at all, is muted text.

- [x] 4.0 Validate and document
  - [x] 4.1 Walk `/calendar/de/actions` and `/calendar/en/actions`: mark a
        review item reviewed, undo it, complete an open item, undo it, then
        clear everything to reach the all-done state. Confirm no untranslated
        string and no dead control.
  - [x] 4.2 Open and close the done disclosure; confirm the count is right,
        `aria-expanded` flips, and undo works on a row inside it.
  - [x] 4.3 Confirm the calendar screens are untouched: the `post`-phase
        follow-up card still reads and behaves exactly as before.
  - [x] 4.4 Walk the tab flow both ways: `Heute` → `Aktionen` → `Kunden` →
        `Heute` in both locales, confirming the actions tab is reachable from
        every screen that renders the nav.
  - [x] 4.5 Check keyboard-only operation of every control including the
        disclosure, visible focus on every row, 200% zoom, and 320px reflow
        with a long company name, a long badge, and a long action label.
  - [x] 4.6 Confirm no hardcoded hex values, that `success` appears only on the
        done state, that the review badge is neutral, and that no new color
        token was introduced.
  - [x] 4.7 Run `npm run lint`, `npm run typecheck`, and `npm run build`.
  - [x] 4.8 Add a dated entry to `tasks/changelog.md` and archive this file to
        `tasks/done/`.

## Decisions

- These to-dos stay generic and unsynced with the calendar's follow-up card.
  Wiring a parent/child relationship across two screens before the wrap-up
  concept exists would bake in a structure that's still being scoped; the cost
  of connecting them later is small, the cost of guessing wrong now isn't.
- Three states rather than a binary done/not-done, because `review` carries
  real information: an agent already produced the work and the human's job is
  smaller. Collapsing it into `open` would misrepresent the effort involved.
- Review items sort above open items — they're the cheapest path to progress on
  a screen whose whole purpose is getting one thing done.
- `done` is collapsed, not deleted. "Visible but not prominent" is a disclosure
  control, which is also what DESIGN.md prescribes for history.
- Rows completed during the session stay in place with undo instead of
  animating into the collapsed section. Undo has to be where the user just
  tapped.
- `Als geprüft markieren` rather than `Öffnen` for review items: with no detail
  screen, opening is not an outcome this prototype can deliver, and a control
  must produce what its label promises.
- Grouped by customer rather than by state or as a flat list with tag pills. A
  group heading carries the customer identity once, in `text-base` with the
  real logo slot; state is expressed by ordering and one neutral badge.
- Action kinds and states are closed unions in code, not free text, so both
  locales stay translatable and the fixtures can't drift into invented
  workflows.

## Out of scope

- The action detail screen (opening an action to actually review a report,
  draft the email, or check a quote). Parked deliberately — the list has to
  earn it first.
- The wrap-up parent as an entity or a screen, and any voice-agent flow that
  produces actions. Recorded in Background so the model can absorb it later
  without a rewrite; not modelled in code now.
- Prep/pre-event actions as a distinct surface.
- Any sync, shared count, or deep link between this screen and the calendar
  screens' follow-up card.
- Persistence of any kind. State lives in component state and resets on reload;
  this is a prototype, not a task manager.
- Creating, editing, snoozing, reassigning, or deleting actions.
- Filtering the list, or notifications, real due dates, overdue treatment, or
  any priority ranking beyond the state ordering in 1.4.

## TL;DR

**Completed:** 2026-08-31

**What we did:**
- Replaced the disabled `Route` tab with a working `/calendar/[locale]/actions`
  screen in both locales: actions grouped by customer, with `review` (agent-
  prepared) items sorted above `open` ones and done work collapsed behind one
  labelled disclosure.
- Added `app/calendar/_lib/actions.ts` — closed `ActionKind` / `ActionState`
  unions, a discriminated `Action` type so `preparedBy` can only exist on a
  `review` item, 8 fixtures across Lufthansa / ROSEN Group / John Deere plus one
  action with no customer, and `groupActionsByCustomer()`.
- Wired the new tab into every screen that renders the bottom nav, so no
  calendar screen ships a disabled tab any more (bar `Vicky`).

**What changed along the way:**
- Grouping keeps `done` actions inside their customer group; the disclosure
  split moved to the client, because a reopened item has to rejoin its group.
- Dropped the leading check icon from both row controls — repeated six times it
  distinguished nothing.
- Placement rule settled as: completing a row leaves it in place with `Erledigt`
  and an undo beside it; only a deliberate reopen moves a row.

**Skipped/Deferred:**
- Nothing skipped. The action detail screen, the wrap-up parent entity, and any
  sync with the calendar's follow-up card were out of scope by design and stay
  untouched.
