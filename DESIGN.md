# Design system notes

## Inclusive product bias

This playground defaults to low cognitive and physical effort. Design for
barriers—limited vision or dexterity, low confidence or digital literacy,
intermittent connectivity, older/low-cost devices, and costly data—not for a
stereotype such as “old” or “poor.” These factors do not necessarily occur
together. Use one accessible baseline rather than a diminished “simple mode,”
and validate assumptions with representative users.

### Screen structure

- Give every screen one clear purpose and one visually primary action. Use a
  specific verb + object label (`Save meeting notes`, not `Submit` or `OK`).
- Start unfamiliar or high-stakes flows with one decision or information group
  per screen. Merge steps only when user research shows that repeated users
  benefit. Fewer elements is not the goal by itself: keep headings, progress,
  help, examples, and confirmations when they reduce uncertainty.
- Put the immediate task first. Collapse or move history, suggestions, source
  lists, and alternate channels behind plainly labelled disclosure controls.
- Do not duplicate an action in multiple visual units. Avoid multiple primary
  buttons; before adding secondary actions, simplify or split the task.
- Icons supplement visible words. Use an icon-only control only for a genuinely
  familiar action, with an accessible name and a generous hit area.
- Remove inert prototype controls. A control must produce the outcome it
  promises, show an honest unavailable/demo state, or not render.

### Type and controls

- Operational/body text starts at `text-base` (16px). Supporting metadata may
  use `text-sm` (14px); do not put instructions, errors, action labels, names,
  or essential status in `text-xs`. **Smaller type is not an inclusive
  simplification.**
- Text must survive browser zoom to 200%, text-spacing overrides, and reflow at
  320 CSS px without clipped labels, forced truncation, or lost functionality.
- Default controls and fields are at least 48px high; compact controls remain at
  least 44px. WCAG 2.2 AA permits 24×24px with exceptions, but that is a
  conformance floor rather than this product's usability target.
- Keep at least 8px between adjacent touch targets. Make the whole labelled
  control clickable; enlarging only its icon does not enlarge its target.
- Use a visible 2px focus indicator and ensure fixed headers, composers, and
  navigation never cover the focused control.
- Meet WCAG AA contrast: 4.5:1 for normal text, 3:1 for large text and meaningful
  control boundaries/icons. Never communicate status with color alone.

### Confidence, mistakes, and connectivity

- Prefer forgiving input. Keep labels visible, preserve entered values, accept
  common formats, and show a plain-language error next to the problem with a
  direct way to fix it.
- Let users review, undo, or confirm destructive and high-consequence actions.
  Never discard a recording or draft because a sheet closed or the network
  failed.
- Show explicit progress and outcomes (`Saving…`, `Saved`, `Couldn’t save — try
  again`). Keep the last useful state available offline where feasible and say
  when information was last updated.
- Core journeys use semantic HTML and progressive enhancement. Avoid large
  decorative media, unnecessary animation, and interactions that require a
  flagship phone, precise gestures, or uninterrupted bandwidth.

### Review checklist

Before calling a prototype ready for user testing:

1. State the one purpose and primary action for each screen.
2. Count visible choices and visual groups; justify each one by a user need.
3. Verify all controls work, have explicit labels, and expose progress/failure.
4. Test keyboard use, visible focus, 200% zoom, 320px reflow, reduced motion,
   Slow 3G/offline interruption, and a low-cost phone.
5. Test the complete task—including mistakes and recovery—with participants who
   actually experience the relevant barriers. Record findings by barrier and
   context, not by age or income alone.

### Research basis

- [W3C: Accessibility, Usability, and Inclusion](https://www.w3.org/WAI/fundamentals/accessibility-usability-inclusion/)
- [W3C: Older Users and Web Accessibility](https://www.w3.org/WAI/older-users/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/), especially resize/reflow, focus,
  target size, redundant entry, and accessible authentication
- [GOV.UK: Making your service more inclusive](https://www.gov.uk/service-manual/design/making-your-service-more-inclusive)
- [GOV.UK: Structuring forms](https://www.gov.uk/service-manual/design/form-structure)
- [GOV.UK Design System: Buttons](https://design-system.service.gov.uk/components/button/)
- [NHS Service Manual: Buttons](https://service-manual.nhs.uk/design-system/components/buttons)
- [Digital.gov: Accessibility for visual designers](https://digital.gov/guides/accessibility-for-teams/visual-design)

Working rules distilled while cleaning up `app/calendar/page.tsx`. Tokens
referenced below already exist in `app/globals.css` / `tailwind.config.js` —
the problem so far hasn't been missing tokens, it's screens reaching for
one-off hex values instead of them. Use the tokens; don't invent new colors
per screen.

## Color: restraint by default

Color is a signal, not a decoration. Every screen was accumulating its own
palette (a green pill here, a muted-red badge there, an orange-tinted card
elsewhere) until nothing stood out because everything did.

- **`primary` (orange) is reserved for one thing: the primary action a user
  can take right now** — a CTA button (`Prepare for meeting`, `Call Vicky`,
  `Complete follow-up`) or, sparingly, an active-nav-item label. It should
  never appear as a card background, a border glow, or a status badge.
- **`success` is reserved for a completed/confirmed state**, and only that —
  e.g. "Follow-up complete". Don't reach for it to mean "good" or "positive
  number" generally.
- **`destructive` is reserved for destructive actions or actual errors** —
  not for urgency, not for "still needs attention", not for a countdown
  timer. A meeting starting soon or an open task is normal information, not
  a warning.
- **Everything else is `muted` / `muted-foreground` / `border`.** Badges,
  pills, timestamps, eyebrows, secondary icons, and "N minutes away" /
  "action needed" indicators should be neutral gray tones. If you're not
  sure a piece of UI needs color, it doesn't.

Rule of thumb: a screen should have at most one or two colored elements
(usually just the primary CTA). If you count three or more colors doing
different jobs, pull them back to `muted`.

## Spacing: airy, generous vertical rhythm

- Section-to-section spacing: `mt-10`–`mt-12` (2.5–3rem), not `mt-8` or
  tighter. Sections should read as distinct groups, not a stacked list.
- Card padding: `p-6`, not `p-5`. Content shouldn't touch the card edge.
- Let related content breathe with `mt-1`/`mt-2` internally, but don't
  compress the space *between* logical groups to match — the contrast
  between tight-within-group and loose-between-group is what creates
  hierarchy.

## Hierarchy: greeting first, chrome last

- No app logo on primary in-app screens. It doesn't help the user do
  anything and competes with the actual content for the top of the screen.
- The personal greeting ("Hi Niko") is the first thing rendered, styled as
  a lead-in line above the page's `h1`. The `h1` (e.g. "Your calendar") is
  still the largest text on the page — the greeting is first in reading
  order and tone, not necessarily in size.
- Metadata that used to live in a colored pill (meeting count, badges)
  should fold into a plain muted sentence where possible ("Tuesday, 18 June
  · 2 meetings today") instead of a separate colored chip — one fewer
  visual unit to parse.
- Temporal/status indicators (`In 28 min`, counts, "still needed") are
  small, muted, icon+text badges — not colored, not bold-colored text
  inline with content. They should sit visually behind the content they
  annotate.

## Buttons: primary vs. secondary, and when icons earn their place

`app/calendar/page.tsx`'s shared action button used to force a leading
`Sparkles` icon and a trailing chevron onto every instance, regardless of
whether either meant anything for that action. "Prepare for meeting" got a
generic sparkle for no reason, and the chevron repeated what the explicit,
verb-led button label already communicated.

- **Primary button**: filled `bg-primary`, `text-primary-foreground`, and
  full width within its card. Reserve this treatment for the screen's single
  next-best action (`Prepare for meeting`). A card may contain an action
  without making that action primary.
- **Secondary button**: neutral outlined (`border-input`, `bg-background`,
  `text-foreground`) or plain muted, used for every other valid action on the
  screen (`Complete follow-up`, alternate communication channels). Before
  adding several secondary buttons, simplify or split the screen. Never two
  primary-styled buttons competing on one screen.
- **Leading icon is opt-in, not default.** Add one only when it identifies
  *what the action is* faster than the label alone (`ClipboardCheck` for
  "Complete follow-up," an avatar for "Call Vicky"). If the icon is generic
  decoration that doesn't map to the action's meaning (sparkles for
  "prepare"), leave it off — a button is not required to have a leading
  icon.
- **No default trailing chevron.** An explicit verb-led button label is
  enough. Never add a chevron to imply interactivity when a card has no
  destination or action.
- Icon size `size-5` (20px) leading a button, `gap-2` between icon and
  label, matching the existing `min-h-12`/`px-5` button sizing — keep this
  consistent rather than tuning per button.

### Screen real estate ≠ button hierarchy

The floating "Call Vicky" / mic bar sits in a persistent, high-visibility
slot — full-width, fixed above the tab bar, its own shadow and radius. That
positioning is prominent by construction. It does **not** follow that the
buttons inside it should be styled as the page's primary action: opening
the app specifically to call Vicky isn't the thing we want to visually push
people toward, even though the affordance should always be reachable.

So the bar keeps its prominent container, but the buttons inside step down
a level:

- **`Call Vicky`**: secondary — neutral `border`/`bg-card`/`text-foreground`,
  not filled `bg-primary`. The avatar image still carries its own identity
  color, that's fine; the button chrome itself is neutral.
- **mic / one-off transcription**: tertiary — no fill, no border, just an
  icon in `text-muted-foreground`. It's a fallback path next to an already
  secondary action, so it should read even quieter.

Judge a button's style by "is this the one thing I want the user to do on
this screen/card," not by how much space or how permanent its position is.
A button can be everywhere on screen and still be visually quiet.

In practice, a fully white container on a white page reads as inert, so the
floating bar needs *some* separation from the page to read as a live,
tappable surface. A gradient + colored glow was tried and rejected — it
visually bled into the nav bar sitting right underneath it and added
warmth the bar didn't need. What works instead is staying flat: a light
neutral `bg-muted` fill, a plain `border-border`, and only the existing
elevation shadow (`shadow-popover`) — no color, no glow. The `Call Vicky`
button's own `bg-card` (white) then naturally pops against that light gray
field by contrast alone, no extra styling required. The buttons inside
still stay neutral/ghost as described above. Lesson: reach for contrast
and elevation to separate a floating surface before reaching for color or
glow.

## One meeting card, not three

`app/calendar/page.tsx` originally had three near-identical but
independently-styled meeting entries (the "next meeting" card, the "later
today" card, and the two "recent meeting" cards each hand-rolled inline).
They drifted from each other — different padding, different logo
placement, different fields shown — for no reason tied to what the entry
actually was.

That's now one component: `components/calendar/meeting-card.tsx`. Rules
for it:

- **Fixed field set, nothing else**: time, company logo, company name,
  person to meet, and an optional action row. No location, no free-form
  status text — if a card needs to communicate more than that, that's a
  sign the fixed fields aren't enough, not a reason to bolt extra content
  onto one instance.
- **Time is the leftmost, primary element** — this is a calendar view, so
  "when" always anchors the reading order. The logo sits directly under
  the time, since together they answer "when, and with whom" before the
  reader gets to the name/person detail.
- **Two states, not size variants**: expanded (an `action` is passed) and
  compressed (no `action`). There's no separate "primary/large" visual
  variant — the "Next meeting" section is still just this component,
  distinguished by the section heading and the `TimeBadge` above it, not
  by giving the card itself different padding or type sizes.
- **Both states share one summary row** — logo, company name (truncating),
  and a single "time · person" meta line — and that row never makes room
  for anything else. It went through two iterations before landing here:
  first expanded stacked time-and-logo in their own left column apart
  from compressed's single row; then an inline action button beside the
  row was tried and rejected, because it only looks fine with today's
  short placeholder titles — a real meeting title runs long enough to
  collide with a button sitting next to it. The fix wasn't a smarter
  truncation rule, it was moving the variable-content elements (the
  action) off the row entirely:
  - **Compressed**: the summary row only. Without a destination or action,
    it must not imply that the card is interactive.
  - **Expanded**: the same row, with the action full-width on its own
    line underneath, never beside it.
  General lesson: when a row's text content is genuinely unbounded (a
  title, a name), don't place fixed-width interactive elements inline
  with it based on how it looks with placeholder data — give the
  unbounded content the full row and put the fixed element on its own
  line instead.
- When another screen needs a meeting/appointment entry, use this
  component rather than reimplementing the card inline — extend its props
  if a genuinely new field is needed, don't fork it.

## The Vicky FAB

The floating "Call Vicky" bar became a single circular avatar button
(`components/calendar/vicky-fab.tsx`) that expands into two circular
options — chat and call — on tap, and collapses on a second tap or a tap
outside. The mic / one-off-transcription action was dropped for now
rather than folded into the menu.

- Same hierarchy rule as before still applies: the FAB and its two
  options use neutral/secondary chrome (`border-border`, `bg-card`), not
  filled `bg-primary` — a persistent, always-visible control still isn't
  the page's primary action. The avatar photo is what carries Vicky's
  identity; button surfaces stay plain.
- This client component (`"use client"`, holds its own `open` state) is no
  longer mounted on `calendar/page.tsx`: `Ask Vicky` already exists in the
  bottom navigation, so the FAB duplicated a choice and competed with the
  page task. Keep the component for experiments, but do not mount both paths
  without user evidence. When used elsewhere, isolate stateful UI like this
  rather than converting the whole page to a client component.
- If another screen needs a similar "one avatar, tap to reveal a couple
  of options" control, reuse this component rather than rebuilding the
  expand/collapse mechanics.

## Applying this elsewhere

When touching another screen in this app, replace hardcoded hex colors
(`bg-[#...]`, `text-[#...]`, `border-[#...]`) with the semantic Tailwind
classes already wired to CSS variables: `background`, `foreground`,
`heading`, `muted`/`muted-foreground`, `border`, `card`, `primary`,
`success`/`success-subtle`, `destructive`/`destructive-subtle`, `accent`.
If a screen needs a color that doesn't map to an existing token, that's a
signal to add a token to `globals.css` — not to hardcode a hex value.
