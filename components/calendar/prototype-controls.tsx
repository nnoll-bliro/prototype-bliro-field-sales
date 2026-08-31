import Link from "next/link";
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
  "flex min-h-11 items-center justify-center rounded-lg px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

export function PrototypeControls({
  copy,
  locale,
  phase,
}: PrototypeControlsProps) {
  return (
    <nav
      aria-label={copy.ariaLabel}
      className="flex flex-col items-end gap-2 border-b border-dashed border-border pb-4"
    >
      <span className="text-sm font-semibold text-muted-foreground">
        {copy.label}
      </span>
      <div className="flex max-w-full flex-wrap justify-end gap-2">
        <div
          role="group"
          aria-label={copy.languageLabel}
          className="flex rounded-xl border border-border bg-background p-1"
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
                  "min-w-11 uppercase",
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
          className="flex max-w-full flex-wrap justify-end rounded-xl border border-border bg-background p-1"
        >
          {calendarPhases.map((candidate) => {
            const active = candidate === phase;

            return (
              <Link
                key={candidate}
                href={`/calendar/${locale}/${candidate}`}
                aria-current={active ? "time" : undefined}
                className={cn(
                  controlClassName,
                  active
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {copy.phases[candidate]}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
