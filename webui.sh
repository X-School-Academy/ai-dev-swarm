#!/usr/bin/env bash
set -euo pipefail

WEBUI_DIR="$(cd "$(dirname "$0")/dev-swarm/webui" && pwd)"

(
cd "$WEBUI_DIR"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  pnpm install
fi

# Build if not built yet
if [ ! -d ".next" ]; then
  echo "Building webui..."
  pnpm build
fi

echo "Starting webui on http://localhost:3001"
exec pnpm start
)