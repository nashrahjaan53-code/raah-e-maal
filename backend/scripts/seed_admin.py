from app.connection.config import settings
from app.database.database import Base, SessionLocal, engine
from app.models.user_model import User
from app.services.auth_service import hash_password


def main() -> None:
    username = settings.ADMIN_DEFAULT_USERNAME.strip()
    password = settings.ADMIN_DEFAULT_PASSWORD.strip()

    if not username:
        raise SystemExit("ADMIN_DEFAULT_USERNAME is required.")
    if not password:
        raise SystemExit("ADMIN_DEFAULT_PASSWORD is required.")

    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        existing = db.query(User).filter(User.username == username).first()
        hashed_password = hash_password(password)

        if existing:
            existing.hashed_password = hashed_password
            existing.role = "admin"
            db.commit()
            print(f"Updated existing admin credentials for '{username}'.")
        else:
            user = User(username=username, hashed_password=hashed_password, role="admin")
            db.add(user)
            db.commit()
            print(f"Created admin user '{username}'.")

        admins = {item.strip().lower() for item in settings.ADMIN_USERNAMES.split(",") if item.strip()}
        if username.lower() not in admins:
            print(
                "Warning: ADMIN_USERNAMES does not include ADMIN_DEFAULT_USERNAME. "
                "Add it to treat this user as admin."
            )
    finally:
        db.close()


if __name__ == "__main__":
    main()
