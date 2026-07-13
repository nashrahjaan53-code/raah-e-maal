# backend/app/intelligence/financial_forecast.py

import math


# ----------------------------------------
# EMI CALCULATION
# ----------------------------------------

def calculate_emi(principal: float, annual_interest: float, tenure_months: int):
    """
    Calculate monthly EMI
    """

    monthly_rate = annual_interest / (12 * 100)

    # ✅ Handle zero interest case
    if monthly_rate == 0:
        return round(principal / tenure_months, 2)

    emi = (
        principal
        * monthly_rate
        * (1 + monthly_rate) ** tenure_months
        / ((1 + monthly_rate) ** tenure_months - 1)
    )

    return round(emi, 2)


# ----------------------------------------
# LOAN SUMMARY
# ----------------------------------------

def loan_summary(principal: float, annual_interest: float, tenure_months: int):

    emi = calculate_emi(principal, annual_interest, tenure_months)

    total_payment = emi * tenure_months
    total_interest = total_payment - principal

    return {
        "emi_amount": emi,
        "total_emi": tenure_months,
        "total_loan_amount": principal,
        "total_interest": round(total_interest, 2),
        "total_payment": round(total_payment, 2)
    }


# ----------------------------------------
# LOAN STATUS TRACKING
# ----------------------------------------

def loan_status(principal, annual_interest, tenure_months, emis_paid):
    """
    Track loan progress
    """

    emi = calculate_emi(principal, annual_interest, tenure_months)
    monthly_rate = annual_interest / (12 * 100)

    remaining_principal = principal
    total_principal_paid = 0
    total_interest_paid = 0

    for _ in range(emis_paid):

        interest = remaining_principal * monthly_rate
        principal_component = emi - interest

        remaining_principal -= principal_component

        total_principal_paid += principal_component
        total_interest_paid += interest

    # ✅ Prevent negative balance
    remaining_principal = max(remaining_principal, 0)

    total_paid = emi * emis_paid

    return {
        "emi_amount": round(emi, 2),
        "total_emi": tenure_months,
        "total_emi_paid": emis_paid,
        "total_loan_amount": principal,
        "loan_paid": round(total_principal_paid, 2),
        "interest_paid": round(total_interest_paid, 2),
        "total_paid": round(total_paid, 2),
        "loan_amount_remaining": round(remaining_principal, 2),
    }


# ----------------------------------------
# USER FINANCIAL PROFILE (MAIN DATA SOURCE)
# ----------------------------------------

def build_user_profile(data):
    """
    Central function to structure all user data
    """

    loans = data.get("loans", [])

    normalized_loans = []
    for loan in loans:
        normalized_loans.append({
            "loan_id": loan.get("loan_id"),
            "balance": loan.get("balance", 0),
            "interest_rate": loan.get("interest_rate", 10),
            "tenure": loan.get("tenure", 12),
            "emis_paid": loan.get("emis_paid", 0)
        })

    return {
        "income": data["income"],
        "expenses": data.get("expenses", 0),
        "savings": data.get("savings", 0),
        "age": data.get("age", 30),
        "credit_score": data.get("credit_score", 700),
        "employment_years": data.get("employment_years", 1),
        "loans": normalized_loans
    }