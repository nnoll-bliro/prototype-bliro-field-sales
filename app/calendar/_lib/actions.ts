// Fixture action list for the calendar prototype's Actions tab.
//
// An action is the granular primitive: one discrete thing a person does. The
// parent concepts the product will grow later — a wrap-up (`Nachbereitung`)
// that owns two or three actions, a voice agent that produces them — are
// deliberately not modelled here. This screen lists children only, and stays
// unsynced with the calendar screens' follow-up card.
import { getCustomerById, type Customer } from "./customers";
import { addDays } from "./today";

// A closed set rendered through the dictionaries, so both locales read
// naturally and the fixtures can't drift into invented workflows.
export const actionKinds = [
  "reviewVisitReport",
  "sendFollowUpEmail",
  "reviewQuote",
] as const;

// `review` means an agent already produced the work and a human still has to
// check it — a smaller job than `open`, which is why the two aren't collapsed
// into one "not done" state.
export const actionStates = ["review", "open", "done"] as const;

export type ActionKind = (typeof actionKinds)[number];
export type ActionState = (typeof actionStates)[number];

type ActionFixtureBase = {
  id: string;
  kind: ActionKind;
  // Absent means the action isn't tied to a company. That's a normal case,
  // not an edge case — the screen gives those their own group.
  customerId?: string;
  // Days before today; 0 is today.
  createdDaysAgo: number;
};

// `preparedBy` only means something on a `review` item, so the union enforces
// it rather than leaving a field that's silently ignored two thirds of the
// time.
type ActionFixture =
  | (ActionFixtureBase & { state: "review"; preparedBy: string })
  | (ActionFixtureBase & { state: "open" | "done"; preparedBy?: never });

// An action with its date resolved to a real `YYYY-MM-DD` string. This is the
// shape components receive; nothing downstream sees a day offset.
export type Action = Omit<ActionFixture, "createdDaysAgo"> & {
  createdAt: string;
};

// The prototype has exactly one agent, and she is the one already present on
// the calendar screens.
const AGENT_NAME = "Vicky";

const actionFixtures: ActionFixture[] = [
  {
    id: "lufthansa-visit-report",
    kind: "reviewVisitReport",
    customerId: "lufthansa",
    state: "review",
    preparedBy: AGENT_NAME,
    createdDaysAgo: 0,
  },
  {
    id: "lufthansa-follow-up",
    kind: "sendFollowUpEmail",
    customerId: "lufthansa",
    state: "open",
    createdDaysAgo: 0,
  },
  {
    id: "rosen-follow-up",
    kind: "sendFollowUpEmail",
    customerId: "rosen-group",
    state: "review",
    preparedBy: AGENT_NAME,
    createdDaysAgo: 1,
  },
  {
    id: "rosen-quote",
    kind: "reviewQuote",
    customerId: "rosen-group",
    state: "open",
    createdDaysAgo: 1,
  },
  {
    id: "rosen-visit-report",
    kind: "reviewVisitReport",
    customerId: "rosen-group",
    state: "done",
    createdDaysAgo: 1,
  },
  {
    id: "john-deere-visit-report",
    kind: "reviewVisitReport",
    customerId: "john-deere",
    state: "open",
    createdDaysAgo: 7,
  },
  {
    id: "john-deere-quote",
    kind: "reviewQuote",
    customerId: "john-deere",
    state: "done",
    createdDaysAgo: 7,
  },
  {
    id: "trade-fair-follow-up",
    kind: "sendFollowUpEmail",
    state: "open",
    createdDaysAgo: 2,
  },
];

function resolve(fixture: ActionFixture, today: string): Action {
  const { createdDaysAgo, ...rest } = fixture;

  return { ...rest, createdAt: addDays(today, -createdDaysAgo) };
}

export function resolveActions(today: string): Action[] {
  return actionFixtures.map((fixture) => resolve(fixture, today));
}

// A group with no `customer` is the catch-all for actions that aren't tied to
// a company; it always renders last.
export type ActionGroup = {
  customer?: Customer;
  actions: Action[];
};

const stateOrder: Record<ActionState, number> = { review: 0, open: 1, done: 2 };

// Review items sort above open ones: they're the cheapest path to progress on
// a screen whose whole purpose is getting one thing done.
const byState = (a: Action, b: Action) =>
  stateOrder[a.state] - stateOrder[b.state];

// Every action lands in a group, `done` ones included: the screen collapses
// done items behind a disclosure, but which items sit there depends on session
// state (a reopened item has to move back into its group), so that split is the
// client's job. Grouping is not.
export function groupActionsByCustomer(
  actions: Action[],
  today: string,
): ActionGroup[] {
  const byCustomer = new Map<string, Action[]>();
  const withoutCustomer: Action[] = [];

  for (const action of actions) {
    if (!action.customerId) {
      withoutCustomer.push(action);
      continue;
    }

    const existing = byCustomer.get(action.customerId);

    if (existing) existing.push(action);
    else byCustomer.set(action.customerId, [action]);
  }

  const groups: ActionGroup[] = [];

  for (const [customerId, groupActions] of byCustomer) {
    const customer = getCustomerById(customerId, today);

    // A fixture pointing at a company that isn't in the customer book is a
    // typo, not a rendering case. Fail loudly instead of dropping the group.
    if (!customer) {
      throw new Error(`Unknown customer id in action fixtures: ${customerId}`);
    }

    groups.push({ customer, actions: [...groupActions].sort(byState) });
  }

  // Most recently interacted-with customer first, so today's meetings surface
  // above a company last seen weeks ago. A customer with no interaction sorts
  // to the end of the customer groups.
  groups.sort((a, b) =>
    (b.customer?.lastInteractionAt ?? "").localeCompare(
      a.customer?.lastInteractionAt ?? "",
    ),
  );

  if (withoutCustomer.length > 0) {
    groups.push({ actions: [...withoutCustomer].sort(byState) });
  }

  return groups;
}
