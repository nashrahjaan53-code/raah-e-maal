# Pre-Launch Checklist

## Product Readiness
- [x] Core user journeys validated end-to-end: register, login, profile, loans, simulation, recommendations.
- [ ] UI tested on desktop and mobile breakpoints.
- [ ] Error states and empty states reviewed for all primary pages.

## Security
- [x] SECRET_KEY rotated to a strong production value.
- [x] ADMIN_USERNAMES configured for production admin accounts.
- [x] CORS_ORIGINS restricted to production domains only.
- [ ] HTTPS enabled at ingress or reverse proxy.

## Infrastructure
- [x] Docker images build successfully for backend and frontend.
- [x] docker-compose services pass health checks.
- [ ] Database backup job scheduled.
- [x] Restore drill executed at least once with latest backup.

## Observability
- [x] Structured request logs visible in runtime environment.
- [x] /health/live and /health/ready wired into monitoring.
- [ ] Alerting configured for high error rates and service downtime.

## Data and Operations
- [x] Admin account seeded using backend/scripts/seed_admin.py.
- [x] Migration strategy validated (alembic upgrade path).
- [x] Rollback procedure documented.

## Quality Gates
- [x] Backend tests pass: pytest -q.
- [x] Frontend checks pass: npm run lint and npm run build.
- [ ] CI workflow green on default branch.

## Go Live
- [x] Final smoke test completed against production-like environment.
- [ ] Team sign-off captured for product, engineering, and operations.
- [ ] Launch communication and incident contact list prepared.
