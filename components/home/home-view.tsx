"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarDays, CheckCircle2 } from "lucide-react";
import { MeetingCard } from "@/components/home/meeting-card";
import { VickyContactSheet } from "@/components/home/vicky-contact-sheet";
import type { HomeMeetingModel, MeetingView } from "@/libs/mock-meetings";

type HomeViewProps = {
  model: HomeMeetingModel;
  transcriptionSaved: boolean;
};

function primaryHeading(meeting: MeetingView | null): string {
  if (!meeting) return "Next best action";
  if (meeting.lifecycle === "ongoing") return "Happening now";
  if (meeting.lifecycle === "upcoming") return "Your next meeting";
  return "Next best action";
}

export function HomeView({ model, transcriptionSaved }: HomeViewProps) {
  const [selectedMeeting, setSelectedMeeting] = useState<MeetingView | null>(
    null,
  );
  const pendingPastCount = model.pastGroups
    .flatMap((group) => group.meetings)
    .filter((meeting) => meeting.visitorReportStatus === "pending").length;

  return (
    <main className="min-h-dvh bg-muted/50 px-4 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-lg">
        <header className="flex items-center justify-between py-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {model.todayLabel}
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-heading">
              Your meetings
            </h1>
          </div>
          <Image
            src="/bliro-logo.svg"
            alt="Bliro"
            width={96}
            height={28}
            priority
            className="h-7 w-auto"
          />
        </header>

        {transcriptionSaved && (
          <div
            className="mt-4 flex items-start gap-3 rounded-lg border border-success/25 bg-success-subtle px-3.5 py-3 text-success-foreground"
            role="status"
            aria-live="polite"
          >
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold">Transcription saved</p>
              <p className="mt-0.5 text-xs leading-4">
                The meeting notes are ready for follow-up.
              </p>
            </div>
          </div>
        )}

        <section className="mt-7" aria-labelledby="focus-heading">
          <div className="mb-3 flex items-center justify-between">
            <h2
              id="focus-heading"
              className="text-sm font-semibold text-muted-foreground"
            >
              {primaryHeading(model.primary)}
            </h2>
            {model.primary?.lifecycle === "ongoing" && (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-destructive-foreground">
                <span className="size-1.5 animate-pulse rounded-full bg-destructive motion-reduce:animate-none" />
                Live
              </span>
            )}
          </div>

          {model.primary ? (
            <MeetingCard
              meeting={model.primary}
              variant="primary"
              scenario={model.scenario}
              onVickyAction={setSelectedMeeting}
            />
          ) : (
            <div className="rounded-lg border border-dashed bg-background p-6 text-center">
              <CalendarDays
                className="mx-auto size-5 text-muted-foreground"
                aria-hidden="true"
              />
              <p className="mt-2 text-sm font-semibold text-heading">
                No meetings to focus on
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Your schedule and follow-ups are clear.
              </p>
            </div>
          )}
        </section>

        <section className="mt-6" aria-labelledby="up-next-heading">
          <h2
            id="up-next-heading"
            className="mb-3 text-sm font-semibold text-muted-foreground"
          >
            Up next
          </h2>
          {model.secondary ? (
            <MeetingCard
              meeting={model.secondary}
              variant="secondary"
              scenario={model.scenario}
              onVickyAction={setSelectedMeeting}
            />
          ) : (
            <div className="flex items-center gap-3 rounded-lg border border-dashed bg-background/70 px-4 py-3.5">
              <CalendarDays
                className="size-4 text-muted-foreground"
                aria-hidden="true"
              />
              <p className="text-sm text-muted-foreground">
                Nothing else scheduled for now.
              </p>
            </div>
          )}
        </section>

        <section className="mt-8" aria-labelledby="past-heading">
          <div className="flex items-end justify-between">
            <div>
              <h2
                id="past-heading"
                className="text-lg font-semibold tracking-tight text-heading"
              >
                Past meetings
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Recent calls and visitor reports
              </p>
            </div>
            {pendingPastCount === 0 && (
              <span className="rounded-full bg-success-subtle px-2.5 py-1 text-xs font-semibold text-success-foreground">
                All caught up
              </span>
            )}
          </div>

          <div className="mt-4 space-y-6">
            {model.pastGroups.length > 0 ? (
              model.pastGroups.map((group) => (
                <div key={group.label}>
                  <h3 className="sticky top-0 z-10 -mx-1 bg-muted/95 px-1 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground backdrop-blur-sm">
                    {group.label}
                  </h3>
                  <div className="rounded-lg border bg-background px-4 shadow-card">
                    {group.meetings.map((meeting) => (
                      <MeetingCard
                        key={meeting.id}
                        meeting={meeting}
                        variant="past"
                        scenario={model.scenario}
                        onVickyAction={setSelectedMeeting}
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-dashed bg-background p-5 text-center text-sm text-muted-foreground">
                No past meetings yet.
              </div>
            )}
          </div>
        </section>
      </div>

      <VickyContactSheet
        meeting={selectedMeeting}
        open={selectedMeeting !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedMeeting(null);
        }}
      />
    </main>
  );
}
