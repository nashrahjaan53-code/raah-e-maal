# Rollback Procedure

Date: 2026-03-26

## Trigger Conditions
- Deployment introduces critical errors
- Health checks fail repeatedly
- Data integrity concerns identified

## Rollback Steps
1. Stop current stack:
   - docker compose --env-file .env.production down
2. Restore previous known-good backend/frontend images:
   - Update image tags to last stable release
   - docker compose --env-file .env.production up -d
3. Restore database if schema/data regression detected:
   - python -m scripts.db_backup_restore restore --source backup_file.dump
4. Validate rollback:
   - GET /health/live returns alive
   - GET /health/ready returns ready and database ok
   - Run smoke flow (register/login/profile/loan/simulation/recommendations)

## Ownership
- Execution owner: Platform Operations
- Validation owner: Backend Engineering
- Communication owner: Product Lead
