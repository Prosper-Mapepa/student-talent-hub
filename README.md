# VeriTalent

Monorepo for the VeriTalent platform — student talent marketplace with web and mobile apps.

## Project structure

```
veritalent/
├── frontend/     Next.js 15 web app (Netlify)     → talent-hub-front
├── backend/      NestJS API (Railway)             → talent-hub-api
├── mobile/       Expo / React Native (App Store)  → in-repo
├── .github/      CI/CD workflows
└── docker-compose.ci.yml   Local stack for security testing
```

Each app is **self-contained** with its own dependencies, environment variables, and deployment config.

| App | Stack | Deploy target | Config |
|-----|-------|---------------|--------|
| `frontend/` | Next.js 15, Tailwind | [Netlify](https://talent-hub-front.netlify.app) | `next.config.ts`, `Dockerfile` |
| `backend/` | NestJS, TypeORM, Postgres | [Railway](https://railway.app) | `.env`, `Dockerfile`, `Procfile` |
| `mobile/` | Expo 54, Redux | App Store / Play Store | `app.config.js`, `eas.json` |

## Getting started

### 1. Clone with submodules

```bash
git clone --recurse-submodules https://github.com/Prosper-Mapepa/student-talent-hub.git
cd student-talent-hub

# If already cloned without submodules:
git submodule update --init --recursive
```

### 2. Install dependencies

```bash
npm run install:all
# Or individually:
npm run install:backend
npm run install:frontend
npm run install:mobile
```

### 3. Environment variables

Copy each app's example env and fill in values:

```bash
cp backend/.env.example backend/.env      # if present
cp frontend/.env.example frontend/.env.local
cp mobile/.env.example mobile/.env
```

See each app's README for required variables.

### 4. Run locally

```bash
# Terminal 1 — API (port 3001)
npm run dev:backend

# Terminal 2 — Web (port 3000)
npm run dev:frontend

# Terminal 3 — Mobile (Expo)
npm run dev:mobile
```

## CI/CD

| Workflow | Triggers on | Purpose |
|----------|-------------|---------|
| `devsecops.yml` | `frontend/**`, `backend/**`, `mobile/**` | Security scans, Docker build, ZAP |
| Deploy (external) | Push to submodule repos | Netlify (frontend), Railway (backend), EAS (mobile) |

See [DEVSECOPS.md](./DEVSECOPS.md) for pipeline details.

## Submodule repos

`frontend/` and `backend/` are git submodules pointing to separate deploy repos:

- Frontend: `https://github.com/Prosper-Mapepa/talent-hub-front.git`
- Backend: `https://github.com/Prosper-Mapepa/talent-hub-api.git`

After editing a submodule, commit inside the submodule first, then update the pointer in this repo:

```bash
cd frontend && git add . && git commit -m "..." && git push
cd .. && git add frontend && git commit -m "chore: bump frontend submodule"
```

`mobile/` lives directly in this repo (not a submodule).
