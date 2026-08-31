import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  FileText,
  LayoutDashboard,
  Library,
  MessageSquareText,
  Plus,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import {
  PageActions,
  PageDescription,
  PageEyebrow,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/shadcn/page-header";
import { Progress } from "@/components/ui/shadcn/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/shadcn/sidebar";

export const metadata: Metadata = {
  title: "Bliro workspace",
};

const navigation = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Meetings", icon: CalendarDays },
  { label: "Conversations", icon: MessageSquareText },
  { label: "Templates", icon: Library },
  { label: "Analytics", icon: BarChart3 },
];

const meetings = [
  {
    title: "Weekly product sync",
    meta: "Today · 42 min · 6 participants",
    badge: "Processed",
  },
  {
    title: "Customer discovery — Acme",
    meta: "Yesterday · 31 min · 4 participants",
    badge: "Processed",
  },
  {
    title: "Sales handover",
    meta: "May 12 · 24 min · 5 participants",
    badge: "Draft",
  },
];

export default function ExamplePage() {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="gap-4 p-4 group-data-[collapsible=icon]:p-2">
          <Link
            href="/"
            className="flex h-9 items-center overflow-hidden px-1"
            aria-label="Bliro home"
          >
            <Image
              src="/bliro-logo.svg"
              alt="Bliro"
              width={108}
              height={30}
              priority
              className="h-[30px] w-auto group-data-[collapsible=icon]:hidden"
            />
            <span className="hidden size-8 shrink-0 place-items-center rounded-md bg-primary text-sm font-bold text-primary-foreground group-data-[collapsible=icon]:grid">
              b
            </span>
          </Link>
          <div className="group-data-[collapsible=icon]:hidden">
            <label htmlFor="workspace-search" className="sr-only">
              Search workspace
            </label>
            <SidebarInput id="workspace-search" placeholder="Search workspace…" />
          </div>
        </SidebarHeader>

        <SidebarSeparator />

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={item.active}
                      tooltip={item.label}
                    >
                      <Link
                        href={item.active ? "/example" : "#"}
                        aria-current={item.active ? "page" : undefined}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Team</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="People">
                    <Link href="#">
                      <Users />
                      <span>People</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Notes">
                    <Link href="#">
                      <FileText />
                      <span>Notes</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="Alex Morgan">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-secondary text-xs font-bold text-heading">
                  AM
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-semibold">Alex Morgan</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    Product team
                  </span>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className="min-w-0 bg-muted/40">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur sm:px-6">
          <SidebarTrigger />
          <div className="h-5 w-px bg-border" />
          <p className="font-semibold text-heading">Overview</p>
          <Button variant="ghost" size="icon" className="ml-auto sm:hidden">
            <Search />
            <span className="sr-only">Search</span>
          </Button>
          <Button asChild variant="ghost" size="sm" className="ml-auto hidden sm:inline-flex">
            <Link href="/">
              <ArrowLeft /> Back to playground
            </Link>
          </Button>
        </header>

        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
          <PageHeader>
            <PageHeaderContent>
              <PageEyebrow>Workspace overview</PageEyebrow>
              <PageTitle>Good morning, Alex</PageTitle>
              <PageDescription>
                Review your latest meetings and keep the team aligned with
                automatically generated notes.
              </PageDescription>
            </PageHeaderContent>
            <PageActions>
              <Button variant="outline">Import meeting</Button>
              <Button>
                <Plus /> New meeting
              </Button>
            </PageActions>
          </PageHeader>

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Workspace summary">
            <Card>
              <CardHeader className="gap-2">
                <div className="flex items-center justify-between">
                  <span className="grid size-9 place-items-center rounded-md bg-accent text-primary">
                    <CalendarDays className="size-4" />
                  </span>
                  <Badge variant="success">+12%</Badge>
                </div>
                <div>
                  <CardTitle asChild className="text-2xl leading-9">
                    <p>18</p>
                  </CardTitle>
                  <CardDescription>Meetings this month</CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="gap-2">
                <div className="flex items-center justify-between">
                  <span className="grid size-9 place-items-center rounded-md bg-accent text-primary">
                    <Sparkles className="size-4" />
                  </span>
                  <Badge>AI notes</Badge>
                </div>
                <div>
                  <CardTitle asChild className="text-2xl leading-9">
                    <p>7.4 h</p>
                  </CardTitle>
                  <CardDescription>Time saved by Bliro</CardDescription>
                </div>
              </CardHeader>
            </Card>

            <Card variant="selected" className="sm:col-span-2 lg:col-span-1">
              <CardHeader className="gap-2">
                <div className="flex items-center justify-between">
                  <span className="grid size-9 place-items-center rounded-md bg-success-subtle text-success">
                    <Check className="size-4" />
                  </span>
                  <Badge variant="success">On track</Badge>
                </div>
                <div>
                  <CardTitle asChild className="text-2xl leading-9">
                    <p>92%</p>
                  </CardTitle>
                  <CardDescription>Notes processed successfully</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </section>

          <section className="grid gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.55fr)]">
            <Card>
              <CardHeader className="flex-row items-start justify-between gap-4">
                <div>
                  <CardTitle asChild>
                    <h2>Recent meetings</h2>
                  </CardTitle>
                  <CardDescription>Your latest transcriptions and summaries.</CardDescription>
                </div>
                <Button variant="ghost" size="sm">
                  View all <ArrowRight />
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {meetings.map((meeting) => (
                  <Link key={meeting.title} href="#" className="block">
                    <Card variant="interactive" className="shadow-none">
                      <CardContent className="flex items-center gap-3 p-4">
                        <span className="grid size-9 shrink-0 place-items-center rounded-md bg-secondary text-muted-foreground">
                          <MessageSquareText className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span data-slot="card-title" className="block truncate font-semibold text-heading transition-colors">
                            {meeting.title}
                          </span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {meeting.meta}
                          </span>
                        </span>
                        <Badge variant={meeting.badge === "Draft" ? "secondary" : "success"}>
                          {meeting.badge}
                        </Badge>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle asChild>
                  <h2>Monthly goal</h2>
                </CardTitle>
                <CardDescription>Meeting notes shared with your CRM.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-semibold leading-9 tracking-[-0.03rem] text-heading">72%</span>
                    <span className="text-xs text-muted-foreground">18 of 25</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
                <div className="rounded-md bg-accent p-3 text-sm leading-[1.375rem] text-accent-foreground">
                  Seven more shared notes will complete this month&apos;s goal.
                </div>
                <Button variant="secondary" className="w-full">
                  Open analytics
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
