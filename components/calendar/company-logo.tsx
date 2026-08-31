import Image from "next/image";
import { cn } from "@/libs/utils";

// The fixed logo slot used by every company entry in the calendar prototype:
// meeting cards and customer rows alike. Only a handful of companies have real
// artwork, so the slot falls back to an initials monogram of identical size —
// row height must not depend on whether a logo file happens to exist.
//
// The name always appears in text next to this slot, so the image is
// decorative and the monogram is hidden from assistive technology.
export function CompanyLogo({
  logoSrc,
  initials,
  className,
}: {
  logoSrc?: string;
  initials?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-xl border border-border",
        logoSrc ? "bg-white p-1.5" : "bg-muted",
        className,
      )}
    >
      {logoSrc ? (
        <Image
          src={logoSrc}
          alt=""
          width={64}
          height={64}
          className="size-full object-contain"
        />
      ) : (
        <span
          aria-hidden="true"
          className="text-base font-bold leading-none text-muted-foreground"
        >
          {initials}
        </span>
      )}
    </div>
  );
}
