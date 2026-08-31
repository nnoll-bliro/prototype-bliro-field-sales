import Image from "next/image";

type MeetingCardProps = {
  time: string;
  logoSrc: string;
  company: string;
  person: string;
  // Omit for the compressed state — e.g. a past meeting with nothing left
  // to do, or a meeting that isn't actionable yet. Passing an action
  // switches the card into its expanded layout.
  action?: React.ReactNode;
  // Remove the card-within-card surface when used inside a disclosure.
  embedded?: boolean;
};

function CompanyLogo({ logoSrc }: { logoSrc: string }) {
  return (
    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-white p-1.5">
      <Image
        src={logoSrc}
        alt=""
        width={64}
        height={64}
        className="size-full object-contain"
      />
    </div>
  );
}

// Logo + company + "time · person" — identical in both states. Real
// meeting titles run long, so this row never makes room for anything
// past those two lines: no inline button, no third field. Anything more
// (an action, an expand affordance) lives outside this row instead of
// competing with it for space.
function MeetingSummary({
  time,
  logoSrc,
  company,
  person,
}: Omit<MeetingCardProps, "action" | "embedded">) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-4">
      <CompanyLogo logoSrc={logoSrc} />
      <div className="min-w-0 flex-1">
        <p className="break-words text-base font-bold leading-6 text-heading">
          {company}
        </p>
        <p className="mt-1 text-base leading-6 text-muted-foreground">
          {time} · {person}
        </p>
      </div>
    </div>
  );
}

// The single meeting entry used across the calendar: next meeting, later
// today, and recent meetings all render through this component so the
// information hierarchy stays identical everywhere it appears.
//
// Two states, not size variants — both share the same summary row
// (logo, company, "time · person"); they only differ in what sits beside
// or below it:
// - Compressed (no `action`): the summary row only. It must not imply
//   interactivity when there is no destination or action.
// - Expanded (an `action` is passed): the same row, with the action
//   rendered full-width on its own line underneath. It doesn't sit beside
//   the row because real meeting titles run long enough to fill that
//   space — an inline button there would only work for today's short
//   example titles, not in general.
export function MeetingCard({
  time,
  logoSrc,
  company,
  person,
  action,
  embedded = false,
}: MeetingCardProps) {
  if (!action) {
    return (
      <div className="flex items-center rounded-2xl bg-muted p-6">
        <MeetingSummary
          time={time}
          logoSrc={logoSrc}
          company={company}
          person={person}
        />
      </div>
    );
  }

  return (
    <article
      className={
        embedded
          ? "bg-card"
          : "rounded-2xl border border-border bg-card p-6 shadow-card"
      }
    >
      <MeetingSummary
        time={time}
        logoSrc={logoSrc}
        company={company}
        person={person}
      />
      <div className="mt-4">{action}</div>
    </article>
  );
}
