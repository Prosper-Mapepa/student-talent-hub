# DevSecOps CI/CD Pipeline — VeriTalent

Automated security pipeline (GitHub Actions) that **fails builds** when critical issues are detected.

| Layer | Tool | Gate |
|-------|------|------|
| **Secret detection** | TruffleHog | Verified secrets in git history |
| **SAST** | Trivy (filesystem) | CVSS ≥ 7.0 (`HIGH`, `CRITICAL`) |
| **SCA / SBOM** | Trivy | CycloneDX + SPDX artifacts (supply chain visibility) |
| **Container scan** | Trivy (Docker images) | CVSS ≥ 7.0 on backend + frontend images |
| **DAST** | OWASP ZAP baseline | Dynamic scan of running app |

## Architecture

```
Push / PR
   │
   ├─► TruffleHog (secrets)
   ├─► Trivy FS (SAST + deps)
   ├─► Trivy SBOM (SCA)
   │
   ├─► Docker build (backend + frontend)
   │      └─► Trivy image scan
   │
   └─► docker-compose.ci.yml
          └─► OWASP ZAP → http://localhost:3000
```

## Files

| File | Purpose |
|------|---------|
| `.github/workflows/devsecops.yml` | Main pipeline |
| `backend/Dockerfile` | NestJS API image |
| `frontend/Dockerfile` | Next.js standalone image |
| `docker-compose.ci.yml` | Postgres + API + web for ZAP |

## Local commands

```bash
# Build images
docker build -t veritalent-backend:local ./backend
docker build -t veritalent-frontend:local \
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:3001 ./frontend

# Filesystem scan (fail on HIGH/CRITICAL)
docker run --rm -v "$PWD":/src aquasec/trivy:latest fs \
  --severity HIGH,CRITICAL --exit-code 1 /src

# Start stack for manual ZAP testing
docker compose -f docker-compose.ci.yml up --build
# Frontend: http://localhost:3000  |  API: http://localhost:3001

# Generate SBOM locally
docker run --rm -v "$PWD":/src aquasec/trivy:latest fs \
  --format cyclonedx -o /src/sbom.local.json /src/backend
```

## Triggering the pipeline

- **Automatic:** push or PR to `main`, `master`, or `develop`
- **Manual:** GitHub → Actions → DevSecOps Pipeline → Run workflow

## SBOM artifacts

After each run, download **sbom-reports** from the Actions artifacts tab:
- `sbom-repo.cyclonedx.json` — full repo
- `sbom-backend.spdx.json` — NestJS API
- `sbom-frontend.spdx.json` — Next.js web

## Tuning

- **Severity threshold:** edit `TRIVY_SEVERITY` in the workflow (`HIGH,CRITICAL` = CVSS ≥ 7.0)
- **Ignore false positives:** add `.trivyignore` at repo root
- **ZAP rules:** add `.zap/rules.tsv` for accepted findings

## Week-by-week rollout (course project)

| Week | Focus | Status |
|------|-------|--------|
| 1 | TruffleHog + Trivy FS | ✅ in workflow |
| 2 | Docker + Trivy container scan | ✅ in workflow |
| 3 | SBOM generation | ✅ in workflow |
| 4 | OWASP ZAP DAST | ✅ in workflow |

## Notes

- CI uses **local Postgres** — credentials in `docker-compose.ci.yml` are for testing only.
- Push this folder to GitHub to activate Actions (`.github/workflows/` must be on the default branch).
- For a split repo (separate `frontend` git remote), copy the workflow and Docker files into that repo or use a monorepo.
