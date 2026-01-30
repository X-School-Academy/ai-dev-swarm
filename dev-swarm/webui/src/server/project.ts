import path from "path";

export function getProjectRoot(): string {
  // Set by next.config.ts env: dev-swarm/webui -> dev-swarm -> repo root
  if (process.env.PROJECT_ROOT) return process.env.PROJECT_ROOT;
  // Fallback: resolve from cwd (assumes cwd is dev-swarm/webui)
  return path.resolve(process.cwd(), "..", "..");
}
