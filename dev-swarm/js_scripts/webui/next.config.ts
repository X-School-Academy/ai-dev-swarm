import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

const envPath = path.resolve(__dirname, "..", "..", ".env");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }
    const [key, rawValue] = trimmed.split("=", 2);
    if (!key || process.env[key] !== undefined) {
      continue;
    }
    const value = rawValue.replace(/^['"]|['"]$/g, "");
    process.env[key] = value;
  }
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
