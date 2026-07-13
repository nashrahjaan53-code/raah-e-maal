from fastapi import APIRouter, HTTPException
from app.schemas.intelligence_schemas import IntelligenceRequest
from app.schemas.intelligence_response import IntelligenceResponse
from app.intelligence.financial_insight import generate_financial_insights

# ✅ THIS IS REQUIRED (YOUR ERROR IS HERE)
router = APIRouter(tags=["Intelligence"])


@router.get("/health")
def health():
    return {"status": "Intelligence API running"}


@router.post("/analyze", response_model=IntelligenceResponse)
def analyze(data: IntelligenceRequest):
    try:
        result = generate_financial_insights(data.dict())

        return {
            "total_emi": result.get("total_emi", 0),
            "total_loan": result.get("total_loan", 0),
            "dti": result.get("dti", 0),
            "risk_score": result.get("risk_score", 0),
            "strategies": result.get("strategies", []),
            "insights": result.get("insights", []),
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))