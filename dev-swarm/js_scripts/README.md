# Dev Swarm JS Scripts

Node.js/TypeScript projects for AI Dev Swarm.

## Projects

- **webui/** - Next.js WebUI for managing the development workflow

## Setup

```bash
# Install all dependencies
pnpm install
```

## Commands

### WebUI

| Command | Description |
|---------|-------------|
| `pnpm dev-webui` | Start Next.js development server (http://localhost:3001) |
| `pnpm build-webui` | Build for production |
| `pnpm start-webui` | Start production server |
| `pnpm lint-webui` | Run ESLint |

## Configuration

### Change Port Number

The WebUI runs on port 3001 by default. To change it:

1. Edit `webui/package.json`:
   ```json
   "scripts": {
     "dev": "next dev -p 3002",
     "start": "next start -p 3002"
   }
   ```

2. Update CORS in `../py_scripts/webui/main.py`:
   ```python
   allow_origins=[
       "http://localhost:3002",
       "http://127.0.0.1:3002",
   ],
   ```

### Environment Variables

Environment variables are loaded from `dev-swarm/.env`:

```env
# WebUI Frontend
NEXT_PUBLIC_API_URL=http://localhost:8001

# WebUI Backend
WEBUI_HOST=127.0.0.1
WEBUI_PORT=8001
```

## Requirements

- Node.js 18+
- pnpm 8+
