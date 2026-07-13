from sqlalchemy.orm import Session
from datetime import datetime

from app.models.loan_model import Loan
from app.models.financial_profile import FinancialProfile
from app.intelligence.risk_model import calculate_risk_score
from app.intelligence.financial_forecast import loan_summary


def apply_for_loan(user_id: int, loan_data: dict, db: Session):
    """
    Apply for a new loan with risk assessment and EMI calculation.
    
    Args:
        user_id: User ID applying for the loan
        loan_data: Dict with keys: amount, interest_rate, tenure_months
        db: Database session
        
    Returns:
        Dict with loan details or error message
    """
    
    # Get user's financial profile for risk assessment
    profile = db.query(FinancialProfile).filter(FinancialProfile.user_id == user_id).first()
    
    if not profile:
        return {"error": "Financial profile not found. Please create a profile first."}
    
    # Calculate EMI first to use for risk assessment
    loan_calc = loan_summary(
        principal=loan_data.get("amount"),
        annual_interest=loan_data.get("interest_rate"),
        tenure_months=loan_data.get("tenure_months")
    )
    emi = loan_calc["emi_amount"]
    
    # Get count of existing loans for user
    existing_loans = db.query(Loan).filter(Loan.user_id == user_id).count()
    
    # Calculate risk score with proper parameters
    # For risk assessment, use monthly EMI payment vs monthly income
    monthly_income = profile.income / 12
    risk_score = calculate_risk_score(
        credit_score=profile.credit_score,
        monthly_income=monthly_income,
        loan_amount=emi,  # Use EMI as the "loan amount" for ratio calculation
        existing_loans=existing_loans
    )

    if risk_score > 70:
        return {"error": "Loan application rejected due to high risk score."}

    new_loan = Loan(
        user_id=user_id,
        loan_name=loan_data.get("loan_name", "Personal Loan"),
        amount=loan_data.get("amount"),
        interest_rate=loan_data.get("interest_rate"),
        tenure_months=loan_data.get("tenure_months"),
        emi=loan_calc["emi_amount"],
        total_payment=loan_calc["total_payment"],
        total_interest=loan_calc["total_interest"],
        status="pending",
        application_date=datetime.utcnow(),
        risk_score=risk_score
    )

    db.add(new_loan)
    db.commit()
    db.refresh(new_loan)

    return {
        "loan_id": new_loan.id,
        "emi": loan_calc["emi_amount"],
        "total_payment": loan_calc["total_payment"],
        "total_interest": loan_calc["total_interest"],
        "risk_score": risk_score
    }


def get_loan_status(loan_id: int, db: Session):

    loan = db.query(Loan).filter(Loan.id == loan_id).first()

    if not loan:
        return {"error": "Loan not found"}

    return {
        "loan_id": loan.id,
        "status": loan.status,
        "amount": loan.amount,
        "emi": loan.emi,
        "application_date": loan.application_date
    }


def approve_loan(loan_id: int, admin_id: int, db: Session):

    loan = db.query(Loan).filter(Loan.id == loan_id).first()

    if not loan:
        return {"error": "Loan not found"}

    loan.status = "approved"
    loan.approval_date = datetime.utcnow()
    loan.approved_by = admin_id

    db.commit()
    db.refresh(loan)

    return {"message": "Loan approved", "loan_id": loan.id}


def get_all_loans(skip: int, limit: int, db: Session):

    loans = db.query(Loan).offset(skip).limit(limit).all()

    return loans