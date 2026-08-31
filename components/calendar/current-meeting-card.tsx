import Image from "next/image";
import { Clock3, MapPin } from "lucide-react";

export function CurrentMeetingCard({
  action,
  company,
  locationLabel,
  logoSrc,
  personLabel,
  time,
}: {
  action: React.ReactNode;
  company: string;
  locationLabel: string;
  logoSrc: string;
  personLabel: string;
  time: string;
}) {
  return (
    <article className="rounded-3xl border border-border bg-card p-6 shadow-popover sm:p-8">
      <div className="flex flex-col items-center text-center">
        <div className="flex size-20 items-center justify-center rounded-2xl border border-border bg-white p-3 shadow-card">
          <Image
            src={logoSrc}
            alt=""
            width={80}
            height={80}
            className="size-full object-contain"
            priority
          />
        </div>
        <h3 className="mt-5 text-2xl font-bold tracking-[-0.025em] text-heading">
          {company}
        </h3>
        <p className="mt-1 text-lg leading-7 text-foreground">{personLabel}</p>
      </div>

      <div className="mt-6 grid gap-3 rounded-2xl bg-muted p-4 text-base font-medium text-foreground sm:grid-cols-2">
        <p className="flex items-center gap-3">
          <Clock3 className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          {time}
        </p>
        <p className="flex items-center gap-3">
          <MapPin className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          {locationLabel}
        </p>
      </div>

      <div className="mt-6">{action}</div>
    </article>
  );
}
