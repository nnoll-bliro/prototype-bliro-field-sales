import Link from "next/link";
import {
  Check,
  ChevronRight,
  MapPin,
  Mic,
  Sparkles,
  UserRound,
} from "lucide-react";
import {
  Button,
  buttonVariants,
} from "@/components/ui/shadcn/button";
import { Card } from "@/components/ui/shadcn/card";
import { cn } from "@/libs/utils";
import type { MeetingScenario, MeetingView } from "@/libs/mock-meetings";

type MeetingCardProps = {
  meeting: MeetingView;
  variant: "primary" | "secondary" | "past";
  scenario: MeetingScenario;
  onVickyAction: (meeting: MeetingView) => void;
};

function MeetingAction({
  meeting,
  variant,
  scenario,
  onVickyAction,
}: MeetingCardProps) {
  const isPrimary = variant === "primary";
  const isPast = meeting.lifecycle === "past";
  const commonClassName = cn(
    "min-h-11",
    isPrimary && "w-full",
    variant === "past" && "h-auto justify-start px-0 py-2",
  );

  if (meeting.lifecycle === "ongoing") {
    return (
      <Link
        href={`/transcription?id=${encodeURIComponent(meeting.id)}&scenario=${scenario}`}
        aria-label={`Start transcribing ${meeting.customer}`}
        className={cn(
          buttonVariants({
            variant: isPrimary ? "primary" : "outline",
            size: isPrimary ? "lg" : "default",
          }),
          commonClassName,
        )}
      >
        <Mic aria-hidden="true" />
        Start transcribing
      </Link>
    );
  }

  if (isPast && meeting.visitorReportStatus === "complete") {
    return (
      <div className="flex items-center gap-1.5 py-2 text-xs font-semibold text-success-foreground">
        <span className="flex size-5 items-center justify-center rounded-full bg-success-subtle">
          <Check className="size-3.5" aria-hidden="true" />
        </span>
        Report completed
      </div>
    );
  }

  const label = isPast ? "Prepare visitor report" : "Prep me";

  return (
    <Button
      type="button"
      size={isPrimary ? "lg" : "default"}
      variant={isPrimary ? "primary" : variant === "past" ? "ghost" : "outline"}
      className={commonClassName}
      onClick={() => onVickyAction(meeting)}
      aria-label={`${label} for ${meeting.customer} with Vicky`}
    >
      <Sparkles aria-hidden="true" />
      {label}
      {variant === "past" && <ChevronRight className="ml-auto" aria-hidden="true" />}
    </Button>
  );
}

export function MeetingCard(props: MeetingCardProps) {
  const { meeting, variant } = props;
  const isPrimary = variant === "primary";
  const isSecondary = variant === "secondary";
  const isPast = variant === "past";

  if (isPast) {
    return (
      <article className="border-b border-border py-4 last:border-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h4 className="truncate text-[0.9375rem] font-semibold leading-5 text-heading">
              {meeting.customer}
            </h4>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">
              {meeting.title}
            </p>
          </div>
          <time
            dateTime={meeting.startsAt}
            className="shrink-0 text-xs font-medium tabular-nums text-muted-foreground"
          >
            {meeting.timeLabel}
          </time>
        </div>
        <MeetingAction {...props} />
      </article>
    );
  }

  return (
    <article>
      <Card
        className={cn(
          "overflow-hidden",
          isPrimary &&
            "border-primary/30 bg-gradient-to-b from-accent/80 via-card to-card shadow-[0_10px_32px_hsl(var(--heading)/0.08)]",
          isSecondary && "shadow-none",
        )}
      >
        <div className={cn("p-4", isPrimary && "p-5")}>
          <div className="flex items-center justify-between gap-3">
          <div
            className={cn(
              "inline-flex items-center gap-2 text-xs font-semibold",
              meeting.lifecycle === "ongoing"
                ? "text-destructive-foreground"
                : "text-accent-foreground",
            )}
          >
            <span
              className={cn(
                "size-2 rounded-full",
                meeting.lifecycle === "ongoing" ? "bg-destructive" : "bg-primary",
              )}
              aria-hidden="true"
            />
            {meeting.relativeLabel}
          </div>
          <time
            dateTime={meeting.startsAt}
            className="text-xs font-semibold tabular-nums text-muted-foreground"
          >
            {meeting.timeLabel}
          </time>
        </div>

        <div className={cn("mt-4", isSecondary && "mt-3")}>
          <h3
            className={cn(
              "font-semibold tracking-tight text-heading",
              isPrimary ? "text-2xl leading-8" : "text-lg leading-6",
            )}
          >
            {meeting.customer}
          </h3>
          <p className="mt-1 text-sm font-medium text-foreground">
            {meeting.title}
          </p>
        </div>

        <div
          className={cn(
            "mt-4 grid gap-2 text-sm text-muted-foreground",
            isSecondary && "mt-3",
          )}
        >
          <div className="flex items-center gap-2">
            <UserRound className="size-4" aria-hidden="true" />
            <span className="truncate">with {meeting.contact}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="size-4" aria-hidden="true" />
            <span className="truncate">{meeting.location}</span>
          </div>
        </div>

          <div className={cn("mt-5", isSecondary && "mt-4")}>
            <MeetingAction {...props} />
          </div>
        </div>
      </Card>
    </article>
  );
}
