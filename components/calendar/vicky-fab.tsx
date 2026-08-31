"use client";

import { useState } from "react";
import Image from "next/image";

// Neutral/secondary chrome throughout: this is a persistent, always-on-
// screen affordance, not the page's primary action — see DESIGN.md
// ("screen real estate ≠ button hierarchy"). The avatar image is what
// carries Vicky's identity; the button surfaces stay plain, so the
// illustrated phone/chat icons carry all the color here.
//
// Sized to match the main Vicky button (112px / size-28) so the fanned-out
// options read as siblings of the anchor, not secondary controls.
function FabOption({
  iconSrc,
  label,
  onClick,
  className,
}: {
  iconSrc: string;
  label: string;
  onClick: () => void;
  className: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute flex size-28 items-center justify-center rounded-full border border-border bg-card p-6 shadow-popover transition-all duration-200 ${className}`}
    >
      <Image
        src={iconSrc}
        alt=""
        width={112}
        height={112}
        className="size-full object-contain"
      />
    </button>
  );
}

export function VickyFab() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? (
        // Invisible, whole-screen — only here to close the menu on an
        // outside tap. It does not blur or dim anything itself.
        <button
          type="button"
          aria-label="Close Vicky actions"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40"
        />
      ) : null}

      <div className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-[5vw] z-50">
        {/* Anchor sized to the main button so the two options can be
            positioned relative to its edges: one fans out above, the
            other fans out to the left — not both stacked the same way. */}
        <div className="relative size-28">
          <FabOption
            iconSrc="/icons/chat.png"
            label="Chat with Vicky"
            onClick={() => setOpen(false)}
            className={`bottom-full right-0 mb-4 ${
              open
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-2 opacity-0"
            }`}
          />
          <FabOption
            iconSrc="/icons/phone.png"
            label="Call Vicky"
            onClick={() => setOpen(false)}
            className={`bottom-0 right-full mr-4 ${
              open
                ? "translate-x-0 opacity-100"
                : "pointer-events-none translate-x-2 opacity-0"
            }`}
          />

          <button
            type="button"
            aria-label={open ? "Close Vicky actions" : "Open Vicky actions"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="relative flex size-28 items-center justify-center overflow-hidden rounded-full border border-border bg-card shadow-popover"
          >
            <Image
              src="/vicky_avatar.png"
              alt=""
              fill
              sizes="112px"
              className="object-cover"
            />
          </button>
        </div>
      </div>
    </>
  );
}
