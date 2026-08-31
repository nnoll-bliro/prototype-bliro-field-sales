import type { Metadata } from "next";
import {
  getCalendarDictionary,
  requireCalendarLocale,
} from "@/app/calendar/_lib/i18n";
import {
  groupActionsByCustomer,
  resolveActions,
} from "@/app/calendar/_lib/actions";
import { getPrototypeToday } from "@/app/calendar/_lib/today";
import { ActionsView } from "@/components/calendar/actions-view";
import { BottomNav } from "@/components/calendar/bottom-nav";
import { CalendarScreen } from "@/components/calendar/calendar-screen";

type ActionsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: ActionsPageProps): Promise<Metadata> {
  const copy = getCalendarDictionary((await params).locale);

  return copy.metadata.actions;
}

export default async function ActionsPage({ params }: ActionsPageProps) {
  const locale = requireCalendarLocale((await params).locale);
  const copy = getCalendarDictionary(locale);
  const today = getPrototypeToday();
  const groups = groupActionsByCustomer(resolveActions(today), today);

  return (
    <CalendarScreen
      locale={locale}
      nav={
        <BottomNav
          active="actions"
          copy={copy.navigation}
          destinations={{
            // Actions has no pre/now/post phase, so returning to the calendar
            // always lands on the active-meeting phase.
            calendar: `/calendar/${locale}/now`,
            actions: `/calendar/${locale}/actions`,
            customers: `/calendar/${locale}/customers`,
            microphone: `/calendar/${locale}/transcription`,
          }}
        />
      }
    >
      <header>
        <h1 className="text-[2rem] font-bold leading-10 tracking-[-0.035em] text-heading">
          {copy.actions.title}
        </h1>
      </header>

      <ActionsView copy={copy.actions} groups={groups} />
    </CalendarScreen>
  );
}
