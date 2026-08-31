import type { Metadata } from "next";
import { GermanCurrentTranscriptionView } from "@/components/calendar/german-current-transcription-view";

export const metadata: Metadata = {
  title: "Live-Transkription",
  description: "Den laufenden Lufthansa-Termin live transkribieren.",
};

export default function GermanCurrentTranscriptionPage() {
  return <GermanCurrentTranscriptionView />;
}
