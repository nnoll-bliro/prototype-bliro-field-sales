import type { Metadata } from "next";
import {
  getCalendarDictionary,
  interpolateCopy,
  requireCalendarLocale,
} from "@/app/calendar/_lib/i18n";
import {
  customerCount,
  resolveCustomers,
} from "@/app/calendar/_lib/customers";
import { getPrototypeToday } from "@/app/calendar/_lib/today";
import { BottomNav } from "@/components/calendar/bottom-nav";
import { CalendarScreen } from "@/components/calendar/calendar-screen";
import { CustomerListView } from "@/components/calendar/customer-list-view";

type CustomersPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: CustomersPageProps): Promise<Metadata> {
  const copy = getCalendarDictionary((await params).locale);

  return copy.metadata.customers;
}

export default async function CustomersPage({ params }: CustomersPageProps) {
  const locale = requireCalendarLocale((await params).locale);
  const copy = getCalendarDictionary(locale);
  const { others, pinned } = resolveCustomers(getPrototypeToday());

  return (
    <CalendarScreen
      locale={locale}
      nav={
        <BottomNav
          active="customers"
          copy={copy.navigation}
          destinations={{
            // Customers has no pre/now/post phase, so returning to the
            // calendar always lands on the active-meeting phase.
            calendar: `/calendar/${locale}/now`,
            customers: `/calendar/${locale}/customers`,
            microphone: `/calendar/${locale}/transcription`,
          }}
        />
      }
    >
      <header>
        <h1 className="text-[2rem] font-bold leading-10 tracking-[-0.035em] text-heading">
          {copy.customers.title}
        </h1>
        <p className="mt-2 text-base leading-6 text-muted-foreground">
          {interpolateCopy(copy.customers.summary, {
            count: customerCount,
          })}
        </p>
      </header>

      <CustomerListView
        copy={copy.customers}
        detailHrefBase={`/calendar/${locale}/customers`}
        locale={locale}
        others={others}
        pinned={pinned}
      />
    </CalendarScreen>
  );
}
