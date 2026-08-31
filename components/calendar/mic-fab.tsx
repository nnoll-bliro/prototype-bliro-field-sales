import Link from "next/link";
import { Mic } from "lucide-react";

// Mirrors VickyFab's placement (bottom offset, z-50) but on the opposite
// side of the screen, so the two anchors read as a pair at a glance.
export function MicFab() {
  return (
    <Link
      href="/calendar/transcription"
      aria-label="Start a live transcription"
      className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] left-[5vw] z-50 flex size-28 items-center justify-center rounded-full bg-primary text-white shadow-popover transition-colors hover:bg-primary/90 active:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Mic className="size-10" aria-hidden="true" />
    </Link>
  );
}
