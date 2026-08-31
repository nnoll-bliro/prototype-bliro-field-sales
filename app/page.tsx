import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CalendarDays,
  Layers3,
  LayoutDashboard,
  MapPinned,
  MessageSquareText,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-muted/40 px-6 py-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <header className="max-w-2xl space-y-4">
          <Image
            src="/bliro-logo.svg"
            alt="Bliro"
            width={144}
            height={40}
            priority
            className="mb-10 h-10 w-auto"
          />
          <div className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-sm text-muted-foreground">
            <Layers3 className="size-4" />
            Internal playground
          </div>
          <h1 className="text-[2rem] font-semibold leading-10 tracking-[-0.04rem] sm:text-[2.5rem] sm:leading-[3.5rem] sm:tracking-[-0.05rem]">
            Build visual prototypes quickly.
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            A lean Next.js App Router setup with Tailwind, reusable UI
            primitives, and no authentication or backend integrations.
          </p>
        </header>

        <section className="space-y-5" aria-labelledby="prototypes-heading">
          <div>
            <h2
              id="prototypes-heading"
              className="text-xl font-semibold tracking-tight"
            >
              Prototypes
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Open an existing flow to explore and test it.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <Card variant="interactive" className="flex flex-col">
              <CardHeader className="flex-1">
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <CalendarDays className="size-5" />
                </div>
                <CardTitle asChild>
                  <h3>Calendar prototype</h3>
                </CardTitle>
                <CardDescription>
                  Move between pre-, during-, and post-meeting states in German
                  or English.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="primary">
                  <Link href="/calendar/de/pre">
                    Open prototype <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card variant="interactive" className="flex flex-col">
              <CardHeader className="flex-1">
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <CalendarClock className="size-5" />
                </div>
                <CardTitle asChild>
                  <h3>Meeting focus</h3>
                </CardTitle>
                <CardDescription>
                  Prepare for meetings, start a live transcription, and follow
                  up on past visits.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="primary">
                  <Link href="/home?scenario=ongoing">
                    Open prototype <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card variant="interactive" className="flex flex-col">
              <CardHeader className="flex-1">
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <MapPinned className="size-5" />
                </div>
                <CardTitle asChild>
                  <h3>Plan your day</h3>
                </CardTitle>
                <CardDescription>
                  Build a customer visit route and prepare for each stop on the
                  day&apos;s schedule.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="primary">
                  <Link href="/plan-your-day">
                    Open prototype <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card variant="interactive" className="flex flex-col">
              <CardHeader className="flex-1">
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Sparkles className="size-5" />
                </div>
                <CardTitle asChild>
                  <h3>Prep my meeting</h3>
                </CardTitle>
                <CardDescription>
                  Confirm the CRM match, review the opportunity, and get clear
                  questions for the next customer visit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="primary">
                  <Link href="/prep-my-meeting">
                    Open prototype <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card variant="interactive" className="flex flex-col">
              <CardHeader className="flex-1">
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <MessageSquareText className="size-5" />
                </div>
                <CardTitle asChild>
                  <h3>Exploratory meeting chat</h3>
                </CardTitle>
                <CardDescription>
                  Let Vicky identify the next customer, or start with John Deere
                  already loaded and build a focused cheat sheet.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button asChild variant="primary">
                  <Link href="/wiki-chat">
                    Open general chat <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/wiki-chat?customer=john-deere">
                    Open with John Deere
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card variant="interactive" className="flex flex-col">
              <CardHeader className="flex-1">
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <LayoutDashboard className="size-5" />
                </div>
                <CardTitle asChild>
                  <h3>Workspace overview</h3>
                </CardTitle>
                <CardDescription>
                  Browse the original desktop workspace and component showcase.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="primary">
                  <Link href="/example">
                    Open prototype <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card variant="dashed">
            <CardHeader>
              <CardTitle asChild>
                <h2>Add a prototype</h2>
              </CardTitle>
              <CardDescription className="leading-6">
                Create <code>app/your-prototype/page.tsx</code>. Next.js will
                make it available at <code>/your-prototype</code>.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </div>
    </main>
  );
}
