"use client";

import { useId, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Customer } from "@/app/calendar/_lib/customers";
import { searchCustomers } from "@/app/calendar/_lib/customer-search";
import { interpolateCopy } from "@/app/calendar/_lib/interpolate";
import { CustomerRow } from "@/components/calendar/customer-row";
import { Separator } from "@/components/ui/shadcn/separator";

export type CustomerListCopy = {
  searchLabel: string;
  searchPlaceholder: string;
  clearSearchLabel: string;
  pinnedHeading: string;
  allHeading: string;
  resultsHeading: string;
  resultsHeadingOne: string;
  noResultsTitle: string;
  noResultsBody: string;
  showAllAction: string;
  lastContact: string;
  noContactYet: string;
};

function SectionHeading({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  return (
    <h2 id={id} className="text-xl font-bold text-heading">
      {children}
    </h2>
  );
}

// The list owns only the query. Everything else — copy, fixtures, hrefs —
// arrives from the server route, so this stays the one client boundary on the
// screen rather than turning the whole page into a client component.
export function CustomerListView({
  copy,
  detailHrefBase,
  locale,
  others,
  pinned,
}: {
  copy: CustomerListCopy;
  // A base path rather than a builder function: props crossing the
  // server/client boundary have to be serializable, and a function is not.
  detailHrefBase: string;
  locale: string;
  others: Customer[];
  pinned: Customer[];
}) {
  const [query, setQuery] = useState("");
  const searchInputId = useId();

  const isSearching = query.trim().length > 0;
  const results = useMemo(
    () => (isSearching ? searchCustomers([...pinned, ...others], query) : []),
    [isSearching, others, pinned, query],
  );

  const rowCopy = {
    lastContact: copy.lastContact,
    noContactYet: copy.noContactYet,
  };

  const renderRows = (customers: Customer[]) =>
    customers.map((customer) => (
      <CustomerRow
        key={customer.id}
        copy={rowCopy}
        customer={customer}
        href={`${detailHrefBase}/${customer.id}`}
        locale={locale}
      />
    ));

  return (
    <div className="mt-8">
      <div>
        <label
          htmlFor={searchInputId}
          className="block text-base font-semibold text-foreground"
        >
          {copy.searchLabel}
        </label>
        <div className="relative mt-2">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id={searchInputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.searchPlaceholder}
            autoComplete="off"
            className="min-h-12 w-full rounded-xl border border-input bg-background py-2 pl-12 pr-14 text-base leading-6 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-search-cancel-button]:hidden"
          />
          {isSearching ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={copy.clearSearchLabel}
              className="absolute right-1 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Result count is announced rather than left as a silent visual change. */}
      <div aria-live="polite" className="sr-only">
        {isSearching
          ? interpolateCopy(
              results.length === 1
                ? copy.resultsHeadingOne
                : copy.resultsHeading,
              { count: results.length, query: query.trim() },
            )
          : ""}
      </div>

      {isSearching ? (
        results.length > 0 ? (
          <section className="mt-10" aria-labelledby="customer-results-heading">
            <SectionHeading id="customer-results-heading">
              {interpolateCopy(
                results.length === 1
                  ? copy.resultsHeadingOne
                  : copy.resultsHeading,
                { count: results.length, query: query.trim() },
              )}
            </SectionHeading>
            <ul className="mt-4 space-y-3">{renderRows(results)}</ul>
          </section>
        ) : (
          <section
            className="mt-10 rounded-2xl border border-border bg-card p-6"
            aria-labelledby="customer-results-heading"
          >
            <SectionHeading id="customer-results-heading">
              {interpolateCopy(copy.noResultsTitle, { query: query.trim() })}
            </SectionHeading>
            <p className="mt-2 text-base leading-6 text-muted-foreground">
              {copy.noResultsBody}
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-4 flex min-h-12 w-full items-center justify-center rounded-xl border border-input bg-background px-5 text-base font-bold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {copy.showAllAction}
            </button>
          </section>
        )
      ) : (
        <>
          <section className="mt-10" aria-labelledby="customer-pinned-heading">
            <SectionHeading id="customer-pinned-heading">
              {copy.pinnedHeading}
            </SectionHeading>
            <ul className="mt-4 space-y-3">{renderRows(pinned)}</ul>
          </section>

          <Separator className="mt-10" />

          <section className="mt-10" aria-labelledby="customer-all-heading">
            <SectionHeading id="customer-all-heading">
              {copy.allHeading}
            </SectionHeading>
            <ul className="mt-4 space-y-3">{renderRows(others)}</ul>
          </section>
        </>
      )}
    </div>
  );
}
