"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  AudioLines,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Headphones,
  Home,
  Lightbulb,
  MessageSquareText,
  Search,
  Sparkles,
  Target,
  UsersRound,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/shadcn/sheet";
import { cn } from "@/libs/utils";

type PrepAccount = {
  id: string;
  company: string;
  contact: string;
  initials: string;
  matchReason: string;
  matchLabel: string;
  potential: string;
  probability: number;
  stage: string;
  milestone: string;
  goal: string;
  lastDate: string;
  lastConversation: string;
  commitments: { label: string; status: "done" | "waiting" }[];
  questions: { title: string; detail: string }[];
  watchout: string;
};

const accounts: PrepAccount[] = [
  {
    id: "forester",
    company: "Forester GmbH",
    contact: "Natascha Slatan",
    initials: "FG",
    matchReason: "Same email and company domain",
    matchLabel: "Strong match",
    potential: "€86,000",
    probability: 70,
    stage: "Expansion",
    milestone: "Decision expected 2 July",
    goal: "Agree the rollout size and leave with a date for the pilot.",
    lastDate: "7 May · 42 min call",
    lastConversation:
      "Natascha said the southern stores are ready to expand, but she needs a clearer volume discount before involving procurement.",
    commitments: [
      { label: "You sent the revised pricing", status: "done" },
      { label: "Natascha shares store forecasts", status: "waiting" },
    ],
    questions: [
      {
        title: "What changed in the store forecast?",
        detail: "This determines whether the pilot covers 12 or 20 locations.",
      },
      {
        title: "Who from procurement needs to approve?",
        detail: "Get a name and invite them to the next step.",
      },
      {
        title: "Would a 3-month pilot remove the risk?",
        detail: "Offer Munich and Augsburg as the starting region.",
      },
    ],
    watchout:
      "Price is the concern—not product fit. Lead with rollout value before discussing another discount.",
  },
  {
    id: "forster-retail",
    company: "Forster Retail AG",
    contact: "Petra Forster",
    initials: "FR",
    matchReason: "Similar company name in your territory",
    matchLabel: "Possible match",
    potential: "€41,500",
    probability: 45,
    stage: "Discovery",
    milestone: "Needs assessment this month",
    goal: "Confirm whether the regional team has budget for a paid pilot.",
    lastDate: "18 April · 28 min call",
    lastConversation:
      "Petra was interested in a pilot for six stores and asked for proof that onboarding can be completed within two weeks.",
    commitments: [
      { label: "You sent the onboarding plan", status: "done" },
      { label: "Petra confirms pilot budget", status: "waiting" },
    ],
    questions: [
      {
        title: "Is budget available this quarter?",
        detail: "Confirm the amount and who owns it.",
      },
      {
        title: "Which six stores should join first?",
        detail: "Look for locations with a strong local champion.",
      },
      {
        title: "What would make onboarding feel safe?",
        detail: "Offer a named implementation contact and weekly check-ins.",
      },
    ],
    watchout:
      "The project has interest but no confirmed budget. Avoid planning dates until budget ownership is clear.",
  },
];

function AppHeader({ compact = false }: { compact?: boolean }) {
  return (
    <header className={cn("px-5 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-7", compact ? "pb-3" : "pb-5")}>
      <div className="flex items-center justify-between gap-4">
        <Image
          src="/bliro-logo.svg"
          alt="Bliro"
          width={76}
          height={22}
          priority
          className="h-[1.35rem] w-auto"
        />
        <button
          type="button"
          className="relative size-12 overflow-hidden rounded-full border-2 border-white bg-accent shadow-[0_3px_14px_rgba(19,26,38,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Open Fritz's profile"
        >
          <Image src="/tim_avatar.png" alt="" fill sizes="48px" className="object-cover" />
        </button>
      </div>
    </header>
  );
}

function BottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-40 mx-auto flex w-full max-w-xl border-t bg-white/95 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_28px_rgba(19,26,38,0.07)] backdrop-blur"
      aria-label="Main navigation"
    >
      <Link href="/calendar" className="flex min-h-16 flex-1 flex-col items-center justify-center gap-1 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset">
        <Home className="size-5" aria-hidden="true" />
        Home
      </Link>
      <Link href="/wiki-chat" className="flex min-h-16 flex-1 flex-col items-center justify-center gap-1 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset">
        <UsersRound className="size-5" aria-hidden="true" />
        Customers
      </Link>
      <Link href="/prep-my-meeting" aria-current="page" className="flex min-h-16 flex-1 flex-col items-center justify-center gap-1 rounded-xl bg-accent/75 text-sm font-semibold text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset">
        <CalendarDays className="size-5" aria-hidden="true" />
        Meetings
      </Link>
    </nav>
  );
}

function MatchConfirmation({
  account,
  onConfirm,
  onChoose,
}: {
  account: PrepAccount;
  onConfirm: () => void;
  onChoose: () => void;
}) {
  return (
    <>
      <AppHeader compact />
      <div className="px-5 pb-8 sm:px-7">
        <header className="mt-2 text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">
            <Sparkles className="size-3.5" aria-hidden="true" />
            CRM match found
          </p>
          <h1 className="mt-3 text-[1.75rem] font-semibold leading-9 tracking-[-0.04em] text-heading">
            Is this the right customer?
          </h1>
          <p className="mt-1 text-base text-muted-foreground">Your next meeting is in 38 minutes.</p>
        </header>

        <section className="relative mx-auto mt-5 max-w-md" aria-label="Suggested CRM match">
          <div className="absolute inset-x-5 -bottom-2 top-4 rounded-[1.75rem] border bg-white/60" aria-hidden="true" />
          <article className="relative overflow-hidden rounded-[1.75rem] border border-[#e4dfd8] bg-white shadow-[0_18px_50px_rgba(19,26,38,0.13)]">
            <div className="relative flex min-h-44 flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top_left,#ffd8c6_0%,#fff4ed_38%,#f1f4f0_100%)] px-5 py-7 text-center">
              <div className="absolute -right-10 -top-12 size-36 rounded-full border-[22px] border-white/30" aria-hidden="true" />
              <div className="absolute -bottom-16 -left-12 size-40 rounded-full bg-primary/10" aria-hidden="true" />
              <span className="relative flex size-20 items-center justify-center rounded-3xl bg-heading text-2xl font-semibold text-white shadow-[0_10px_30px_rgba(19,26,38,0.22)]">
                {account.initials}
              </span>
              <h2 className="relative mt-4 text-2xl font-semibold tracking-tight text-heading">{account.company}</h2>
              <p className="relative mt-1 text-base text-foreground">{account.contact}</p>
              <span className="relative mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-success-foreground shadow-sm">
                <CheckCircle2 className="size-4" aria-hidden="true" />
                {account.matchLabel}
              </span>
            </div>

            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-[0.09em] text-muted-foreground">Calendar event</p>
              <div className="mt-2 flex items-center gap-3 rounded-2xl bg-[#f7f6f3] p-3.5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-primary shadow-card">
                  <CalendarDays className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold text-heading">Range planning</p>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">Today, 11:45 · Natascha Slatan</p>
                </div>
              </div>
              <p className="mt-3 text-center text-xs font-medium text-muted-foreground">{account.matchReason}</p>
            </div>
          </article>
        </section>

        <div className="mt-7 flex items-start justify-center gap-10" aria-label="Confirm CRM match">
          <div className="text-center">
            <button
              type="button"
              onClick={onChoose}
              className="flex size-[4.5rem] items-center justify-center rounded-full border-2 border-[#d9d6d0] bg-white text-muted-foreground shadow-[0_8px_24px_rgba(19,26,38,0.1)] transition-transform hover:scale-105 hover:border-destructive/40 hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-95"
              aria-label="No, choose another customer"
            >
              <X className="size-8" strokeWidth={2.5} aria-hidden="true" />
            </button>
            <p className="mt-2 text-sm font-semibold text-muted-foreground">Not this one</p>
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={onConfirm}
              className="flex size-[4.5rem] items-center justify-center rounded-full bg-success text-white shadow-[0_10px_28px_rgba(0,188,143,0.28)] transition-transform hover:scale-105 hover:bg-success/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success focus-visible:ring-offset-2 active:scale-95"
              aria-label="Yes, use this CRM match"
            >
              <Check className="size-9" strokeWidth={3} aria-hidden="true" />
            </button>
            <p className="mt-2 text-sm font-semibold text-success-foreground">Yes, that&apos;s right</p>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-muted-foreground">Tap one button—no CRM data will be changed.</p>
      </div>
    </>
  );
}

function PrepBriefing({ account, onBack }: { account: PrepAccount; onBack: () => void }) {
  const [briefingPlaying, setBriefingPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  return (
    <>
      <AppHeader compact />
      <div className="px-5 pb-10 sm:px-7">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-semibold text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Change meeting
        </button>

        <section className="mt-3 rounded-3xl bg-heading p-5 text-white shadow-[0_18px_50px_rgba(19,26,38,0.18)]" aria-labelledby="briefing-heading">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-white/65">
                <CheckCircle2 className="size-4 text-[#53d6a7]" aria-hidden="true" />
                Briefing ready
              </p>
              <h1 id="briefing-heading" className="mt-2 text-[1.7rem] font-semibold leading-8 tracking-[-0.04em] text-white">
                {account.company}
              </h1>
              <p className="mt-1 text-sm text-white/70">Today, 11:45 · with {account.contact}</p>
            </div>
            <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-base font-bold text-white">
              {account.initials}
            </span>
          </div>

          <button
            type="button"
            aria-pressed={briefingPlaying}
            onClick={() => setBriefingPlaying((current) => !current)}
            className="mt-5 flex min-h-14 w-full items-center gap-3 rounded-2xl bg-white px-4 text-left text-heading transition-colors hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-heading"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-heading">
              {briefingPlaying ? <AudioLines className="size-5" aria-hidden="true" /> : <Headphones className="size-5" aria-hidden="true" />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold">{briefingPlaying ? "Playing your briefing" : "Listen to my 90-second briefing"}</span>
              <span className="mt-0.5 block text-xs text-muted-foreground">{briefingPlaying ? "Tap to pause" : "Useful while you walk or drive"}</span>
            </span>
            {briefingPlaying ? (
              <span className="flex h-6 items-center gap-1" aria-hidden="true">
                {[12, 20, 15, 23].map((height, index) => (
                  <span key={index} className="transcription-wave-bar w-1 rounded-full bg-primary" style={{ height, animationDelay: `${index * 120}ms` }} />
                ))}
              </span>
            ) : (
              <ChevronRight className="size-5 text-muted-foreground" aria-hidden="true" />
            )}
          </button>
        </section>

        <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.09em] text-muted-foreground">
          <Sparkles className="size-4 text-primary" aria-hidden="true" />
          Your meeting plan
          <span className="ml-auto normal-case tracking-normal">4 min read</span>
        </div>

        <section className="mt-3 overflow-hidden rounded-2xl border border-primary/20 bg-[linear-gradient(135deg,#fff7f1_0%,#ffffff_72%)] shadow-[0_8px_30px_rgba(242,104,53,0.08)]" aria-labelledby="goal-heading">
          <div className="p-5">
            <div className="flex items-center gap-2 text-sm font-bold text-accent-foreground">
              <Target className="size-5" aria-hidden="true" />
              Your goal today
            </div>
            <h2 id="goal-heading" className="mt-3 text-xl font-semibold leading-7 tracking-tight text-heading">
              {account.goal}
            </h2>
          </div>
          <div className="grid grid-cols-2 border-t bg-white/75">
            <div className="border-r p-4">
              <p className="text-xs font-semibold text-muted-foreground">Open potential</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-heading">{account.potential}</p>
            </div>
            <div className="p-4">
              <p className="text-xs font-semibold text-muted-foreground">Win likelihood</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-heading">{account.probability}%</p>
            </div>
          </div>
          <div className="border-t bg-white px-4 py-3">
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="inline-flex items-center gap-1.5 font-semibold text-foreground">
                <CircleDollarSign className="size-4 text-primary" aria-hidden="true" />
                {account.stage}
              </span>
              <span className="text-right text-muted-foreground">{account.milestone}</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary" aria-label={`${account.probability}% win likelihood`} role="progressbar" aria-valuenow={account.probability} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full rounded-full bg-primary" style={{ width: `${account.probability}%` }} />
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-2xl border bg-white p-5 shadow-[0_8px_28px_rgba(19,26,38,0.05)]" aria-labelledby="last-time-heading">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#edf4f0] text-[#37634e]">
              <MessageSquareText className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">Last time you talked</p>
              <h2 id="last-time-heading" className="mt-0.5 text-base font-semibold text-heading">{account.lastDate}</h2>
            </div>
          </div>
          <blockquote className="mt-4 border-l-[3px] border-primary pl-4 text-[0.9375rem] leading-6 text-foreground">
            {account.lastConversation}
          </blockquote>
          <div className="mt-4 border-t pt-4">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">What you agreed</p>
            <ul className="mt-3 space-y-3">
              {account.commitments.map((commitment) => (
                <li key={commitment.label} className="flex items-start gap-2.5 text-sm leading-5 text-foreground">
                  {commitment.status === "done" ? (
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-success-subtle text-success-foreground">
                      <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                    </span>
                  ) : (
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#fff2d8] text-[#8a5b00]">
                      <Clock3 className="size-3.5" aria-hidden="true" />
                    </span>
                  )}
                  <span>{commitment.label}</span>
                  <span className={cn("ml-auto shrink-0 text-xs font-semibold", commitment.status === "done" ? "text-success-foreground" : "text-[#8a5b00]")}>{commitment.status === "done" ? "Done" : "Waiting"}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-5 rounded-2xl border bg-white p-5 shadow-[0_8px_28px_rgba(19,26,38,0.05)]" aria-labelledby="questions-heading">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
              <Lightbulb className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground">Recommended</p>
              <h2 id="questions-heading" className="text-lg font-semibold tracking-tight text-heading">Ask these 3 questions</h2>
            </div>
          </div>
          <ol className="mt-5 space-y-5">
            {account.questions.map((question, index) => (
              <li key={question.title} className="flex gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-heading text-sm font-bold text-white">{index + 1}</span>
                <div className="pt-0.5">
                  <p className="text-[0.9375rem] font-semibold leading-5 text-heading">{question.title}</p>
                  <p className="mt-1 text-sm leading-5 text-muted-foreground">{question.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <aside className="mt-5 rounded-2xl border border-[#f0d291] bg-[#fff8e8] p-4" aria-label="Important context">
          <div className="flex gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#ffeab9] text-[#815600]">
              <Lightbulb className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-[#684700]">Keep in mind</p>
              <p className="mt-1 text-sm leading-6 text-[#624f25]">{account.watchout}</p>
            </div>
          </div>
        </aside>

        <div className="mt-7">
          {ready ? (
            <div className="rounded-2xl border border-success/25 bg-success-subtle p-5 text-center" role="status">
              <CheckCircle2 className="mx-auto size-8 text-success-foreground" aria-hidden="true" />
              <p className="mt-2 text-lg font-semibold text-heading">You&apos;re ready, Fritz</p>
              <p className="mt-1 text-sm text-success-foreground">I&apos;ll keep the notes handy for the meeting.</p>
            </div>
          ) : (
            <Button type="button" size="lg" className="h-14 w-full rounded-xl text-base" onClick={() => setReady(true)}>
              <CheckCircle2 className="size-5" aria-hidden="true" />
              I&apos;m ready for the meeting
            </Button>
          )}
          <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Building2 className="size-3.5" aria-hidden="true" />
            Sources: Salesforce, calendar, Bliro transcripts
          </p>
        </div>
      </div>
    </>
  );
}

function CustomerPicker({
  open,
  onOpenChange,
  selectedAccount,
  onSelect,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAccount: PrepAccount;
  onSelect: (account: PrepAccount) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="mx-auto max-h-[88dvh] max-w-xl overflow-y-auto rounded-t-3xl border-x px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-7 sm:px-7 [&>button]:right-5 [&>button]:top-5 [&>button]:flex [&>button]:size-10 [&>button]:items-center [&>button]:justify-center">
        <SheetHeader className="pr-11 text-left">
          <SheetTitle className="text-xl text-heading">Choose the right customer</SheetTitle>
          <SheetDescription className="text-sm leading-5">We&apos;ll use this CRM record to build your briefing.</SheetDescription>
        </SheetHeader>

        <div className="relative mt-5">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input className="h-12 rounded-xl bg-muted/45 pl-11 text-base" defaultValue="Forester" aria-label="Search CRM customers" />
        </div>

        <div className="mt-4 grid gap-3">
          {accounts.map((account, index) => {
            const selected = account.id === selectedAccount.id;
            return (
              <button
                type="button"
                key={account.id}
                onClick={() => onSelect(account)}
                className={cn(
                  "flex min-h-20 w-full items-center gap-3 rounded-2xl border bg-white p-3.5 text-left transition-colors hover:border-primary/45 hover:bg-accent/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  selected && "border-primary/50 bg-accent/30",
                )}
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#eaf3ef] text-sm font-bold text-[#315c48]">{account.initials}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-base font-semibold text-heading">{account.company}</span>
                  <span className="mt-0.5 block truncate text-sm text-muted-foreground">{account.contact}</span>
                  {index === 0 && <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-success-foreground"><Sparkles className="size-3" /> Best match</span>}
                </span>
                {selected ? <CheckCircle2 className="size-6 shrink-0 text-primary" aria-label="Selected" /> : <ChevronRight className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        <button type="button" className="mt-4 flex min-h-14 w-full items-center gap-3 rounded-xl border border-dashed px-4 text-left text-sm font-semibold text-muted-foreground hover:border-primary/40 hover:bg-accent/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <span className="flex size-8 items-center justify-center rounded-lg bg-muted"><Building2 className="size-4" /></span>
          I can&apos;t find the customer
          <ChevronRight className="ml-auto size-5" />
        </button>
      </SheetContent>
    </Sheet>
  );
}

export function PrepMeetingView() {
  const [stage, setStage] = useState<"confirm" | "briefing">("confirm");
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [pickerOpen, setPickerOpen] = useState(false);

  return (
    <main className={cn("min-h-dvh bg-[#f2f0eb] text-foreground", stage === "briefing" && "pb-24")}>
      <div className="mx-auto min-h-dvh w-full max-w-xl bg-[#fbfaf8] shadow-[0_0_60px_rgba(19,26,38,0.07)]">
        {stage === "confirm" ? (
          <MatchConfirmation account={selectedAccount} onConfirm={() => setStage("briefing")} onChoose={() => setPickerOpen(true)} />
        ) : (
          <PrepBriefing account={selectedAccount} onBack={() => setStage("confirm")} />
        )}
      </div>

      {stage === "briefing" && <BottomNav />}
      <CustomerPicker
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        selectedAccount={selectedAccount}
        onSelect={(account) => {
          setSelectedAccount(account);
          setPickerOpen(false);
        }}
      />
    </main>
  );
}
