# DevSecOps CI/CD Pipeline — VeriTalent

Automated security pipeline (GitHub Actions) scoped to each app folder in the monorepo.

## Monorepo layout

```
frontend/   → Next.js web (Netlify)       — Docker + Trivy + ZAP
backend/    → NestJS API (Railway)        — Docker + Trivy + ZAP
mobile/     → Expo / React Native          — Trivy FS + typecheck (no Docker)
```

Each app has its own `package.json`, env config, and deployment target. The root repo orchestrates CI only.

## Pipeline jobs

| Job | Scope | Gate |
|-----|-------|------|
| **Detect Changes** | Path filter | Skips unchanged apps |
| **TruffleHog** | Whole repo | Verified secrets |
| **SAST (Trivy FS)** | Per changed app | CVSS ≥ 7.0 |
| **SBOM** | Per changed app | SPDX artifacts |
| **Mobile typecheck** | `mobile/` only | TypeScript |
| **Docker build** | `backend/`, `frontend/` | Build must succeed |
| **Container scan** | Backend + frontend images | CVSS ≥ 7.0 |
| **OWASP ZAP** | Running web stack | Dynamic scan |

## Path-based triggers

The workflow runs when files change in:

- `backend/**`
- `frontend/**`
- `mobile/**`
- `.github/workflows/devsecops.yml`
- `docker-compose.ci.yml`

Use **Run workflow** (workflow_dispatch) to scan everything manually.

## Local commands

```bash
# Install all apps
npm run install:all

# Build Docker images
docker build -t veritalent-backend:local ./backend
docker build -t veritalent-frontend:local \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:3001 ./frontend

# Start stack for ZAP / manual testing
npm run ci:stack
# Frontend: http://localhost:3000  |  API: http://localhost:3001

# Mobile
npm run dev:mobile
npm run typecheck:mobile
```

## Submodule setup

`frontend/` and `backend/` are git submodules. CI checks them out with `submodules: recursive`.

```bash
git submodule update --init --recursive
```

Ensure `.gitmodules` contains URLs for both submodules.

## Tuning

- **Severity:** edit `TRIVY_SEVERITY` in the workflow
- **False positives:** add `.trivyignore` in the affected app folder
- **ZAP rules:** add `.zap/rules.tsv` at repo root

## SBOM artifacts

Download **sbom-reports** from Actions artifacts:

- `sbom-backend.spdx.json`
- `sbom-frontend.spdx.json`
- `sbom-mobile.spdx.json`
