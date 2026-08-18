# Mobile-first `/home` meeting focus

## Completion summary

Completed on 2026-08-18. Added the mobile-first meeting focus, runtime-relative mock scenarios, contextual Vicky Call/Chat chooser, guarded live-transcription mock, saved-state feedback, and responsive/accessibility validation.

## Goal

Create a simple, mobile-first `/home` prototype that helps a field sales agent focus on the next best action across three jobs: prepare for an upcoming meeting, transcribe an ongoing meeting, and follow up after a past meeting. All calendar, meeting, Vicky, and transcription behavior is mocked.

## Product model

The interface is driven by two factors:

1. **Meeting lifecycle:** ongoing, upcoming, or past.
2. **Assistance mode:** live transcription or help from Vicky by phone/chat.

| Meeting state | Placement | Next best action | Result |
| --- | --- | --- | --- |
| Ongoing | Primary focus card | **Start transcribing** | Open the mocked full-screen transcription route |
| Upcoming | Primary or secondary upcoming card | **Prep me** | Open the Vicky contact chooser |
| Past, report incomplete | Reverse-chronological history | **Prepare visitor report** | Open the Vicky contact chooser |
| Past, report complete | Reverse-chronological history | Quiet **Report completed** status | No primary action |

## Information hierarchy

1. **Primary focus:** the ongoing meeting, otherwise the nearest upcoming meeting. This is the visually dominant card and its NBA is the strongest CTA on the page.
2. **Up next:** the next eligible ongoing/upcoming meeting after the primary item. It uses a smaller, quieter card while retaining the relevant action.
3. **Past meetings:** up to 20 completed meetings in reverse chronological order, grouped under generated labels such as **Earlier today**, **Yesterday**, and formatted calendar dates. Pending visitor reports have visible actions, but those actions must not compete visually with the primary focus CTA.
4. If no ongoing or upcoming meeting exists, promote the most recent past meeting with an incomplete visitor report into the primary focus position.

## UX decisions

- Design for a narrow mobile viewport first, then constrain/center the experience on larger screens.
- Use runtime-relative mock dates and times rather than hard-coded dates so the prototype does not become stale.
- `Prep me` and `Prepare visitor report` open a mobile bottom sheet.
- The bottom sheet introduces Vicky with `public/vicky_avatar.png`, the relevant meeting context, a green primary **Call** action with phone icon, and a secondary **Chat** action.
- Call and Chat are equal access modes selected according to the agent's current situation; do not silently default to one.
- `Start transcribing` opens a dedicated, full-screen mocked transcription route.
- The transcription screen includes an active waveform visualization, elapsed time, meeting context, and a prominent Stop button. Stopping returns the user to `/home` with clear mocked completion feedback.
- The future “All past events” link is explicitly out of scope.

## Relevant files

- `app/home/page.tsx` - New mobile-first home route.
- `app/transcription/page.tsx` - New mocked full-screen transcription experience.
- `components/home/home-view.tsx` - Interactive home composition and sheet state.
- `components/home/meeting-card.tsx` - Shared meeting presentation with visual variants.
- `components/home/vicky-contact-sheet.tsx` - Contextual Vicky Call/Chat chooser.
- `components/home/transcription-view.tsx` - Interactive client-side transcription mock.
- `libs/mock-meetings.ts` - Relative meeting fixtures, lifecycle derivation, sorting, and grouping.
- `public/vicky_avatar.png` - Existing Vicky avatar shown in the contact chooser.
- `components/ui/shadcn/button.tsx` - Existing button primitive.
- `components/ui/shadcn/card.tsx` - Existing card primitive.
- `components/ui/shadcn/sheet.tsx` - Existing mobile sheet primitive.

## Tasks

- [x] 1.0 Define relative mock meeting data and selection logic
  - [x] 1.1 Model meeting identity, customer/title, relative start/end times, and visitor-report status.
  - [x] 1.2 Generate displayed timestamps and date headings from offsets relative to the current time.
  - [x] 1.3 Derive ongoing, upcoming, and past lifecycle states from generated start/end times.
  - [x] 1.4 Select the primary item in this order: ongoing, nearest upcoming, latest past item needing follow-up.
  - [x] 1.5 Select the next ongoing/upcoming item as the secondary “Up next” item without duplicating the primary item.
  - [x] 1.6 Sort past meetings newest-first, cap them at 20, and group them into Earlier today, Yesterday, and formatted date sections.
  - [x] 1.7 Provide mock scenarios for reviewing ongoing, upcoming, and no-future states without hard-coded calendar dates.

- [x] 2.0 Build the `/home` information hierarchy
  - [x] 2.1 Create a compact mobile header and a clearly labeled primary focus section.
  - [x] 2.2 Build a visually dominant primary meeting card with meeting context and a full-width NBA.
  - [x] 2.3 Build the smaller “Up next” card beneath it.
  - [x] 2.4 Build the reverse-chronological past-meeting list with sticky or clearly scannable date headings.
  - [x] 2.5 Show a subdued completed state instead of an action for meetings whose visitor report is done.
  - [x] 2.6 Ensure past-event CTAs remain visible but use lower visual emphasis than the primary card CTA.
  - [x] 2.7 Add appropriate empty states when there is no secondary meeting or no pending past follow-up.

- [x] 3.0 Implement NBA behavior
  - [x] 3.1 Route **Start transcribing** directly to the mocked transcription screen with meeting context.
  - [x] 3.2 Open the Vicky bottom sheet from **Prep me** and **Prepare visitor report**.
  - [x] 3.3 Display Vicky's avatar, name, and the selected meeting/task context in the sheet.
  - [x] 3.4 Add a green primary **Call** button with phone icon and a secondary **Chat** button.
  - [x] 3.5 Give both mocked contact actions clear visual feedback without adding real communication integrations.
  - [x] 3.6 Preserve accessible labels, focus handling, touch target sizes, and sheet dismissal behavior.

- [x] 4.0 Build the mocked transcription screen
  - [x] 4.1 Create a focused full-screen mobile layout with customer/meeting context.
  - [x] 4.2 Add a lightweight animated waveform or wave-like visualization and live elapsed-time counter.
  - [x] 4.3 Add a prominent, thumb-reachable Stop button.
  - [x] 4.4 On Stop, return to `/home` and show clear mocked “transcription saved” feedback.
  - [x] 4.5 Respect reduced-motion preferences for waveform animation.

- [x] 5.0 Validate the prototype
  - [x] 5.1 Verify the ongoing state promotes **Start transcribing**.
  - [x] 5.2 Verify the upcoming state promotes **Prep me**.
  - [x] 5.3 Verify the no-future state promotes the latest incomplete past follow-up.
  - [x] 5.4 Verify completed reports have no visitor-report CTA.
  - [x] 5.5 Verify the secondary item never duplicates the primary item.
  - [x] 5.6 Verify past events are correctly grouped, newest-first, and capped at 20.
  - [x] 5.7 Check the layout at small mobile widths and confirm it remains centered and usable on larger screens.
  - [x] 5.8 Run `npm run lint`, `npm run typecheck`, and `npm run build`.

## Acceptance criteria

- `/home` immediately communicates what the agent should do next.
- An ongoing meeting makes **Start transcribing** the dominant action; otherwise, the nearest upcoming meeting makes **Prep me** dominant.
- A smaller second card shows the subsequent ongoing/upcoming meeting when one exists.
- Past meetings appear newest-first under relative/date-based groups, with no more than 20 rendered.
- Incomplete past meetings expose **Prepare visitor report** without overpowering the primary focus; completed reports show a quiet completed state.
- Both Vicky-assisted actions open the same contextual bottom sheet using `public/vicky_avatar.png`, with green **Call** primary and **Chat** secondary actions.
- The mocked transcription screen shows active waves, elapsed time, and a Stop action that returns to `/home` with completion feedback.
- Dates remain current automatically because fixtures are generated relative to runtime.
- No real calendar sync, agent backend, phone/chat integration, persistence, or “All past events” navigation is introduced.
