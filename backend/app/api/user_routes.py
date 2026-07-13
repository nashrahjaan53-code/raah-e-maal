from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.connection.config import settings
from app.api.dependencies import authorize_user_access, get_current_payload, get_current_user, require_admin
from app.schemas.user_schema import (
    UserAdminListItem,
    UserCreate,
    UserLogin,
    UserMeResponse,
    UserResponse,
    UserUpdate,
)
from app.database.database import get_db
from app.models import financial_profile, loan_model, user_model
from app.services.auth_service import create_access_token, decode_access_token, hash_password, verify_password

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


def _admin_usernames() -> set[str]:
    return {
        item.strip().lower()
        for item in settings.ADMIN_USERNAMES.split(",")
        if item.strip()
    }

# Register
@router.post("/register", response_model=UserResponse, status_code=201)
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(user_model.User).filter(user_model.User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    new_user = user_model.User(
        username=user.username,
        hashed_password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

# Login
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(user_model.User).filter(user_model.User.username == user.username).first()
    if not db_user or not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    role = db_user.role  # Use role from database
    access_token = create_access_token({"sub": db_user.username, "user_id": db_user.id, "role": role})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": db_user.id,
        "username": db_user.username,
        "role": role,
    }


@router.get("/verify-token")
def verify_token(payload: dict = Depends(get_current_payload)):

    return {
        "valid": True,
        "user_id": payload.get("user_id"),
        "username": payload.get("sub"),
        "role": payload.get("role", "user"),
    }


@router.get("/me", response_model=UserMeResponse)
def get_me(current_user: user_model.User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "role": current_user.role,
    }


@router.get("/admin/all-users", response_model=list[UserAdminListItem])
def get_all_users(
    db: Session = Depends(get_db),
    _admin_payload: dict = Depends(require_admin),
):
    users = db.query(user_model.User).order_by(user_model.User.id.desc()).all()
    return [
        {
            "id": user.id,
            "username": user.username,
            "role": user.role,
        }
        for user in users
    ]


@router.get("/{user_id}", response_model=UserResponse)
def get_user_by_id(
    user_id: int,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_payload),
):
    authorize_user_access(user_id, payload)
    user = db.query(user_model.User).filter(user_model.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.patch("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int,
    payload: UserUpdate,
    db: Session = Depends(get_db),
    current_payload: dict = Depends(get_current_payload),
):
    authorize_user_access(user_id, current_payload)
    user = db.query(user_model.User).filter(user_model.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    updates = payload.model_dump(exclude_unset=True)
    if "username" in updates:
        next_username = updates["username"].strip()
        if not next_username:
            raise HTTPException(status_code=400, detail="Username cannot be empty")
        conflict = (
            db.query(user_model.User)
            .filter(user_model.User.username == next_username, user_model.User.id != user_id)
            .first()
        )
        if conflict:
            raise HTTPException(status_code=400, detail="Username already exists")
        user.username = next_username

    if "password" in updates:
        if not updates["password"]:
            raise HTTPException(status_code=400, detail="Password cannot be empty")
        user.hashed_password = hash_password(updates["password"])

    db.commit()
    db.refresh(user)
    return user


@router.delete("/{user_id}", status_code=200)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_payload),
):
    authorize_user_access(user_id, payload)
    user = db.query(user_model.User).filter(user_model.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.query(loan_model.Loan).filter(loan_model.Loan.user_id == user_id).delete()
    db.query(financial_profile.FinancialProfile).filter(
        financial_profile.FinancialProfile.user_id == user_id
    ).delete()
    db.delete(user)
    db.commit()

    return {"message": "User deleted successfully", "user_id": user_id}
