# Consolidated Calendar Prototype and Localization

## Goal

Turn the existing German pre-meeting and during-meeting calendars into one extensible prototype under `/calendar/{language}/{phase}`. Reuse one component tree for German and English, with prototype copy loaded from small JSON dictionaries and room for future sub-pages.

## Notes

- The playground remains one Next.js app; `/calendar` is one prototype namespace, not a separate package or deployment.
- Supported languages: `de` and `en`. German is the primary prototype entry point.
- Initial phases: `pre`, `now`, and `post`. Until post-meeting UI is designed, `post` intentionally renders the existing during-meeting screen.
- Proposed routes: `/calendar/de/pre`, `/calendar/de/now`, `/calendar/de/post`, with equivalent `/calendar/en/*` routes. `/calendar/{language}` redirects to `pre`.
- Cross-prototype navigation belongs only on `app/page.tsx`. Controls inside this prototype must stay under `/calendar/*` or clearly indicate that an unavailable destination is not implemented.
- Use matching `de.json` and `en.json` dictionaries without adding an i18n dependency.

## Relevant Files

- `app/page.tsx` - Playground homepage and prototype entry points.
- `app/calendar/page.tsx` - Legacy English route redirect.
- `app/calendar-pre-de/page.tsx` - Legacy German pre-meeting redirect.
- `app/calendar-now-de/page.tsx` - Legacy German during-meeting redirect.
- `app/calendar-de/page.tsx` - Legacy German calendar redirect.
- `app/calendar/[locale]/page.tsx` - Localized prototype entry redirect.
- `app/calendar/[locale]/pre/page.tsx` - Localized pre-meeting route.
- `app/calendar/[locale]/now/page.tsx` - Localized during-meeting route.
- `app/calendar/[locale]/post/page.tsx` - Localized post-meeting route using the current during-meeting view.
- `components/calendar/calendar-view.tsx` - Shared localized, phase-aware calendar implementation.
- `components/calendar/prototype-controls.tsx` - Locale and time-state navigation within the calendar prototype.
- `components/calendar/bottom-nav.tsx` - Copy- and destination-driven shared navigation with honest unavailable states.
- `components/calendar/vicky-action-sheet.tsx` - Client component that receives localized copy from the server view.
- `components/calendar/meeting-card.tsx` - Shared meeting presentation.
- `components/calendar/current-meeting-card.tsx` - Shared during-meeting presentation.
- `app/calendar/_dictionaries/de.json` - German calendar-prototype copy.
- `app/calendar/_dictionaries/en.json` - English calendar-prototype copy with the same key shape.
- `app/calendar/_lib/i18n.ts` - Supported locales, dictionary loading, locale rejection, and basic interpolation.
- `README.md` - Canonical repository and prototype-structure documentation.
- `DESIGN.md` - Interaction, accessibility, and styling rules.

## Tasks

- [x] 1.0 Establish the calendar prototype route and copy foundations
  - [x] 1.1 Create the `/calendar/[locale]/` route tree with explicit `pre`, `now`, and `post` sub-pages.
  - [x] 1.2 Add a typed list of supported locales and reject unsupported locale segments with `notFound()`.
  - [x] 1.3 Add route-local `de.json` and `en.json` dictionaries with matching nested keys for all visible calendar copy.
  - [x] 1.4 Add a small server-only dictionary loader; keep interpolation limited to the existing named values such as company and person.
  - [x] 1.5 Make `/calendar/de` and `/calendar/en` redirect to their respective `pre` routes.

- [x] 2.0 Generalize the existing German calendar into one localized view
  - [x] 2.1 Replace `GermanCalendarView` with a locale-neutral calendar view that receives its phase, locale, and dictionary explicitly.
  - [x] 2.2 Preserve the existing pre-meeting and during-meeting visuals and mock meeting data while extracting user-visible strings from JSX.
  - [x] 2.3 Move the inline `VickyActionSheet` copy into the shared dictionaries and pass only the required copy subset into the client component.
  - [x] 2.4 Make `BottomNav` consume localized labels and prototype-local destinations instead of owning a second translation map.
  - [x] 2.5 Render the during-meeting view for both `now` and `post`, while keeping the selected admin phase visibly accurate.

- [x] 3.0 Add prototype administration controls
  - [x] 3.1 Add a compact control row at the top right of the calendar header containing the language switch and time-state controls.
  - [x] 3.2 Implement the language switch with links that preserve the current phase (`de` ↔ `en`).
  - [x] 3.3 Implement “Prior to meeting,” “During meeting,” and “Post meeting” links that preserve the current locale.
  - [x] 3.4 Give the current language and phase clear active states, accessible names, keyboard focus, and suitable touch targets.

- [x] 4.0 Consolidate entry points without mixing prototypes
  - [x] 4.1 Point the calendar card on `app/page.tsx` to the German prototype entry at `/calendar/de/pre`.
  - [x] 4.2 Redirect `/calendar-pre-de`, `/calendar-now-de`, and the old `/calendar` page to their canonical localized routes rather than maintaining duplicate screens.
  - [x] 4.3 Audit links rendered by the consolidated calendar and prevent navigation into other homepage prototypes; mark out-of-scope destinations honestly unavailable where needed.
  - [x] 4.4 Keep transcription and other future calendar sub-pages out of this ticket unless required to prevent a broken link.
  - [x] 4.5 Localize route metadata for German and English without introducing another copy source.

- [x] 5.0 Document and validate the convention
  - [x] 5.1 Add a short example to `README.md` showing one prototype namespace with localized sub-pages and shared feature components.
  - [x] 5.2 Verify all six phase routes, both locale-preserving switches, both locale index redirects, and the legacy redirects manually.
  - [x] 5.3 Verify unsupported locales return the expected not-found state and no calendar control unexpectedly opens another prototype.
  - [x] 5.4 Run `npm run lint`, `npm run typecheck`, and `npm run build`.
  - [x] 5.5 Add one concise completion entry to `tasks/changelog.md`.
