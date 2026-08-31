import { redirect } from "next/navigation";
import { requireCalendarLocale } from "@/app/calendar/_lib/i18n";

type CalendarLocalePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function CalendarLocalePage({
  params,
}: CalendarLocalePageProps) {
  const locale = requireCalendarLocale((await params).locale);

  redirect(`/calendar/${locale}/pre`);
}
