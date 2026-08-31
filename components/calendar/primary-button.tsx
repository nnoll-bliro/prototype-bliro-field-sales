import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/libs/utils";

// Full-width card action. Only the screen's single next-best action uses
// primary emphasis; other card actions remain neutral. `icon` is opt-in and
// should clarify the action rather than decorate it.
export function PrimaryButton({
  icon: Icon,
  emphasis = "primary",
  href,
  children,
}: {
  icon?: LucideIcon;
  emphasis?: "primary" | "secondary";
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border px-5 text-base font-bold shadow-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        emphasis === "primary"
          ? "border-primary bg-primary/85 text-primary-foreground hover:bg-primary/75"
          : "border-input bg-background text-foreground hover:bg-muted",
      )}
    >
      {Icon ? <Icon className="size-5" aria-hidden="true" /> : null}
      {children}
    </Link>
  );
}
