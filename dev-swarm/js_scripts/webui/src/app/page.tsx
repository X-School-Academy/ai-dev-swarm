"use client";

import ReactMarkdown from "react-markdown";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Stage = {
  stageId: string;
  name: string;
  status: "not-started" | "in-progress" | "completed" | "skipped" | "error";
  isSkippable: boolean;
  hasSkipFile: boolean;
  files: string[];
};

type DocumentPayload = {
  path: string;
  content: string;
  contentType: "text/markdown" | "text/html";
  lastModified: string;
};

type SaveStatus = "idle" | "saving" | "success" | "error";

type ConsoleEventCategory = "system" | "output" | "error" | "status";

type ConsoleEvent = {
  id: string;
  timestamp: string;
  category: ConsoleEventCategory;
  message: string;
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
  const [selectedDocumentPath, setSelectedDocumentPath] =
    useState<string>("");
  const [documentPayload, setDocumentPayload] =
    useState<DocumentPayload | null>(null);
  const [documentLoading, setDocumentLoading] = useState<boolean>(false);
  const [documentError, setDocumentError] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [consoleEvents, setConsoleEvents] = useState<ConsoleEvent[]>([]);
  const [isPinned, setIsPinned] = useState<boolean>(true);
  const [runId, setRunId] = useState<string | null>(null);
  const consoleScrollRef = useRef<HTMLDivElement | null>(null);

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
    setSelectedDocumentPath("");
    setDocumentPayload(null);
    setDocumentError(null);
    setEditorContent("");
    setHistory([]);
    setHistoryIndex(-1);
    setSaveStatus("idle");
    setSaveMessage(null);
    setConsoleEvents([]);
    setRunId(null);
  }, [selectedStageId]);

  const fetchDocument = useCallback(async (path: string) => {
    setDocumentLoading(true);
    setDocumentError(null);
    try {
      const response = await fetch(
        `http://localhost:8001/api/documents?path=${encodeURIComponent(path)}`,
      );
      if (!response.ok) {
        const body = (await response.json()) as { detail?: string };
        throw new Error(body.detail || "Failed to load document");
      }
      const data = (await response.json()) as DocumentPayload;
      setDocumentPayload(data);
      if (data.contentType === "text/markdown") {
        setEditorContent(data.content);
        setHistory([data.content]);
        setHistoryIndex(0);
      } else {
        setEditorContent("");
        setHistory([]);
        setHistoryIndex(-1);
      }
      setSaveStatus("idle");
      setSaveMessage(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to load document";
      setDocumentError(message);
      setDocumentPayload(null);
      setEditorContent("");
      setHistory([]);
      setHistoryIndex(-1);
      setSaveStatus("idle");
      setSaveMessage(null);
    } finally {
      setDocumentLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!selectedDocumentPath) {
      return;
    }
    void fetchDocument(selectedDocumentPath);
  }, [fetchDocument, selectedDocumentPath]);

  useEffect(() => {
    if (!isPinned || !consoleScrollRef.current) {
      return;
    }
    consoleScrollRef.current.scrollTop =
      consoleScrollRef.current.scrollHeight;
  }, [consoleEvents, isPinned]);

  const handleConsoleScroll = () => {
    const container = consoleScrollRef.current;
    if (!container) {
      return;
    }
    const nearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 24;
    setIsPinned(nearBottom);
  };

  const startRun = async () => {
    if (!selectedStage) {
      return;
    }
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:8001/api/stages/${selectedStage.stageId}/run`,
        { method: "POST" },
      );
      if (!response.ok) {
        const body = (await response.json()) as { detail?: string };
        throw new Error(body.detail || "Failed to start run");
      }
      const data = (await response.json()) as { runId: string };
      setConsoleEvents([]);
      setRunId(data.runId);
      setIsPinned(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to start run";
      setError(message);
    }
  };

  useEffect(() => {
    if (!runId) {
      return;
    }
    const source = new EventSource(
      `http://localhost:8001/api/runs/${runId}/stream`,
    );
    const appendEvent = (event: MessageEvent, category: ConsoleEventCategory) => {
      if (!event.data) {
        return;
      }
      try {
        const payload = JSON.parse(event.data) as {
          timestamp: string;
          category: ConsoleEventCategory;
          message: string;
        };
        setConsoleEvents((current) => [
          ...current,
          {
            id: `${payload.timestamp}-${current.length}`,
            timestamp: payload.timestamp,
            category,
            message: payload.message,
          },
        ]);
      } catch {
        return;
      }
    };

    const register = (category: ConsoleEventCategory) => {
      source.addEventListener(category, (event) =>
        appendEvent(event as MessageEvent, category),
      );
    };

    register("system");
    register("output");
    register("error");
    register("status");

    source.onerror = () => {
      source.close();
    };

    return () => {
      source.close();
    };
  }, [runId]);

  const handleEditorChange = (value: string) => {
    setEditorContent(value);
    setSaveStatus("idle");
    setSaveMessage(null);
    setHistory((current) => {
      const base = current.slice(0, historyIndex + 1);
      if (base[base.length - 1] === value) {
        return base;
      }
      const next = [...base, value];
      setHistoryIndex(next.length - 1);
      return next;
    });
  };

  const handleUndo = () => {
    setSaveStatus("idle");
    setSaveMessage(null);
    setHistoryIndex((current) => {
      const nextIndex = Math.max(0, current - 1);
      setEditorContent(history[nextIndex] ?? "");
      return nextIndex;
    });
  };

  const handleRedo = () => {
    setSaveStatus("idle");
    setSaveMessage(null);
    setHistoryIndex((current) => {
      const nextIndex = Math.min(history.length - 1, current + 1);
      setEditorContent(history[nextIndex] ?? "");
      return nextIndex;
    });
  };

  const handleSave = async () => {
    if (!documentPayload || documentPayload.contentType !== "text/markdown") {
      return;
    }
    setSaveStatus("saving");
    setSaveMessage(null);
    try {
      const response = await fetch("http://localhost:8001/api/documents", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: documentPayload.path,
          content: editorContent,
        }),
      });
      if (!response.ok) {
        const body = (await response.json()) as { detail?: string };
        throw new Error(body.detail || "Failed to save document");
      }
      const data = (await response.json()) as DocumentPayload;
      setDocumentPayload(data);
      setSaveStatus("success");
      setSaveMessage("Saved changes.");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to save document";
      setSaveStatus("error");
      setSaveMessage(message);
    }
  };

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
          <button
            type="button"
            onClick={startRun}
            disabled={!selectedStage}
            className="rounded-lg bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Run Stage
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
                    className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface-alt)]"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedDocumentPath(file)}
                      className={`flex w-full items-center justify-between px-3 py-2 text-left transition ${
                        selectedDocumentPath === file
                          ? "bg-[color:var(--color-accent)] text-white"
                          : "text-[color:var(--color-text-primary)] hover:bg-[color:var(--color-surface)]"
                      }`}
                    >
                      <span>{file}</span>
                      {selectedDocumentPath === file ? (
                        <span className="text-xs uppercase tracking-[0.2em] text-[color:var(--color-focus)]">
                          Open
                        </span>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                No documents found for this stage.
              </p>
            )}
          </section>

          <section className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--color-text-secondary)]">
                Document Viewer
              </h3>
              <span className="text-xs text-[color:var(--color-text-secondary)]">
                {documentPayload?.lastModified
                  ? `Updated ${new Date(documentPayload.lastModified).toLocaleString()}`
                  : "Select a document"}
              </span>
            </div>
            {documentError ? (
              <div className="rounded-lg border border-[color:rgba(255,90,60,0.4)] bg-[color:rgba(255,90,60,0.1)] px-4 py-3 text-sm text-[color:var(--color-error)]">
                {documentError}
              </div>
            ) : null}
            {documentLoading ? (
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                Loading document...
              </p>
            ) : null}
            {!documentLoading && !documentPayload ? (
              <div className="rounded-lg border border-dashed border-[color:var(--color-border)] px-4 py-6 text-sm text-[color:var(--color-text-secondary)]">
                Choose a stage document to view its contents.
              </div>
            ) : null}
            {!documentLoading && documentPayload ? (
              <div className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-alt)] p-4">
                {documentPayload.contentType === "text/markdown" ? (
                  <div className="doc-markdown">
                    <ReactMarkdown>{documentPayload.content}</ReactMarkdown>
                  </div>
                ) : (
                  <iframe
                    title={`HTML preview for ${documentPayload.path}`}
                    sandbox=""
                    className="h-[520px] w-full rounded-md border border-[color:var(--color-border)] bg-white"
                    srcDoc={`<!doctype html><html><head><meta charset="utf-8" /><style>body{font-family:Helvetica,Arial,sans-serif;padding:16px;line-height:1.6;color:#111827}h1,h2,h3{margin:1.2rem 0 0.6rem}p,li{color:#1f2937}</style></head><body>${documentPayload.content}</body></html>`}
                  />
                )}
              </div>
            ) : null}
          </section>

          <section className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--color-text-secondary)]">
                  Document Editor
                </h3>
                <p className="text-xs text-[color:var(--color-text-secondary)]">
                  Edit markdown with live preview.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={historyIndex <= 0}
                  className="rounded-lg border border-[color:var(--color-border)] px-3 py-2 text-xs font-semibold text-[color:var(--color-text-primary)] transition hover:border-[color:var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Undo
                </button>
                <button
                  type="button"
                  onClick={handleRedo}
                  disabled={historyIndex >= history.length - 1}
                  className="rounded-lg border border-[color:var(--color-border)] px-3 py-2 text-xs font-semibold text-[color:var(--color-text-primary)] transition hover:border-[color:var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Redo
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={
                    !documentPayload ||
                    documentPayload.contentType !== "text/markdown" ||
                    saveStatus === "saving"
                  }
                  className="rounded-lg bg-[color:var(--color-accent)] px-4 py-2 text-xs font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saveStatus === "saving" ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
            {saveMessage ? (
              <div
                className={`mb-3 rounded-lg border px-4 py-2 text-xs ${
                  saveStatus === "error"
                    ? "border-[color:rgba(255,90,60,0.4)] bg-[color:rgba(255,90,60,0.1)] text-[color:var(--color-error)]"
                    : "border-[color:rgba(56,217,150,0.4)] bg-[color:rgba(56,217,150,0.1)] text-[color:var(--color-success)]"
                }`}
              >
                {saveMessage}
              </div>
            ) : null}
            {!documentPayload ||
            documentPayload.contentType !== "text/markdown" ? (
              <div className="rounded-lg border border-dashed border-[color:var(--color-border)] px-4 py-6 text-sm text-[color:var(--color-text-secondary)]">
                Select a markdown document to edit.
              </div>
            ) : (
              <div className="grid gap-4 min-[1200px]:grid-cols-2">
                <div className="flex flex-col">
                  <label
                    htmlFor="markdown-editor"
                    className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-text-secondary)]"
                  >
                    Editor
                  </label>
                  <textarea
                    id="markdown-editor"
                    value={editorContent}
                    onChange={(event) => handleEditorChange(event.target.value)}
                    className="min-h-[320px] w-full resize-y rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-alt)] px-3 py-2 text-sm text-[color:var(--color-text-primary)] outline-none focus:border-[color:var(--color-focus)]"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-text-secondary)]">
                    Live Preview
                  </p>
                  <div className="min-h-[320px] rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-alt)] p-4">
                    <div className="doc-markdown">
                      <ReactMarkdown>{editorContent}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>

        <aside className="hidden w-80 flex-col border-l border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-5 py-6 min-[1440px]:flex">
          <div className="mb-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-[color:var(--color-text-secondary)]">
              Execution Output
            </h3>
            <p className="text-xs text-[color:var(--color-text-secondary)]">
              {runId ? `Run ${runId.slice(0, 8)}` : "Idle"}
            </p>
          </div>
          <div className="mb-3 flex items-center justify-between text-xs text-[color:var(--color-text-secondary)]">
            <span>{consoleEvents.length} events</span>
            <button
              type="button"
              onClick={() => setIsPinned((current) => !current)}
              className="rounded-full border border-[color:var(--color-border)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-text-secondary)] transition hover:border-[color:var(--color-accent)]"
            >
              {isPinned ? "Pinned" : "Unpinned"}
            </button>
          </div>
          <div
            ref={consoleScrollRef}
            onScroll={handleConsoleScroll}
            className="flex flex-1 flex-col gap-2 overflow-y-auto rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-4 font-mono text-xs"
          >
            {consoleEvents.length === 0 ? (
              <>
                <span className="text-[color:var(--color-accent-cyan)]">
                  system: idle
                </span>
                <span className="text-[color:var(--color-text-secondary)]">
                  Waiting for execution output...
                </span>
              </>
            ) : (
              consoleEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-md border border-[color:var(--color-border)] bg-[color:var(--color-surface-alt)] px-3 py-2"
                >
                  <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[color:var(--color-text-secondary)]">
                    <span>{event.category}</span>
                    <span>
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div
                    className={`text-xs ${
                      event.category === "error"
                        ? "text-[color:var(--color-error)]"
                        : event.category === "system"
                          ? "text-[color:var(--color-accent-cyan)]"
                          : event.category === "status"
                            ? "text-[color:var(--color-warning)]"
                            : "text-[color:var(--color-text-primary)]"
                    }`}
                  >
                    {event.message}
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
