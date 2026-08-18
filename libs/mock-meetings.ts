export type MeetingScenario = "ongoing" | "upcoming" | "no-future";
export type MeetingLifecycle = "ongoing" | "upcoming" | "past";
export type VisitorReportStatus = "pending" | "complete";

export type Meeting = {
  id: string;
  title: string;
  customer: string;
  contact: string;
  location: string;
  startsAt: Date;
  endsAt: Date;
  visitorReportStatus: VisitorReportStatus;
};

export type MeetingView = Omit<Meeting, "startsAt" | "endsAt"> & {
  startsAt: string;
  endsAt: string;
  lifecycle: MeetingLifecycle;
  timeLabel: string;
  relativeLabel: string;
};

export type MeetingGroup = {
  label: string;
  meetings: MeetingView[];
};

export type HomeMeetingModel = {
  generatedAt: string;
  todayLabel: string;
  scenario: MeetingScenario;
  primary: MeetingView | null;
  secondary: MeetingView | null;
  pastGroups: MeetingGroup[];
};

type Fixture = {
  id: string;
  title: string;
  customer: string;
  contact: string;
  location: string;
  startMinutes?: number;
  endMinutes?: number;
  dayOffset?: number;
  startHour?: number;
  startMinute?: number;
  durationMinutes?: number;
  visitorReportStatus?: VisitorReportStatus;
};

const MINUTE = 60_000;

const sharedPastFixtures: Fixture[] = [
  {
    id: "nordlicht-store-check",
    title: "Store performance review",
    customer: "Nordlicht Retail",
    contact: "Leonie Hartmann",
    location: "Nordlicht Hamburg",
    startMinutes: -155,
    endMinutes: -95,
  },
  {
    id: "rotheim-follow-up",
    title: "Portfolio follow-up",
    customer: "Rotheim & Partner",
    contact: "Jonas Frey",
    location: "Video call",
    startMinutes: -290,
    endMinutes: -245,
    visitorReportStatus: "complete",
  },
  {
    id: "waldwerk-intro",
    title: "New collection introduction",
    customer: "Waldwerk GmbH",
    contact: "Mara König",
    location: "Waldwerk Munich",
    dayOffset: -1,
    startHour: 15,
    startMinute: 30,
    durationMinutes: 60,
  },
  {
    id: "nordstern-pricing",
    title: "Pricing discussion",
    customer: "Nordstern Markets",
    contact: "Daniel Roth",
    location: "Video call",
    dayOffset: -1,
    startHour: 10,
    startMinute: 0,
    durationMinutes: 45,
    visitorReportStatus: "complete",
  },
  {
    id: "hafen-quarterly",
    title: "Quarterly business review",
    customer: "Hafen & Co.",
    contact: "Nina Koch",
    location: "Hafen Berlin",
    dayOffset: -3,
    startHour: 13,
    startMinute: 30,
    durationMinutes: 75,
  },
  {
    id: "alpen-onboarding",
    title: "Team onboarding",
    customer: "Alpen Supply",
    contact: "Lukas Brandt",
    location: "Alpen Stuttgart",
    dayOffset: -5,
    startHour: 9,
    startMinute: 30,
    durationMinutes: 60,
    visitorReportStatus: "complete",
  },
  {
    id: "rheinland-renewal",
    title: "Renewal planning",
    customer: "Rheinland Handel",
    contact: "Sarah Jung",
    location: "Video call",
    dayOffset: -7,
    startHour: 11,
    startMinute: 0,
    durationMinutes: 45,
  },
  {
    id: "fokus-range",
    title: "Range review",
    customer: "Fokus Fachhandel",
    contact: "Tim Berger",
    location: "Fokus Cologne",
    dayOffset: -9,
    startHour: 14,
    startMinute: 0,
    durationMinutes: 60,
    visitorReportStatus: "complete",
  },
];

const scenarioFixtures: Record<MeetingScenario, Fixture[]> = {
  ongoing: [
    {
      id: "bergmann-quarterly",
      title: "Quarterly check-in",
      customer: "Bergmann Technik",
      contact: "Anna Bergmann",
      location: "Bergmann Berlin",
      startMinutes: -14,
      endMinutes: 31,
    },
    {
      id: "kern-assortment",
      title: "Assortment planning",
      customer: "Kern Handelsgruppe",
      contact: "Felix Kern",
      location: "Kern Potsdam",
      startMinutes: 96,
      endMinutes: 156,
    },
  ],
  upcoming: [
    {
      id: "bergmann-quarterly",
      title: "Quarterly check-in",
      customer: "Bergmann Technik",
      contact: "Anna Bergmann",
      location: "Bergmann Berlin",
      startMinutes: 34,
      endMinutes: 79,
    },
    {
      id: "kern-assortment",
      title: "Assortment planning",
      customer: "Kern Handelsgruppe",
      contact: "Felix Kern",
      location: "Kern Potsdam",
      startMinutes: 146,
      endMinutes: 206,
    },
  ],
  "no-future": [],
};

function atDayTime(
  now: Date,
  dayOffset: number,
  hour: number,
  minute: number,
): Date {
  const value = new Date(now);
  value.setHours(hour, minute, 0, 0);
  value.setDate(value.getDate() + dayOffset);
  return value;
}

function fixtureToMeeting(fixture: Fixture, now: Date): Meeting {
  let startsAt: Date;
  let endsAt: Date;

  if (fixture.startMinutes !== undefined && fixture.endMinutes !== undefined) {
    startsAt = new Date(now.getTime() + fixture.startMinutes * MINUTE);
    endsAt = new Date(now.getTime() + fixture.endMinutes * MINUTE);
  } else {
    startsAt = atDayTime(
      now,
      fixture.dayOffset ?? 0,
      fixture.startHour ?? 9,
      fixture.startMinute ?? 0,
    );
    endsAt = new Date(
      startsAt.getTime() + (fixture.durationMinutes ?? 45) * MINUTE,
    );
  }

  return {
    id: fixture.id,
    title: fixture.title,
    customer: fixture.customer,
    contact: fixture.contact,
    location: fixture.location,
    startsAt,
    endsAt,
    visitorReportStatus: fixture.visitorReportStatus ?? "pending",
  };
}

export function getMeetingLifecycle(
  meeting: Pick<Meeting, "startsAt" | "endsAt">,
  now: Date,
): MeetingLifecycle {
  if (meeting.startsAt.getTime() <= now.getTime() && now < meeting.endsAt) {
    return "ongoing";
  }

  return meeting.startsAt > now ? "upcoming" : "past";
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function formatTimeRange(meeting: Meeting): string {
  return `${formatTime(meeting.startsAt)}–${formatTime(meeting.endsAt)}`;
}

function getRelativeLabel(meeting: Meeting, lifecycle: MeetingLifecycle, now: Date) {
  if (lifecycle === "ongoing") {
    const minutesLeft = Math.max(
      1,
      Math.ceil((meeting.endsAt.getTime() - now.getTime()) / MINUTE),
    );
    return `Live now · ${minutesLeft} min left`;
  }

  if (lifecycle === "upcoming") {
    const minutesUntil = Math.max(
      1,
      Math.round((meeting.startsAt.getTime() - now.getTime()) / MINUTE),
    );
    if (minutesUntil < 60) return `In ${minutesUntil} min`;

    const hoursUntil = Math.floor(minutesUntil / 60);
    const remainder = minutesUntil % 60;
    return remainder === 0
      ? `In ${hoursUntil} hr`
      : `In ${hoursUntil} hr ${remainder} min`;
  }

  return meeting.visitorReportStatus === "complete"
    ? "Report completed"
    : "Follow-up pending";
}

function toMeetingView(meeting: Meeting, now: Date): MeetingView {
  const lifecycle = getMeetingLifecycle(meeting, now);
  return {
    ...meeting,
    startsAt: meeting.startsAt.toISOString(),
    endsAt: meeting.endsAt.toISOString(),
    lifecycle,
    timeLabel: formatTimeRange(meeting),
    relativeLabel: getRelativeLabel(meeting, lifecycle, now),
  };
}

function isSameCalendarDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function dateGroupLabel(date: Date, now: Date): string {
  if (isSameCalendarDay(date, now)) return "Earlier today";

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (isSameCalendarDay(date, yesterday)) return "Yesterday";

  const parts = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
  }).formatToParts(date);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? "";
  return `${part("weekday")} ${part("day")} ${part("month")}`;
}

export function buildHomeMeetingModel(
  now = new Date(),
  scenario: MeetingScenario = "ongoing",
): HomeMeetingModel {
  const meetings = [...scenarioFixtures[scenario], ...sharedPastFixtures].map(
    (fixture) => fixtureToMeeting(fixture, now),
  );

  const ongoing = meetings
    .filter((meeting) => getMeetingLifecycle(meeting, now) === "ongoing")
    .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
  const upcoming = meetings
    .filter((meeting) => getMeetingLifecycle(meeting, now) === "upcoming")
    .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
  const past = meetings
    .filter((meeting) => getMeetingLifecycle(meeting, now) === "past")
    .sort((a, b) => b.endsAt.getTime() - a.endsAt.getTime());

  const primary =
    ongoing[0] ??
    upcoming[0] ??
    past.find((meeting) => meeting.visitorReportStatus === "pending") ??
    null;
  const activeMeetings = [...ongoing, ...upcoming];
  const secondary =
    activeMeetings.find((meeting) => meeting.id !== primary?.id) ?? null;

  const history = past
    .filter(
      (meeting) => !(primary?.id === meeting.id && activeMeetings.length === 0),
    )
    .slice(0, 20);
  const grouped = new Map<string, MeetingView[]>();

  history.forEach((meeting) => {
    const label = dateGroupLabel(meeting.endsAt, now);
    const entries = grouped.get(label) ?? [];
    entries.push(toMeetingView(meeting, now));
    grouped.set(label, entries);
  });

  return {
    generatedAt: now.toISOString(),
    todayLabel: new Intl.DateTimeFormat("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(now),
    scenario,
    primary: primary ? toMeetingView(primary, now) : null,
    secondary: secondary ? toMeetingView(secondary, now) : null,
    pastGroups: Array.from(grouped, ([label, groupedMeetings]) => ({
      label,
      meetings: groupedMeetings,
    })),
  };
}

export function parseMeetingScenario(value?: string): MeetingScenario {
  if (value === "upcoming" || value === "no-future") return value;
  return "ongoing";
}

export function findOngoingMeetingForScenario(
  id: string | undefined,
  scenario: MeetingScenario,
  now = new Date(),
): MeetingView | null {
  if (!id) return null;

  const model = buildHomeMeetingModel(now, scenario);
  return (
    [model.primary, model.secondary].find(
      (meeting) => meeting?.id === id && meeting.lifecycle === "ongoing",
    ) ?? null
  );
}
