# Dev Swarm JS Scripts

Shared JavaScript/TypeScript scripts for dev-swarm. All scripts share a common `node_modules` via pnpm workspaces.

## Structure

```
js_scripts/
├── package.json          # Root workspace package
├── pnpm-workspace.yaml   # Workspace configuration
├── pnpm-lock.yaml        # Shared lockfile
├── node_modules/         # Shared dependencies (hoisted)
├── webui/                # Complex app: Next.js web UI
│   ├── package.json      # App-specific dependencies
│   └── src/              # App source code
└── scripts/              # Simple standalone scripts (optional)
    └── example.ts        # Single-file scripts go here
```

## Setup

```bash
cd dev-swarm/js_scripts
pnpm install
```

## Managing WebUI

### Development

```bash
# From js_scripts root
pnpm webui:dev

# Or from webui folder
cd webui && pnpm dev
```

### Build & Production

```bash
# From js_scripts root
pnpm webui:build
pnpm webui:start

# Or from webui folder
cd webui && pnpm build && pnpm start
```

### Adding Dependencies to WebUI

```bash
# From js_scripts root
pnpm --filter webui add <package>
pnpm --filter webui add -D <dev-package>

# Or from webui folder
cd webui && pnpm add <package>
```

## Adding Simple Scripts

For simple single-file scripts, create them directly in `js_scripts/` or under `scripts/`:

```bash
# Create a simple script
echo 'console.log("Hello")' > scripts/hello.ts

# Run with ts-node or tsx
pnpm exec tsx scripts/hello.ts
```

## Adding New Complex Apps

For complex apps requiring their own config (like Next.js, Vite projects):

1. Create a subfolder with its own `package.json`
2. The folder is auto-included via `pnpm-workspace.yaml`
3. Dependencies are hoisted to root `node_modules`

```bash
mkdir my-app
cd my-app
pnpm init
# Add dependencies...
```

## Benefits

- **Shared `node_modules`**: Faster installs, less disk usage
- **Single lockfile**: Consistent dependency versions
- **Workspace commands**: Run scripts across packages from root
- **Isolated configs**: Each app keeps its own tsconfig, eslint, etc.
