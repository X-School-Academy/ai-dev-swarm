"use client";

import Link from "next/link";
import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[color:var(--color-background)] text-[color:var(--color-text-primary)]">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-start justify-center gap-6 px-8 py-16">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-secondary)]">
            Error
          </p>
          <h1 className="mt-2 text-3xl font-semibold font-[var(--font-display)]">
            Something went wrong.
          </h1>
          <p className="mt-3 text-sm text-[color:var(--color-text-secondary)]">
            We hit an unexpected issue while loading this view. Please try again
            or return to the dashboard.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-lg border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:border-[color:var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-background)]"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
