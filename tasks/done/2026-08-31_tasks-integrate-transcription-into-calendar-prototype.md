# Integrate Transcription into the Calendar Prototype

## Completion summary

Completed 2026-08-31. Both calendar transcription entry points — the
active-meeting CTA and the bottom-navigation microphone — now open the same
copy-driven screen at `/calendar/{locale}/transcription` on every phase, and
close/save return via `router.back()`. `LiveTranscriptionOverlay` holds no
strings or event fixtures of its own; the calendar feeds it from
`app/calendar/_dictionaries`, the `/home` prototype from
`components/transcription/english-copy.ts`. Both legacy routes redirect.

## Goal

Bring both existing calendar transcription entry points into the localized calendar prototype. Every calendar transcription action should open the same copy-driven screen at `/calendar/{locale}/transcription`, then use browser back when closed or saved.

## Notes

- One canonical screen and URL per locale: `/calendar/de/transcription` and `/calendar/en/transcription`.
- The bottom microphone and the active-meeting transcription action open the exact same screen; phase and entry source do not change its content.
- Use the generic transcription flow, including its attach-to-event step, as the shared screen.
- Close and completed save actions call browser back rather than choosing a fixed calendar phase.
- Put calendar transcription copy in the existing `de.json` and `en.json` dictionaries; do not add an i18n library.
- The separate `/home` and `/transcription` prototype flow is out of scope except for compatibility changes required by shared component props.

## Relevant Files

- `app/calendar/[locale]/transcription/page.tsx` - New canonical localized transcription route.
- `app/calendar/transcription/page.tsx` - Legacy English calendar transcription route, now a redirect.
- `app/calendar-now-de/transcription/page.tsx` - Legacy German current-meeting transcription route, now a redirect.
- `components/calendar/calendar-view.tsx` - Current meeting CTA and bottom microphone entry points.
- `components/calendar/bottom-nav.tsx` - Supports a microphone destination (unchanged; already prop-driven).
- `components/calendar/mic-fab.tsx` - Existing calendar transcription link.
- `components/calendar/live-transcription-view.tsx` - Generic calendar transcription route wrapper.
- `components/calendar/german-current-transcription-view.tsx` - Removed.
- `components/transcription/english-copy.ts` - New English copy and event fixtures for the `/home` prototype.
- `components/transcription/live-transcription-overlay.tsx` - Shared transcription UI; now requires `copy` and `events` props and holds no strings.
- `components/home/transcription-view.tsx` - Separate prototype consumer that must remain compatible.
- `app/calendar/_dictionaries/de.json` - German calendar and transcription copy.
- `app/calendar/_dictionaries/en.json` - English calendar and transcription copy.

## Tasks

- [x] 1.0 Add localized transcription copy and routing
  - [x] 1.1 Add matching transcription keys to `de.json` and `en.json`, including metadata, controls, status text, attach-event copy, and localized default event labels.
  - [x] 1.2 Create `/calendar/[locale]/transcription` using the existing locale validation and dictionary loader.
  - [x] 1.3 Generate localized route metadata from the same dictionaries.
  - [x] 1.4 Redirect `/calendar/transcription` to `/calendar/en/transcription` and `/calendar-now-de/transcription` to `/calendar/de/transcription`.

- [x] 2.0 Make the shared transcription screen copy-driven
  - [x] 2.1 Replace the inline English/German map in `LiveTranscriptionOverlay` with a required copy prop suitable for client components.
  - [x] 2.2 Pass localized default event labels and metadata from the calendar dictionary instead of keeping English date words in the overlay.
  - [x] 2.3 Consolidate the calendar wrappers into one locale-neutral `CalendarLiveTranscriptionView` that renders the generic attach-to-event flow. It takes `copy` + `locale` for the dictionary and the `lang` attribute, but no phase or meeting.
  - [x] 2.4 Make both close and completed-save behavior call `router.back()`, retaining the existing visible saving state where practical.
  - [x] 2.5 Retire `GermanCurrentTranscriptionView` after its route becomes a redirect.
  - [x] 2.6 Keep the separate home transcription consumer working by passing its required copy explicitly without coupling its routing to `/calendar`.

- [x] 3.0 Connect every calendar transcription entry point
  - [x] 3.1 Link the active-meeting transcription CTA to `/calendar/{locale}/transcription` instead of showing an unavailable state.
  - [x] 3.2 Enable the bottom-navigation microphone for every calendar phase and point it to the same localized URL.
  - [x] 3.3 Update `MicFab` or remove its stale `/calendar/transcription` destination if the component remains reusable. Kept and parameterized (`href`, `ariaLabel`); it is mounted nowhere, the bottom navigation owns the microphone.
  - [x] 3.4 Verify no calendar transcription control links to a legacy route or another prototype.

- [x] 4.0 Validate and document completion
  - [x] 4.1 Verify both entry points reach identical transcription markup in German and English.
  - [x] 4.2 Verify close, stop/save, and attach/save use browser back to return to the originating phase. All three paths call `router.back()` (close directly, both save buttons via `onStop`); confirmed in code and accepted as done.
  - [x] 4.3 Verify both legacy routes redirect, unsupported locales return not found, and the separate home transcription flow still works.
  - [x] 4.4 Run `npm run lint`, `npm run typecheck`, and `npm run build`.
  - [x] 4.5 Add one concise completion entry to `tasks/changelog.md`.
