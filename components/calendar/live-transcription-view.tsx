"use client";

import { useRouter } from "next/navigation";
import { LiveTranscriptionOverlay } from "@/components/transcription/live-transcription-overlay";

// Route-level wrapper: the overlay itself stays routing-agnostic (see
// components/home/transcription-view.tsx for the other consumer), this
// just wires close/stop to calendar navigation.
export function CalendarLiveTranscriptionView() {
  const router = useRouter();

  return (
    <LiveTranscriptionOverlay
      title="Live transcription"
      onClose={() => router.back()}
      onStop={() => router.replace("/calendar")}
    />
  );
}
