# Sagar's Portfolio

Full-stack developer portfolio — a running Next.js + Express + MongoDB application that is both Sagar's professional front door and a demonstration of the stack.

## Structure (npm workspaces monorepo)

```
frontend/   Next.js 16 App Router app (TypeScript, Tailwind v4, shadcn/ui)
backend/    Express 5 REST API (layered: routes → controllers → services → models)
shared/     @portfolio/shared — canonical TS domain contract (types, Zod schemas, enums)
```

Planning artifacts (PRD, architecture spine, epics & stories) live under `_bmad-output/planning-artifacts/`.

## Prerequisites

- Node.js ≥ 22 (24 LTS recommended)
- A MongoDB instance (local dev uses `mongodb://127.0.0.1:27017`; production uses MongoDB Atlas)

## Setup

```bash
npm install            # installs all workspaces and links @portfolio/shared
```

Copy `.env.example` values into:
- `backend/.env` (PORT, MONGODB_URI, CORS_ORIGIN)
- `frontend/.env.local` (NEXT_PUBLIC_API_URL)

## Run (local dev)

```bash
npm run dev:backend    # Express API on http://localhost:5000
npm run dev:frontend   # Next.js app on http://localhost:3000
```

Run each in its own terminal. Verify the API with `curl http://localhost:5000/api`.
