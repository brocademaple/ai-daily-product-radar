# AI Daily Product Radar

AI Daily Product Radar is a compact full-stack workbench for reviewing
AI-native GitHub products, turning daily discovery runs into a board, and
publishing the useful bits to a knowledge base and Lark/Feishu.

The first version is intentionally small: a local dashboard, a clear data
contract, Yuque report archiving, and a Feishu Base-backed project board. It is
built to make daily product judgment visible instead of leaving it buried in a
chat transcript.

## What It Helps With

- Review many AI product candidates at once.
- Separate strong product-shaped repos from noisy demos, wrappers, and paper
  reimplementations.
- Preserve the reasoning behind each decision: audience, AI-native angle,
  runnability, growth signal, and recommended action.
- Publish a daily report to Yuque under `向26出发 / AI Daily Product Radar`.
- Sync project cards into Feishu Base so they can become a real board.

## MVP Scope

The MVP focuses on a 90-minute demo loop:

1. Load a structured Radar Run.
2. Show projects across board columns:
   - `Top Picks`
   - `Watchlist`
   - `Skip / Low Signal`
   - `Published`
3. Open a project card and inspect the judgment details.
4. Preview the Yuque daily report and Feishu Base records.
5. Publish the report to Yuque.
6. Sync project cards to Feishu Base.
7. Show channel-level publish status and retry hints.

The MVP does not include realtime GitHub search, automatic scoring, complex
permissions, scheduled jobs, drag-and-drop workflow, or statistical dashboards.

## Product Shape

```text
Radar Run
  ├─ Top Projects
  ├─ Watchlist
  ├─ Skip Reasons
  ├─ Trend Observations
  ├─ Yuque Report Preview
  └─ Feishu Base Sync Preview
```

Each project card keeps the fields that matter for product review:

- project name and GitHub URL
- source date
- category
- score
- status
- one-line summary
- target audience
- AI-native angle
- growth or activity signal
- runnability judgment
- recommended action
- skip reason when applicable

## Tech Stack

- Frontend: Vue 3, TypeScript, Less, Vite, Pinia, Vue Router
- Backend: Node.js, Fastify, TypeScript, zod
- Database: SQLite for local demo, PostgreSQL-ready through the existing DB
  abstraction
- Publishing targets: Yuque knowledge base and Feishu Base

The repo keeps frontend and backend as independent sub-projects:

```text
frontend/   Vue app
backend/    Fastify API
```

## Quickstart

Backend:

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

The frontend dev server proxies `/api` to `http://localhost:3000`.

## External Publishing Targets

The intended production/demo targets are:

- Yuque knowledge base: `向26出发`
- Yuque section: `AI Daily Product Radar`
- Feishu: Base table used as the global project board

Secrets and IDs should live in backend environment variables. Do not commit
tokens.

## Development Workflow

This project uses a closed-loop module structure. Business features live under
`src/modules/<name>/`, and each feature exposes a single `index.ts`.

Before changing feature code, use the project skills in `.agents/skills/`:

```text
$vibecoding-codex-workflow
$vibecoding-architecture-design
$vibecoding-fullstack-module
```

Run the architecture verification gate before considering work complete:

```bash
bash .agents/skills/vibecoding-verify/scripts/verify.sh
```

## Roadmap

See [docs/roadmap.md](docs/roadmap.md) for the staged MVP plan.
