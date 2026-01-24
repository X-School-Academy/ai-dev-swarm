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
  "not-started": "bg-slate-200 text-slate-700",
  "in-progress": "bg-blue-200 text-blue-900",
  completed: "bg-emerald-200 text-emerald-900",
  skipped: "bg-amber-200 text-amber-900",
  error: "bg-rose-200 text-rose-900",
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
        throw new Error("Failed to update skip status");
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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <aside className="w-72 border-r border-slate-200 bg-white px-4 py-6">
          <div className="mb-6">
            <h1 className="text-lg font-semibold">Dev Swarm WebUI</h1>
            <p className="text-sm text-slate-500">Stage Dashboard</p>
          </div>
          {loading ? (
            <p className="text-sm text-slate-500">Loading stages...</p>
          ) : (
            <ul className="space-y-2">
              {stages.map((stage) => (
                <li key={stage.stageId}>
                  <button
                    type="button"
                    onClick={() => setSelectedStageId(stage.stageId)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                      stage.stageId === selectedStageId
                        ? "bg-slate-900 text-white"
                        : "hover:bg-slate-100"
                    }`}
                  >
                    <span>
                      {stage.stageId} {stage.name}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
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
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-2xl font-semibold">
                {selectedStage
                  ? `${selectedStage.stageId} ${selectedStage.name}`
                  : "Select a stage"}
              </h2>
              <p className="text-sm text-slate-500">
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
                  ? "bg-slate-900 text-white hover:bg-slate-800"
                  : "cursor-not-allowed bg-slate-200 text-slate-400"
              }`}
            >
              {selectedStage?.hasSkipFile ? "Unskip Stage" : "Skip Stage"}
            </button>
          </div>

          {error ? (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="mb-4 text-sm font-semibold uppercase text-slate-500">
              Stage Documents
            </h3>
            {selectedStage?.files?.length ? (
              <ul className="space-y-2 text-sm text-slate-700">
                {selectedStage.files.map((file) => (
                  <li key={file} className="rounded-md bg-slate-50 px-3 py-2">
                    {file}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500">
                No documents found for this stage.
              </p>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
