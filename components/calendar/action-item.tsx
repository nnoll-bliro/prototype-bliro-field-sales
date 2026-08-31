import { CheckCircle2, RotateCcw, Sparkles } from "lucide-react";
import type { ActionState } from "@/app/calendar/_lib/actions";

export type ActionItemCopy = {
  preparedBy: string;
  reviewAction: string;
  completeAction: string;
  doneStatus: string;
  undoAction: string;
};

// The button label and the row's own text are both short and from closed sets,
// but a translated label plus a wrapping company contact still collide at
// 320px. So the control gets its own full-width line under the text, the same
// way `meeting-card.tsx` handles its action.
// No leading icon on either control: both labels are explicit and verb-led,
// and one check mark repeated down the whole list would say nothing about
// which of the two outcomes a given row offers.
const controlClassName =
  "flex min-h-12 w-full items-center justify-center rounded-xl border border-input bg-background px-5 text-base font-bold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

// One action. Three states, and the row never navigates: there is no action
// detail screen yet, so the only outcomes it can honestly offer are "mark this
// reviewed" and "complete this" — hence no trailing chevron anywhere here.
export function ActionItem({
  accessibleLabel,
  copy,
  done,
  kindLabel,
  meta,
  onToggle,
  preparedBy,
  state,
  undoLabel,
}: {
  // Names the action and its customer, because "Complete" alone tells a screen
  // reader user nothing about which of several rows they are on.
  accessibleLabel: string;
  copy: ActionItemCopy;
  done: boolean;
  kindLabel: string;
  meta?: string;
  onToggle: () => void;
  preparedBy?: string;
  state: ActionState;
  undoLabel: string;
}) {
  return (
    <li className="rounded-2xl border border-border bg-card p-6">
      <p className="break-words text-base font-bold leading-6 text-heading">
        {kindLabel}
      </p>
      {meta ? (
        <p className="mt-1 break-words text-base leading-6 text-muted-foreground">
          {meta}
        </p>
      ) : null}

      {/* An agent-prepared item is normal information, not a warning or a
          success — so the badge stays neutral, and it carries words plus an
          icon rather than signalling with color. */}
      {preparedBy && !done ? (
        <p className="mt-3 inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-1.5 text-base leading-6 text-muted-foreground">
          <Sparkles className="size-5 shrink-0" aria-hidden="true" />
          {preparedBy}
        </p>
      ) : null}

      {done ? (
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-3">
          <p className="inline-flex items-center gap-2 text-base font-bold leading-6 text-success">
            <CheckCircle2 className="size-5 shrink-0" aria-hidden="true" />
            {copy.doneStatus}
          </p>
          <button
            type="button"
            onClick={onToggle}
            aria-label={undoLabel}
            className="inline-flex min-h-12 items-center gap-2 rounded-xl px-3 text-base font-bold text-foreground underline underline-offset-4 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <RotateCcw className="size-5 shrink-0" aria-hidden="true" />
            {copy.undoAction}
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <button
            type="button"
            onClick={onToggle}
            aria-label={accessibleLabel}
            className={controlClassName}
          >
            {state === "review" ? copy.reviewAction : copy.completeAction}
          </button>
        </div>
      )}
    </li>
  );
}
