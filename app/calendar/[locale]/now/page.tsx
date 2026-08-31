import type { Metadata } from "next";
import {
  getCalendarDictionary,
  requireCalendarLocale,
} from "@/app/calendar/_lib/i18n";
import { CalendarView } from "@/components/calendar/calendar-view";

type CurrentMeetingPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: CurrentMeetingPageProps): Promise<Metadata> {
  const copy = getCalendarDictionary((await params).locale);

  return copy.metadata.now;
}

export default async function CurrentMeetingPage({
  params,
}: CurrentMeetingPageProps) {
  const locale = requireCalendarLocale((await params).locale);
  const copy = getCalendarDictionary(locale);

  return <CalendarView copy={copy} locale={locale} phase="now" />;
}
