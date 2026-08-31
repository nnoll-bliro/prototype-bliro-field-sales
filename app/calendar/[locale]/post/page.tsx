import type { Metadata } from "next";
import {
  getCalendarDictionary,
  requireCalendarLocale,
} from "@/app/calendar/_lib/i18n";
import { CalendarView } from "@/components/calendar/calendar-view";

type PostMeetingPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PostMeetingPageProps): Promise<Metadata> {
  const copy = getCalendarDictionary((await params).locale);

  return copy.metadata.post;
}

export default async function PostMeetingPage({
  params,
}: PostMeetingPageProps) {
  const locale = requireCalendarLocale((await params).locale);
  const copy = getCalendarDictionary(locale);

  return <CalendarView copy={copy} locale={locale} phase="post" />;
}
