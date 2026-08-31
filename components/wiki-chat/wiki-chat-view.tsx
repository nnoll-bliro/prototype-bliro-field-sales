"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUp,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Database,
  FileText,
  MessageSquareText,
  MoreHorizontal,
  Phone,
  UsersRound,
} from "lucide-react";
import { BottomNav } from "@/components/calendar/bottom-nav";
import { MeetingCard } from "@/components/calendar/meeting-card";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/shadcn/sheet";

const wikiBottomNavCopy = {
  ariaLabel: "Main navigation",
  calendar: "Today",
  actions: "Actions",
  customers: "Customers",
  vicky: "Vicky",
  microphoneAriaLabel: "Start a live transcription",
  unavailable: "Not available in this prototype yet",
  unavailableShort: "Soon",
};

const wikiBottomNavDestinations = {
  customers: "/wiki-chat?customer=john-deere",
  vicky: "/wiki-chat",
};

type FollowUpMessage = {
  id: number;
  role: "user" | "assistant";
  text: string;
};

function VickyAvatar({ small = false }: { small?: boolean }) {
  return (
    <span
      className={`relative shrink-0 overflow-hidden rounded-full border border-border bg-card ${small ? "size-8" : "size-11"}`}
    >
      <Image
        src="/vicky_avatar.png"
        alt=""
        fill
        sizes={small ? "32px" : "44px"}
        className="object-cover"
      />
    </span>
  );
}

function AssistantMessage({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <VickyAvatar small />
      <div className="min-w-0 flex-1 space-y-3">{children}</div>
    </div>
  );
}

function AssistantBubble({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-[92%] rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-[0.9375rem] leading-6 text-foreground">
      {children}
    </div>
  );
}

function UserBubble({ children }: { children: ReactNode }) {
  return (
    <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-sm bg-heading px-4 py-3 text-[0.9375rem] leading-6 text-white">
      {children}
    </div>
  );
}

function ContextSources() {
  return (
    <ul className="space-y-1 pl-1 text-[0.6875rem] leading-4 text-muted-foreground" aria-label="Context gathered">
      {[
        { icon: CalendarDays, text: "Checked calendar event" },
        { icon: Database, text: "Loaded Salesforce opportunity" },
        { icon: MessageSquareText, text: "Reviewed 4 Bliro transcripts" },
      ].map((source) => {
        const Icon = source.icon;
        return (
          <li key={source.text} className="flex items-center gap-1.5">
            <Icon className="size-3" strokeWidth={1.75} aria-hidden="true" />
            {source.text}
          </li>
        );
      })}
    </ul>
  );
}

function MeetingMatch({ onConfirm, onReject }: { onConfirm: () => void; onReject: () => void }) {
  return (
    <MeetingCard
      time="10:00"
      logoSrc="/logos/john-deere.svg"
      company="John Deere"
      person="Elena Weber · Mark Klein"
      action={
        <div className="grid grid-cols-2 gap-2">
          <Button type="button" size="lg" className="h-12 rounded-xl" onClick={onConfirm}>
            <Check className="size-4" aria-hidden="true" />
            Yes, use this
          </Button>
          <Button type="button" variant="outline" size="lg" className="h-12 rounded-xl" onClick={onReject}>
            Not this meeting
          </Button>
        </div>
      }
    />
  );
}

function CheatSheetPreview({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="w-full overflow-hidden rounded-2xl border bg-card text-left shadow-card transition-colors hover:bg-muted/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Open the full John Deere meeting cheat sheet"
    >
      <div className="flex items-center gap-3 border-b p-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground">
          <FileText className="size-5" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1 text-base font-bold text-heading">Meeting cheat sheet</span>
        <span className="text-xs text-muted-foreground">2 min</span>
        <ChevronRight className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
      </div>
      <div className="px-4 pt-4">
        <p className="text-lg font-bold leading-6 tracking-[-0.02em] text-heading">
          Turn pilot interest into a rollout decision.
        </p>
      </div>
      <dl className="grid grid-cols-[4.5rem_1fr] gap-x-3 gap-y-2 p-4 text-sm leading-5">
        <dt className="font-semibold text-muted-foreground">Goal</dt>
        <dd className="font-medium text-heading">Agree rollout owner and timeline</dd>
        <dt className="font-semibold text-muted-foreground">Ask first</dt>
        <dd className="font-medium text-heading">“What has to be true to expand?”</dd>
        <dt className="font-semibold text-muted-foreground">Avoid</dt>
        <dd className="font-medium text-heading">Re-selling features they already value</dd>
      </dl>
      <div className="border-t bg-muted/45 px-4 py-3 text-center text-sm font-bold text-foreground">
        Open full cheat sheet · 2 min read
      </div>
    </button>
  );
}

function KnownCustomerBrief({ onOpenCheatSheet }: { onOpenCheatSheet: () => void }) {
  return (
    <AssistantMessage>
      <AssistantBubble>
        You&apos;re meeting <strong>Elena Weber and Mark Klein at 10:00</strong>. I pulled the opportunity and past conversations.
      </AssistantBubble>
      <ContextSources />
      <CheatSheetPreview onOpen={onOpenCheatSheet} />
    </AssistantMessage>
  );
}

function CheatSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="mx-auto max-h-[90dvh] max-w-[620px] overflow-y-auto rounded-t-3xl px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-7 sm:px-8 [&>button]:right-5 [&>button]:top-5 [&>button]:flex [&>button]:size-10 [&>button]:items-center [&>button]:justify-center"
      >
        <SheetHeader className="pr-12 text-left">
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-xl border bg-card p-1.5">
              <Image src="/logos/john-deere.svg" alt="John Deere logo" width={48} height={48} className="size-full object-contain" />
            </span>
            <div>
              <SheetTitle className="text-xl text-heading">John Deere cheat sheet</SheetTitle>
              <SheetDescription>Today, 10:00 · Elena Weber and Mark Klein</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="mt-7 space-y-6">
          <section aria-labelledby="cheat-goal">
            <p className="text-xs font-bold uppercase tracking-[0.09em] text-muted-foreground">Meeting goal</p>
            <h3 id="cheat-goal" className="mt-2 text-lg font-bold leading-6 text-heading">
              Agree who owns the rollout plan and leave with a procurement date.
            </h3>
          </section>

          <section className="rounded-2xl border bg-muted/40 p-5" aria-labelledby="cheat-people">
            <div className="flex items-center gap-2">
              <UsersRound className="size-5 text-muted-foreground" aria-hidden="true" />
              <h3 id="cheat-people" className="font-bold text-heading">People in the room</h3>
            </div>
            <dl className="mt-4 space-y-4 text-sm">
              <div>
                <dt className="font-bold text-heading">Elena Weber · Sales Operations</dt>
                <dd className="mt-1 leading-5 text-muted-foreground">Your champion. Wants a repeatable dealer rollout before taking this to procurement.</dd>
              </div>
              <div>
                <dt className="font-bold text-heading">Mark Klein · IT Applications</dt>
                <dd className="mt-1 leading-5 text-muted-foreground">Cares about SSO effort, support ownership, and a two-week onboarding window.</dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="cheat-questions">
            <p className="text-xs font-bold uppercase tracking-[0.09em] text-muted-foreground">Ask these questions</p>
            <ol id="cheat-questions" className="mt-3 space-y-3">
              {[
                "What has to be true for you to expand beyond the 12-dealer pilot?",
                "Who owns the 2025 cost ceiling, and when should we bring them in?",
                "Would a named onboarding owner remove the remaining IT concern?",
              ].map((question, index) => (
                <li key={question} className="flex gap-3 text-sm leading-5 text-foreground">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-heading text-xs font-bold text-white">{index + 1}</span>
                  {question}
                </li>
              ))}
            </ol>
          </section>

          <aside className="rounded-2xl border p-4" aria-label="Watch out">
            <p className="text-sm font-bold text-heading">Watch out</p>
            <p className="mt-1 text-sm leading-5 text-muted-foreground">
              The remaining concern is execution, not product fit. Don&apos;t spend the meeting re-selling features; make the rollout feel low-risk.
            </p>
          </aside>

          <section aria-labelledby="cheat-sources">
            <p id="cheat-sources" className="text-xs font-bold uppercase tracking-[0.09em] text-muted-foreground">Sources checked</p>
            <ul className="mt-3 divide-y rounded-2xl border bg-card px-4 text-sm">
              <li className="flex items-center justify-between gap-4 py-3"><span className="font-semibold text-heading">Salesforce opportunity</span><span className="text-muted-foreground">Updated 17 Jun</span></li>
              <li className="flex items-center justify-between gap-4 py-3"><span className="font-semibold text-heading">Dealer pilot call</span><span className="text-muted-foreground">12 Jun · 38 min</span></li>
              <li className="flex items-center justify-between gap-4 py-3"><span className="font-semibold text-heading">Technical review</span><span className="text-muted-foreground">28 May · 44 min</span></li>
            </ul>
          </section>

          <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Clock3 className="size-3.5" aria-hidden="true" />
            Refreshed just now from 6 source records
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function answerFor(message: string): string {
  const normalized = message.toLowerCase();
  if (normalized.includes("changed") || normalized.includes("since")) {
    return "The main change is that IT is no longer questioning product fit. Mark's latest note narrows the concern to SSO effort and who supports onboarding. That makes rollout ownership the best place to focus.";
  }
  if (normalized.includes("stakeholder") || normalized.includes("who")) {
    return "Elena is your champion and Mark is the technical gatekeeper. The missing stakeholder is the procurement owner for the 2025 cost ceiling—get their name and a date to involve them.";
  }
  return "The strongest next move is to make the rollout concrete: confirm the owner, validate the two-week onboarding estimate, and set a date with procurement before you leave.";
}

export function WikiChatView({ customerPreselected }: { customerPreselected: boolean }) {
  const [customerLoaded, setCustomerLoaded] = useState(customerPreselected);
  const [discoveryMethod, setDiscoveryMethod] = useState<"suggested" | "search" | null>(null);
  const [searchedCustomerMessage, setSearchedCustomerMessage] = useState("");
  const [matchRejected, setMatchRejected] = useState(false);
  const [cheatSheetOpen, setCheatSheetOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [followUps, setFollowUps] = useState<FollowUpMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (discoveryMethod || matchRejected || followUps.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [discoveryMethod, matchRejected, followUps.length]);

  function submitMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = draft.trim();
    if (!message) return;

    if (!customerLoaded && /john|deere/i.test(message)) {
      setSearchedCustomerMessage(message);
      setCustomerLoaded(true);
      setDiscoveryMethod("search");
      setDraft("");
      return;
    }

    const nextId = Date.now();
    setFollowUps((current) => [
      ...current,
      { id: nextId, role: "user", text: message },
      {
        id: nextId + 1,
        role: "assistant",
        text: customerLoaded
          ? answerFor(message)
          : "I couldn't confidently match that yet. Try the full company name or the meeting title and I'll search your calendar and CRM again.",
      },
    ]);
    setDraft("");
  }

  return (
    <main className="min-h-dvh bg-muted text-foreground">
      <div className="mx-auto min-h-dvh w-full max-w-[620px] bg-background shadow-popover">
        <header className="sticky top-0 z-30 border-b bg-background/95 px-5 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <VickyAvatar />
            <div className="min-w-0 flex-1">
              <h1 className="text-base font-bold leading-5 text-heading">Vicky</h1>
              <p className="text-xs text-muted-foreground">Your sales copilot</p>
            </div>
            <button type="button" className="flex size-10 items-center justify-center rounded-full border bg-card text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="Call Vicky">
              <Phone className="size-4" aria-hidden="true" />
            </button>
            <button type="button" className="flex size-10 items-center justify-center rounded-full text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="More chat options">
              <MoreHorizontal className="size-5" aria-hidden="true" />
            </button>
          </div>
        </header>

        {customerLoaded && (
          <div className="sticky top-[4.25rem] z-20 border-b bg-background/95 px-5 py-2.5 backdrop-blur sm:px-8" role="status">
            <div className="flex items-center gap-3 rounded-xl bg-muted px-3 py-2.5">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-card p-1">
                <Image src="/logos/john-deere.svg" alt="" width={32} height={32} className="size-full object-contain" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">Customer context</p>
                <p className="truncate text-sm font-bold text-heading">John Deere</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-success-foreground">
                <CheckCircle2 className="size-4" aria-hidden="true" />
                Loaded
              </span>
            </div>
          </div>
        )}

        <div className="px-5 pb-56 pt-7 sm:px-8">
          <div className="space-y-7">
            <UserBubble>Prepare me for my next meeting.</UserBubble>

            {customerPreselected ? (
              <KnownCustomerBrief onOpenCheatSheet={() => setCheatSheetOpen(true)} />
            ) : (
              <AssistantMessage>
                <AssistantBubble>
                  I checked your calendar and matched the attendees against your CRM. Your next customer meeting looks like this—is this the one you mean?
                </AssistantBubble>
                {!discoveryMethod && !matchRejected && (
                  <MeetingMatch
                    onConfirm={() => {
                      setCustomerLoaded(true);
                      setDiscoveryMethod("suggested");
                    }}
                    onReject={() => setMatchRejected(true)}
                  />
                )}
              </AssistantMessage>
            )}

            {matchRejected && (
              <AssistantMessage>
                <AssistantBubble>
                  No problem. Tell me the full customer name or meeting title below and I&apos;ll search again.
                </AssistantBubble>
              </AssistantMessage>
            )}

            {discoveryMethod && (
              <>
                <UserBubble>{discoveryMethod === "suggested" ? "Yes, John Deere." : searchedCustomerMessage}</UserBubble>
                <div className="flex items-center gap-3" aria-label="John Deere context loaded">
                  <span className="h-px flex-1 bg-border" />
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success-foreground">
                    <CheckCircle2 className="size-4" aria-hidden="true" />
                    John Deere context loaded
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <KnownCustomerBrief onOpenCheatSheet={() => setCheatSheetOpen(true)} />
              </>
            )}

            <div aria-live="polite" aria-label="New chat messages" className="contents">
              {followUps.map((message) =>
                message.role === "user" ? (
                  <UserBubble key={message.id}>{message.text}</UserBubble>
                ) : (
                  <AssistantMessage key={message.id}>
                    <AssistantBubble>{message.text}</AssistantBubble>
                  </AssistantMessage>
                ),
              )}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {customerLoaded && (
            <div className="mt-8 flex gap-2 overflow-x-auto pb-1" aria-label="Suggested questions">
              {["What changed since last time?", "Who are the key stakeholders?"].map((suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  onClick={() => setDraft(suggestion)}
                  className="shrink-0 rounded-full border bg-card px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="fixed inset-x-0 bottom-[calc(5.1rem+env(safe-area-inset-bottom))] z-30 mx-auto w-full max-w-[620px] bg-gradient-to-t from-background via-background to-transparent px-4 pb-3 pt-7 sm:px-7">
          <form onSubmit={submitMessage} className="flex items-center gap-2 rounded-2xl border bg-card p-2 shadow-popover focus-within:ring-2 focus-within:ring-ring">
            <Input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              className="h-11 flex-1 border-0 bg-transparent px-3 text-base shadow-none focus-visible:ring-0"
              placeholder={customerLoaded ? "Ask about John Deere…" : "Ask Vicky or name a customer…"}
              aria-label="Message Vicky"
            />
            <Button type="submit" size="icon" className="size-11 shrink-0 rounded-xl" disabled={!draft.trim()} aria-label="Send message">
              <ArrowUp className="size-5" aria-hidden="true" />
            </Button>
          </form>
        </div>

        <BottomNav
          active="customers"
          copy={wikiBottomNavCopy}
          destinations={wikiBottomNavDestinations}
        />
      </div>

      <CheatSheet open={cheatSheetOpen} onOpenChange={setCheatSheetOpen} />
    </main>
  );
}
