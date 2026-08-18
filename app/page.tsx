import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers3, Route } from "lucide-react";
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

        <section className="grid gap-5 md:grid-cols-2">
          <Card variant="interactive">
            <CardHeader>
              <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Route className="size-5" />
              </div>
              <CardTitle asChild>
                <h2>Example route</h2>
              </CardTitle>
              <CardDescription>
                Open a second page to verify App Router navigation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="primary">
                <Link href="/example">
                  View example <ArrowRight className="size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

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
