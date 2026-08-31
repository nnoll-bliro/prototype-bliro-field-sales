// Pure formatting helpers, safe to import from client components: no fixtures,
// no `new Date()`, nothing server-only.

// The prototype is built for a German field-sales audience, so even its
// English copy uses day-before-month ordering ("18 Jun 2026", not "Jun 18").
const intlLocales: Record<string, string> = {
  de: "de-DE",
  en: "en-GB",
};

export function intlLocale(locale: string): string {
  return intlLocales[locale] ?? locale;
}

// Formatted in UTC to match how the dates are stored — see `today.ts`.
export function formatCustomerDate(isoDate: string, locale: string): string {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

// "Dienstag, 18. Juni" / "Tuesday, 18 June" — the calendar header's date line.
export function formatCalendarDay(isoDate: string, locale: string): string {
  return new Intl.DateTimeFormat(intlLocale(locale), {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

// "Wacker Neuson" -> "WN", "Otis" -> "OT". Two characters keeps the monogram
// legible at the 44px logo size without shrinking the type below the baseline.
export function getCustomerInitials(name: string): string {
  const words = name.split(/[\s-]+/).filter(Boolean);

  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();

  return (words[0][0] + words[1][0]).toUpperCase();
}
