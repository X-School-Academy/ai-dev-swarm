import type { DocumentPayload, SyncResponse } from "./types";

async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(path, options);
  if (!response.ok) {
    let detail = "";
    try {
      const body = await response.json();
      detail = body.detail || "";
    } catch {
      // ignore parse errors
    }
    throw new Error(detail || `Request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export async function syncProject(): Promise<SyncResponse> {
  return apiFetch<SyncResponse>("/api/sync");
}

export async function readDocument(path: string): Promise<DocumentPayload> {
  return apiFetch<DocumentPayload>(
    `/api/files/read?path=${encodeURIComponent(path)}`
  );
}

export async function writeDocument(
  path: string,
  content: string
): Promise<DocumentPayload> {
  return apiFetch<DocumentPayload>("/api/files/write", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, content }),
  });
}

export async function deleteDocument(path: string): Promise<void> {
  await apiFetch<{ ok: boolean }>("/api/files/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path }),
  });
}

export async function toggleSkip(
  stageId: string,
  skip: boolean
): Promise<void> {
  await apiFetch(`/api/stages/${stageId}/skip`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ skip }),
  });
}

export async function startAgentRun(
  stageId: string,
  prompt: string,
  agentId: string = "claude"
): Promise<{ runId: string }> {
  return apiFetch<{ runId: string }>("/api/agent/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stageId, prompt, agentId }),
  });
}

export async function stopAgentRun(): Promise<void> {
  await apiFetch("/api/agent/interrupt", { method: "POST" });
}

export async function fetchAgents(): Promise<{ id: string; name: string }[]> {
  return apiFetch<{ id: string; name: string }[]>("/api/agents");
}

export function createEventSource(runId: string): EventSource {
  return new EventSource(`/api/agent/run?runId=${encodeURIComponent(runId)}`);
}
