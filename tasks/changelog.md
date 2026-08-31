# Task Changelog

Dated one-line outcomes and decisions, newest first.

## 2026-08-31

- Completed `tasks/done/2026-08-31_tasks-calendar-customers-tab.md`: the calendar `Customers` tab is live — `/calendar/{locale}/customers` lists 18 fixture companies with Lufthansa, ROSEN Group and Otis pinned above a separator and a dependency-free fuzzy search (folds case, umlauts and `ue`/`oe`/`ae`, so `duerr`, `dürr` and `rosn` all hit), and `/calendar/{locale}/customers/{companyId}` wireframes company data and meeting history with an honest empty state for chats/artifacts. Every prototype date is now relative to the real current day (fixtures hold day offsets, resolved server-side) while clock times stay fixed, since the pre/now/post phases are switched by hand. Extracted `CalendarScreen` and `CompanyLogo` so the calendar screens share one frame and one logo slot. Follow-up: the detail screen repeats the company logo on every meeting row.
- Completed `tasks/done/2026-08-31_tasks-integrate-transcription-into-calendar-prototype.md`: both calendar transcription entry points now open one copy-driven `/calendar/{locale}/transcription` screen that returns via browser back; the shared overlay lost its inline locale strings, legacy transcription routes redirect, and `GermanCurrentTranscriptionView` was retired.
- Completed `tasks/done/2026-08-31_tasks-consolidated-calendar-prototype-localization.md`: added bilingual calendar routes, shared JSON copy, and prototype controls.
- Set up the Jumpy Goat task workflow, shared agent skill, and canonical repository map.
