import { redirect } from "next/navigation";

// Legacy unlocalized route: the canonical screen is /calendar/{locale}/transcription.
export default function LegacyCalendarTranscriptionPage() {
  redirect("/calendar/en/transcription");
}
