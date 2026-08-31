import { Mic } from "lucide-react";
import type {
  CalendarDictionary,
  CalendarLocale,
  CalendarPhase,
} from "@/app/calendar/_lib/i18n";
import { interpolateCopy } from "@/app/calendar/_lib/i18n";
import { BottomNav } from "@/components/calendar/bottom-nav";
import { CurrentMeetingCard } from "@/components/calendar/current-meeting-card";
import { MeetingCard } from "@/components/calendar/meeting-card";
import { PrototypeControls } from "@/components/calendar/prototype-controls";
import { TimeBadge } from "@/components/calendar/time-badge";
import {
  VickyActionSheet,
  type VickyActionSheetCopy,
} from "@/components/calendar/vicky-action-sheet";

type CalendarViewProps = {
  copy: CalendarDictionary;
  locale: CalendarLocale;
  phase: CalendarPhase;
};

function getVickyCopy(
  copy: CalendarDictionary["vickyActionSheet"],
  task: "prepare" | "follow-up",
  company: string,
  person: string,
): VickyActionSheetCopy {
  const descriptionTemplate =
    task === "prepare"
      ? copy.prepareDescription
      : copy.followUpDescription;

  return {
    title: copy.title,
    closeLabel: copy.closeLabel,
    description: interpolateCopy(descriptionTemplate, { company, person }),
    callLabel: copy.callLabel,
    callDescription: copy.callDescription,
    chatLabel: copy.chatLabel,
    chatDescription: copy.chatDescription,
    callFeedback: copy.callFeedback,
    chatFeedback: copy.chatFeedback,
  };
}

export function CalendarView({ copy, locale, phase }: CalendarViewProps) {
  const showsCurrentMeeting = phase !== "pre";
  const calendarHref = `/calendar/${locale}/${phase}`;

  return (
    <main lang={locale} className="min-h-dvh bg-muted text-foreground">
      <div className="mx-auto min-h-dvh w-full max-w-[620px] bg-background">
        <div className="px-5 pb-32 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8">
          <header>
            <PrototypeControls
              copy={copy.admin}
              locale={locale}
              phase={phase}
            />
            <div className="mt-8">
              <h1 className="text-[2rem] font-bold leading-10 tracking-[-0.035em] text-heading">
                {interpolateCopy(copy.calendar.greeting, { name: "Niko" })}
              </h1>
              <p className="mt-2 text-base leading-6 text-muted-foreground">
                {copy.calendar.dateSummary}
              </p>
            </div>
          </header>

          {showsCurrentMeeting ? (
            <section className="mt-10" aria-labelledby="current-meeting-heading">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2
                  id="current-meeting-heading"
                  className="text-xl font-bold text-heading"
                >
                  {copy.calendar.now.heading}
                </h2>
                <TimeBadge>{copy.calendar.now.timeBadge}</TimeBadge>
              </div>
              <CurrentMeetingCard
                time="12:15–13:00"
                logoSrc="/logos/lufthansa.svg"
                company="Lufthansa"
                personLabel={interpolateCopy(copy.calendar.now.person, {
                  person: "Tim Berger",
                })}
                locationLabel={interpolateCopy(copy.calendar.now.location, {
                  company: "Lufthansa",
                })}
                action={
                  <div className="space-y-2">
                    <button
                      type="button"
                      disabled
                      aria-label={`${copy.calendar.now.action}. ${copy.navigation.unavailable}`}
                      className="flex min-h-16 w-full cursor-not-allowed items-center justify-center gap-3 rounded-xl border border-primary bg-primary/70 px-6 text-lg font-bold text-primary-foreground opacity-70 shadow-card"
                    >
                      <Mic className="size-6" aria-hidden="true" />
                      {copy.calendar.now.action}
                    </button>
                    <p className="text-center text-sm text-muted-foreground">
                      {copy.navigation.unavailable}
                    </p>
                  </div>
                }
              />
            </section>
          ) : (
            <section className="mt-10" aria-labelledby="next-meeting-heading">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2
                  id="next-meeting-heading"
                  className="text-xl font-bold text-heading"
                >
                  {copy.calendar.pre.heading}
                </h2>
                <TimeBadge>{copy.calendar.pre.timeBadge}</TimeBadge>
              </div>

              <MeetingCard
                time="12:15"
                logoSrc="/logos/lufthansa.svg"
                company="Lufthansa"
                person="Tim Berger"
                action={
                  <VickyActionSheet
                    copy={getVickyCopy(
                      copy.vickyActionSheet,
                      "prepare",
                      "Lufthansa",
                      "Tim Berger",
                    )}
                    task="prepare"
                    triggerLabel={copy.calendar.pre.action}
                  />
                }
              />
            </section>
          )}

          <section className="mt-10" aria-labelledby="later-heading">
            <h2
              id="later-heading"
              className="mb-4 text-xl font-bold text-heading"
            >
              {copy.calendar.later.heading}
            </h2>
            <MeetingCard
              time="15:30"
              logoSrc="/logos/otis.svg"
              company="Otis"
              person="Stefan Müller"
            />
          </section>

          <section className="mt-10" aria-labelledby="follow-up-heading">
            <h2
              id="follow-up-heading"
              className="text-xl font-bold text-heading"
            >
              {copy.calendar.followUp.heading}
            </h2>
            <p className="mb-4 mt-1 text-sm font-medium text-muted-foreground">
              {copy.calendar.followUp.subtitle}
            </p>
            <MeetingCard
              time="14:00"
              logoSrc="/logos/rosen.svg"
              company="ROSEN Group"
              person="Igor Petrov"
              action={
                <VickyActionSheet
                  copy={getVickyCopy(
                    copy.vickyActionSheet,
                    "follow-up",
                    "ROSEN Group",
                    "Igor Petrov",
                  )}
                  emphasis="secondary"
                  task="follow-up"
                  triggerLabel={copy.calendar.followUp.action}
                />
              }
            />
          </section>
        </div>

        <BottomNav
          copy={copy.navigation}
          destinations={{ calendar: calendarHref }}
        />
      </div>
    </main>
  );
}
