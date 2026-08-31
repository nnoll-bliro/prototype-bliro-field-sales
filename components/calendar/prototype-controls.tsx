import Link from "next/link";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import type {
  CalendarDictionary,
  CalendarLocale,
  CalendarPhase,
} from "@/app/calendar/_lib/i18n";
import {
  calendarLocales,
  calendarPhases,
} from "@/app/calendar/_lib/i18n";
import { cn } from "@/libs/utils";

type PrototypeControlsProps = {
  copy: CalendarDictionary["admin"];
  locale: CalendarLocale;
  phase: CalendarPhase;
};

const controlClassName =
  "flex min-h-9 items-center justify-center rounded-md px-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1";

export function PrototypeControls({
  copy,
  locale,
  phase,
}: PrototypeControlsProps) {
  return (
    <nav
      aria-label={copy.ariaLabel}
      className="absolute left-2 top-[max(0.5rem,env(safe-area-inset-top))] z-30 sm:left-4"
    >
      <details className="group relative">
        <summary
          aria-label={`${copy.label}: ${copy.languages[locale]}, ${copy.phases[phase]}`}
          className="flex min-h-11 cursor-pointer list-none items-center gap-1 rounded-md border border-border/70 bg-background/90 px-2 text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-foreground shadow-card backdrop-blur transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden"
        >
          <SlidersHorizontal className="size-3.5" aria-hidden="true" />
          <span aria-hidden="true">
            {locale} · {copy.phaseShort[phase]}
          </span>
          <ChevronDown
            className="size-3 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>

        <div className="absolute left-0 mt-1.5 w-max max-w-[calc(100vw-1rem)] space-y-1.5 rounded-lg border border-border bg-background p-1.5 shadow-popover">
          <div
            role="group"
            aria-label={copy.languageLabel}
            className="flex gap-1"
          >
            {calendarLocales.map((candidate) => {
              const active = candidate === locale;

              return (
                <Link
                  key={candidate}
                  href={`/calendar/${candidate}/${phase}`}
                  hrefLang={candidate}
                  aria-label={copy.languages[candidate]}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    controlClassName,
                    "min-w-9 uppercase",
                    active
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {candidate}
                </Link>
              );
            })}
          </div>

          <div
            role="group"
            aria-label={copy.phaseLabel}
            className="flex gap-1 border-t border-border pt-1.5"
          >
            {calendarPhases.map((candidate) => {
              const active = candidate === phase;

              return (
                <Link
                  key={candidate}
                  href={`/calendar/${locale}/${candidate}`}
                  aria-label={copy.phases[candidate]}
                  aria-current={active ? "time" : undefined}
                  className={cn(
                    controlClassName,
                    active
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {copy.phaseShort[candidate]}
                </Link>
              );
            })}
          </div>
        </div>
      </details>
    </nav>
  );
}
