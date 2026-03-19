import { Link, useLocation } from "react-router-dom";

import { SiteHeader } from "@/features/site-shell";
import { Button } from "@/shared/components/ui/Button";

export function NotFoundPage() {
  const location = useLocation();

  console.error(
    "404 Error: User attempted to access non-existent route:",
    location.pathname,
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="flex min-h-screen items-center justify-center px-6 py-32">
        <div className="max-w-md rounded-sm border border-border bg-card p-10 text-center shadow-[var(--shadow-card)]">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
            404
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground">
            Page not found
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The page you requested does not exist or may have moved. Let&apos;s
            get you back to training.
          </p>

          <Button asChild size="lg" className="mt-8 w-full sm:w-auto">
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
