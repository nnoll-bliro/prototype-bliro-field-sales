"use client";

import { useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar";
import { Button } from "@/components/ui/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/shadcn/sheet";
import type { MeetingView } from "@/libs/mock-meetings";

type VickyContactSheetProps = {
  meeting: MeetingView | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function VickyContactSheet({
  meeting,
  open,
  onOpenChange,
}: VickyContactSheetProps) {
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setFeedback(null);
    onOpenChange(nextOpen);
  };

  const task =
    meeting?.lifecycle === "past"
      ? `prepare the visitor report for ${meeting.customer}`
      : `prepare you for ${meeting?.customer ?? "your meeting"}`;

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="bottom"
        className="mx-auto max-h-[85dvh] max-w-lg overflow-y-auto rounded-t-2xl border-x px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-7 [&>button]:right-3 [&>button]:top-3 [&>button]:flex [&>button]:size-11 [&>button]:items-center [&>button]:justify-center [&>button_svg]:size-5"
      >
        <SheetHeader className="items-center px-7 text-center sm:text-center">
          <Avatar className="size-20 border-4 border-white bg-accent shadow-[0_6px_20px_hsl(var(--heading)/0.15)]">
            <AvatarImage src="/vicky_avatar.png" alt="" />
            <AvatarFallback>V</AvatarFallback>
          </Avatar>
          <div className="pt-2">
            <SheetTitle className="text-xl text-heading">Ask Vicky</SheetTitle>
            <SheetDescription className="mt-1 leading-5">
              Vicky can {task}. Choose what works for you right now.
            </SheetDescription>
          </div>
        </SheetHeader>

        <div className="mt-5 rounded-lg border bg-muted/50 p-3 text-sm">
          <p className="font-semibold text-heading">{meeting?.customer}</p>
          <p className="mt-0.5 text-muted-foreground">{meeting?.title}</p>
        </div>

        <div className="mt-4 grid gap-3">
          <Button
            type="button"
            size="lg"
            className="min-h-12 bg-success text-heading hover:bg-success/90 active:bg-success/80"
            onClick={() =>
              setFeedback(`Mock call with Vicky started for ${meeting?.customer}.`)
            }
            aria-label={`Call Vicky about ${meeting?.customer}`}
          >
            <Phone aria-hidden="true" />
            Call Vicky
          </Button>
          <Button
            type="button"
            size="lg"
            variant="outline"
            className="min-h-12"
            onClick={() =>
              setFeedback(`Mock chat with Vicky opened for ${meeting?.customer}.`)
            }
            aria-label={`Chat with Vicky about ${meeting?.customer}`}
          >
            <MessageCircle aria-hidden="true" />
            Chat with Vicky
          </Button>
        </div>

        <div className="min-h-11 pt-3" aria-live="polite" role="status">
          {feedback && (
            <p className="rounded-md bg-success-subtle px-3 py-2 text-center text-sm font-medium text-success-foreground">
              {feedback}
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
