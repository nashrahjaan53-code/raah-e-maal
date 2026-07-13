# backend/app/intelligence/repayment_intelligence.py

import sys
import os

# ✅ Fix import path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../")))

import random
from app.intelligence.financial_forecast import calculate_emi


# -------------------------------------------------
# EMI BURDEN ANALYSIS
# -------------------------------------------------

def analyze_emi_burden(total_emi, monthly_income):

    if monthly_income <= 0:
        raise ValueError("Monthly income must be greater than zero")

    burden_percentage = (total_emi / monthly_income) * 100

    if burden_percentage < 30:
        category = "Low"
        insight = "Your EMI burden is manageable."
    elif burden_percentage < 50:
        category = "Medium"
        insight = "Your EMI burden is moderate. Monitor your debt carefully."
    else:
        category = "High"
        insight = "Your EMI burden is high. Consider restructuring your loans."

    return {
        "burden_percentage": round(burden_percentage, 2),
        "category": category,
        "insight": insight
    }


# -------------------------------------------------
# REPAYMENT STRATEGIES
# -------------------------------------------------

def snowball_strategy(loans):
    return sorted(loans, key=lambda x: x["balance"])


def avalanche_strategy(loans):
    return sorted(loans, key=lambda x: x["interest_rate"], reverse=True)


def strategic_skip(loans):
    smallest = min(loans, key=lambda x: x["balance"])

    return {
        "strategy": "Strategic Skip",
        "description": f"Focus on clearing loan {smallest['loan_id']} first by reallocating EMIs."
    }


def refinance_strategy(loans):
    return {
        "strategy": "Refinance Strategy",
        "description": "Combine all loans into one lower-interest loan."
    }


def high_burden_fast_payoff(loans):
    highest_interest = max(loans, key=lambda x: x["interest_rate"])

    return {
        "strategy": "High Burden Fast Payoff",
        "description": f"Aggressively pay loan {highest_interest['loan_id']} to reduce interest quickly."
    }


def low_burden_long_term(loans):
    return {
        "strategy": "Low Burden Long Term",
        "description": "Extend tenure to reduce EMI pressure."
    }


# -------------------------------------------------
# SCENARIO GENERATOR
# -------------------------------------------------

def generate_scenarios(loans, monthly_income):

    # ✅ Ensure tenure exists (fallback default = 12 months)
    total_emi = sum(
        calculate_emi(
            l["balance"],
            l["interest_rate"],
            l.get("tenure", 12)   # ✅ FIX HERE
        )
        for l in loans
    )

    burden = analyze_emi_burden(total_emi, monthly_income)

    strategies = [
        {
            "strategy": "Snowball Method",
            "loans_order": snowball_strategy(loans),
            "description": "Pay smallest loans first."
        },
        {
            "strategy": "Avalanche Method",
            "loans_order": avalanche_strategy(loans),
            "description": "Pay highest interest loans first."
        },
        refinance_strategy(loans),
        high_burden_fast_payoff(loans),
        low_burden_long_term(loans),
        strategic_skip(loans),
    ]

    # -----------------------------------------
    # Situation-based filtering
    # -----------------------------------------
    if burden["category"] == "High":
        filtered = [
            s for s in strategies
            if "Burden" in s["strategy"]
            or "Refinance" in s["strategy"]
            or "Skip" in s["strategy"]
        ]
    elif burden["category"] == "Medium":
        filtered = strategies
    else:
        filtered = [
            s for s in strategies
            if "Snowball" in s["strategy"]
            or "Low" in s["strategy"]
        ]

    # Pick 3 best strategies safely
    recommendations = random.sample(filtered, min(3, len(filtered)))

    return {
        "emi_burden": burden,
        "recommended_strategies": recommendations
    }


# -------------------------------------------------
# Example Run (FIXED)
# -------------------------------------------------

if __name__ == "__main__":

    loans = [
        {"loan_id": 1, "balance": 10000, "interest_rate": 12, "tenure": 12},
        {"loan_id": 2, "balance": 5000, "interest_rate": 8, "tenure": 10},
        {"loan_id": 3, "balance": 20000, "interest_rate": 15, "tenure": 24}
    ]

    monthly_income = 50000

    result = generate_scenarios(loans, monthly_income)

    print(result)