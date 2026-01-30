import { ChildProcess, spawn } from "child_process";
import fs from "fs";
import path from "path";

export type AgentEvent = {
  timestamp: string;
  category: "system" | "output" | "stderr" | "status";
  message: string;
};

export type AgentRun = {
  id: string;
  stageId: string;
  prompt: string;
  agentId: string;
  status: "running" | "succeeded" | "failed" | "stopped";
  events: AgentEvent[];
  process: ChildProcess | null;
};

type AgentConfigEntry = {
  id: string;
  name: string;
  bin: string;
  args: string[];
  test_prompt?: string;
};

// Use globalThis to survive Next.js dev-mode HMR re-evaluations
const g = globalThis as unknown as {
  __agentActiveRun?: AgentRun | null;
  __agentRunCounter?: number;
};
if (g.__agentActiveRun === undefined) g.__agentActiveRun = null;
if (g.__agentRunCounter === undefined) g.__agentRunCounter = 0;

function isAgentExecuteEnabled(): boolean {
  const envPath = path.resolve(process.cwd(), "..", ".env");
  try {
    const raw = fs.readFileSync(envPath, "utf-8");
    const match = raw.match(/^WEBUI_AGENT_EXECUTE\s*=\s*(.+)$/m);
    return match ? match[1].trim().toLowerCase() === "true" : false;
  } catch {
    return false;
  }
}

function isoNow(): string {
  return new Date().toISOString();
}

function pushEvent(run: AgentRun, category: AgentEvent["category"], message: string) {
  run.events.push({ timestamp: isoNow(), category, message });
}

// Load agent configs from agents.json (re-read on every call so edits take effect without restart)
function loadAgentConfigs(): AgentConfigEntry[] {
  const configPath = path.resolve(process.cwd(), "agents.json");
  let parsed: unknown;
  try {
    const raw = fs.readFileSync(configPath, "utf-8");
    parsed = JSON.parse(raw) as unknown;
  } catch (err) {
    throw new Error(
      `Failed to read agents.json: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  if (!Array.isArray(parsed)) {
    throw new Error("agents.json must be an array");
  }

  const configs = parsed as AgentConfigEntry[];
  for (const [idx, cfg] of configs.entries()) {
    if (!cfg || typeof cfg !== "object") {
      throw new Error(`agents.json entry ${idx} is invalid`);
    }
    if (!cfg.id || !cfg.name || !cfg.bin || !Array.isArray(cfg.args)) {
      throw new Error(`agents.json entry ${idx} is missing required fields`);
    }
    if (cfg.args.some((arg) => typeof arg !== "string")) {
      throw new Error(`agents.json entry ${idx} has non-string args`);
    }
  }

  return configs;
}

function buildArgs(template: string[], prompt: string): string[] {
  return template.map((a) => a.replace("{{prompt}}", prompt));
}

export function getAgents(): { id: string; name: string }[] {
  const configs = loadAgentConfigs();
  return configs.map((c) => ({ id: c.id, name: c.name }));
}

export function getActiveRun(): AgentRun | null {
  return g.__agentActiveRun ?? null;
}

export function isRunActive(): boolean {
  const run = g.__agentActiveRun;
  return run !== null && run !== undefined && run.status === "running";
}

export function startRun(stageId: string, prompt: string, agentId: string): AgentRun {
  if (!isAgentExecuteEnabled()) {
    throw new Error(
      "AI agent execution is disabled. Please set WEBUI_AGENT_EXECUTE=true in dev-swarm/.env at your own risk without running a dedicated machine or docker container."
    );
  }
  if (isRunActive()) throw new Error("A run is already active");

  const configs = loadAgentConfigs();
  const config = configs.find((c) => c.id === agentId);
  if (!config) throw new Error(`Unknown agent: ${agentId}`);

  g.__agentRunCounter = (g.__agentRunCounter ?? 0) + 1;
  const id = `run-${g.__agentRunCounter}-${Date.now()}`;

  if (config.test_prompt) {
    console.log(`[agent] Using test prompt for agent ${agentId}`);
    prompt = config.test_prompt;
  }

  const run: AgentRun = {
    id,
    stageId,
    prompt,
    agentId,
    status: "running",
    events: [],
    process: null,
  };

  pushEvent(run, "system", `Starting ${config.name} agent...`);
  pushEvent(run, "system", `Prompt: ${prompt.slice(0, 300)}`);
  pushEvent(run, "status", "running");

  g.__agentActiveRun = run;

  try {
    const child = spawn(config.bin, buildArgs(config.args, prompt), {
      cwd: process.env.PROJECT_ROOT || process.cwd(),
      shell: false,
      env: { ...process.env },
    });

    if (child.stdin) {
      child.stdin.end();
    }

    run.process = child;

    child.stdout?.on("data", (data: Buffer) => {
      const raw = data.toString();
      console.log("[agent:stdout]", JSON.stringify(raw));
      const lines = raw.split("\n").filter((l) => l.length > 0);
      for (const line of lines) {
        pushEvent(run, "output", line);
      }
    });

    child.stderr?.on("data", (data: Buffer) => {
      const raw = data.toString();
      console.log("[agent:stderr]", JSON.stringify(raw));
      const lines = raw.split("\n").filter((l) => l.length > 0);
      for (const line of lines) {
        pushEvent(run, "stderr", line);
      }
    });

    child.on("close", (code) => {
      console.log("[agent:close]", code, "events:", run.events.length);
      if (run.status === "running") {
        run.status = code === 0 ? "succeeded" : "failed";
      }
      pushEvent(run, "system", `Process exited with code ${code}`);
      pushEvent(run, "status", run.status);
      run.process = null;
    });

    child.on("error", (err) => {
      run.status = "failed";
      pushEvent(run, "stderr", `Process error: ${err.message}`);
      pushEvent(run, "status", "failed");
      run.process = null;
    });
  } catch (err) {
    run.status = "failed";
    pushEvent(run, "stderr", `Failed to start: ${err instanceof Error ? err.message : String(err)}`);
    pushEvent(run, "status", "failed");
  }

  return run;
}

export function interruptRun(): AgentRun | null {
  const activeRun = g.__agentActiveRun;
  if (!activeRun) throw new Error("No active run");
  if (activeRun.status !== "running") throw new Error("Run is not active");

  if (activeRun.process) {
    activeRun.process.kill("SIGTERM");
    const proc = activeRun.process;
    setTimeout(() => {
      try {
        proc.kill("SIGKILL");
      } catch {
        // already dead
      }
    }, 5000);
  }

  activeRun.status = "stopped";
  pushEvent(activeRun, "system", "Run interrupted by user");
  pushEvent(activeRun, "status", "stopped");

  return activeRun;
}

export function getRunEvents(runId: string): AgentEvent[] {
  const activeRun = g.__agentActiveRun;
  if (!activeRun || activeRun.id !== runId) return [];
  return [...activeRun.events];
}

export function isRunFinished(runId: string): boolean {
  const activeRun = g.__agentActiveRun;
  if (!activeRun || activeRun.id !== runId) return true;
  return activeRun.status !== "running";
}
