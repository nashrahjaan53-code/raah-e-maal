from typing import Optional
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

# Request body for creating a loan
class LoanCreate(BaseModel):
    user_id: int
    loan_name: str = Field(min_length=1, max_length=150)
    amount: float = Field(gt=0)
    tenure_months: int = Field(gt=0, le=600)  # Max 50 years
    interest_rate: float = Field(ge=0, le=100)
    # emi can be omitted - it's calculated on the backend


class LoanUpdate(BaseModel):
    loan_name: Optional[str] = Field(default=None, min_length=1, max_length=150)
    amount: Optional[float] = Field(default=None, gt=0)
    emi: Optional[float] = Field(default=None, gt=0)
    interest_rate: Optional[float] = Field(default=None, ge=0, le=100)
    status: Optional[str] = Field(default=None, pattern="^(pending|approved|rejected)$")

# Response body for loan data
class LoanResponse(BaseModel):
    id: int
    user_id: int
    loan_name: str
    amount: float
    emi: float
    interest_rate: float
    tenure_months: Optional[int] = None
    total_payment: Optional[float] = None
    total_interest: Optional[float] = None
    status: str = "pending"
    application_date: Optional[datetime] = None
    approval_date: Optional[datetime] = None
    approved_by: Optional[int] = None
    risk_score: Optional[float] = None

    model_config = ConfigDict(from_attributes=True)


class LoanDecision(BaseModel):
    decision: str