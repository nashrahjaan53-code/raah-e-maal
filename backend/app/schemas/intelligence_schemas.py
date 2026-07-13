from pydantic import BaseModel
from typing import List

class Loan(BaseModel):
    loan_id: int
    balance: float
    interest_rate: float
    tenure: int
    emis_paid: int = 0


class IntelligenceRequest(BaseModel):
    income: float
    expenses: float
    savings: float
    credit_score: int
    employment_years: int
    loans: List[Loan]