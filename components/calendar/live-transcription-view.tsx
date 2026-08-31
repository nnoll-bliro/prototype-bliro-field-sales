"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { CalendarDictionary, CalendarLocale } from "@/app/calendar/_lib/i18n";
import { LiveTranscriptionOverlay } from "@/components/transcription/live-transcription-overlay";

type CalendarLiveTranscriptionViewProps = {
  copy: CalendarDictionary["transcription"];
  locale: CalendarLocale;
};

// Route-level wrapper: the overlay itself stays routing- and copy-agnostic
// (see components/home/transcription-view.tsx for the other consumer), this
// just wires close/stop back to wherever the user opened it from.
//
// Every calendar entry point — the active-meeting CTA and the bottom
// microphone — renders this same screen, so it deliberately takes no
// phase or meeting: `router.back()` returns to the originating phase
// without this component having to know which one it was.
export function CalendarLiveTranscriptionView({
  copy,
  locale,
}: CalendarLiveTranscriptionViewProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    },
    [],
  );

  const saveTranscription = () => {
    if (saving) return;
    setSaving(true);
    saveTimeout.current = setTimeout(() => {
      router.back();
    }, 450);
  };

  return (
    <div lang={locale}>
      <LiveTranscriptionOverlay
        copy={copy}
        events={copy.events}
        title={copy.title}
        onClose={() => router.back()}
        onStop={saveTranscription}
        stopping={saving}
      />
    </div>
  );
}
