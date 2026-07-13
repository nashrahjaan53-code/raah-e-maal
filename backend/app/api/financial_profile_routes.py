from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import authorize_user_access, get_current_payload, require_admin
from app.schemas.financial_profile_schema import (
    FinancialProfileCreate,
    FinancialProfileResponse,
    FinancialProfileUpdate,
)
from app.database.database import get_db
from app.models import financial_profile

router = APIRouter(
    prefix="/financial-profile",
    tags=["Financial Profile"]
)

# Create Financial Profile API
@router.post("/", response_model=FinancialProfileResponse, status_code=201)
def create_financial_profile(
    profile: FinancialProfileCreate,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_payload),
):
    authorize_user_access(profile.user_id, payload)
    existing = db.query(financial_profile.FinancialProfile).filter(
        financial_profile.FinancialProfile.user_id == profile.user_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Financial profile already exists")

    new_profile = financial_profile.FinancialProfile(
        user_id=profile.user_id,
        income=profile.income,
        expenses=profile.expenses,
        savings=profile.savings,
        credit_score=profile.credit_score
    )
    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    return new_profile


# Get Financial Profile API
@router.get("/", response_model=FinancialProfileResponse)
def get_financial_profile(
    user_id: int,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_payload),
):
    authorize_user_access(user_id, payload)
    profile = db.query(financial_profile.FinancialProfile).filter(
        financial_profile.FinancialProfile.user_id == user_id
    ).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Financial profile not found")
    return profile


@router.get("/{user_id}", response_model=FinancialProfileResponse)
def get_financial_profile_by_user_id(
    user_id: int,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_payload),
):
    authorize_user_access(user_id, payload)
    profile = db.query(financial_profile.FinancialProfile).filter(
        financial_profile.FinancialProfile.user_id == user_id
    ).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Financial profile not found")
    return profile


@router.get("/admin/all", response_model=list[FinancialProfileResponse])
def get_all_financial_profiles(
    db: Session = Depends(get_db),
    _admin_payload: dict = Depends(require_admin),
):
    return db.query(financial_profile.FinancialProfile).order_by(
        financial_profile.FinancialProfile.id.desc()
    ).all()


@router.patch("/{user_id}", response_model=FinancialProfileResponse)
def update_financial_profile(
    user_id: int,
    payload: FinancialProfileUpdate,
    db: Session = Depends(get_db),
    current_payload: dict = Depends(get_current_payload),
):
    authorize_user_access(user_id, current_payload)
    profile = db.query(financial_profile.FinancialProfile).filter(
        financial_profile.FinancialProfile.user_id == user_id
    ).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Financial profile not found")

    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(profile, key, value)

    db.commit()
    db.refresh(profile)
    return profile


@router.delete("/{user_id}", status_code=200)
def delete_financial_profile(
    user_id: int,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_payload),
):
    authorize_user_access(user_id, payload)
    profile = db.query(financial_profile.FinancialProfile).filter(
        financial_profile.FinancialProfile.user_id == user_id
    ).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Financial profile not found")

    db.delete(profile)
    db.commit()
    return {"message": "Financial profile deleted successfully", "user_id": user_id}