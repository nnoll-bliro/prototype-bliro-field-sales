import type {
  TranscriptionEventOption,
  TranscriptionOverlayCopy,
} from "@/components/transcription/live-transcription-overlay";

// The overlay itself is copy-driven and holds no strings. The localized
// calendar prototype feeds it from app/calendar/_dictionaries; the separate
// /home prototype has no dictionary of its own, so its English copy lives
// here rather than being coupled to /calendar.
export const englishTranscriptionCopy: TranscriptionOverlayCopy = {
  close: "Close live transcription",
  connectionQuestion: "Bad connection?",
  useVoiceNote: "Use voice note",
  dismiss: "Dismiss",
  inProgress: "Transcription in progress",
  elapsedTime: "Elapsed time",
  stop: "Stop & save",
  stopping: "Saving transcription…",
  footer: "You choose the matching event in the next step.",
  offlineNote:
    "Saved as a voice note — we'll transcribe it once you're back online.",
  attachTitle: "Attach to an event",
  attachDescription:
    "Link this transcript to a meeting so it's easy to find later.",
  chooseEvent: "Choose an event",
  suggested: "Suggested based on your calendar.",
  attachAndSave: "Attach & save",
  saveWithoutEvent: "Save without an event",
};

export const englishTranscriptionEvents: TranscriptionEventOption[] = [
  { id: "lufthansa-1215", label: "Lufthansa · Tim Berger", meta: "12:15" },
  { id: "otis-1530", label: "Otis · Stefan Müller", meta: "15:30" },
  {
    id: "rosen-yesterday",
    label: "ROSEN Group · Igor Petrov",
    meta: "Yesterday, 14:00",
  },
  {
    id: "lufthansa-monday",
    label: "Lufthansa · Kilian Weber",
    meta: "Monday, 10:30",
  },
];
