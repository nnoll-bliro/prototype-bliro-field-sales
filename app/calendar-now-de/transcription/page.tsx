import { redirect } from "next/navigation";

// Legacy German current-meeting route: the canonical screen is
// /calendar/{locale}/transcription.
export default function LegacyGermanTranscriptionPage() {
  redirect("/calendar/de/transcription");
}
