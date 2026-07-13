from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import authorize_user_access, get_current_payload
from app.database.database import get_db
from app.models import loan_model, financial_profile

router = APIRouter(
    prefix="/loan-summary",
    tags=["Loan Summary"]
)

@router.get("/")
def loan_summary(
    user_id: int,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_payload),
):
    authorize_user_access(user_id, payload)
    loans = db.query(loan_model.Loan).filter(loan_model.Loan.user_id == user_id).all()
    profile = db.query(financial_profile.FinancialProfile).filter(
        financial_profile.FinancialProfile.user_id == user_id
    ).first()

    if not loans:
        raise HTTPException(status_code=404, detail="No loans found for this user")
    if not profile:
        raise HTTPException(status_code=404, detail="Financial profile not found")

    total_loans = len(loans)
    total_emi = sum([loan.emi for loan in loans])
    emi_income_ratio = round((total_emi / profile.income) * 100, 2)

    return {
        "total_loans": total_loans,
        "total_emi": total_emi,
        "emi_income_ratio": emi_income_ratio
    }
