import "server-only";

import { notFound } from "next/navigation";
import deDictionary from "../_dictionaries/de.json";
import enDictionary from "../_dictionaries/en.json";

// Re-exported so existing server callers keep one import site.
export { interpolateCopy } from "./interpolate";

export const calendarLocales = ["de", "en"] as const;
export const calendarPhases = ["pre", "now", "post"] as const;

export type CalendarLocale = (typeof calendarLocales)[number];
export type CalendarPhase = (typeof calendarPhases)[number];
export type CalendarDictionary = typeof deDictionary;

const dictionaries = {
  de: deDictionary,
  en: enDictionary,
} satisfies Record<CalendarLocale, CalendarDictionary>;

export function isCalendarLocale(locale: string): locale is CalendarLocale {
  return calendarLocales.some((candidate) => candidate === locale);
}

export function requireCalendarLocale(locale: string): CalendarLocale {
  if (!isCalendarLocale(locale)) notFound();

  return locale;
}

export function getCalendarDictionary(locale: string): CalendarDictionary {
  return dictionaries[requireCalendarLocale(locale)];
}
