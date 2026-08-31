import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  ListChecks,
  Mic,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/libs/utils";

type NavItemId = "calendar" | "actions" | "customers" | "vicky";

type NavItem = {
  id: NavItemId;
  label: string;
  href?: string;
  icon?: LucideIcon;
  imageSrc?: string;
};

export type BottomNavCopy = {
  ariaLabel: string;
  calendar: string;
  actions: string;
  customers: string;
  vicky: string;
  microphoneAriaLabel: string;
  unavailable: string;
  unavailableShort: string;
};

export type BottomNavDestinations = {
  calendar?: string;
  actions?: string;
  customers?: string;
  vicky?: string;
  microphone?: string;
};

function NavItemContent({ item }: { item: NavItem }) {
  const Icon = item.icon;

  return (
    <>
      {item.imageSrc ? (
        <Image
          src={item.imageSrc}
          alt=""
          width={29}
          height={29}
          className="size-[1.8rem] rounded-full border border-border object-cover"
        />
      ) : Icon ? (
        <Icon className="size-6" aria-hidden="true" />
      ) : null}
      <span>{item.label}</span>
    </>
  );
}

function NavItemControl({
  active,
  item,
  unavailable,
  unavailableShort,
}: {
  active: boolean;
  item: NavItem;
  unavailable: string;
  unavailableShort: string;
}) {
  const className = cn(
    "flex min-h-16 min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 text-center text-sm leading-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
    active
      ? "font-bold text-primary"
      : item.href
        ? "font-semibold text-muted-foreground hover:bg-muted hover:text-foreground"
        : "cursor-not-allowed font-semibold text-muted-foreground opacity-50",
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        className={className}
        aria-current={active ? "page" : undefined}
      >
        <NavItemContent item={item} />
      </Link>
    );
  }

  return (
    <button
      type="button"
      disabled
      title={unavailable}
      aria-label={`${item.label}. ${unavailable}`}
      className={className}
    >
      <NavItemContent item={item} />
      <span className="text-sm font-normal leading-4">{unavailableShort}</span>
    </button>
  );
}

export function BottomNav({
  active = "calendar",
  copy,
  destinations,
}: {
  active?: NavItemId;
  copy: BottomNavCopy;
  destinations: BottomNavDestinations;
}) {
  const items: NavItem[] = [
    {
      id: "calendar",
      label: copy.calendar,
      href: destinations.calendar,
      icon: CalendarDays,
    },
    {
      id: "actions",
      label: copy.actions,
      href: destinations.actions,
      icon: ListChecks,
    },
    {
      id: "customers",
      label: copy.customers,
      href: destinations.customers,
      icon: UsersRound,
    },
    {
      id: "vicky",
      label: copy.vicky,
      href: destinations.vicky,
      imageSrc: "/vicky_avatar.png",
    },
  ];

  const microphoneClassName =
    "relative -mt-8 flex min-h-20 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
  const microphoneContent = (
    <span
      className={cn(
        "flex size-20 items-center justify-center rounded-full border-4 border-background shadow-popover",
        destinations.microphone
          ? "bg-primary text-primary-foreground transition-colors hover:bg-primary/90 active:bg-primary/80"
          : "bg-muted text-muted-foreground opacity-60",
      )}
    >
      <Mic className="size-8" aria-hidden="true" />
    </span>
  );

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 mx-auto grid w-full max-w-[620px] grid-cols-[minmax(0,1fr)_minmax(0,1fr)_5rem_minmax(0,1fr)_minmax(0,1fr)] items-end border-t border-border bg-background px-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-3px_12px_hsl(var(--heading)/0.08)]"
      aria-label={copy.ariaLabel}
    >
      {items.slice(0, 2).map((item) => (
        <NavItemControl
          key={item.id}
          active={item.id === active}
          item={item}
          unavailable={copy.unavailable}
          unavailableShort={copy.unavailableShort}
        />
      ))}

      {destinations.microphone ? (
        <Link
          href={destinations.microphone}
          aria-label={copy.microphoneAriaLabel}
          className={microphoneClassName}
        >
          {microphoneContent}
        </Link>
      ) : (
        <button
          type="button"
          disabled
          title={copy.unavailable}
          aria-label={`${copy.microphoneAriaLabel}. ${copy.unavailable}`}
          className={cn(microphoneClassName, "cursor-not-allowed")}
        >
          {microphoneContent}
          <span className="absolute bottom-0 rounded-full bg-background px-2 py-0.5 text-sm font-semibold text-muted-foreground shadow-card">
            {copy.unavailableShort}
          </span>
        </button>
      )}

      {items.slice(2).map((item) => (
        <NavItemControl
          key={item.id}
          active={item.id === active}
          item={item}
          unavailable={copy.unavailable}
          unavailableShort={copy.unavailableShort}
        />
      ))}
    </nav>
  );
}
