import fs from "fs";
import path from "path";
import { getProjectRoot } from "./project";
import { STAGES } from "./stages";

const ALLOWED_EXTENSIONS = new Set([".md", ".html"]);
const ALLOWED_ASSET_EXTENSIONS = new Set([
  ".html",
  ".css",
  ".js",
  ".mjs",
  ".json",
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".webp",
  ".ico",
  ".txt",
]);
const WRITABLE_ROOT_FILES = new Set(["ideas.md"]);

function resolvePath(filePath: string): string {
  if (!filePath || filePath.trim() === "") throw new Error("Path is required");
  if (path.isAbsolute(filePath)) throw new Error("Absolute paths are not allowed");
  if (filePath.includes("..")) throw new Error("Path traversal is not allowed");

  const root = getProjectRoot();
  const resolved = path.resolve(root, filePath);
  if (!resolved.startsWith(root)) throw new Error("Path is outside project root");
  return resolved;
}

function ensureWriteScope(resolved: string): void {
  const root = getProjectRoot();
  const relative = path.relative(root, resolved);
  const parts = relative.split(path.sep);
  if (!parts.length) throw new Error("Writes must target stage directories or allowed root files");

  // Allow specific root-level files
  if (parts.length === 1 && WRITABLE_ROOT_FILES.has(parts[0])) return;

  const allowedDirs = new Set(STAGES.map((s) => s.directory));
  if (!allowedDirs.has(parts[0])) {
    throw new Error("Writes must target stage directories");
  }
}

function ensureReadScope(resolved: string): void {
  const root = getProjectRoot();
  const relative = path.relative(root, resolved);
  const parts = relative.split(path.sep);
  if (!parts.length) throw new Error("Reads must target stage directories or allowed root files");

  if (parts.length === 1 && WRITABLE_ROOT_FILES.has(parts[0])) return;

  const allowedDirs = new Set(STAGES.map((s) => s.directory));
  if (!allowedDirs.has(parts[0])) {
    throw new Error("Reads must target stage directories");
  }
}

function contentType(filePath: string): string {
  return path.extname(filePath).toLowerCase() === ".html" ? "text/html" : "text/markdown";
}

function assetContentType(filePath: string): string {
  switch (path.extname(filePath).toLowerCase()) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".js":
      return "text/javascript; charset=utf-8";
    case ".mjs":
      return "text/javascript; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    case ".webp":
      return "image/webp";
    case ".ico":
      return "image/x-icon";
    case ".txt":
      return "text/plain; charset=utf-8";
    default:
      return "application/octet-stream";
  }
}

export function readDocument(filePath: string) {
  const resolved = resolvePath(filePath);
  if (!fs.existsSync(resolved)) throw new Error("Document not found");

  const ext = path.extname(resolved).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) throw new Error("Unsupported document type");
  ensureReadScope(resolved);

  const content = fs.readFileSync(resolved, "utf-8");
  const stat = fs.statSync(resolved);
  const root = getProjectRoot();

  return {
    path: path.relative(root, resolved).split(path.sep).join("/"),
    content,
    contentType: contentType(resolved),
    lastModified: stat.mtime.toISOString(),
  };
}

export function writeDocument(filePath: string, content: string) {
  const resolved = resolvePath(filePath);
  const ext = path.extname(resolved).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) throw new Error("Unsupported document type");
  ensureWriteScope(resolved);

  const dir = path.dirname(resolved);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(resolved, content, "utf-8");

  const stat = fs.statSync(resolved);
  const root = getProjectRoot();

  return {
    path: path.relative(root, resolved).split(path.sep).join("/"),
    content,
    contentType: contentType(resolved),
    lastModified: stat.mtime.toISOString(),
  };
}

export function deleteDocument(filePath: string): void {
  const resolved = resolvePath(filePath);
  if (!fs.existsSync(resolved)) throw new Error("Document not found");
  if (path.basename(resolved) === "README.md") throw new Error("README.md cannot be deleted");

  const ext = path.extname(resolved).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) throw new Error("Unsupported document type");
  ensureWriteScope(resolved);

  fs.unlinkSync(resolved);
}

export function readAsset(filePath: string): { content: Buffer; contentType: string } {
  const resolved = resolvePath(filePath);
  if (!fs.existsSync(resolved)) throw new Error("Document not found");
  if (fs.statSync(resolved).isDirectory()) throw new Error("Path is a directory");

  const ext = path.extname(resolved).toLowerCase();
  if (!ALLOWED_ASSET_EXTENSIONS.has(ext)) throw new Error("Unsupported asset type");
  ensureReadScope(resolved);

  const content = fs.readFileSync(resolved);
  return { content, contentType: assetContentType(resolved) };
}
