"use client";

import ReactMarkdown from "react-markdown";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  ConsoleEvent,
  ConsoleEventCategory,
  DocumentPayload,
  Stage,
  Toast,
} from "@/lib/types";
import { getStageConfig } from "@/lib/stages";
import type { StageConfig } from "@/lib/stages";
import {
  syncProject,
  readDocument,
  writeDocument,
  deleteDocument,
  toggleSkip,
  startAgentRun,
  stopAgentRun,
  createEventSource,
  fetchAgents,
} from "@/lib/api";
import * as prompts from "@/lib/prompts";

const STATUS_STYLES: Record<Stage["status"], string> = {
  "not-started": "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)]",
  "in-progress": "bg-[var(--color-accent-cyan)] text-slate-900",
  completed: "bg-[var(--color-success)] text-slate-900",
  skipped: "bg-[var(--color-warning)] text-slate-900",
  error: "bg-[var(--color-error)] text-white",
};

const STAGE_GROUPS = [
  { title: "Discovery & Planning", stageIds: ["00", "01", "02"] },
  { title: "Product Definition", stageIds: ["03", "04", "05"] },
  { title: "Design", stageIds: ["06"] },
  { title: "Technical Planning", stageIds: ["07", "08"] },
  { title: "Implementation", stageIds: ["09", "10"] },
  { title: "Deployment", stageIds: ["11"] },
  { title: "Archive", stageIds: ["99"] },
];

export default function Home() {
  // --- Core state ---
  const [stages, setStages] = useState<Stage[]>([]);
  const [selectedStageId, setSelectedStageId] = useState<string>("00");
  const [loading, setLoading] = useState(true);
  const [activeProgressStep, setActiveProgressStep] = useState<string>("");
  const [agents, setAgents] = useState<{ id: string; name: string }[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string>("");

  // --- Document state ---
  const [currentPath, setCurrentPath] = useState<string>("");
  const [folderStack, setFolderStack] = useState<string[]>([]);
  const [selectedSprintFolder, setSelectedSprintFolder] = useState<string>("");
  const [documentPayload, setDocumentPayload] = useState<DocumentPayload | null>(null);
  const [editorContent, setEditorContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [markdownView, setMarkdownView] = useState<"editor" | "preview">("editor");

  // --- AI Agent log state ---
  const [consoleEvents, setConsoleEvents] = useState<ConsoleEvent[]>([]);
  const [runId, setRunId] = useState<string | null>(null);
  const [agentRunning, setAgentRunning] = useState(false);
  const [isPinned, setIsPinned] = useState(true);
  const consoleRef = useRef<HTMLDivElement>(null);

  // --- Toast ---
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback((message: string, variant: Toast["variant"] = "error") => {
    setToast({ message, variant });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  // --- Selected stage & config ---
  const selectedStage = useMemo(
    () => stages.find((s) => s.stageId === selectedStageId),
    [stages, selectedStageId]
  );
  const stageConfig = useMemo(
    () => getStageConfig(selectedStageId),
    [selectedStageId]
  );

  // --- Sync / Fetch ---
  const doSync = useCallback(async () => {
    setLoading(true);
    try {
      const data = await syncProject();
      setStages(data.stages);
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Sync failed");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    void doSync();
    void fetchAgents().then((list) => {
      setAgents(list);
      if (list.length > 0 && !selectedAgent) {
        setSelectedAgent(list[0].id);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doSync]);

  // --- Auto-detect progress step ---
  const detectProgressStep = useCallback(
    (stage: Stage | undefined, config: StageConfig | undefined) => {
      if (!stage || !config) return "";
      const files = stage.files;
      const folder = config.folder;

      if (config.type === "init-ideas") {
        const hasReadme = files.some((f) => f === `${folder}/README.md`);
        const hasOtherFiles = files.some(
          (f) => f.startsWith(`${folder}/`) && f !== `${folder}/README.md` && !f.endsWith("SKIP.md")
        );
        if (hasOtherFiles) return "stage-files";
        if (hasReadme) return "proposal";
        return "init";
      }

      if (config.type === "sprints") {
        const hasReadme = files.some((f) => f === `${folder}/README.md`);
        const hasPlan = files.some((f) => f === `${folder}/development-plan.md`);
        const hasSprintFolders = files.some(
          (f) =>
            f.startsWith(`${folder}/`) &&
            f.split("/").length > 2 &&
            !f.endsWith("SKIP.md")
        );
        if (hasSprintFolders) return "backlogs";
        if (hasPlan) return "plan";
        if (hasReadme) return "proposal";
        return "proposal";
      }

      // Standard, research, ux, devops
      const hasReadme = files.some((f) => f === `${folder}/README.md`);
      const hasOtherFiles = files.some(
        (f) =>
          f.startsWith(`${folder}/`) &&
          f !== `${folder}/README.md` &&
          !f.endsWith("SKIP.md")
      );
      if (hasOtherFiles) return "stage-files";
      if (hasReadme) return "proposal";
      return "proposal";
    },
    []
  );

  useEffect(() => {
    const step = detectProgressStep(selectedStage, stageConfig);
    setActiveProgressStep(step);
  }, [selectedStage, stageConfig, detectProgressStep]);

  // --- File helpers ---
  const stageFiles = useMemo(() => {
    if (!selectedStage || !stageConfig) return [];
    const folder = stageConfig.folder;
    return selectedStage.files
      .filter((f) => f.startsWith(`${folder}/`) && !f.endsWith("SKIP.md"))
      .map((f) => f.slice(folder.length + 1)); // relative to stage folder
  }, [selectedStage, stageConfig]);

  // Get items in current browsing folder (files + subfolders)
  const currentFolderItems = useMemo(() => {
    const prefix = folderStack.length > 0 ? folderStack.join("/") + "/" : "";
    const items: { name: string; isFolder: boolean; fullPath: string; relativePath: string }[] = [];
    const seenFolders = new Set<string>();

    for (const rel of stageFiles) {
      if (!rel.startsWith(prefix)) continue;
      const rest = rel.slice(prefix.length);
      const slashIdx = rest.indexOf("/");
      if (slashIdx === -1) {
        // It's a file in this directory
        items.push({
          name: rest,
          isFolder: false,
          fullPath: `${stageConfig!.folder}/${rel}`,
          relativePath: rel,
        });
      } else {
        // It's in a subfolder
        const folderName = rest.slice(0, slashIdx);
        if (!seenFolders.has(folderName)) {
          seenFolders.add(folderName);
          items.push({
            name: folderName,
            isFolder: true,
            fullPath: "", // folders don't have a single path
            relativePath: `${prefix}${folderName}`,
          });
        }
      }
    }

    // Sort: README.md first, then folders, then files
    items.sort((a, b) => {
      if (a.name === "README.md") return -1;
      if (b.name === "README.md") return 1;
      if (a.isFolder && !b.isFolder) return -1;
      if (!a.isFolder && b.isFolder) return 1;
      return a.name.localeCompare(b.name);
    });

    return items;
  }, [stageFiles, folderStack, stageConfig]);

  // Get research subfolders (for Tech Research stage)
  const researchFolders = useMemo(() => {
    if (!stageConfig || stageConfig.type !== "research") return [];
    const folder = stageConfig.folder;
    const folders = new Set<string>();
    for (const f of selectedStage?.files || []) {
      if (!f.startsWith(`${folder}/`)) continue;
      const rel = f.slice(folder.length + 1);
      const slashIdx = rel.indexOf("/");
      if (slashIdx !== -1) {
        const sub = rel.slice(0, slashIdx);
        if (sub !== "README.md" && !sub.endsWith(".md") && !sub.endsWith(".html")) {
          folders.add(sub);
        }
      }
    }
    return Array.from(folders).sort();
  }, [selectedStage, stageConfig]);

  // Get UX mockup subfolder
  const uxMockupFolder = useMemo(() => {
    if (!stageConfig || stageConfig.type !== "ux") return null;
    const folder = stageConfig.folder;
    const folders = new Set<string>();
    for (const f of selectedStage?.files || []) {
      if (!f.startsWith(`${folder}/`)) continue;
      const rel = f.slice(folder.length + 1);
      const slashIdx = rel.indexOf("/");
      if (slashIdx !== -1) {
        folders.add(rel.slice(0, slashIdx));
      }
    }
    // Look for a mockup folder (common patterns)
    for (const sub of folders) {
      if (sub.toLowerCase().includes("mockup") || sub.toLowerCase().includes("ui-preview")) {
        return sub;
      }
    }
    return folders.size > 0 ? Array.from(folders)[0] : null;
  }, [selectedStage, stageConfig]);

  // Sprint folders for Sprints stage
  const sprintFolders = useMemo(() => {
    if (!stageConfig || stageConfig.type !== "sprints") return [];
    const folder = stageConfig.folder;
    const folders = new Set<string>();
    for (const f of selectedStage?.files || []) {
      if (!f.startsWith(`${folder}/`)) continue;
      const rel = f.slice(folder.length + 1);
      if (rel === "README.md" || rel === "development-plan.md") continue;
      const slashIdx = rel.indexOf("/");
      if (slashIdx !== -1) {
        folders.add(rel.slice(0, slashIdx));
      }
    }
    return Array.from(folders).sort();
  }, [selectedStage, stageConfig]);

  // Dynamic progress steps (for research/ux/sprints)
  const dynamicProgressSteps = useMemo(() => {
    if (!stageConfig) return [];
    const base = [...stageConfig.progressSteps];

    if (stageConfig.type === "research" && researchFolders.length > 0) {
      for (const rf of researchFolders) {
        base.push({ key: `research:${rf}`, label: rf });
      }
    }

    if (stageConfig.type === "ux" && uxMockupFolder) {
      base.push({ key: "ui-mockup", label: "UI Mockup" });
    }

    return base;
  }, [stageConfig, researchFolders, uxMockupFolder]);

  // --- Document loading ---
  const loadDocument = useCallback(
    async (path: string) => {
      try {
        const doc = await readDocument(path);
        setDocumentPayload(doc);
        setCurrentPath(path);
        if (doc.contentType === "text/markdown") {
          setEditorContent(doc.content);
        }
      } catch (err) {
        showToast(err instanceof Error ? err.message : "Failed to load document");
      }
    },
    [showToast]
  );

  // Auto-load README.md when stage files are shown
  useEffect(() => {
    if (!stageConfig || !selectedStage) return;
    const folder = stageConfig.folder;

    // Only auto-load on stage-files, research, or ui-mockup steps
    if (
      activeProgressStep === "stage-files" ||
      activeProgressStep.startsWith("research:") ||
      activeProgressStep === "ui-mockup"
    ) {
      const readmePath = `${folder}/README.md`;
      if (selectedStage.files.includes(readmePath)) {
        void loadDocument(readmePath);
      }
    } else if (activeProgressStep === "init") {
      void loadDocument("ideas.md");
    } else if (activeProgressStep === "backlogs") {
      if (selectedSprintFolder) {
        const sprintReadme = `${stageConfig.folder}/${selectedSprintFolder}/README.md`;
        if (selectedStage.files.includes(sprintReadme)) {
          void loadDocument(sprintReadme);
        } else {
          setDocumentPayload(null);
          setCurrentPath("");
          setEditorContent("");
        }
      } else {
        setDocumentPayload(null);
        setCurrentPath("");
        setEditorContent("");
      }
    } else if (activeProgressStep === "proposal") {
      const readmePath = `${folder}/README.md`;
      if (selectedStage.files.includes(readmePath)) {
        void loadDocument(readmePath);
      } else {
        setDocumentPayload(null);
        setCurrentPath("");
        setEditorContent("");
      }
    } else if (activeProgressStep === "plan") {
      const planPath = `${stageConfig.folder}/development-plan.md`;
      if (selectedStage.files.includes(planPath)) {
        void loadDocument(planPath);
      }
    } else {
      setDocumentPayload(null);
      setCurrentPath("");
      setEditorContent("");
    }
    setFolderStack([]);
    if (activeProgressStep !== "backlogs") {
      setSelectedSprintFolder("");
    }
  }, [activeProgressStep, selectedStage, stageConfig, loadDocument, selectedSprintFolder]);

  // --- Stage change: reset ---
  useEffect(() => {
    setDocumentPayload(null);
    setCurrentPath("");
    setEditorContent("");
    setFolderStack([]);
    setSelectedSprintFolder("");
  }, [selectedStageId]);

  // --- Save document ---
  const handleSave = useCallback(async () => {
    if (!documentPayload || documentPayload.contentType !== "text/markdown") return;
    setSaving(true);
    try {
      const doc = await writeDocument(documentPayload.path, editorContent);
      setDocumentPayload(doc);
      showToast("Saved successfully", "success");
      await doSync();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }, [documentPayload, editorContent, showToast, doSync]);

  // --- Delete document ---
  const handleDelete = useCallback(async () => {
    if (!documentPayload) return;
    if (documentPayload.path.endsWith("README.md")) return;
    try {
      await deleteDocument(documentPayload.path);
      setDocumentPayload(null);
      setCurrentPath("");
      setEditorContent("");
      showToast("Deleted successfully", "success");
      await doSync();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to delete");
    }
  }, [documentPayload, showToast, doSync]);

  // --- AI Agent execution ---
  const hasAgent = useMemo(
    () => agents.some((agent) => agent.id === selectedAgent),
    [agents, selectedAgent]
  );

  const runAgent = useCallback(
    async (prompt: string) => {
      if (!selectedStage) return;
      if (!hasAgent) {
        showToast("No agent configured. Please add an agent in agents.json.");
        return;
      }
      setConsoleEvents([]);
      setAgentRunning(true);
      setIsPinned(true);
      try {
        const data = await startAgentRun(selectedStage.stageId, prompt, selectedAgent);
        setRunId(data.runId);
      } catch (err) {
        showToast(err instanceof Error ? err.message : "Failed to start agent");
        setAgentRunning(false);
      }
    },
    [selectedStage, selectedAgent, hasAgent, showToast]
  );

  const handleInterrupt = useCallback(async () => {
    try {
      await stopAgentRun();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Failed to stop agent");
    }
  }, [showToast]);

  // --- SSE streaming ---
  useEffect(() => {
    if (!runId) return;
    const source = createEventSource(runId);

    const handle = (category: ConsoleEventCategory) => {
      source.addEventListener(category, (event: Event) => {
        const me = event as MessageEvent;
        if (!me.data) return;
        try {
          const payload = JSON.parse(me.data) as {
            timestamp: string;
            category: ConsoleEventCategory;
            message: string;
          };
          setConsoleEvents((prev) => [
            ...prev,
            {
              id: `${payload.timestamp}-${prev.length}`,
              timestamp: payload.timestamp,
              category,
              message: payload.message,
            },
          ]);
          // Check if run ended
          if (
            category === "status" &&
            ["succeeded", "failed", "stopped"].includes(payload.message)
          ) {
            setAgentRunning(false);
            // Auto-sync after agent completes
            void doSync();
          }
        } catch {
          // ignore parse errors
        }
      });
    };

    handle("system");
    handle("output");
    handle("stderr");
    handle("status");

    source.onerror = () => {
      source.close();
      setAgentRunning(false);
    };

    return () => source.close();
  }, [runId, doSync]);

  // Auto-scroll console
  useEffect(() => {
    if (isPinned && consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [consoleEvents, isPinned]);

  // --- Render helpers ---
  const isSkipped = selectedStage?.hasSkipFile;

  const renderActionButton = (
    label: string,
    prompt: string,
    variant: "primary" | "secondary" | "danger" | "success" = "primary"
  ) => {
    const baseClass =
      variant === "primary"
        ? "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white"
        : variant === "danger"
          ? "bg-[var(--color-error)] hover:brightness-110 text-white"
          : variant === "success"
            ? "bg-[var(--color-success)] hover:brightness-110 text-slate-900"
          : "border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)]";
    return (
        <button
          type="button"
          onClick={() => void runAgent(prompt)}
          disabled={agentRunning || !hasAgent}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${baseClass}`}
        >
          {label}
        </button>
    );
  };

  const showActions =
    !(documentPayload?.contentType === "text/markdown" && markdownView === "preview");

  // --- Stage content renderer ---
  const renderStageContent = () => {
    if (!selectedStage || !stageConfig) return null;

    // --- Skip state ---
    if (isSkipped) {
      return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-[var(--color-text-secondary)] text-lg">This stage is skipped.</p>
          <button
            type="button"
            onClick={async () => {
              await toggleSkip(selectedStage.stageId, false);
              await doSync();
            }}
            className="rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] transition"
          >
            Unskip Stage
          </button>
        </div>
      );
    }

    // --- Archive ---
    if (stageConfig.type === "archive") {
      return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-[var(--color-text-secondary)]">Archive the current project and start fresh.</p>
          {renderActionButton("Archive", prompts.archivePrompt())}
        </div>
      );
    }

    // --- Init Ideas ---
    if (stageConfig.type === "init-ideas") {
      if (activeProgressStep === "init") {
        return (
          <div className="flex flex-1 min-h-0 flex-col gap-4">
            {renderEditor()}
            {showActions && (
              <div className="mt-auto flex gap-3">
                {renderActionButton("Refine Ideas", prompts.refineIdeasPrompt())}
                {renderActionButton("Create Proposal", prompts.createProposalPrompt_InitIdeas())}
              </div>
            )}
          </div>
        );
      }
      if (activeProgressStep === "proposal") {
        return (
          <div className="flex flex-1 min-h-0 flex-col gap-4">
            {renderEditor()}
            {showActions && (
              <div className="mt-auto flex gap-3">
                <button
                  type="button"
                  onClick={() => void handleSave()}
                  disabled={saving || !documentPayload}
                  className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Update"}
                </button>
                {renderActionButton("Create Files", prompts.createFilesPrompt_InitIdeas())}
              </div>
            )}
          </div>
        );
      }
      // stage-files
      return (
        <div className="flex flex-1 min-h-0 flex-col gap-4">
          {renderFileBrowser()}
          {renderEditor()}
          {showActions && (
            <div className="mt-auto flex items-center justify-between gap-3">
              <div className="flex gap-3">{renderSaveDeleteButtons()}</div>
              {renderActionButton("Finalize", prompts.finalizePrompt_InitIdeas(), "success")}
            </div>
          )}
        </div>
      );
    }

    // --- Standard stages ---
    if (stageConfig.type === "standard") {
      if (activeProgressStep === "proposal") {
        const hasReadme = selectedStage.files.includes(`${stageConfig.folder}/README.md`);
        return (
          <div className="flex flex-1 min-h-0 flex-col gap-4">
            {hasReadme && renderEditor()}
            {showActions && (
              <div className="mt-auto flex gap-3">
                {hasReadme && (
                  <button
                    type="button"
                    onClick={() => void handleSave()}
                    disabled={saving || !documentPayload}
                    className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] transition disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Update"}
                  </button>
                )}
                {!hasReadme &&
                  renderActionButton("Create Proposal", prompts.createProposalPrompt(stageConfig))}
                {hasReadme &&
                  renderActionButton("Create Files", prompts.createFilesPrompt(stageConfig))}
              </div>
            )}
          </div>
        );
      }
      // stage-files
      return (
        <div className="flex flex-1 min-h-0 flex-col gap-4">
          {renderFileBrowser()}
          {renderEditor()}
          {showActions && (
            <div className="mt-auto flex items-center justify-between gap-3">
              <div className="flex gap-3">{renderSaveDeleteButtons()}</div>
              {renderActionButton("Finalize", prompts.finalizePrompt(stageConfig), "success")}
            </div>
          )}
        </div>
      );
    }

    // --- Research (Tech Research) ---
    if (stageConfig.type === "research") {
      if (activeProgressStep === "proposal") {
        const hasReadme = selectedStage.files.includes(`${stageConfig.folder}/README.md`);
        return (
          <div className="flex flex-1 min-h-0 flex-col gap-4">
            {hasReadme && renderEditor()}
            {showActions && (
              <div className="mt-auto flex gap-3">
                {hasReadme && (
                  <button
                    type="button"
                    onClick={() => void handleSave()}
                    disabled={saving || !documentPayload}
                    className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] transition disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Update"}
                  </button>
                )}
                {!hasReadme &&
                  renderActionButton("Create Proposal", prompts.createProposalPrompt(stageConfig))}
                {hasReadme &&
                  renderActionButton("Create Files", prompts.createFilesPrompt(stageConfig))}
              </div>
            )}
          </div>
        );
      }
      if (activeProgressStep === "stage-files") {
        return (
          <div className="flex flex-1 min-h-0 flex-col gap-4">
            {renderFileBrowser()}
            {renderEditor()}
            {showActions && (
              <div className="mt-auto flex gap-3">
                {renderSaveDeleteButtons()}
              </div>
            )}
          </div>
        );
      }
      if (activeProgressStep.startsWith("research:")) {
        const researchName = activeProgressStep.replace("research:", "");
        const isLast = researchFolders[researchFolders.length - 1] === researchName;
        return (
          <div className="flex flex-1 min-h-0 flex-col gap-4">
            {renderSubfolderBrowser(researchName)}
            {renderEditor()}
            {showActions && (
              <div className="mt-auto flex items-center justify-between gap-3">
                <div className="flex gap-3">
                  {renderSaveDeleteButtons()}
                  {renderActionButton("Research", prompts.researchPrompt(researchName))}
                </div>
                {isLast && renderActionButton("Finalize", prompts.finalizeResearchPrompt(), "success")}
              </div>
            )}
          </div>
        );
      }
    }

    // --- UX ---
    if (stageConfig.type === "ux") {
      if (activeProgressStep === "proposal") {
        const hasReadme = selectedStage.files.includes(`${stageConfig.folder}/README.md`);
        return (
          <div className="flex flex-1 min-h-0 flex-col gap-4">
            {hasReadme && renderEditor()}
            {showActions && (
              <div className="mt-auto flex gap-3">
                {hasReadme && (
                  <button
                    type="button"
                    onClick={() => void handleSave()}
                    disabled={saving || !documentPayload}
                    className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] transition disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Update"}
                  </button>
                )}
                {!hasReadme &&
                  renderActionButton("Create Proposal", prompts.createProposalPrompt(stageConfig))}
                {hasReadme &&
                  renderActionButton("Create Files", prompts.createFilesPrompt(stageConfig))}
              </div>
            )}
          </div>
        );
      }
      if (activeProgressStep === "stage-files") {
        return (
          <div className="flex flex-1 min-h-0 flex-col gap-4">
            {renderFileBrowser()}
            {renderEditor()}
            {showActions && (
              <div className="mt-auto flex gap-3">
                {renderSaveDeleteButtons()}
              </div>
            )}
          </div>
        );
      }
      if (activeProgressStep === "ui-mockup") {
        return (
          <div className="flex flex-1 min-h-0 flex-col gap-4">
            {uxMockupFolder && renderSubfolderBrowser(uxMockupFolder)}
            {renderEditor()}
            {showActions && (
              <div className="mt-auto flex items-center justify-between gap-3">
                <div className="flex gap-3">
                  {renderSaveDeleteButtons()}
                  {renderActionButton("Create Mockup", prompts.createMockupPrompt())}
                </div>
                {renderActionButton("Finalize", prompts.finalizeUxPrompt(), "success")}
              </div>
            )}
          </div>
        );
      }
    }

    // --- DevOps ---
    if (stageConfig.type === "devops") {
      if (activeProgressStep === "proposal") {
        const hasReadme = selectedStage.files.includes(`${stageConfig.folder}/README.md`);
        return (
          <div className="flex flex-1 min-h-0 flex-col gap-4">
            {hasReadme && renderEditor()}
            {showActions && (
              <div className="mt-auto flex gap-3">
                {hasReadme && (
                  <button
                    type="button"
                    onClick={() => void handleSave()}
                    disabled={saving || !documentPayload}
                    className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] transition disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Update"}
                  </button>
                )}
                {!hasReadme &&
                  renderActionButton("Create Proposal", prompts.createProposalPrompt(stageConfig))}
                {hasReadme &&
                  renderActionButton("Create Files", prompts.createFilesPrompt(stageConfig))}
              </div>
            )}
          </div>
        );
      }
      // stage-files with Execute + Finalize
      return (
        <div className="flex flex-1 min-h-0 flex-col gap-4">
          {renderFileBrowser()}
          {renderEditor()}
          {showActions && (
            <div className="mt-auto flex items-center justify-between gap-3">
              <div className="flex gap-3">
                {renderSaveDeleteButtons()}
                {renderActionButton("Execute", prompts.executeDevOpsPrompt(stageConfig))}
              </div>
              {renderActionButton("Finalize", prompts.finalizePrompt(stageConfig), "success")}
            </div>
          )}
        </div>
      );
    }

    // --- Sprints ---
    if (stageConfig.type === "sprints") {
      if (activeProgressStep === "proposal") {
        const hasReadme = selectedStage.files.includes(`${stageConfig.folder}/README.md`);
        return (
          <div className="flex flex-1 min-h-0 flex-col gap-4">
            {hasReadme && renderEditor()}
            {showActions && (
              <div className="mt-auto flex gap-3">
                {hasReadme && (
                  <button
                    type="button"
                    onClick={() => void handleSave()}
                    disabled={saving || !documentPayload}
                    className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] transition disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Update"}
                  </button>
                )}
                {!hasReadme &&
                  renderActionButton(
                    "Create Proposal",
                    prompts.createProposalPrompt(stageConfig)
                  )}
                {hasReadme &&
                  renderActionButton("Create Plan", prompts.createSprintPlanPrompt())}
              </div>
            )}
          </div>
        );
      }
      if (activeProgressStep === "plan") {
        return (
          <div className="flex flex-1 min-h-0 flex-col gap-4">
            {renderEditor()}
            {showActions && (
              <div className="mt-auto flex gap-3">
                <button
                  type="button"
                  onClick={() => void handleSave()}
                  disabled={saving || !documentPayload}
                  className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] transition disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Update"}
                </button>
                {renderActionButton("Create Backlogs", prompts.createBacklogsPrompt())}
              </div>
            )}
          </div>
        );
      }
      if (activeProgressStep === "backlogs") {
        return (
          <div className="flex flex-1 min-h-0 flex-col gap-4">
            {showActions && !selectedSprintFolder && (
              <div className="mb-2">
                {renderActionButton("Develop all the sprints", prompts.developAllSprintsPrompt())}
              </div>
            )}
            {selectedSprintFolder ? renderSprintFileBrowser() : renderSprintFolderList()}
            {selectedSprintFolder && renderEditor()}
            {showActions && selectedSprintFolder && (
              <div className="mt-auto flex gap-3">{renderSprintButtons()}</div>
            )}
          </div>
        );
      }
    }

    return null;
  };

  // --- Sub-renderers ---

  const renderEditor = () => {
    if (!documentPayload) {
      return (
        <div className="rounded-lg border border-dashed border-[var(--color-border)] px-4 py-8 text-center text-sm text-[var(--color-text-secondary)]">
          No document loaded.
        </div>
      );
    }

    if (documentPayload.contentType === "text/html") {
      return (
        <div className="rounded-lg border border-[var(--color-border)] overflow-hidden">
          <iframe
            title={`HTML preview: ${documentPayload.path}`}
            sandbox="allow-same-origin"
            className="h-[520px] w-full bg-white"
            src={`/api/html/${documentPayload.path
              .split("/")
              .map((seg) => encodeURIComponent(seg))
              .join("/")}`}
          />
        </div>
      );
    }

    return (
      <div className="flex flex-1 flex-col gap-3 min-h-0">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMarkdownView("editor")}
            className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest transition ${
              markdownView === "editor"
                ? "bg-[var(--color-accent)] text-white"
                : "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]"
            }`}
          >
            Editor
          </button>
          <button
            type="button"
            onClick={() => setMarkdownView("preview")}
            className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest transition ${
              markdownView === "preview"
                ? "bg-[var(--color-accent)] text-white"
                : "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]"
            }`}
          >
            Preview
          </button>
        </div>
        {markdownView === "editor" ? (
          <div className="flex flex-1 flex-col min-h-0">
            <textarea
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              className="min-h-0 flex-1 w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-2 text-sm text-[var(--color-text-primary)] font-mono outline-none focus:border-[var(--color-focus)]"
            />
          </div>
        ) : (
          <div className="min-h-0 flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4 overflow-auto">
            <div className="doc-markdown">
              <ReactMarkdown>{editorContent}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSaveDeleteButtons = () => {
    if (!documentPayload || documentPayload.contentType !== "text/markdown") return null;
    const isReadme = documentPayload.path.endsWith("README.md");
    return (
      <>
        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={saving}
          className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update"}
        </button>
        {!isReadme && (
          <button
            type="button"
            onClick={() => void handleDelete()}
            className="rounded-lg bg-[var(--color-error)] px-4 py-2 text-sm font-semibold text-white hover:brightness-110 transition"
          >
            Delete
          </button>
        )}
      </>
    );
  };

  const openStaticSite = (relativePath: string) => {
    if (!stageConfig) return;
    const fullPath = `${stageConfig.folder}/${relativePath}/index.html`;
    const url = `/api/static/${fullPath
      .split("/")
      .map((seg) => encodeURIComponent(seg))
      .join("/")}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const renderFileBrowser = () => (
    <div>
      {folderStack.length > 0 && (
        <button
          type="button"
          onClick={() => setFolderStack((prev) => prev.slice(0, -1))}
          className="mb-2 text-xs text-[var(--color-accent-cyan)] hover:underline"
        >
          &larr; Up Directory
        </button>
      )}
      <div className="flex flex-wrap gap-2">
        {currentFolderItems.map((item) => (
          <button
            key={item.name}
            type="button"
            onClick={() => {
              if (item.isFolder) {
                const indexPath = `${item.relativePath}/index.html`;
                if (stageFiles.includes(indexPath)) {
                  openStaticSite(item.relativePath);
                } else {
                  setFolderStack((prev) => [...prev, item.name]);
                }
              } else {
                void loadDocument(item.fullPath);
              }
            }}
            className={`rounded-lg px-3 py-1.5 text-sm transition ${
              currentPath === item.fullPath
                ? "bg-[var(--color-accent)] text-white"
                : item.isFolder
                  ? "bg-[var(--color-surface-alt)] text-[var(--color-accent-cyan)] border border-[var(--color-border)] hover:border-[var(--color-accent)]"
                  : "bg-[var(--color-surface-alt)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)]"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              {item.isFolder ? (
                "📁"
              ) : item.name.toLowerCase().endsWith(".md") ? (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                >
                  <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1.5V8h4.5L14 3.5zM7 12h10v2H7v-2zm0 4h6v2H7v-2z" />
                </svg>
              ) : null}
              <span>{item.name}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderSubfolderBrowser = (subfolder: string) => {
    if (!stageConfig || !selectedStage) return null;
    const prefix = `${stageConfig.folder}/${subfolder}/`;
    const items = selectedStage.files
      .filter((f) => f.startsWith(prefix) && (f.endsWith(".md") || f.endsWith(".html")))
      .map((f) => ({ name: f.slice(prefix.length), fullPath: f }));

    return (
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.fullPath}
            type="button"
            onClick={() => void loadDocument(item.fullPath)}
            className={`rounded-lg px-3 py-1.5 text-sm border transition ${
              currentPath === item.fullPath
                ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                : "bg-[var(--color-surface-alt)] text-[var(--color-text-primary)] border-[var(--color-border)] hover:border-[var(--color-accent)]"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              {item.name.toLowerCase().endsWith(".md") && (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                >
                  <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1.5V8h4.5L14 3.5zM7 12h10v2H7v-2zm0 4h6v2H7v-2z" />
                </svg>
              )}
              <span>{item.name}</span>
            </span>
          </button>
        ))}
      </div>
    );
  };

  const renderSprintFolderList = () => {
    if (!stageConfig || !selectedStage) return null;

    return (
      <div className="flex flex-wrap gap-2">
        {sprintFolders.map((sf) => (
          <button
            key={sf}
            type="button"
            onClick={() => {
              setSelectedSprintFolder(sf);
              setFolderStack([]);
            }}
            className={`rounded-lg px-3 py-1.5 text-xs border transition ${
              selectedSprintFolder === sf
                ? "bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
                : "bg-[var(--color-surface-alt)] text-[var(--color-text-primary)] border-[var(--color-border)] hover:border-[var(--color-accent)]"
            }`}
          >
            {sf}
          </button>
        ))}
      </div>
    );
  };

  const renderSprintFileBrowser = () => {
    if (!stageConfig || !selectedStage || !selectedSprintFolder) return null;
    const folder = stageConfig.folder;
    const sprintPrefix = `${selectedSprintFolder}/`;
    const basePrefix =
      folderStack.length > 0 ? `${sprintPrefix}${folderStack.join("/")}/` : sprintPrefix;

    const items: { name: string; isFolder: boolean; fullPath: string; relativePath: string }[] = [];
    const seenFolders = new Set<string>();

    for (const f of selectedStage.files) {
      if (!f.startsWith(`${folder}/${basePrefix}`)) continue;
      const rel = f.slice(folder.length + 1);
      if (!rel.startsWith(basePrefix)) continue;
      const rest = rel.slice(basePrefix.length);
      const slashIdx = rest.indexOf("/");
      if (slashIdx === -1) {
        items.push({
          name: rest,
          isFolder: false,
          fullPath: `${folder}/${rel}`,
          relativePath: rel,
        });
      } else {
        const folderName = rest.slice(0, slashIdx);
        if (!seenFolders.has(folderName)) {
          seenFolders.add(folderName);
          items.push({
            name: folderName,
            isFolder: true,
            fullPath: "",
            relativePath: `${basePrefix}${folderName}`,
          });
        }
      }
    }

    items.sort((a, b) => {
      if (a.name === "README.md") return -1;
      if (b.name === "README.md") return 1;
      if (a.isFolder && !b.isFolder) return -1;
      if (!a.isFolder && b.isFolder) return 1;
      return a.name.localeCompare(b.name);
    });

    return (
      <div>
        <button
          type="button"
          onClick={() => {
            if (folderStack.length > 0) {
              setFolderStack((prev) => prev.slice(0, -1));
            } else {
              setSelectedSprintFolder("");
              setDocumentPayload(null);
              setCurrentPath("");
              setEditorContent("");
            }
          }}
          className="mb-2 text-xs text-[var(--color-accent-cyan)] hover:underline"
        >
          &larr; {folderStack.length > 0 ? "Up Directory" : "Back to sprints"}
        </button>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => {
                if (item.isFolder) {
                  const indexPath = `${item.relativePath}/index.html`;
                  if (stageFiles.includes(indexPath)) {
                    openStaticSite(item.relativePath);
                  } else {
                    setFolderStack((prev) => [...prev, item.name]);
                  }
                } else {
                  void loadDocument(item.fullPath);
                }
              }}
              className={`rounded-lg px-3 py-1.5 text-sm transition ${
                currentPath === item.fullPath
                  ? "bg-[var(--color-accent)] text-white"
                  : item.isFolder
                    ? "bg-[var(--color-surface-alt)] text-[var(--color-accent-cyan)] border border-[var(--color-border)] hover:border-[var(--color-accent)]"
                    : "bg-[var(--color-surface-alt)] text-[var(--color-text-primary)] border border-[var(--color-border)] hover:border-[var(--color-accent)]"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                {item.isFolder ? (
                  "📁"
                ) : item.name.toLowerCase().endsWith(".md") ? (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="currentColor"
                  >
                    <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1.5V8h4.5L14 3.5zM7 12h10v2H7v-2zm0 4h6v2H7v-2z" />
                  </svg>
                ) : null}
                <span>{item.name}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderSprintButtons = () => {
    if (!documentPayload || !currentPath || documentPayload.contentType !== "text/markdown") return null;
    if (!stageConfig || stageConfig.type !== "sprints") return null;

    const folder = stageConfig.folder;
    const rel = currentPath.startsWith(`${folder}/`) ? currentPath.slice(folder.length + 1) : "";
    const parts = rel.split("/");

    if (parts.length !== 2) return null;

    const sprintFolder = parts[0];
    const fileName = parts[1];
    const isReadme = fileName === "README.md";

    return (
      <>
        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={saving}
          className="rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update"}
        </button>
        {isReadme
          ? renderActionButton("Develop this sprint", prompts.developSprintPrompt(sprintFolder))
          : renderActionButton(
              "Develop this backlog",
              prompts.developBacklogPrompt(fileName.replace(".md", ""))
            )}
      </>
    );
  };

  // --- Main render ---
  return (
    <div className="flex h-screen flex-col bg-[var(--color-background)] text-[var(--color-text-primary)]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 shrink-0">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
            Dev Swarm
          </p>
          <h1 className="text-lg font-semibold font-[var(--font-display)]">WebUI</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => void doSync()}
            disabled={loading}
            className="rounded-lg border border-[var(--color-border)] px-4 py-1.5 text-sm font-semibold text-[var(--color-text-primary)] hover:border-[var(--color-accent)] transition disabled:opacity-50"
          >
            <span className="inline-flex items-center gap-2">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="currentColor"
              >
                <path d="M12 6V3L8 7l4 4V8a4 4 0 1 1-4 4H6a6 6 0 1 0 6-6zm4 2h2a6 6 0 0 1-6 6v3l4-4-4-4v3a4 4 0 0 1 4-4z" />
              </svg>
              <span>Sync</span>
            </span>
          </button>
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            disabled={agents.length === 0}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-alt)] px-3 py-1.5 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-focus)]"
          >
            {agents.length === 0 ? (
              <option value="">No agents configured</option>
            ) : (
              agents.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))
            )}
          </select>
        </div>
      </header>

      {/* Toast */}
      {toast && (
        <div className="fixed right-6 top-6 z-50 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm shadow-lg">
          <p
            className={`font-semibold ${
              toast.variant === "error"
                ? "text-[var(--color-error)]"
                : "text-[var(--color-success)]"
            }`}
          >
            {toast.message}
          </p>
        </div>
      )}

      {/* Main 3-panel layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Menu */}
        <aside className="w-56 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)] overflow-y-auto">
          <div className="px-4 py-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] mb-3">
              Stages
            </h2>
            {loading ? (
              <p className="text-xs text-[var(--color-text-secondary)]">Loading...</p>
            ) : (
              <div className="space-y-4">
                {STAGE_GROUPS.map((group) => {
                  const groupStages = stages.filter((stage) =>
                    group.stageIds.includes(stage.stageId)
                  );
                  if (groupStages.length === 0) return null;
                  return (
                    <div key={group.title} className="space-y-2">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
                        {group.title}
                      </p>
                      <ul className="space-y-1">
                        {groupStages.map((stage) => (
                          <li key={stage.stageId}>
                            <button
                              type="button"
                              onClick={() => setSelectedStageId(stage.stageId)}
                              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition ${
                                stage.stageId === selectedStageId
                                  ? "bg-[var(--color-accent)] text-white"
                                  : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
                              }`}
                            >
                              <span className="flex items-center gap-2 truncate">
                                <span
                                  className={`grid h-6 w-6 place-items-center rounded-md text-[10px] font-semibold ${
                                    stage.stageId === selectedStageId
                                      ? "bg-white/20 text-white"
                                      : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)]"
                                  }`}
                                >
                                  {stage.stageId}
                                </span>
                                <span className="truncate">{stage.name}</span>
                              </span>
                              <span
                                className={`ml-1 shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium uppercase ${STATUS_STYLES[stage.status]}`}
                              >
                                {stage.status === "not-started"
                                  ? "new"
                                  : stage.status === "in-progress"
                                    ? "run"
                                    : stage.status === "completed"
                                      ? "done"
                                      : stage.status === "skipped"
                                        ? "skip"
                                        : "err"}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* Middle Panel */}
        <main className="flex flex-1 flex-col overflow-hidden">
          {/* Progress Menu */}
          {stageConfig && dynamicProgressSteps.length > 0 && !isSkipped && (
            <div className="flex items-center gap-1 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-2 overflow-x-auto shrink-0">
              {dynamicProgressSteps.map((step, idx) => (
                <button
                  key={step.key}
                  type="button"
                  onClick={() => setActiveProgressStep(step.key)}
                  className={`rounded-full px-4 py-1 text-xs font-semibold transition whitespace-nowrap ${
                    step.key === activeProgressStep
                      ? "bg-[var(--color-accent)] text-white"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
                  }`}
                >
                  {idx + 1}. {step.label}
                </button>
              ))}
            </div>
          )}

          {/* Stage Content */}
          <div className="flex flex-1 min-h-0 flex-col px-6 py-5">
            {/* Stage header */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold font-[var(--font-display)]">
                  {selectedStage
                    ? `${selectedStage.stageId} ${selectedStage.name}`
                    : "Select a stage"}
                </h2>
                {selectedStage && (
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {selectedStage.status} &middot; {selectedStage.files.length} files
                  </p>
                )}
              </div>
              {selectedStage?.isSkippable && !isSkipped && (
                <button
                  type="button"
                  onClick={async () => {
                    await toggleSkip(selectedStage.stageId, true);
                    await doSync();
                  }}
                  className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)] hover:border-[var(--color-warning)] hover:text-[var(--color-warning)] transition"
                >
                  Skip Stage
                </button>
              )}
            </div>

            <div className="flex-1 min-h-0 flex flex-col overflow-y-auto">
              {renderStageContent()}
            </div>
          </div>
        </main>

        {/* Right Panel - AI Agent Log */}
        <aside className="w-80 shrink-0 border-l border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">
                AI Agent Log
              </h3>
              <p className="text-[10px] text-[var(--color-text-secondary)]">
                {agentRunning ? "Running..." : "Idle"}
              </p>
            </div>
            <div className="flex gap-2">
              {agentRunning && (
                <button
                  type="button"
                  onClick={() => void handleInterrupt()}
                  className="rounded-lg bg-[var(--color-error)] px-3 py-1 text-[10px] font-semibold text-white hover:brightness-110 transition"
                >
                  Interrupt
                </button>
              )}
              <button
                type="button"
                onClick={() => setConsoleEvents([])}
                className="rounded-lg border border-[var(--color-border)] px-3 py-1 text-[10px] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] transition"
              >
                Clear
              </button>
            </div>
          </div>
          <div
            ref={consoleRef}
            onScroll={() => {
              const el = consoleRef.current;
              if (!el) return;
              setIsPinned(el.scrollHeight - el.scrollTop - el.clientHeight < 24);
            }}
            className="flex-1 overflow-y-auto p-3 font-mono text-xs space-y-1"
          >
            {consoleEvents.length === 0 ? (
              <p className="text-[var(--color-text-secondary)]">Waiting for output...</p>
            ) : (
              consoleEvents.map((ev) => (
                <div
                  key={ev.id}
                  className={`${
                    ev.category === "stderr"
                      ? "text-[var(--color-error)]"
                      : ev.category === "system"
                        ? "text-[var(--color-accent-cyan)]"
                        : ev.category === "status"
                          ? "text-[var(--color-warning)]"
                          : "text-[var(--color-text-primary)]"
                  }`}
                >
                  <span className="text-[var(--color-text-secondary)] mr-1">
                    [{new Date(ev.timestamp).toLocaleTimeString()}]
                  </span>
                  {ev.message}
                </div>
              ))
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
