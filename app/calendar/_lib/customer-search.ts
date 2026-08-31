import type { Customer } from "@/app/calendar/_lib/customers";

// Fold case, umlauts and ß so a German field rep reaches the same company
// however they type it: "Dürr", "duerr" and "durr" all normalize alike.
// NFD splits "ü" into "u" + a combining mark, which the range below strips;
// collapsing the "ue"/"oe"/"ae" transliterations afterwards — on both the
// company name and the query — makes the two spellings meet in the middle.
function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ue/g, "u")
    .replace(/oe/g, "o")
    .replace(/ae/g, "a");
}

// Scoring, highest wins. The three tiers are deliberately far apart so a tier
// never overtakes the one above it, however long the string:
//
//   1000  prefix       "luft" -> Lufthansa
//    800  substring    "hansa" -> Lufthansa   (earlier match scores higher)
//    400  subsequence  "rosn" -> ROSEN Group, "lh" -> Lufthansa/Liebherr
//
// Within the subsequence tier a tighter span scores higher, and an equal span
// falls back to alphabetical order — a two-letter query like "lh" legitimately
// matches several companies and lists them all rather than guessing.
// Returns null when the query does not match at all.
function scoreField(field: string, query: string): number | null {
  const haystack = normalize(field);
  const needle = normalize(query);

  if (needle.length === 0) return 0;
  if (haystack.startsWith(needle)) return 1000;

  const index = haystack.indexOf(needle);
  if (index !== -1) return 800 - Math.min(index, 200);

  // Also treat a match at the start of any later word as a strong hit, so
  // "group" finds "ROSEN Group" ahead of an incidental mid-word match.
  let cursor = 0;
  let firstIndex = -1;
  let lastIndex = -1;

  for (const character of needle) {
    const found = haystack.indexOf(character, cursor);
    if (found === -1) return null;
    if (firstIndex === -1) firstIndex = found;
    lastIndex = found;
    cursor = found + 1;
  }

  const span = lastIndex - firstIndex;
  return 400 - Math.min(span, 200) - Math.min(firstIndex, 100);
}

// Company name outranks contact name: someone typing "berger" should still
// find Lufthansa, but a company literally called "Berger" would come first.
const CONTACT_PENALTY = 120;

export function scoreCustomer(
  customer: Customer,
  query: string,
): number | null {
  const nameScore = scoreField(customer.name, query);
  const contactScore = scoreField(customer.contactName, query);
  const penalized =
    contactScore === null ? null : contactScore - CONTACT_PENALTY;

  if (nameScore === null) return penalized;
  if (penalized === null) return nameScore;

  return Math.max(nameScore, penalized);
}

export function searchCustomers(
  customers: readonly Customer[],
  query: string,
): Customer[] {
  const trimmed = query.trim();
  if (trimmed.length === 0) return [...customers];

  return customers
    .map((customer) => ({ customer, score: scoreCustomer(customer, trimmed) }))
    .filter(
      (entry): entry is { customer: Customer; score: number } =>
        entry.score !== null,
    )
    .sort(
      (a, b) =>
        b.score - a.score ||
        a.customer.name.localeCompare(b.customer.name, "de", {
          sensitivity: "base",
        }),
    )
    .map((entry) => entry.customer);
}
