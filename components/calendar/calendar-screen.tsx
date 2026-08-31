import type { ReactNode } from "react";

// The frame every calendar-prototype screen sits in: phone-width column,
// muted page behind it, and the padding that keeps content clear of the
// notch above and the fixed bottom navigation below. Screens differ in their
// content, not in their frame — so this lives in one place.
export function CalendarScreen({
  children,
  locale,
  nav,
}: {
  children: ReactNode;
  locale: string;
  nav: ReactNode;
}) {
  return (
    <main lang={locale} className="min-h-dvh bg-muted text-foreground">
      <div className="mx-auto min-h-dvh w-full max-w-[620px] bg-background">
        <div className="relative px-5 pb-32 pt-[max(4rem,calc(env(safe-area-inset-top)+3rem))] sm:px-8">
          {children}
        </div>
        {nav}
      </div>
    </main>
  );
}
