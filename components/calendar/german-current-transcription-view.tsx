"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LiveTranscriptionOverlay } from "@/components/transcription/live-transcription-overlay";

export function GermanCurrentTranscriptionView() {
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
      router.replace("/calendar-now-de");
    }, 450);
  };

  return (
    <LiveTranscriptionOverlay
      attachBeforeSave={false}
      eyebrow="Aktueller Termin"
      footerNote="Das Transkript wird automatisch dem Lufthansa-Termin zugeordnet."
      locale="de"
      onClose={() => router.replace("/calendar-now-de")}
      onStop={stopTranscription}
      stopping={stopping}
      subtitle="Mit Tim Berger · vor Ort"
      title="Lufthansa"
    />
  );
}
