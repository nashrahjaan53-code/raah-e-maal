from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import authorize_user_access, get_current_payload, require_admin
from app.schemas.loan_schema import LoanCreate, LoanDecision, LoanResponse, LoanUpdate
from app.database.database import get_db
from app.models import loan_model
from app.services.loan_service import apply_for_loan
from app.intelligence.financial_forecast import loan_summary

router = APIRouter(
    prefix="/loans",
    tags=["Loans"]
)

# Add Loan API - Uses intelligent application with risk assessment
@router.post("/", response_model=LoanResponse, status_code=201)
def add_loan(
    loan: LoanCreate,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_payload),
):
    authorize_user_access(loan.user_id, payload)
    
    # Use the intelligent loan service that includes risk assessment
    loan_data = {
        "amount": loan.amount,
        "interest_rate": loan.interest_rate,
        "tenure_months": loan.tenure_months,
        "loan_name": loan.loan_name
    }
    result = apply_for_loan(loan.user_id, loan_data, db)
    
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    
    # Fetch and return the created loan
    new_loan = db.query(loan_model.Loan).filter(loan_model.Loan.id == result["loan_id"]).first()
    return new_loan


# Get Loans API
@router.get("/", response_model=list[LoanResponse])
def get_loans(
    user_id: int,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_payload),
):
    authorize_user_access(user_id, payload)
    loans = db.query(loan_model.Loan).filter(loan_model.Loan.user_id == user_id).all()
    if not loans:
        raise HTTPException(status_code=404, detail="No loans found for this user")
    return loans


@router.get("/{loan_id}", response_model=LoanResponse)
def get_loan_by_id(
    loan_id: int,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_payload),
):
    loan = db.query(loan_model.Loan).filter(loan_model.Loan.id == loan_id).first()
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")

    authorize_user_access(loan.user_id, payload)
    return loan


@router.get("/admin/all", response_model=list[LoanResponse])
def get_all_loans(
    db: Session = Depends(get_db),
    _admin_payload: dict = Depends(require_admin),
):
    return db.query(loan_model.Loan).order_by(loan_model.Loan.id.desc()).all()


@router.patch("/admin/{loan_id}/decision", response_model=LoanResponse)
def decide_loan(
    loan_id: int,
    payload: LoanDecision,
    db: Session = Depends(get_db),
    _admin_payload: dict = Depends(require_admin),
):
    try:
        # Validate decision input
        decision = payload.decision.strip().lower()
        if decision not in {"approved", "rejected"}:
            raise HTTPException(status_code=400, detail="Decision must be 'approved' or 'rejected'")

        # Fetch loan with validation
        loan = db.query(loan_model.Loan).filter(loan_model.Loan.id == loan_id).first()
        if not loan:
            raise HTTPException(status_code=404, detail=f"Loan ID {loan_id} not found")
        
        # Validate loan exists and has required fields
        if not loan.user_id:
            raise HTTPException(status_code=400, detail="Loan has invalid user reference")
        
        # Check if loan is already approved/rejected
        if loan.status in {"approved", "rejected"}:
            raise HTTPException(
                status_code=400, 
                detail=f"Loan already {loan.status}. Cannot modify finalized decisions."
            )

        # Update loan with new status and approval info
        from datetime import datetime, timezone
        loan.status = decision
        loan.approved_by = _admin_payload.get("user_id")
        loan.approval_date = datetime.now(timezone.utc)
        
        db.commit()
        db.refresh(loan)
        
        # Log approval action (you can enhance this with actual audit logging)
        print(f"[ADMIN_AUDIT] User {_admin_payload.get('user_id')} {decision} loan {loan_id}")
        
        return loan
    
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error processing loan decision: {str(e)}")


@router.patch("/{loan_id}", response_model=LoanResponse)
def update_loan(
    loan_id: int,
    payload: LoanUpdate,
    db: Session = Depends(get_db),
    current_payload: dict = Depends(get_current_payload),
):
    loan = db.query(loan_model.Loan).filter(loan_model.Loan.id == loan_id).first()
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")

    authorize_user_access(loan.user_id, current_payload)

    update_data = payload.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(loan, key, value)

    db.commit()
    db.refresh(loan)
    return loan


@router.delete("/{loan_id}", status_code=200)
def delete_loan(
    loan_id: int,
    db: Session = Depends(get_db),
    payload: dict = Depends(get_current_payload),
):
    loan = db.query(loan_model.Loan).filter(loan_model.Loan.id == loan_id).first()
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")

    authorize_user_access(loan.user_id, payload)

    db.delete(loan)
    db.commit()
    return {"message": "Loan deleted successfully", "loan_id": loan_id}