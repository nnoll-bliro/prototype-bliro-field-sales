import { addDays } from "@/app/calendar/_lib/today";

// Fixture customer book for the calendar prototype's Customers tab.
//
// Every date is stored as an offset in days from "today" rather than as a
// fixed calendar date, so the prototype never looks stale: demoed in August it
// shows August dates. `resolveCustomers` turns the offsets into real dates on
// the server, and only resolved strings cross into the client.

// Industry and role are closed sets rendered through the dictionaries, so the
// list reads in German and English without duplicating the fixture book.
// Company names, contact names and cities are proper nouns and stay as-is.
export const customerIndustries = [
  "aviation",
  "energy",
  "manufacturing",
  "construction",
  "logistics",
  "automotive",
  "agriculture",
  "buildingTech",
] as const;

export const customerRoles = [
  "headOfMaintenance",
  "purchasingLead",
  "opsManager",
  "plantManager",
  "technicalDirector",
  "siteManager",
  "procurementManager",
  "serviceLead",
] as const;

export type CustomerIndustry = (typeof customerIndustries)[number];
export type CustomerRole = (typeof customerRoles)[number];

type CustomerFixture = {
  id: string;
  name: string;
  // Only four companies have real artwork in `public/logos/`. The rest fall
  // back to an initials monogram in the same slot, so row height never varies.
  logoSrc?: string;
  contactName: string;
  contactRole: CustomerRole;
  city: string;
  industry: CustomerIndustry;
  // Days before today. Absent means the company is in the book but has no
  // interaction history yet.
  lastInteractionDaysAgo?: number;
  // Pinned companies are the ones the calendar prototype already shows today.
  pinned?: boolean;
};

// A customer with its dates resolved to real `YYYY-MM-DD` strings. This is the
// shape components receive; nothing downstream sees a day offset.
export type Customer = Omit<CustomerFixture, "lastInteractionDaysAgo"> & {
  lastInteractionAt?: string;
};

const customerFixtures: CustomerFixture[] = [
  {
    id: "lufthansa",
    name: "Lufthansa",
    logoSrc: "/logos/lufthansa.svg",
    contactName: "Tim Berger",
    contactRole: "headOfMaintenance",
    city: "Frankfurt am Main",
    industry: "aviation",
    lastInteractionDaysAgo: 0,
    pinned: true,
  },
  {
    id: "rosen-group",
    name: "ROSEN Group",
    logoSrc: "/logos/rosen.svg",
    contactName: "Igor Petrov",
    contactRole: "technicalDirector",
    city: "Lingen",
    industry: "energy",
    lastInteractionDaysAgo: 1,
    pinned: true,
  },
  {
    id: "otis",
    name: "Otis",
    logoSrc: "/logos/otis.svg",
    contactName: "Stefan Müller",
    contactRole: "serviceLead",
    city: "Berlin",
    industry: "buildingTech",
    lastInteractionDaysAgo: 0,
    pinned: true,
  },
  {
    id: "john-deere",
    name: "John Deere",
    logoSrc: "/logos/john-deere.svg",
    contactName: "Anna Kowalski",
    contactRole: "purchasingLead",
    city: "Mannheim",
    industry: "agriculture",
    lastInteractionDaysAgo: 7,
  },
  {
    id: "bosch-rexroth",
    name: "Bosch Rexroth",
    contactName: "Katrin Wagner",
    contactRole: "plantManager",
    city: "Lohr am Main",
    industry: "manufacturing",
    lastInteractionDaysAgo: 12,
  },
  {
    id: "duerr",
    name: "Dürr",
    contactName: "Markus Lindner",
    contactRole: "opsManager",
    city: "Bietigheim-Bissingen",
    industry: "automotive",
    lastInteractionDaysAgo: 20,
  },
  {
    id: "festo",
    name: "Festo",
    contactName: "Nina Brandt",
    contactRole: "procurementManager",
    city: "Esslingen",
    industry: "manufacturing",
    lastInteractionDaysAgo: 27,
  },
  {
    id: "heidelberg-materials",
    name: "Heidelberg Materials",
    contactName: "Jonas Weber",
    contactRole: "siteManager",
    city: "Heidelberg",
    industry: "construction",
  },
  {
    id: "kaercher",
    name: "Kärcher",
    contactName: "Sabine Hofmann",
    contactRole: "serviceLead",
    city: "Winnenden",
    industry: "manufacturing",
    lastInteractionDaysAgo: 35,
  },
  {
    id: "knorr-bremse",
    name: "Knorr-Bremse",
    contactName: "Philipp Reuter",
    contactRole: "technicalDirector",
    city: "München",
    industry: "automotive",
    lastInteractionDaysAgo: 49,
  },
  {
    id: "liebherr",
    name: "Liebherr",
    contactName: "Elena Fischer",
    contactRole: "purchasingLead",
    city: "Biberach an der Riß",
    industry: "construction",
    lastInteractionDaysAgo: 14,
  },
  {
    id: "sms-group",
    name: "SMS group",
    contactName: "Daniel Krause",
    contactRole: "plantManager",
    city: "Düsseldorf",
    industry: "manufacturing",
  },
  {
    id: "siemens-energy",
    name: "Siemens Energy",
    contactName: "Laura Schmitt",
    contactRole: "headOfMaintenance",
    city: "Erlangen",
    industry: "energy",
    lastInteractionDaysAgo: 42,
  },
  {
    id: "thyssenkrupp",
    name: "thyssenkrupp",
    contactName: "Ömer Yildirim",
    contactRole: "opsManager",
    city: "Essen",
    industry: "manufacturing",
    lastInteractionDaysAgo: 61,
  },
  {
    id: "trumpf",
    name: "TRUMPF",
    contactName: "Christine Bauer",
    contactRole: "procurementManager",
    city: "Ditzingen",
    industry: "manufacturing",
    lastInteractionDaysAgo: 5,
  },
  {
    id: "viessmann",
    name: "Viessmann",
    contactName: "Hendrik Vogel",
    contactRole: "serviceLead",
    city: "Allendorf",
    industry: "buildingTech",
  },
  {
    id: "wacker-neuson",
    name: "Wacker Neuson",
    contactName: "Tobias Lang",
    contactRole: "siteManager",
    city: "München",
    industry: "construction",
    lastInteractionDaysAgo: 84,
  },
  {
    id: "zeppelin-baumaschinen",
    name: "Zeppelin Baumaschinen",
    contactName: "Miriam Scholz",
    contactRole: "purchasingLead",
    city: "Garching",
    industry: "construction",
    lastInteractionDaysAgo: 47,
  },
];

export const customerCount = customerFixtures.length;

function resolve(fixture: CustomerFixture, today: string): Customer {
  const { lastInteractionDaysAgo, ...rest } = fixture;

  return {
    ...rest,
    lastInteractionAt:
      lastInteractionDaysAgo === undefined
        ? undefined
        : addDays(today, -lastInteractionDaysAgo),
  };
}

// `localeCompare` with the German collation so umlauts sort where a German
// reader expects them ("Dürr" next to "Duro", not after "Z").
const byName = (a: Customer, b: Customer) =>
  a.name.localeCompare(b.name, "de", { sensitivity: "base" });

export function resolveCustomers(today: string): {
  pinned: Customer[];
  others: Customer[];
} {
  const resolved = customerFixtures.map((fixture) => resolve(fixture, today));

  return {
    pinned: resolved.filter((customer) => customer.pinned),
    others: resolved.filter((customer) => !customer.pinned).sort(byName),
  };
}

export function getCustomerById(
  id: string,
  today: string,
): Customer | undefined {
  const fixture = customerFixtures.find((candidate) => candidate.id === id);

  return fixture ? resolve(fixture, today) : undefined;
}

export type CustomerMeeting = {
  id: string;
  date: string;
  time: string;
  person: string;
};

type MeetingFixture = Omit<CustomerMeeting, "date"> & {
  // Days before today; 0 is today.
  daysAgo: number;
};

// Explicit meeting history for the companies the calendar prototype already
// shows, so the two screens tell the same story: Lufthansa today at 12:15,
// ROSEN Group's follow-up from yesterday at 14:00, Otis later today at 15:30.
const meetingFixtures: Record<string, MeetingFixture[]> = {
  lufthansa: [
    { id: "lufthansa-now", daysAgo: 0, time: "12:15", person: "Tim Berger" },
    { id: "lufthansa-prev", daysAgo: 28, time: "10:00", person: "Tim Berger" },
    { id: "lufthansa-first", daysAgo: 63, time: "09:30", person: "Tim Berger" },
  ],
  "rosen-group": [
    { id: "rosen-yesterday", daysAgo: 1, time: "14:00", person: "Igor Petrov" },
    { id: "rosen-first", daysAgo: 70, time: "09:30", person: "Igor Petrov" },
  ],
  otis: [
    { id: "otis-later", daysAgo: 0, time: "15:30", person: "Stefan Müller" },
  ],
  "john-deere": [
    { id: "john-deere-last", daysAgo: 7, time: "11:00", person: "Anna Kowalski" },
  ],
};

// Companies without an explicit history fall back to the single meeting their
// last interaction implies. A company with no interaction at all gets an empty
// list — the detail screen shows an empty state rather than inventing one.
export function getCustomerMeetings(
  customer: Customer,
  today: string,
): CustomerMeeting[] {
  const explicit = meetingFixtures[customer.id];

  if (explicit) {
    return explicit.map(({ daysAgo, ...meeting }) => ({
      ...meeting,
      date: addDays(today, -daysAgo),
    }));
  }

  if (!customer.lastInteractionAt) return [];

  return [
    {
      id: `${customer.id}-last`,
      date: customer.lastInteractionAt,
      time: "10:00",
      person: customer.contactName,
    },
  ];
}

// A meeting dated today counts as upcoming; anything earlier is past.
export function splitCustomerMeetings(
  meetings: CustomerMeeting[],
  today: string,
): { upcoming: CustomerMeeting[]; past: CustomerMeeting[] } {
  const sorted = [...meetings].sort((a, b) =>
    `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`),
  );

  return {
    upcoming: sorted.filter((meeting) => meeting.date >= today),
    past: sorted.filter((meeting) => meeting.date < today),
  };
}
