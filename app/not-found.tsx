import Link from "next/link";
import { Button } from "@/components/ui/shadcn/button";

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center px-6">
      <div className="space-y-5 text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Prototype not found
        </h1>
        <Button asChild variant="primary">
          <Link href="/">Back home</Link>
        </Button>
      </div>
    </main>
  );
}
