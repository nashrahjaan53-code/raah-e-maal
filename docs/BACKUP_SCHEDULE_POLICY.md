# Backup Schedule Policy

Date: 2026-03-26
Scope: LoanPilot production database

## Schedule
- Frequency: Daily
- Time: 02:00 UTC
- Backup command: python -m scripts.db_backup_restore backup --output backup_YYYYMMDD.dump
- Storage target: Off-host encrypted object storage bucket

## Retention
- Daily backups: retain 14 days
- Weekly backups: retain 8 weeks
- Monthly backups: retain 12 months

## Ownership
- Primary owner: Platform Operations
- Secondary owner: Backend Engineering

## Verification
- Integrity check: verify backup artifact exists and is non-zero size
- Restore drill cadence: monthly
- Restore drill command: python -m scripts.db_backup_restore restore --source backup_file.dump

## RTO/RPO Targets
- RTO: 60 minutes
- RPO: 24 hours

## Alerting
- Trigger alert if backup job fails or backup artifact missing by 02:30 UTC
- Escalation path: Platform on-call -> Engineering lead
