"use client";

import { useState } from "react";
import Image from "next/image";
import { ClipboardCheck, MessageCircle, Phone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet";
import { cn } from "@/libs/utils";

type Task = "prepare" | "follow-up";
type Choice = "call" | "chat";

export type VickyActionSheetCopy = {
  title: string;
  closeLabel: string;
  description: string;
  callLabel: string;
  callDescription: string;
  chatLabel: string;
  chatDescription: string;
  callFeedback: string;
  chatFeedback: string;
};

type VickyActionSheetProps = {
  copy: VickyActionSheetCopy;
  emphasis?: "primary" | "secondary";
  task: Task;
  triggerLabel: string;
};

function ContactChoice({
  description,
  icon: Icon,
  label,
  onClick,
}: {
  description: string;
  icon: typeof Phone;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-20 w-full items-center gap-4 rounded-2xl border border-input bg-background p-4 text-left transition-colors hover:bg-muted active:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted text-heading">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-lg font-bold leading-6 text-heading">
          {label}
        </span>
        <span className="mt-1 block text-base leading-6 text-muted-foreground">
          {description}
        </span>
      </span>
    </button>
  );
}

export function VickyActionSheet({
  copy,
  emphasis = "primary",
  task,
  triggerLabel,
}: VickyActionSheetProps) {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<Choice | null>(null);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) setChoice(null);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border px-5 text-base font-bold shadow-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            emphasis === "primary"
              ? "border-primary bg-primary/85 text-primary-foreground hover:bg-primary/75"
              : "border-input bg-background text-foreground hover:bg-muted",
          )}
        >
          {task === "follow-up" ? (
            <ClipboardCheck className="size-5" aria-hidden="true" />
          ) : null}
          {triggerLabel}
        </button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        closeLabel={copy.closeLabel}
        className="mx-auto max-h-[90dvh] max-w-[620px] overflow-y-auto rounded-t-3xl border-x px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-7 sm:px-8 [&>button]:right-4 [&>button]:top-4"
      >
        <SheetHeader className="items-center px-8 text-center sm:text-center">
          <div className="relative size-20 overflow-hidden rounded-full border-2 border-border bg-card shadow-card">
            <Image
              src="/vicky_avatar.png"
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div className="pt-2">
            <SheetTitle className="text-2xl font-bold leading-8 text-heading">
              {copy.title}
            </SheetTitle>
            <SheetDescription className="mt-2 text-base leading-6">
              {copy.description}
            </SheetDescription>
          </div>
        </SheetHeader>

        <div className="mt-6 grid gap-3">
          <ContactChoice
            icon={Phone}
            label={copy.callLabel}
            description={copy.callDescription}
            onClick={() => setChoice("call")}
          />
          <ContactChoice
            icon={MessageCircle}
            label={copy.chatLabel}
            description={copy.chatDescription}
            onClick={() => setChoice("chat")}
          />
        </div>

        {choice ? (
          <p
            className="mt-4 rounded-xl bg-muted px-4 py-3 text-center text-base font-medium leading-6 text-foreground"
            role="status"
            aria-live="polite"
          >
            {choice === "call" ? copy.callFeedback : copy.chatFeedback}
          </p>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
