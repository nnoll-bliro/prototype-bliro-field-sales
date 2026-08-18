"use client";

import Link from "next/link";
import { Button } from "@/components/ui/shadcn/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="max-w-md space-y-5 text-center">
        <p className="text-sm font-medium text-destructive">Something broke</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          This prototype hit an error.
        </h1>
        <p className="text-muted-foreground">{error.message}</p>
        <div className="flex justify-center gap-3">
          <Button onClick={reset} variant="primary">
            Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
