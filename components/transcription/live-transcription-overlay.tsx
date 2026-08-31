"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, Mic, Square, WifiOff, X } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import { cn } from "@/libs/utils";

const waveHeights = [32, 58, 84, 46, 72, 100, 62, 38, 76, 92, 54, 68, 40];

function formatElapsed(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

export type TranscriptionEventOption = {
  id: string;
  label: string;
  meta?: string;
};

export type TranscriptionOverlayCopy = {
  close: string;
  connectionQuestion: string;
  useVoiceNote: string;
  dismiss: string;
  inProgress: string;
  elapsedTime: string;
  stop: string;
  stopping: string;
  footer: string;
  offlineNote: string;
  attachTitle: string;
  attachDescription: string;
  chooseEvent: string;
  suggested: string;
  attachAndSave: string;
  saveWithoutEvent: string;
};

export type LiveTranscriptionOverlayProps = {
  copy: TranscriptionOverlayCopy;
  events: readonly TranscriptionEventOption[];
  eyebrow?: string;
  title: string;
  subtitle?: string;
  onClose: () => void;
  onStop: () => void;
  attachBeforeSave?: boolean;
  stopping?: boolean;
  proposedEventId?: string;
};

// Full-screen transcription UI: light card-based theme (matches the rest of
// the app), animated wave bars, elapsed timer, and a single stop action.
// Originally built for the post-meeting transcription flow
// (components/home/transcription-view.tsx); generalized here so any
// "start transcribing" entry point (e.g. a mic FAB) can reuse the same
// look without owning routing/timer logic.
export function LiveTranscriptionOverlay({
  copy,
  events,
  eyebrow,
  title,
  subtitle,
  onClose,
  onStop,
  attachBeforeSave = true,
  stopping = false,
  proposedEventId = events[0]?.id,
}: LiveTranscriptionOverlayProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [connectionBannerDismissed, setConnectionBannerDismissed] =
    useState(false);
  const [voiceNoteMode, setVoiceNoteMode] = useState(false);
  const [stage, setStage] = useState<"live" | "attach">("live");
  const [selectedEventId, setSelectedEventId] = useState(proposedEventId);
  const startedAt = useRef<number | null>(null);

  const showConnectionBanner = !voiceNoteMode && !connectionBannerDismissed;
  const selectedEvent = events.find((event) => event.id === selectedEventId);

  useEffect(() => {
    startedAt.current = Date.now();
    const interval = window.setInterval(() => {
      if (startedAt.current === null) return;
      setElapsedSeconds(Math.floor((Date.now() - startedAt.current) / 1_000));
    }, 250);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[60] bg-background text-foreground">
      <div className="mx-auto flex h-dvh w-full max-w-lg flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
        <header className="flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-border hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={copy.close}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </header>

        {stage === "live" ? (
          <>
            {showConnectionBanner && (
              <div
                className="relative mt-4 flex items-center gap-4 rounded-2xl border border-accent bg-accent/60 p-4 pr-10"
                role="status"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-accent-foreground">
                  <WifiOff className="size-5" aria-hidden="true" />
                </span>
                <p className="min-w-0 flex-1 text-base font-semibold text-accent-foreground">
                  {copy.connectionQuestion}
                </p>
                <Button
                  type="button"
                  size="lg"
                  variant="primary"
                  className="shrink-0"
                  onClick={() => {
                    setVoiceNoteMode(true);
                    setConnectionBannerDismissed(true);
                  }}
                >
                  {copy.useVoiceNote}
                </Button>
                <button
                  type="button"
                  onClick={() => setConnectionBannerDismissed(true)}
                  aria-label={copy.dismiss}
                  className="absolute right-2 top-2 flex size-11 items-center justify-center rounded-full text-accent-foreground/70 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              </div>
            )}

            <section
              className="mt-10 text-center"
              aria-labelledby="live-transcription-title"
            >
              <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-accent text-primary">
                <Mic className="size-5" aria-hidden="true" />
              </div>
              {eyebrow && (
                <p className="mt-5 text-sm font-medium text-muted-foreground">
                  {eyebrow}
                </p>
              )}
              <h1
                id="live-transcription-title"
                className={cn(
                  "text-2xl font-semibold tracking-tight text-heading",
                  eyebrow ? "mt-1" : "mt-5",
                )}
              >
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 text-sm text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </section>

            <div className="flex flex-1 flex-col items-center justify-center py-10">
              <div
                className="flex h-32 w-full items-center justify-center gap-1.5"
                aria-hidden="true"
              >
                {waveHeights.map((height, index) => (
                  <span
                    key={`${height}-${index}`}
                    className="transcription-wave-bar w-2 rounded-full bg-primary"
                    style={{
                      height: `${height}%`,
                      animationDelay: `${index * -90}ms`,
                      animationDuration: `${760 + (index % 4) * 110}ms`,
                    }}
                  />
                ))}
              </div>
              <p className="sr-only">{copy.inProgress}</p>
              <time
                className="mt-8 font-mono text-4xl font-medium tabular-nums tracking-tight text-heading"
                dateTime={`PT${elapsedSeconds}S`}
              >
                {formatElapsed(elapsedSeconds)}
              </time>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                {copy.elapsedTime}
              </p>
            </div>

            <div className="mt-auto flex flex-col items-center">
              <button
                type="button"
                onClick={() => {
                  if (attachBeforeSave) {
                    setStage("attach");
                  } else {
                    onStop();
                  }
                }}
                disabled={stopping}
                aria-label={stopping ? copy.stopping : copy.stop}
                className="flex size-20 items-center justify-center rounded-full bg-primary text-white shadow-popover transition-colors hover:bg-primary/90 active:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <Square className="size-6 fill-current" aria-hidden="true" />
              </button>
              <p className="mt-4 text-sm font-semibold text-heading">
                {stopping ? copy.stopping : copy.stop}
              </p>
              <p className="mt-1 text-center text-xs text-muted-foreground">
                {voiceNoteMode ? copy.offlineNote : copy.footer}
              </p>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col">
            <section
              className="mt-6 text-center"
              aria-labelledby="attach-event-title"
            >
              <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-accent text-primary">
                <CalendarDays className="size-5" aria-hidden="true" />
              </div>
              <h1
                id="attach-event-title"
                className="mt-5 text-2xl font-semibold tracking-tight text-heading"
              >
                {copy.attachTitle}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {copy.attachDescription}
              </p>
            </section>

            <div className="mt-8">
              <Select value={selectedEventId} onValueChange={setSelectedEventId}>
                <SelectTrigger className="h-12 rounded-xl border-input bg-white text-sm">
                  <SelectValue placeholder={copy.chooseEvent} />
                </SelectTrigger>
                <SelectContent className="z-[70]">
                  {events.map((event) => (
                    <SelectItem key={event.id} value={event.id}>
                      {event.label}
                      {event.meta ? ` · ${event.meta}` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedEvent && selectedEvent.id === proposedEventId && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {copy.suggested}
                </p>
              )}
            </div>

            <div className="mt-auto flex flex-col items-center gap-3 pt-10">
              <Button
                type="button"
                size="lg"
                variant="primary"
                className="w-full"
                onClick={onStop}
                disabled={stopping}
              >
                {stopping ? copy.stopping : copy.attachAndSave}
              </Button>
              <button
                type="button"
                onClick={onStop}
                disabled={stopping}
                className="text-xs font-semibold text-muted-foreground underline underline-offset-2 disabled:pointer-events-none disabled:opacity-50"
              >
                {copy.saveWithoutEvent}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
