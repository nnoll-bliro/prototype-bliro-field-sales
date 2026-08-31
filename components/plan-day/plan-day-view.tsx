"use client";

import { FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CarFront,
  Check,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Navigation,
  Plus,
  Route,
  Sparkles,
  Trash2,
  UsersRound,
} from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/shadcn/sheet";
import { cn } from "@/libs/utils";

type AppointmentStatus = "done" | "next" | "later";

type Appointment = {
  id: string;
  time: string;
  endTime: string;
  contact: string;
  company: string;
  address: string;
  city: string;
  status: AppointmentStatus;
  driveMinutes?: number;
  distanceKm?: number;
};

const initialAppointments: Appointment[] = [
  {
    id: "swiss-built",
    time: "09:00",
    endTime: "10:00",
    contact: "Holger Dodi",
    company: "Swiss Built",
    address: "Seestrasse 18",
    city: "Starnberg",
    status: "done",
  },
  {
    id: "forester",
    time: "11:45",
    endTime: "12:30",
    contact: "Natascha Slatan",
    company: "Forester GmbH",
    address: "Leopoldstrasse 72",
    city: "Munich",
    status: "next",
    driveMinutes: 32,
    distanceKm: 24,
  },
  {
    id: "liquid-labs",
    time: "14:30",
    endTime: "15:15",
    contact: "Olaf Olching",
    company: "Liquid Labs",
    address: "Balanstrasse 49",
    city: "Munich",
    status: "later",
    driveMinutes: 18,
    distanceKm: 9,
  },
];

function minutesFromTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function AppointmentCard({
  appointment,
  onPrep,
  onRemove,
}: {
  appointment: Appointment;
  onPrep: (appointment: Appointment) => void;
  onRemove: (appointment: Appointment) => void;
}) {
  const isNext = appointment.status === "next";
  const isDone = appointment.status === "done";

  return (
    <article
      className={cn(
        "min-w-0 flex-1 rounded-2xl border bg-white p-4 shadow-[0_8px_28px_rgba(19,26,38,0.06)] transition-shadow",
        isNext && "border-primary/55 shadow-[0_10px_32px_rgba(242,104,53,0.13)]",
        isDone && "bg-white/65 shadow-none",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            {isNext && (
              <span className="rounded-full bg-accent px-2 py-0.5 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-accent-foreground">
                Up next
              </span>
            )}
            {isDone && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-success-foreground">
                <Check className="size-3.5" /> Visited
              </span>
            )}
          </div>
          <h3 className="truncate text-[1.0625rem] font-semibold tracking-tight text-heading">
            {appointment.contact}
          </h3>
          <p className="mt-0.5 truncate text-sm font-medium text-foreground">
            {appointment.company}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="-mr-2 -mt-2 flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`More options for ${appointment.company}`}
            >
              <MoreHorizontal className="size-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem
              className="min-h-10 text-destructive-foreground focus:bg-destructive-subtle"
              onSelect={() => onRemove(appointment)}
            >
              <Trash2 /> Remove from day
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="mt-3 flex items-start gap-2 text-xs leading-5 text-muted-foreground">
        <MapPin className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        <span>
          {appointment.address}, {appointment.city}
        </span>
      </div>

      {!isDone && (
        <div className="mt-4 flex gap-2">
          <Button
            type="button"
            size="default"
            variant={isNext ? "primary" : "outline"}
            className={cn("flex-1", !isNext && "border-primary/35 text-accent-foreground")}
            onClick={() => onPrep(appointment)}
          >
            <Sparkles aria-hidden="true" />
            Prep me
          </Button>
          {isNext && (
            <Button type="button" size="icon" variant="secondary" aria-label="Start navigation">
              <Navigation aria-hidden="true" />
            </Button>
          )}
        </div>
      )}
    </article>
  );
}

function TravelLeg({ appointment }: { appointment: Appointment }) {
  if (!appointment.driveMinutes) return null;

  return (
    <div className="grid grid-cols-[3.75rem_1.25rem_minmax(0,1fr)] gap-3 py-2" aria-label={`${appointment.driveMinutes} minute drive`}>
      <div />
      <div className="flex justify-center">
        <div className="h-full min-h-10 border-l-2 border-dashed border-[#cdd6d1]" />
      </div>
      <div className="flex items-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#edf4f0] px-2.5 py-1 text-[0.6875rem] font-semibold text-[#3c6552]">
          <CarFront className="size-3.5" aria-hidden="true" />
          {appointment.driveMinutes} min · {appointment.distanceKm} km
        </span>
      </div>
    </div>
  );
}

function SuggestedStop({
  onAdd,
  onDismiss,
}: {
  onAdd: () => void;
  onDismiss: () => void;
}) {
  return (
    <div className="grid grid-cols-[3.75rem_1.25rem_minmax(0,1fr)] gap-3 py-3">
      <div className="pt-12 text-right">
        <span className="block text-sm font-semibold tabular-nums text-primary">
          13:10
        </span>
        <span className="mt-0.5 block text-[0.6875rem] tabular-nums text-muted-foreground">
          13:40
        </span>
      </div>
      <div className="flex h-full flex-col items-center">
        <div className="h-10 border-l-2 border-dashed border-primary/35" />
        <span className="z-10 flex size-6 items-center justify-center rounded-full bg-primary text-white ring-4 ring-accent">
          <Sparkles className="size-3.5" aria-hidden="true" />
        </span>
        <div className="min-h-6 flex-1 border-l-2 border-dashed border-primary/35" />
      </div>
      <article className="rounded-2xl border border-dashed border-primary/60 bg-accent/45 p-4 shadow-[0_8px_28px_rgba(242,104,53,0.08)]">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.07em] text-accent-foreground">
            <Sparkles className="size-3" /> Smart suggestion
          </span>
          <span className="text-xs font-semibold text-accent-foreground">
            +7 min detour
          </span>
        </div>

        <h3 className="mt-3 text-base font-semibold tracking-tight text-heading">
          Bergmann Technik
        </h3>
        <p className="mt-0.5 text-sm text-foreground">Anna Bergmann</p>
        <p className="mt-2 text-xs leading-5 text-muted-foreground">
          This account is close to your route and due for a follow-up.
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-full border border-primary/20 bg-white/80 px-2 py-1 text-[0.6875rem] font-medium text-foreground">
            2.4 km away
          </span>
          <span className="rounded-full border border-primary/20 bg-white/80 px-2 py-1 text-[0.6875rem] font-medium text-foreground">
            No visit in 74 days
          </span>
          <span className="rounded-full border border-primary/20 bg-white/80 px-2 py-1 text-[0.6875rem] font-medium text-foreground">
            Renewal open
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <Button type="button" size="sm" className="flex-1" onClick={onAdd}>
            <Plus /> Add to route
          </Button>
          <Button type="button" size="sm" variant="ghost" onClick={onDismiss}>
            Not today
          </Button>
        </div>
      </article>
    </div>
  );
}

export function PlanDayView() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [prepMeeting, setPrepMeeting] = useState<Appointment | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [suggestionVisible, setSuggestionVisible] = useState(true);
  const [prepNotice, setPrepNotice] = useState<string | null>(null);

  const routeSummary = useMemo(() => {
    const drives = appointments.reduce((sum, meeting) => sum + (meeting.driveMinutes ?? 0), 0);
    const distance = appointments.reduce((sum, meeting) => sum + (meeting.distanceKm ?? 0), 0);
    return { drives, distance };
  }, [appointments]);

  const removeAppointment = (appointment: Appointment) => {
    setAppointments((current) => current.filter((item) => item.id !== appointment.id));
    setNotice(`${appointment.company} removed from today.`);
  };

  const addSuggestedStop = () => {
    const suggestedAppointment: Appointment = {
      id: "bergmann-suggested-stop",
      time: "13:10",
      endTime: "13:40",
      contact: "Anna Bergmann",
      company: "Bergmann Technik",
      address: "Rosenheimer Strasse 143",
      city: "Munich",
      status: "later",
      driveMinutes: 7,
      distanceKm: 2.4,
    };

    setAppointments((current) =>
      [...current, suggestedAppointment].sort(
        (left, right) =>
          minutesFromTime(left.time) - minutesFromTime(right.time),
      ),
    );
    setSuggestionVisible(false);
    setNotice("Bergmann Technik added to your route.");
  };

  const addAppointment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const time = String(form.get("time") || "16:00");
    const company = String(form.get("company") || "Huber & Sons");
    const contact = String(form.get("contact") || "Marta Weiss");
    const city = String(form.get("city") || "Munich");

    const nextAppointment: Appointment = {
      id: `${company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
      time,
      endTime: "17:00",
      company,
      contact,
      address: "Customer address",
      city,
      status: "later",
      driveMinutes: 21,
      distanceKm: 12,
    };

    setAppointments((current) =>
      [...current, nextAppointment].sort((left, right) => minutesFromTime(left.time) - minutesFromTime(right.time)),
    );
    setAddOpen(false);
    setNotice(`${company} added to today.`);
  };

  return (
    <main className="min-h-dvh bg-[#f6f5f2] pb-28 text-foreground">
      <div className="mx-auto min-h-dvh w-full max-w-xl bg-[#fbfaf8] shadow-[0_0_60px_rgba(19,26,38,0.06)]">
        <header className="px-5 pb-2 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-7">
          <div className="flex items-center justify-between gap-4">
            <Image src="/bliro-logo.svg" alt="Bliro" width={72} height={20} priority className="h-5 w-auto" />
            <button
              type="button"
              className="relative size-11 overflow-hidden rounded-full border-2 border-white bg-accent shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Open Fritz's profile"
            >
              <Image src="/tim_avatar.png" alt="" fill sizes="44px" className="object-cover" />
            </button>
          </div>

          <div className="mt-7">
            <p className="text-sm font-medium text-muted-foreground">Good morning, Fritz</p>
            <h1 className="mt-1 text-[1.75rem] font-semibold leading-9 tracking-[-0.04em] text-heading">
              Let&apos;s plan your day
            </h1>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-[#e8e5df] bg-white px-4 py-3 shadow-[0_4px_18px_rgba(19,26,38,0.04)]">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-primary">
                <CalendarDays className="size-[1.125rem]" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-heading">Today</p>
                <p className="text-xs text-muted-foreground">Tuesday, 18 June</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold tabular-nums text-heading">{appointments.length} stops</p>
              <p className="text-xs tabular-nums text-muted-foreground">{routeSummary.distance} km total</p>
            </div>
          </div>
        </header>

        <section className="px-5 pb-8 pt-6 sm:px-7" aria-labelledby="agenda-heading">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 id="agenda-heading" className="text-base font-semibold text-heading">Today&apos;s route</h2>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Route className="size-3.5" aria-hidden="true" />
                {routeSummary.drives} min on the road
              </p>
            </div>
            <Button type="button" size="sm" variant="outline" className="bg-white" onClick={() => setAddOpen(true)}>
              <Plus aria-hidden="true" /> Add stop
            </Button>
          </div>

          {notice && (
            <div className="mb-4 flex items-center justify-between gap-3 rounded-lg bg-success-subtle px-3 py-2 text-xs font-medium text-success-foreground" role="status">
              <span>{notice}</span>
              <button type="button" className="font-semibold underline underline-offset-2" onClick={() => setNotice(null)}>Dismiss</button>
            </div>
          )}

          {appointments.length > 0 ? (
            <div>
              {appointments.map((appointment, index) => (
                <div key={appointment.id}>
                  {index > 0 && <TravelLeg appointment={appointment} />}
                  <div className="grid grid-cols-[3.75rem_1.25rem_minmax(0,1fr)] items-start gap-3">
                    <div className="pt-4 text-right">
                      <time className="block text-sm font-semibold tabular-nums text-heading" dateTime={appointment.time}>{appointment.time}</time>
                      <span className="mt-0.5 block text-[0.6875rem] tabular-nums text-muted-foreground">{appointment.endTime}</span>
                    </div>
                    <div className="flex h-full flex-col items-center pt-5">
                      <span className={cn("z-10 flex size-4 items-center justify-center rounded-full border-[3px] border-[#fbfaf8] ring-2", appointment.status === "done" ? "bg-success ring-success/30" : appointment.status === "next" ? "bg-primary ring-primary/30" : "bg-white ring-[#bfc6c2]")}>{appointment.status === "done" && <Check className="size-2.5 text-white" strokeWidth={4} />}</span>
                    </div>
                    <AppointmentCard appointment={appointment} onPrep={setPrepMeeting} onRemove={removeAppointment} />
                  </div>
                  {appointment.id === "forester" && suggestionVisible && (
                    <SuggestedStop
                      onAdd={addSuggestedStop}
                      onDismiss={() => {
                        setSuggestionVisible(false);
                        setNotice("Suggestion hidden for today.");
                      }}
                    />
                  )}
                </div>
              ))}

              <div className="grid grid-cols-[3.75rem_1.25rem_minmax(0,1fr)] gap-3 pt-3">
                <div />
                <div className="flex justify-center"><div className="h-8 border-l-2 border-dashed border-[#cdd6d1]" /></div>
                <button type="button" onClick={() => setAddOpen(true)} className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-dashed border-input bg-white/60 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary/50 hover:bg-accent/50 hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <Plus className="size-4" /> Add another meeting
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed bg-white px-6 py-12 text-center">
              <CalendarDays className="mx-auto size-7 text-muted-foreground" />
              <h3 className="mt-3 text-base font-semibold text-heading">Your day is clear</h3>
              <p className="mt-1 text-sm text-muted-foreground">Add a customer meeting to start your route.</p>
              <Button type="button" className="mt-5" onClick={() => setAddOpen(true)}><Plus /> Add meeting</Button>
            </div>
          )}
        </section>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 mx-auto flex w-full max-w-xl border-t bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_28px_rgba(19,26,38,0.06)] backdrop-blur" aria-label="Main navigation">
        <button type="button" className="flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-xl text-xs font-semibold text-muted-foreground hover:bg-muted">
          <UsersRound className="size-5" /> Customers
        </button>
        <button type="button" className="flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-xl bg-accent/70 text-xs font-semibold text-accent-foreground">
          <CarFront className="size-5" /> Plan my day
        </button>
      </nav>

      <Sheet open={addOpen} onOpenChange={setAddOpen}>
        <SheetContent side="bottom" className="mx-auto max-w-xl rounded-t-3xl border-x px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-7 sm:px-7 [&>button]:right-5 [&>button]:top-5">
          <SheetHeader className="pr-10 text-left">
            <SheetTitle className="text-xl text-heading">Add a meeting</SheetTitle>
            <SheetDescription>Add a changed or last-minute customer stop to today&apos;s route.</SheetDescription>
          </SheetHeader>
          <form className="mt-6 grid gap-4" onSubmit={addAppointment}>
            <div className="grid grid-cols-[1fr_7rem] gap-3">
              <div className="grid gap-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" defaultValue="Huber & Sons" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" name="time" type="time" defaultValue="16:00" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact">Contact</Label>
              <Input id="contact" name="contact" defaultValue="Marta Weiss" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" defaultValue="Munich" required />
            </div>
            <Button type="submit" size="lg" className="mt-2 w-full">Add to today <ArrowRight /></Button>
          </form>
        </SheetContent>
      </Sheet>

      <Sheet open={prepMeeting !== null} onOpenChange={(open) => { if (!open) { setPrepMeeting(null); setPrepNotice(null); } }}>
        <SheetContent side="bottom" className="mx-auto max-h-[88dvh] max-w-xl overflow-y-auto rounded-t-3xl border-x px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-7 sm:px-7 [&>button]:right-5 [&>button]:top-5">
          <SheetHeader className="pr-10 text-left">
            <div className="mb-1 flex size-11 items-center justify-center rounded-2xl bg-accent text-primary"><Sparkles className="size-5" /></div>
            <SheetTitle className="text-xl text-heading">Prep for {prepMeeting?.company}</SheetTitle>
            <SheetDescription>{prepMeeting?.time} with {prepMeeting?.contact}</SheetDescription>
          </SheetHeader>

          <div className="mt-6 grid gap-3">
            <div className="rounded-2xl border bg-muted/45 p-4">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground"><BriefcaseBusiness className="size-4" /> Account snapshot</p>
              <p className="mt-3 text-sm leading-6 text-foreground">Growing account with an open expansion opportunity. Last visit was 6 weeks ago.</p>
            </div>
            <div className="rounded-2xl border bg-white p-4">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-muted-foreground"><MessageCircle className="size-4" /> Suggested talking points</p>
              <ul className="mt-3 space-y-3 text-sm text-foreground">
                <li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-success" /> Ask about Q3 rollout timing</li>
                <li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-success" /> Follow up on the pricing proposal</li>
                <li className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-success" /> Confirm next decision makers</li>
              </ul>
            </div>
          </div>

          <Button type="button" size="lg" className="mt-5 w-full" onClick={() => setPrepNotice("Vicky is ready to run through the meeting with you.")}>Talk it through with Vicky <ArrowRight /></Button>
          {prepNotice && <p className="mt-3 rounded-lg bg-success-subtle px-3 py-2 text-center text-xs font-medium text-success-foreground" role="status">{prepNotice}</p>}
        </SheetContent>
      </Sheet>
    </main>
  );
}
