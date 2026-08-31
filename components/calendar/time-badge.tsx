import { Clock3 } from "lucide-react";

export function TimeBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-sm font-semibold text-muted-foreground">
      <Clock3 className="size-3.5" aria-hidden="true" />
      {children}
    </span>
  );
}
