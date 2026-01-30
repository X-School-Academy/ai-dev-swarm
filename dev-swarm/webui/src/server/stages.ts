import fs from "fs";
import path from "path";
import { getProjectRoot } from "./project";

export type StageDefinition = {
  stageId: string;
  name: string;
  directory: string;
};

export const STAGES: StageDefinition[] = [
  { stageId: "00", name: "Init Ideas", directory: "00-init-ideas" },
  { stageId: "01", name: "Market Research", directory: "01-market-research" },
  { stageId: "02", name: "Personas", directory: "02-personas" },
  { stageId: "03", name: "MVP", directory: "03-mvp" },
  { stageId: "04", name: "Tech Research", directory: "04-tech-research" },
  { stageId: "05", name: "PRD", directory: "05-prd" },
  { stageId: "06", name: "UX", directory: "06-ux" },
  { stageId: "07", name: "Architecture", directory: "07-architecture" },
  { stageId: "08", name: "Tech Specs", directory: "08-tech-specs" },
  { stageId: "09", name: "DevOps", directory: "09-devops" },
  { stageId: "10", name: "Sprints", directory: "10-sprints" },
  { stageId: "11", name: "Deployment", directory: "11-deployment" },
  { stageId: "99", name: "Archive", directory: "99-archive" },
];

const NON_SKIPPABLE = new Set(["00", "05", "08", "10"]);
const ALLOWED_EXTENSIONS = new Set([".md", ".html"]);

export function findStage(stageId: string): StageDefinition | undefined {
  return STAGES.find((s) => s.stageId === stageId);
}

function listDocumentsRecursive(dirPath: string, rootPath: string): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dirPath)) return results;

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      results.push(...listDocumentsRecursive(fullPath, rootPath));
    } else if (entry.isFile() && ALLOWED_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      results.push(path.relative(rootPath, fullPath).split(path.sep).join("/"));
    }
  }
  return results.sort();
}

export function deriveStatus(
  hasSkip: boolean,
  hasReadme: boolean,
  hasOtherFiles: boolean
): string {
  if (hasSkip) return "skipped";
  if (hasReadme && hasOtherFiles) return "completed";
  if (hasReadme) return "in-progress";
  return "not-started";
}

export function listStages() {
  const root = getProjectRoot();
  return STAGES.map((stage) => {
    const stageDir = path.join(root, stage.directory);
    const hasSkip = fs.existsSync(path.join(stageDir, "SKIP.md"));
    const files = listDocumentsRecursive(stageDir, root);
    const readmePath = `${stage.directory}/README.md`;
    const skipPath = `${stage.directory}/SKIP.md`;
    const hasReadme = files.includes(readmePath);
    const hasOtherFiles = files.some((f) => f !== readmePath && f !== skipPath);
    return {
      stageId: stage.stageId,
      name: stage.name,
      status: deriveStatus(hasSkip, hasReadme, hasOtherFiles),
      isSkippable: !NON_SKIPPABLE.has(stage.stageId),
      hasSkipFile: hasSkip,
      files,
    };
  });
}

export function listStageFiles(stageId: string): string[] {
  const stage = findStage(stageId);
  if (!stage) throw new Error("Stage not found");
  const root = getProjectRoot();
  const stageDir = path.join(root, stage.directory);
  return listDocumentsRecursive(stageDir, root);
}

export function toggleSkip(stageId: string, skip: boolean) {
  const stage = findStage(stageId);
  if (!stage) throw new Error("Stage not found");
  if (NON_SKIPPABLE.has(stageId)) throw new Error("Stage is not skippable");

  const root = getProjectRoot();
  const stageDir = path.join(root, stage.directory);
  if (!fs.existsSync(stageDir)) throw new Error("Stage directory not found");

  const skipFile = path.join(stageDir, "SKIP.md");
  const current = fs.existsSync(skipFile);

  if (skip && !current) {
    fs.writeFileSync(skipFile, "# Stage Skipped\n\nSkipped via WebUI.\n");
  } else if (!skip && current) {
    fs.unlinkSync(skipFile);
  }

  const files = listDocumentsRecursive(stageDir, root);
  const readmePath = `${stage.directory}/README.md`;
  const skipPath = `${stage.directory}/SKIP.md`;
  const hasReadme = files.includes(readmePath);
  const hasOtherFiles = files.some((f) => f !== readmePath && f !== skipPath);

  return {
    stageId: stage.stageId,
    name: stage.name,
    status: deriveStatus(skip, hasReadme, hasOtherFiles),
    isSkippable: true,
    hasSkipFile: skip,
    files,
  };
}
