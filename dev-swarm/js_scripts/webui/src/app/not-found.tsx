import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[color:var(--color-background)] text-[color:var(--color-text-primary)]">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-start justify-center gap-6 px-8 py-16">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-secondary)]">
            404
          </p>
          <h1 className="mt-2 text-3xl font-semibold font-[var(--font-display)]">
            Page not found.
          </h1>
          <p className="mt-3 text-sm text-[color:var(--color-text-secondary)]">
            The route you requested does not exist. Return to the dashboard to
            continue.
          </p>
        </div>
        <Link
          href="/"
          className="rounded-lg bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-background)]"
        >
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
