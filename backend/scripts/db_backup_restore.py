import argparse
import shutil
import subprocess
from datetime import datetime
from pathlib import Path

from app.connection.config import settings


def _is_sqlite(url: str) -> bool:
    return url.startswith("sqlite")


def _sqlite_path(url: str) -> Path:
    db_path = url.replace("sqlite:///", "", 1)
    return Path(db_path)


def backup(output: str | None = None) -> None:
    url = settings.DATABASE_URL
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    if _is_sqlite(url):
        db_file = _sqlite_path(url)
        if not db_file.exists():
            raise SystemExit(f"SQLite database not found at {db_file}")

        output_path = Path(output) if output else Path(f"backup_{timestamp}.db")
        shutil.copy2(db_file, output_path)
        print(f"Backup created: {output_path}")
        return

    output_path = Path(output) if output else Path(f"backup_{timestamp}.dump")
    command = [
        "pg_dump",
        "--format=custom",
        "--file",
        str(output_path),
        url,
    ]
    subprocess.run(command, check=True)
    print(f"Backup created: {output_path}")


def restore(source: str) -> None:
    url = settings.DATABASE_URL
    source_path = Path(source)
    if not source_path.exists():
        raise SystemExit(f"Backup file not found: {source_path}")

    if _is_sqlite(url):
        db_file = _sqlite_path(url)
        shutil.copy2(source_path, db_file)
        print(f"Database restored from {source_path} to {db_file}")
        return

    command = [
        "pg_restore",
        "--clean",
        "--if-exists",
        "--no-owner",
        "--dbname",
        url,
        str(source_path),
    ]
    subprocess.run(command, check=True)
    print(f"Database restored from {source_path}")


def main() -> None:
    parser = argparse.ArgumentParser(description="Backup and restore database")
    subparsers = parser.add_subparsers(dest="command", required=True)

    backup_parser = subparsers.add_parser("backup", help="Create database backup")
    backup_parser.add_argument("--output", help="Output file path")

    restore_parser = subparsers.add_parser("restore", help="Restore database from backup")
    restore_parser.add_argument("--source", required=True, help="Backup file path")

    args = parser.parse_args()

    if args.command == "backup":
        backup(args.output)
    else:
        restore(args.source)


if __name__ == "__main__":
    main()
