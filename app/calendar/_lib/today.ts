// The one place the prototype asks what day it is. Everything else takes a
// `today` argument, so no module computes a date as a side effect of being
// imported — that would give the server and the browser different answers.
//
// Dates are handled as plain `YYYY-MM-DD` strings in UTC. The prototype has no
// real timezone story, and keeping every date at UTC midnight means the server
// render and the client hydration always agree.
export function getPrototypeToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export function addDays(isoDate: string, days: number): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);

  return date.toISOString().slice(0, 10);
}
