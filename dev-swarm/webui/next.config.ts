import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  env: {
    // Project root: dev-swarm/webui -> dev-swarm -> repo root
    PROJECT_ROOT: path.resolve(__dirname, "..", ".."),
  },
  serverExternalPackages: ["child_process"],
};

export default nextConfig;
