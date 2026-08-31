"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Action, ActionGroup } from "@/app/calendar/_lib/actions";
import { getCustomerInitials } from "@/app/calendar/_lib/customer-format";
import { interpolateCopy } from "@/app/calendar/_lib/interpolate";
import { ActionItem } from "@/components/calendar/action-item";
import { CompanyLogo } from "@/components/calendar/company-logo";
import { cn } from "@/libs/utils";

export type ActionsCopy = {
  summary: string;
  summaryOne: string;
  allDone: string;
  kinds: Record<string, string>;
  preparedBy: string;
  noCustomerHeading: string;
  reviewAction: string;
  reviewActionFull: string;
  reviewActionOnly: string;
  completeAction: string;
  completeActionFull: string;
  completeActionOnly: string;
  doneStatus: string;
  undoAction: string;
  undoActionFull: string;
  undoActionOnly: string;
  doneDisclosure: string;
  doneDisclosureOne: string;
  emptyTitle: string;
  emptyBody: string;
};

// The screen's one piece of client state is which actions the user has
// finished this session. Copy, fixtures and grouping all arrive from the server
// route, so this stays the single client boundary.
export function ActionsView({
  copy,
  groups,
}: {
  copy: ActionsCopy;
  groups: ActionGroup[];
}) {
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});
  const [showDone, setShowDone] = useState(false);

  const isDone = (action: Action) => overrides[action.id] ?? action.state === "done";

  // Placement rule: a row only moves when the user deliberately reopens it.
  // Completing something leaves it exactly where it was — with `Erledigt` and
  // an undo control right where the user just tapped — because a row that
  // vanishes on tap takes its own undo away with it. Items that arrived
  // already done start collapsed and rejoin their group when reopened.
  const isCollapsed = (action: Action) =>
    action.state === "done" && isDone(action);

  // A handful of fixtures: cheap enough to re-derive on every render, and one
  // less dependency array to keep honest.
  const doneRows: { action: Action; customerName?: string }[] = [];
  const visibleGroups: ActionGroup[] = [];

  for (const group of groups) {
    const rows = group.actions.filter((action) => !isCollapsed(action));

    for (const action of group.actions) {
      if (isCollapsed(action)) {
        doneRows.push({ action, customerName: group.customer?.name });
      }
    }

    if (rows.length > 0) visibleGroups.push({ ...group, actions: rows });
  }

  const toggle = (id: string) =>
    setOverrides((current) => {
      const action = groups
        .flatMap((group) => group.actions)
        .find((candidate) => candidate.id === id);
      const next = !(current[id] ?? action?.state === "done");

      return { ...current, [id]: next };
    });

  const itemCopy = {
    preparedBy: copy.preparedBy,
    reviewAction: copy.reviewAction,
    completeAction: copy.completeAction,
    doneStatus: copy.doneStatus,
    undoAction: copy.undoAction,
  };

  // `companyName` names the action in its accessible label; `meta` is the
  // muted line on the row. In a customer group the heading already carries the
  // company, so the row shows the contact instead; inside the collapsed done
  // section that heading is out of sight, so the company moves onto the row.
  const renderAction = (
    action: Action,
    { companyName, meta }: { companyName?: string; meta?: string },
  ) => {
    const kindLabel = copy.kinds[action.kind] ?? action.kind;
    const done = isDone(action);
    const fill = (withCustomer: string, withoutCustomer: string) =>
      companyName
        ? interpolateCopy(withCustomer, {
            action: kindLabel,
            customer: companyName,
          })
        : interpolateCopy(withoutCustomer, { action: kindLabel });

    return (
      <ActionItem
        key={action.id}
        accessibleLabel={
          action.state === "review"
            ? fill(copy.reviewActionFull, copy.reviewActionOnly)
            : fill(copy.completeActionFull, copy.completeActionOnly)
        }
        copy={itemCopy}
        done={done}
        kindLabel={kindLabel}
        meta={meta}
        onToggle={() => toggle(action.id)}
        preparedBy={
          action.state === "review" && action.preparedBy
            ? interpolateCopy(copy.preparedBy, { agent: action.preparedBy })
            : undefined
        }
        state={action.state}
        undoLabel={fill(copy.undoActionFull, copy.undoActionOnly)}
      />
    );
  };

  const isEmpty = visibleGroups.length === 0;
  const openCount = visibleGroups
    .flatMap((group) => group.actions)
    .filter((action) => !isDone(action)).length;

  return (
    <div>
      {/* The count is what still needs doing, so it drops as rows are
          completed — and reads `Alles erledigt` rather than `0 Aktionen`.
          Announced politely, because otherwise finishing an action changes the
          screen silently for a screen-reader user. */}
      <p
        aria-live="polite"
        className="mt-2 text-base leading-6 text-muted-foreground"
      >
        {openCount === 0
          ? copy.allDone
          : interpolateCopy(
              openCount === 1 ? copy.summaryOne : copy.summary,
              { count: openCount },
            )}
      </p>
      {isEmpty ? (
        <section className="mt-10 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-bold text-heading">{copy.emptyTitle}</h2>
          <p className="mt-2 text-base leading-6 text-muted-foreground">
            {copy.emptyBody}
          </p>
        </section>
      ) : (
        visibleGroups.map((group, index) => {
          const headingId = `action-group-${group.customer?.id ?? "no-customer"}`;

          return (
            <section
              key={headingId}
              className={index === 0 ? "mt-10" : "mt-12"}
              aria-labelledby={headingId}
            >
              <div className="flex items-center gap-4">
                {group.customer ? (
                  <CompanyLogo
                    logoSrc={group.customer.logoSrc}
                    initials={getCustomerInitials(group.customer.name)}
                  />
                ) : null}
                <h2
                  id={headingId}
                  className="min-w-0 break-words text-xl font-bold text-heading"
                >
                  {group.customer?.name ?? copy.noCustomerHeading}
                </h2>
              </div>
              <ul className="mt-4 space-y-3">
                {group.actions.map((action) =>
                  renderAction(action, {
                    companyName: group.customer?.name,
                    meta: group.customer?.contactName,
                  }),
                )}
              </ul>
            </section>
          );
        })
      )}

      {doneRows.length > 0 ? (
        <section className="mt-12">
          {/* Done work stays available but quiet: one plainly labelled
              disclosure, closed by default, rather than rows competing with
              what still needs doing. */}
          <button
            type="button"
            onClick={() => setShowDone((open) => !open)}
            aria-expanded={showDone}
            aria-controls="done-actions"
            className="flex min-h-12 w-full items-center justify-between gap-3 rounded-xl px-3 text-base font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {interpolateCopy(
              doneRows.length === 1 ? copy.doneDisclosureOne : copy.doneDisclosure,
              { count: doneRows.length },
            )}
            <ChevronDown
              className={cn(
                "size-5 shrink-0 transition-transform",
                showDone && "rotate-180",
              )}
              aria-hidden="true"
            />
          </button>
          <ul id="done-actions" hidden={!showDone} className="mt-4 space-y-3">
            {doneRows.map(({ action, customerName }) =>
              renderAction(action, {
                companyName: customerName,
                meta: customerName,
              }),
            )}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
