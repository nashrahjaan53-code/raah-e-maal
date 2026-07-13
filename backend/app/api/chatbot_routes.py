import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, field_validator
from typing import List, Dict, Any

from app.intelligence.loan_optimizer import optimize_loans

router = APIRouter()
logger = logging.getLogger(__name__)


class ChatRequest(BaseModel):
    message: str
    loans: List[Dict[str, Any]]
    extra_payment: float

    @field_validator("extra_payment")
    @classmethod
    def extra_payment_must_be_non_negative(cls, v):
        if v < 0:
            raise ValueError("extra_payment must be non-negative")
        return v

    @field_validator("loans")
    @classmethod
    def loans_must_have_required_fields(cls, v):
        required_fields = {"loan_id", "amount", "interest_rate", "emi", "tenure"}
        for loan in v:
            missing = required_fields - loan.keys()
            if missing:
                raise ValueError(f"Loan is missing required fields: {missing}")
        return v


class ChatResponse(BaseModel):
    response: str
    details: Dict[str, Any]


# ---------------------------------------------------------------------------
# Keyword-based intent detection
# ---------------------------------------------------------------------------

INTENT_KEYWORDS = {
    "which_first": [
        "which loan", "which first", "pay first", "start with",
        "priority", "order", "focus on",
    ],
    "savings": [
        "save", "saving", "savings", "how much", "benefit",
        "difference", "gain",
    ],
    "timeline": [
        "how long", "when", "months", "years", "timeline",
        "faster", "sooner", "debt free", "finish",
    ],
    "explain": [
        "why", "explain", "how does", "what is", "avalanche",
        "strategy", "method", "reason",
    ],
    "extra_payment": [
        "extra", "additional", "more payment", "prepay",
        "overpay", "add more",
    ],
    "schemes": [
        "scheme", "subsidy", "mumkin", "tejaswini", "kisan",
        "kcc", "artisan", "himayat", "government", "govt",
    ],
    "local_banks": [
        "j&k bank", "ellaquai dehati", "edb", "cooperative bank",
        "local bank", "jandk bank", "jk bank",
    ],
    "seasonality": [
        "season", "harvest", "apple", "saffron", "tourism",
        "orchard", "cash flow", "lean",
    ],
    "winter": [
        "winter", "kangri", "cold month", "chillai kalan",
        "highway", "road", "outage", "blockageage",
    ],
}


def _detect_intent(message: str) -> str:
    """Return the best matching intent or 'general' if nothing matches."""
    message_lower = message.lower()
    for intent, keywords in INTENT_KEYWORDS.items():
        if any(kw in message_lower for kw in keywords):
            return intent
    return "general"


# ---------------------------------------------------------------------------
# Response builders per intent
# ---------------------------------------------------------------------------

def _response_which_first(optimal_order: list, loans: list) -> str:
    if not optimal_order:
        return "You have no loans to prioritize."
    first = optimal_order[0]
    first_loan = next((l for l in loans if l["loan_id"] == first), None)
    rest = " → ".join(f"Loan {lid}" for lid in optimal_order[1:])
    reason = (
        f"at {first_loan['interest_rate']}% interest it is costing you the most every month"
        if first_loan else "it has the highest interest rate"
    )
    response = f"Pay Loan {first} first because {reason}."
    if rest:
        response += f" Then move on to {rest}."
    return response


def _response_savings(savings_amount: float, timeline_reduction: int) -> str:
    if savings_amount <= 0:
        return "With the current plan there are no additional savings to be made."
    response = f"By following the recommended order you can save ₹{savings_amount:,.0f} in interest."
    if timeline_reduction > 0:
        response += f" You will also become debt-free {timeline_reduction} month(s) sooner."
    return response


def _response_timeline(timeline_reduction: int, savings_amount: float) -> str:
    if timeline_reduction <= 0:
        return "The optimized plan does not reduce your timeline significantly."
    response = f"You can become debt-free {timeline_reduction} month(s) sooner than your current plan."
    if savings_amount > 0:
        response += f" That also saves you ₹{savings_amount:,.0f} in interest along the way."
    return response


def _response_explain(optimal_order: list) -> str:
    return (
        "The Avalanche method works by targeting the loan with the highest interest rate first. "
        "Interest is the extra money you pay on top of what you borrowed — higher rate means more money lost. "
        f"In your case the recommended order is {' → '.join(f'Loan {lid}' for lid in optimal_order)}. "
        "Once the first loan is paid off, its freed-up EMI rolls into the next one, speeding up repayment."
    )


def _response_extra_payment(extra_payment: float, savings_amount: float) -> str:
    if extra_payment <= 0:
        return (
            "You have not added any extra payment. "
            "Even a small extra monthly amount can significantly reduce your interest and timeline."
        )
    return (
        f"Your extra payment of ₹{extra_payment:,} per month is being applied to the highest interest loan first. "
        f"This is why you are saving ₹{savings_amount:,.0f} compared to a standard repayment plan."
    )


def _response_schemes() -> str:
    return (
        "In Jammu & Kashmir, several specialized government schemes exist: "
        "1. Kisan Credit Card (KCC): Low-interest loans for apple & saffron growers. "
        "2. Mumkin Scheme: 20% subsidy on commercial vehicles for youth. "
        "3. Tejaswini Scheme: Up to ₹5 Lakh startup financing for women entrepreneurs with 10% subsidy. "
        "4. Artisan Credit Scheme: Up to ₹2 Lakh for local carpet weavers, papier-mâché, and pashmina workers at subsidized interest rates. "
        "Select your District and Occupation in the Scheme Recommender tab to find matching schemes!"
    )


def _response_local_banks() -> str:
    return (
        "For J&K residents, primary banks include: "
        "- Jammu & Kashmir Bank (J&K Bank): Offers specialized apple orchard and retail business loans. "
        "- Ellaquai Dehati Bank (EDB): Regional rural bank focus on small-scale farmers and artisans. "
        "- J&K State Cooperative Bank: Highly affordable cooperative loans for self-help groups. "
        "Our dashboard supports direct management of loans from these local institutions!"
    )


def _response_seasonality() -> str:
    return (
        "Kashmir's economy has high seasonal income peaks: Saffron (November), Apple Orchards (Oct-Nov), Tourism (May-Aug & Dec-Jan). "
        "We recommend using our Seasonal Income Planner to structure flexible repayments (e.g. paying more during harvests, deferring/reducing payments during lean winter months) to prevent defaults."
    )


def _response_winter() -> str:
    return (
        "During winter (especially Chillai Kalan, Dec 21 to Jan 29), economic activity slows and highway blockages occur. "
        "Artisans and orchardists should maintain a Winter Reserve fund equivalent to 4 months of expenses and EMIs. "
        "Use the Winter Financial Preparedness Planner widget to estimate your specific winter buffer target."
    )


def _response_general(optimal_order: list, savings_amount: float, timeline_reduction: int) -> str:
    if not optimal_order:
        return "No loans provided. Please add your loan details to get optimization advice."
    order_str = " → ".join(f"Loan {lid}" for lid in optimal_order)
    response = f"Based on your loans, the recommended payoff order is: {order_str}."
    if savings_amount > 0:
        response += f" This could save you ₹{savings_amount:,.0f} in interest"
    if timeline_reduction > 0:
        response += f" and reduce your repayment by {timeline_reduction} month(s)."
    return response


# ---------------------------------------------------------------------------
# Intent router
# ---------------------------------------------------------------------------

def _build_response_message(
    message: str,
    loans: list,
    extra_payment: float,
    optimal_order: list,
    savings_amount: float,
    timeline_reduction: int,
) -> str:
    intent = _detect_intent(message)

    if intent == "which_first":
        return _response_which_first(optimal_order, loans)
    elif intent == "savings":
        return _response_savings(savings_amount, timeline_reduction)
    elif intent == "timeline":
        return _response_timeline(timeline_reduction, savings_amount)
    elif intent == "explain":
        return _response_explain(optimal_order)
    elif intent == "extra_payment":
        return _response_extra_payment(extra_payment, savings_amount)
    elif intent == "schemes":
        return _response_schemes()
    elif intent == "local_banks":
        return _response_local_banks()
    elif intent == "seasonality":
        return _response_seasonality()
    elif intent == "winter":
        return _response_winter()
    else:
        return _response_general(optimal_order, savings_amount, timeline_reduction)


# ---------------------------------------------------------------------------
# Route
# ---------------------------------------------------------------------------

@router.post("/chat", response_model=ChatResponse)
async def chat_with_chatbot(request: ChatRequest):
    """
    Rule-based chatbot endpoint for loan optimization advice.
    Detects intent from user message and returns a matching response.
    """
    try:
        optimization_result = optimize_loans(request.loans, request.extra_payment)

        optimal_order = optimization_result.get("optimal_order", [])
        savings_amount = optimization_result.get("savings_amount", 0.0)
        timeline_reduction = optimization_result.get("timeline_reduction", 0)

        response_message = _build_response_message(
            message=request.message,
            loans=request.loans,
            extra_payment=request.extra_payment,
            optimal_order=optimal_order,
            savings_amount=savings_amount,
            timeline_reduction=timeline_reduction,
        )

        return ChatResponse(
            response=response_message,
            details={
                "optimal_order": optimal_order,
                "savings_amount": round(savings_amount, 2),
                "timeline_reduction": timeline_reduction,
                "intent_detected": _detect_intent(request.message),
            },
        )

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.exception("Unexpected error in POST /chat")
        raise HTTPException(status_code=500, detail="Internal server error")