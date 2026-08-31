"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  englishTranscriptionCopy,
  englishTranscriptionEvents,
} from "@/components/transcription/english-copy";
import { LiveTranscriptionOverlay } from "@/components/transcription/live-transcription-overlay";
import type { MeetingScenario, MeetingView } from "@/libs/mock-meetings";

type TranscriptionViewProps = {
  meeting: MeetingView;
  scenario: MeetingScenario;
};

export function TranscriptionView({
  meeting,
  scenario,
}: TranscriptionViewProps) {
  const router = useRouter();
  const [stopping, setStopping] = useState(false);
  const stopTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    <LiveTranscriptionOverlay
      copy={englishTranscriptionCopy}
      events={englishTranscriptionEvents}
      eyebrow={meeting.title}
      title={meeting.customer}
      subtitle={`with ${meeting.contact}`}
      onClose={() => router.replace(`/home?scenario=${scenario}`)}
      onStop={stopTranscription}
      stopping={stopping}
    />
  );
}
