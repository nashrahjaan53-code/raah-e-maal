from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.api.dependencies import authorize_user_access, get_current_payload
from app.database.database import get_db
from app.intelligence.scenarios_generator import generate_scenarios
from app.models import financial_profile, loan_model, recommendation_model
from app.schemas.recommendation_schema import RecommendationCreate, RecommendationUpdate, RecommendationResponse
from app.services.recommendation_service import (
    create_recommendation,
    get_recommendation_by_id,
    get_recommendations_by_user,
    update_recommendation,
    delete_recommendation,
)


class RecommendationRequest(BaseModel):
    user_id: int


router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"],
)


# CRUD Endpoints

@router.get("/", response_model=list[RecommendationResponse])
def list_recommendations(
    db: Session = Depends(get_db),
    current_payload: dict = Depends(get_current_payload),
):
    """Get all recommendations for the current user."""
    user_id = current_payload.get("user_id")
    return get_recommendations_by_user(db, user_id)


@router.post("/", response_model=RecommendationResponse, status_code=201)
def create_new_recommendation(
    rec: RecommendationCreate,
    db: Session = Depends(get_db),
    current_payload: dict = Depends(get_current_payload),
):
    """Create a new recommendation."""
    authorize_user_access(rec.user_id, current_payload)
    return create_recommendation(db, rec.user_id, rec.title, rec.analysis, rec.notes)


@router.get("/{recommendation_id}", response_model=RecommendationResponse)
def read_recommendation(
    recommendation_id: int,
    db: Session = Depends(get_db),
    current_payload: dict = Depends(get_current_payload),
):
    """Get a specific recommendation by ID."""
    recommendation = get_recommendation_by_id(db, recommendation_id)
    if not recommendation:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    authorize_user_access(recommendation.user_id, current_payload)
    return recommendation


@router.put("/{recommendation_id}", response_model=RecommendationResponse)
def update_existing_recommendation(
    recommendation_id: int,
    rec_update: RecommendationUpdate,
    db: Session = Depends(get_db),
    current_payload: dict = Depends(get_current_payload),
):
    """Update a recommendation."""
    recommendation = get_recommendation_by_id(db, recommendation_id)
    if not recommendation:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    authorize_user_access(recommendation.user_id, current_payload)
    update_data = rec_update.dict(exclude_unset=True)
    return update_recommendation(db, recommendation_id, **update_data)


@router.delete("/{recommendation_id}", status_code=204)
def delete_existing_recommendation(
    recommendation_id: int,
    db: Session = Depends(get_db),
    current_payload: dict = Depends(get_current_payload),
):
    """Delete a recommendation."""
    recommendation = get_recommendation_by_id(db, recommendation_id)
    if not recommendation:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    authorize_user_access(recommendation.user_id, current_payload)
    delete_recommendation(db, recommendation_id)


# Specialized Endpoints

@router.post("/request")
def request_recommendations(
    payload: RecommendationRequest,
    db: Session = Depends(get_db),
    current_payload: dict = Depends(get_current_payload),
):
    authorize_user_access(payload.user_id, current_payload)
    profile = (
        db.query(financial_profile.FinancialProfile)
        .filter(financial_profile.FinancialProfile.user_id == payload.user_id)
        .first()
    )
    if not profile:
        raise HTTPException(status_code=404, detail="Financial profile not found")

    loans = (
        db.query(loan_model.Loan)
        .filter(loan_model.Loan.user_id == payload.user_id)
        .all()
    )
    if not loans:
        raise HTTPException(status_code=404, detail="No loans found for this user")

    loan_inputs = [
        {
            "loan_id": loan.id,
            "balance": loan.amount,
            "interest_rate": loan.interest_rate,
            "emi": loan.emi,
        }
        for loan in loans
    ]

    analysis = generate_scenarios(loan_inputs, profile.income)

    return {
        "user_id": payload.user_id,
        "loan_count": len(loans),
        "analysis": analysis,
    }
