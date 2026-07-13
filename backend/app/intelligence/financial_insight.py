# backend/app/intelligence/financial_insight.py

import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))

from app.intelligence.financial_forecast import (
    build_user_profile,
    loan_status,
    calculate_emi
)
from app.intelligence.debt_to_income_ratio import calculate_dti, dti_risk_level
from app.intelligence.risk_model import calculate_risk_score
from app.intelligence.loan_optimizer import check_eligibility
from app.intelligence.scenarios_generator import generate_scenarios


def generate_financial_insights(raw_data):

    # -----------------------------------
    # 1. Build user profile
    # -----------------------------------
    user = build_user_profile(raw_data)

    income = user["income"]
    loans = user["loans"]

    total_emi = 0
    total_loan = 0
    loan_details = []

    # -----------------------------------
    # 2. Process Loans
    # -----------------------------------
    for loan in loans:

        emi = calculate_emi(
            loan["balance"],
            loan["interest_rate"],
            loan["tenure"]
        )

        total_emi += emi
        total_loan += loan["balance"]

        status = loan_status(
            loan["balance"],
            loan["interest_rate"],
            loan["tenure"],
            loan.get("emis_paid", 0)
        )

        loan_details.append({
            "loan_id": loan["loan_id"],
            "emi": emi,
            "status": status
        })

    # -----------------------------------
    # 3. DTI
    # -----------------------------------
    dti = calculate_dti(income, total_emi)
    dti_category = dti_risk_level(dti)

    # -----------------------------------
    # 4. Risk
    # -----------------------------------
    risk = calculate_risk_score(
        user["credit_score"],
        income,
        total_loan,
        len(loans)
    )

    # -----------------------------------
    # 5. Eligibility
    # -----------------------------------
    eligibility = check_eligibility(user, total_loan)

    # -----------------------------------
    # 6. Scenarios
    # -----------------------------------
    scenarios_data = generate_scenarios(loans, income)
    strategies = scenarios_data["recommended_strategies"]

    # ensure minimum 3 strategies
    if len(strategies) < 3:
        strategies = (strategies * 3)[:3]

    # -----------------------------------
    # 7. Insights
    # -----------------------------------
    insights = []

    if dti > 50:
        insights.append("High EMI burden. Reduce liabilities.")
    elif dti > 30:
        insights.append("Moderate EMI burden. Manage carefully.")
    else:
        insights.append("Healthy financial condition.")

    if risk > 70:
        insights.append("High risk. Avoid new loans.")
    else:
        insights.append("Risk level acceptable.")

    if not eligibility["eligible"]:
        insights.append("Not eligible for additional loans.")
    else:
        insights.append("Eligible for additional loans.")

    # -----------------------------------
    # FINAL OUTPUT
    # -----------------------------------
    return {
        "profile": user,
        "total_emi": round(total_emi, 2),
        "total_loan": total_loan,
        "dti": dti,
        "risk_score": risk,
        "loan_details": loan_details,
        "strategies": strategies,
        "insights": insights
    }


# -----------------------------------
# TEST
# -----------------------------------
if __name__ == "__main__":

    data = {
        "income": 50000,
        "expenses": 20000,
        "savings": 10000,
        "credit_score": 720,
        "employment_years": 2,
        "loans": [
            {"loan_id": 1, "balance": 10000, "interest_rate": 12, "tenure": 12},
            {"loan_id": 2, "balance": 5000, "interest_rate": 8, "tenure": 10},
        ]
    }

    print(generate_financial_insights(data))