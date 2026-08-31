import type { Metadata } from "next";
import {
  getCalendarDictionary,
  requireCalendarLocale,
} from "@/app/calendar/_lib/i18n";
import { CalendarLiveTranscriptionView } from "@/components/calendar/live-transcription-view";

type CalendarTranscriptionPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: CalendarTranscriptionPageProps): Promise<Metadata> {
  const copy = getCalendarDictionary((await params).locale);

  return copy.metadata.transcription;
}

export default async function CalendarTranscriptionPage({
  params,
}: CalendarTranscriptionPageProps) {
  const locale = requireCalendarLocale((await params).locale);
  const copy = getCalendarDictionary(locale);

  return (
    <CalendarLiveTranscriptionView copy={copy.transcription} locale={locale} />
  );
}
