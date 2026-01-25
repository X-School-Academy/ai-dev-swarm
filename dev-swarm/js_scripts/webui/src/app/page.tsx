"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Stage = {
  stageId: string;
  name: string;
  status: "not-started" | "in-progress" | "completed" | "skipped" | "error";
  isSkippable: boolean;
  hasSkipFile: boolean;
  files: string[];
};

const STATUS_STYLES: Record<Stage["status"], string> = {
  "not-started":
    "bg-[color:var(--color-surface-alt)] text-[color:var(--color-text-secondary)]",
  "in-progress": "bg-[color:var(--color-accent-cyan)] text-slate-900",
  completed: "bg-[color:var(--color-success)] text-slate-900",
  skipped: "bg-[color:var(--color-warning)] text-slate-900",
  error: "bg-[color:var(--color-error)] text-white",
};

export default function Home() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [selectedStageId, setSelectedStageId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);

  const selectedStage = useMemo(
    () => stages.find((stage) => stage.stageId === selectedStageId),
    [selectedStageId, stages],
  );

  const fetchStages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:8001/api/stages");
      if (!response.ok) {
        throw new Error("Failed to load stages");
      }
      const data = (await response.json()) as Stage[];
      setStages(data);
      setSelectedStageId((current) => current || data[0]?.stageId || "");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to fetch stages";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchStages();
  }, [fetchStages]);

  const handleToggleSkip = async () => {
    if (!selectedStage || !selectedStage.isSkippable) {
      return;
    }
    setUpdating(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:8001/api/stages/${selectedStage.stageId}/skip`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ skip: !selectedStage.hasSkipFile }),
        },
      );
      if (!response.ok) {
        const body = (await response.json()) as { detail?: string };
        throw new Error(body.detail || "Failed to update skip status");
      }
      await fetchStages();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to update stage";
      setError(message);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[color:var(--color-background)] text-[color:var(--color-text-primary)]">
      <header className="flex items-center justify-between border-b border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-6 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-text-secondary)]">
            Dev Swarm WebUI
          </p>
          <h1 className="text-xl font-semibold font-[var(--font-display)]">
            Stage Control Deck
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={fetchStages}
            disabled={loading || updating}
            className="rounded-lg border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-text-primary)] transition hover:border-[color:var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Sync
          </button>
          <button
            type="button"
            disabled
            className="rounded-lg border border-[color:var(--color-border)] px-4 py-2 text-sm text-[color:var(--color-text-secondary)] opacity-60"
          >
            Settings
          </button>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-80px)]">
        <aside className="w-72 border-r border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-6">
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-[color:var(--color-text-secondary)]">
              Stages
            </h2>
            <p className="text-xs text-[color:var(--color-text-secondary)]">
              Overview + status
            </p>
          </div>
          {loading ? (
            <p className="text-sm text-[color:var(--color-text-secondary)]">
              Loading stages...
            </p>
          ) : (
            <ul className="space-y-2">
              {stages.map((stage) => (
                <li key={stage.stageId}>
                  <button
                    type="button"
                    onClick={() => setSelectedStageId(stage.stageId)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                      stage.stageId === selectedStageId
                        ? "bg-[color:var(--color-accent)] text-white"
                        : "text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-surface-alt)]"
                    }`}
                  >
                    <span>
                      {stage.stageId} {stage.name}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium uppercase tracking-wide ${
                        STATUS_STYLES[stage.status]
                      }`}
                    >
                      {stage.status}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <main className="flex flex-1 flex-col gap-6 px-8 py-6">
          <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="text-2xl font-semibold font-[var(--font-display)]">
                  {selectedStage
                    ? `${selectedStage.stageId} ${selectedStage.name}`
                    : "Select a stage"}
                </h2>
                <p className="text-sm text-[color:var(--color-text-secondary)]">
                  {selectedStage
                    ? `Status: ${selectedStage.status}`
                    : "Pick a stage from the sidebar to see details."}
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggleSkip}
                disabled={!selectedStage?.isSkippable || updating}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  selectedStage?.isSkippable
                    ? "bg-[color:var(--color-accent)] text-white hover:brightness-110"
                    : "cursor-not-allowed bg-[color:var(--color-surface-alt)] text-[color:var(--color-text-secondary)]"
                }`}
              >
                {selectedStage?.hasSkipFile ? "Unskip Stage" : "Skip Stage"}
              </button>
            </div>
          </div>

          {error ? (
            <div className="rounded-lg border border-[color:rgba(255,90,60,0.4)] bg-[color:rgba(255,90,60,0.1)] px-4 py-3 text-sm text-[color:var(--color-error)]">
              {error}
            </div>
          ) : null}

          <section className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--color-text-secondary)]">
                Stage Documents
              </h3>
              <span className="text-xs text-[color:var(--color-text-secondary)]">
                {selectedStage?.files?.length || 0} files
              </span>
            </div>
            {selectedStage?.files?.length ? (
              <ul className="space-y-2 text-sm text-[color:var(--color-text-primary)]">
                {selectedStage.files.map((file) => (
                  <li
                    key={file}
                    className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface-alt)] px-3 py-2"
                  >
                    {file}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                No documents found for this stage.
              </p>
            )}
          </section>
        </main>

        <aside className="hidden w-80 flex-col border-l border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-5 py-6 min-[1440px]:flex">
          <div className="mb-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--color-text-secondary)]">
              Execution Output
            </h3>
            <p className="text-xs text-[color:var(--color-text-secondary)]">
              Live stream placeholder
            </p>
          </div>
          <div className="flex flex-1 flex-col rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-4 font-mono text-xs text-[color:var(--color-text-secondary)]">
            <span className="text-[color:var(--color-accent-cyan)]">
              system: idle
            </span>
            <span>Waiting for execution output...</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
