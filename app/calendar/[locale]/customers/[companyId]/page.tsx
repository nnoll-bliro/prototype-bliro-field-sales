import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCalendarDictionary,
  interpolateCopy,
  requireCalendarLocale,
} from "@/app/calendar/_lib/i18n";
import { getCustomerById } from "@/app/calendar/_lib/customers";
import { getPrototypeToday } from "@/app/calendar/_lib/today";
import { BottomNav } from "@/components/calendar/bottom-nav";
import { CalendarScreen } from "@/components/calendar/calendar-screen";
import { CustomerDetailView } from "@/components/calendar/customer-detail-view";

type CustomerDetailPageProps = {
  params: Promise<{ locale: string; companyId: string }>;
};

// Deliberately not prerendered: the screen's dates are relative to the real
// today, and a build-time render would freeze them at the deploy date.

export async function generateMetadata({
  params,
}: CustomerDetailPageProps): Promise<Metadata> {
  const { companyId, locale } = await params;
  const copy = getCalendarDictionary(locale);
  const customer = getCustomerById(companyId, getPrototypeToday());

  if (!customer) return copy.metadata.customers;

  return {
    title: interpolateCopy(copy.metadata.customerDetail.title, {
      company: customer.name,
    }),
    description: interpolateCopy(copy.metadata.customerDetail.description, {
      company: customer.name,
    }),
  };
}

export default async function CustomerDetailPage({
  params,
}: CustomerDetailPageProps) {
  const { companyId, locale: rawLocale } = await params;
  const locale = requireCalendarLocale(rawLocale);
  const copy = getCalendarDictionary(locale);
  const today = getPrototypeToday();
  const customer = getCustomerById(companyId, today);

  if (!customer) notFound();

  return (
    <CalendarScreen
      locale={locale}
      nav={
        <BottomNav
          active="customers"
          copy={copy.navigation}
          destinations={{
            calendar: `/calendar/${locale}/now`,
            customers: `/calendar/${locale}/customers`,
            microphone: `/calendar/${locale}/transcription`,
          }}
        />
      }
    >
      <CustomerDetailView
        copy={copy.customerDetail}
        customer={customer}
        customersHref={`/calendar/${locale}/customers`}
        industryLabel={copy.customers.industries[customer.industry]}
        locale={locale}
        roleLabel={copy.customers.roles[customer.contactRole]}
        today={today}
      />
    </CalendarScreen>
  );
}
