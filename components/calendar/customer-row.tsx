import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Customer } from "@/app/calendar/_lib/customers";
import {
  formatCustomerDate,
  getCustomerInitials,
} from "@/app/calendar/_lib/customer-format";
import { CompanyLogo } from "@/components/calendar/company-logo";
import { interpolateCopy } from "@/app/calendar/_lib/interpolate";

export type CustomerRowCopy = {
  lastContact: string;
  noContactYet: string;
};

// One customer in the list. The whole row is the link target — enlarging only
// the logo or the name would leave most of the row inert under a thumb.
// A company name is unbounded, so it wraps rather than truncating, and the
// only fixed element on the row is the chevron, which is allowed here because
// the row genuinely navigates somewhere.
export function CustomerRow({
  copy,
  customer,
  href,
  locale,
}: {
  copy: CustomerRowCopy;
  customer: Customer;
  href: string;
  locale: string;
}) {
  const lastContact = customer.lastInteractionAt
    ? interpolateCopy(copy.lastContact, {
        date: formatCustomerDate(customer.lastInteractionAt, locale),
      })
    : copy.noContactYet;

  return (
    <li>
      <Link
        href={href}
        className="flex min-h-[4.5rem] w-full items-center gap-4 rounded-2xl border border-border bg-card px-4 py-3 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <CompanyLogo
          logoSrc={customer.logoSrc}
          initials={getCustomerInitials(customer.name)}
        />
        <span className="min-w-0 flex-1">
          <span className="block break-words text-base font-bold leading-6 text-heading">
            {customer.name}
          </span>
          <span className="mt-1 block break-words text-base leading-6 text-muted-foreground">
            {customer.contactName} · {lastContact}
          </span>
        </span>
        <ChevronRight
          className="size-5 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />
      </Link>
    </li>
  );
}
