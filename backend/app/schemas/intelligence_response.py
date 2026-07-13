from pydantic import BaseModel
from typing import List, Dict, Any


class IntelligenceResponse(BaseModel):
    total_emi: float
    total_loan: float
    dti: float
    risk_score: float
    strategies: List[Dict[str, Any]]
    insights: List[str]