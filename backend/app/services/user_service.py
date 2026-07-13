from sqlalchemy.orm import Session
from app.models.user_model import User
from app.services.auth_service import hash_password, verify_password


def create_user(db: Session, username: str, password: str):
    hashed_password = hash_password(password)

    user = User(
        username=username,
        hashed_password=hashed_password
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def authenticate_user(db: Session, username: str, password: str):
    user = db.query(User).filter(User.username == username).first()

    if not user:
        return None

    if not verify_password(password, user.hashed_password):
        return None

    return user