import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getCustomerMeetings,
  splitCustomerMeetings,
  type Customer,
  type CustomerMeeting,
} from "@/app/calendar/_lib/customers";
import {
  formatCustomerDate,
  getCustomerInitials,
} from "@/app/calendar/_lib/customer-format";
import { CompanyLogo } from "@/components/calendar/company-logo";
import { MeetingCard } from "@/components/calendar/meeting-card";

export type CustomerDetailCopy = {
  backLabel: string;
  companyDataHeading: string;
  industryLabel: string;
  locationLabel: string;
  contactLabel: string;
  lastContactLabel: string;
  lastContactNone: string;
  meetingsHeading: string;
  upcomingHeading: string;
  pastHeading: string;
  meetingsEmpty: string;
  chatsHeading: string;
  chatsEmpty: string;
  chatsHint: string;
};

// A labelled fact. Label and value both sit at `text-base` — the label is the
// muted one, because the value is what the reader came for.
function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <dt className="text-base leading-6 text-muted-foreground">{label}</dt>
      <dd className="break-words text-base font-semibold leading-6 text-foreground">
        {value}
      </dd>
    </div>
  );
}

// Every section on this screen ends in either real content or a plainly worded
// empty state. Nothing renders a heading over a blank space, and nothing
// promises an action the prototype cannot perform.
function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-2xl border border-dashed border-border bg-card p-6 text-base leading-6 text-muted-foreground">
      {children}
    </p>
  );
}

function MeetingList({
  logoSrc,
  company,
  initials,
  locale,
  meetings,
}: {
  logoSrc?: string;
  company: string;
  initials: string;
  locale: string;
  meetings: CustomerMeeting[];
}) {
  return (
    <div className="space-y-3">
      {meetings.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          time={`${formatCustomerDate(meeting.date, locale)} · ${meeting.time}`}
          logoSrc={logoSrc}
          initials={initials}
          company={company}
          person={meeting.person}
        />
      ))}
    </div>
  );
}

export function CustomerDetailView({
  copy,
  customer,
  customersHref,
  industryLabel,
  locale,
  roleLabel,
  today,
}: {
  copy: CustomerDetailCopy;
  customer: Customer;
  customersHref: string;
  industryLabel: string;
  locale: string;
  roleLabel: string;
  today: string;
}) {
  const initials = getCustomerInitials(customer.name);
  const { upcoming, past } = splitCustomerMeetings(
    getCustomerMeetings(customer, today),
    today,
  );
  const hasMeetings = upcoming.length > 0 || past.length > 0;

  return (
    <>
      <Link
        href={customersHref}
        className="-ml-2 inline-flex min-h-12 items-center gap-2 rounded-lg px-2 text-base font-semibold text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <ArrowLeft className="size-5" aria-hidden="true" />
        {copy.backLabel}
      </Link>

      <header className="mt-4 flex items-center gap-4">
        <CompanyLogo
          logoSrc={customer.logoSrc}
          initials={initials}
          className="size-16 rounded-2xl"
        />
        <div className="min-w-0">
          <h1 className="break-words text-[2rem] font-bold leading-10 tracking-[-0.035em] text-heading">
            {customer.name}
          </h1>
          <p className="mt-1 break-words text-base leading-6 text-muted-foreground">
            {industryLabel} · {customer.city}
          </p>
        </div>
      </header>

      <section className="mt-10" aria-labelledby="company-data-heading">
        <h2
          id="company-data-heading"
          className="text-xl font-bold text-heading"
        >
          {copy.companyDataHeading}
        </h2>
        <dl className="mt-4 space-y-4 rounded-2xl border border-border bg-card p-6">
          <DataRow label={copy.industryLabel} value={industryLabel} />
          <DataRow label={copy.locationLabel} value={customer.city} />
          <DataRow
            label={copy.contactLabel}
            value={`${customer.contactName} · ${roleLabel}`}
          />
          <DataRow
            label={copy.lastContactLabel}
            value={
              customer.lastInteractionAt
                ? formatCustomerDate(customer.lastInteractionAt, locale)
                : copy.lastContactNone
            }
          />
        </dl>
      </section>

      <section className="mt-10" aria-labelledby="customer-meetings-heading">
        <h2
          id="customer-meetings-heading"
          className="text-xl font-bold text-heading"
        >
          {copy.meetingsHeading}
        </h2>

        {hasMeetings ? (
          <>
            {upcoming.length > 0 ? (
              <>
                <h3 className="mt-4 text-base font-bold text-foreground">
                  {copy.upcomingHeading}
                </h3>
                <div className="mt-3">
                  <MeetingList
                    logoSrc={customer.logoSrc}
                    company={customer.name}
                    initials={initials}
                    locale={locale}
                    meetings={upcoming}
                  />
                </div>
              </>
            ) : null}

            {past.length > 0 ? (
              <>
                <h3 className="mt-6 text-base font-bold text-foreground">
                  {copy.pastHeading}
                </h3>
                <div className="mt-3">
                  <MeetingList
                    logoSrc={customer.logoSrc}
                    company={customer.name}
                    initials={initials}
                    locale={locale}
                    meetings={past}
                  />
                </div>
              </>
            ) : null}
          </>
        ) : (
          <div className="mt-4">
            <EmptyState>{copy.meetingsEmpty}</EmptyState>
          </div>
        )}
      </section>

      {/* Deliberately empty: the shape of chat and artifact data is still
          being scoped, so this section states what will appear here rather
          than showing invented threads or a button that does nothing. */}
      <section className="mt-10" aria-labelledby="customer-chats-heading">
        <h2 id="customer-chats-heading" className="text-xl font-bold text-heading">
          {copy.chatsHeading}
        </h2>
        <div className="mt-4">
          <EmptyState>
            {copy.chatsEmpty}{" "}
            <span className="block mt-2">{copy.chatsHint}</span>
          </EmptyState>
        </div>
      </section>
    </>
  );
}
