"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mic, Square, X } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import type { MeetingScenario, MeetingView } from "@/libs/mock-meetings";

type TranscriptionViewProps = {
  meeting: MeetingView;
  scenario: MeetingScenario;
};

function formatElapsed(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

const waveHeights = [32, 58, 84, 46, 72, 100, 62, 38, 76, 92, 54, 68, 40];

export function TranscriptionView({
  meeting,
  scenario,
}: TranscriptionViewProps) {
  const router = useRouter();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [stopping, setStopping] = useState(false);
  const startedAt = useRef<number | null>(null);
  const stopTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
    const interval = window.setInterval(() => {
      if (startedAt.current === null) return;
      setElapsedSeconds(
        Math.floor((Date.now() - startedAt.current) / 1_000),
      );
    }, 250);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(
    () => () => {
      if (stopTimeout.current) clearTimeout(stopTimeout.current);
    },
    [],
  );

  const stopTranscription = () => {
    if (stopping) return;
    setStopping(true);
    stopTimeout.current = setTimeout(() => {
      router.replace(
        `/home?scenario=${scenario}&saved=1&meeting=${encodeURIComponent(meeting.id)}`,
      );
    }, 450);
  };

  return (
    <main className="min-h-dvh bg-heading text-white">
      <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
        <header className="flex items-center justify-between">
          <Link
            href={`/home?scenario=${scenario}`}
            className="flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Leave transcription and return home"
          >
            <X className="size-5" aria-hidden="true" />
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full bg-destructive/15 px-3 py-1.5 text-xs font-semibold text-white">
            <span className="size-2 animate-pulse rounded-full bg-destructive motion-reduce:animate-none" />
            Recording
          </div>
          <div className="size-11" aria-hidden="true" />
        </header>

        <section className="mt-10 text-center" aria-labelledby="meeting-title">
          <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Mic className="size-5" aria-hidden="true" />
          </div>
          <p className="mt-5 text-sm font-medium text-white/60">
            {meeting.title}
          </p>
          <h1
            id="meeting-title"
            className="mt-1 text-2xl font-semibold tracking-tight text-white"
          >
            {meeting.customer}
          </h1>
          <p className="mt-2 text-sm text-white/50">with {meeting.contact}</p>
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
          <p className="sr-only">Recording in progress</p>
          <time
            className="mt-8 font-mono text-4xl font-medium tabular-nums tracking-tight text-white"
            dateTime={`PT${elapsedSeconds}S`}
          >
            {formatElapsed(elapsedSeconds)}
          </time>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-white/40">
            Elapsed time
          </p>
        </div>

        <div className="mt-auto">
          <Button
            type="button"
            size="lg"
            className="min-h-14 w-full bg-white text-heading hover:bg-white/90 active:bg-white/80"
            onClick={stopTranscription}
            disabled={stopping}
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-destructive text-white">
              <Square className="size-3 fill-current" aria-hidden="true" />
            </span>
            {stopping ? "Saving transcription…" : "Stop & save"}
          </Button>
          <p className="mt-3 text-center text-xs text-white/45">
            Your transcript will be saved to this meeting.
          </p>
        </div>
      </div>
    </main>
  );
}
