from typing import Any

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.connection.config import settings
from app.database.database import get_db
from app.models import user_model
from app.services.auth_service import decode_access_token


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/users/login")


def _admin_usernames() -> set[str]:
    return {
        item.strip().lower()
        for item in settings.ADMIN_USERNAMES.split(",")
        if item.strip()
    }


def get_current_payload(token: str = Depends(oauth2_scheme)) -> dict[str, Any]:
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
    return payload


def get_current_user(
    payload: dict[str, Any] = Depends(get_current_payload),
    db: Session = Depends(get_db),
):
    user_id = payload.get("user_id")
    username = payload.get("sub")
    if not user_id or not username:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    db_user = db.query(user_model.User).filter(user_model.User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="User not found")

    return db_user


def require_admin(payload: dict[str, Any] = Depends(get_current_payload)):
    username = (payload.get("sub") or "").strip().lower()
    role = (payload.get("role") or "").strip().lower()

    if role == "admin" or username in _admin_usernames():
        return payload

    raise HTTPException(status_code=403, detail="Admin access required")


def authorize_user_access(target_user_id: int, payload: dict[str, Any]):
    request_user_id = payload.get("user_id")
    username = (payload.get("sub") or "").strip().lower()
    role = (payload.get("role") or "").strip().lower()

    if role == "admin" or username in _admin_usernames() or request_user_id == target_user_id:
        return

    raise HTTPException(status_code=403, detail="Forbidden: cannot access another user's data")
