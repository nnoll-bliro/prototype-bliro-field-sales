import type { Metadata } from "next";
import {
  getCalendarDictionary,
  requireCalendarLocale,
} from "@/app/calendar/_lib/i18n";
import { CalendarView } from "@/components/calendar/calendar-view";

type PreMeetingPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PreMeetingPageProps): Promise<Metadata> {
  const copy = getCalendarDictionary((await params).locale);

  return copy.metadata.pre;
}

export default async function PreMeetingPage({ params }: PreMeetingPageProps) {
  const locale = requireCalendarLocale((await params).locale);
  const copy = getCalendarDictionary(locale);

  return <CalendarView copy={copy} locale={locale} phase="pre" />;
}
