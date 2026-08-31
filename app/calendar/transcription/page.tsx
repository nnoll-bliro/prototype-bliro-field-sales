import type { Metadata } from "next";
import { CalendarLiveTranscriptionView } from "@/components/calendar/live-transcription-view";

export const metadata: Metadata = {
  title: "Live transcription",
  description: "Transcribe a conversation and attach it to a calendar event.",
};

export default function CalendarTranscriptionPage() {
  return <CalendarLiveTranscriptionView />;
}
