# backend/app/intelligence/loan_optimizer.py

import math


def calculate_max_loan(monthly_income):
    return monthly_income * 24


def check_eligibility(user_data, requested_amount):
    age = user_data["age"]
    income = user_data["income"]
    credit_score = user_data["credit_score"]
    employment_years = user_data["employment_years"]

    if age < 21:
        return {"eligible": False, "reason": "Age below 21"}

    if credit_score < 650:
        return {"eligible": False, "reason": "Low credit score"}

    if employment_years < 1:
        return {"eligible": False, "reason": "Employment history too short"}

    max_loan = calculate_max_loan(income)
    eligible = requested_amount <= max_loan

    return {
        "eligible": eligible,
        "max_loan": max_loan
    }


# ----------------------------
# Loan Optimization Functions
# ----------------------------

def calculate_total_interest(loan_amount, emi, tenure):
    return emi * tenure - loan_amount


def optimize_loans(loans: list, extra_payment: float = 0):
    """
    Optimize loan repayment using Avalanche method
    """

    if not loans:
        return {
            "optimal_order": [],
            "strategy": "Avalanche (highest interest first)",
            "total_interest_current": 0,
            "total_interest_optimized": 0,
            "savings_amount": 0,
            "timeline_reduction": 0
        }

    # Sort loans by highest interest rate
    sorted_loans = sorted(loans, key=lambda x: x['interest_rate'], reverse=True)
    optimal_order = [loan['loan_id'] for loan in sorted_loans]

    # Current plan interest
    total_interest_current = sum(
        calculate_total_interest(loan['amount'], loan['emi'], loan['tenure'])
        for loan in loans
    )

    # Prepare remaining loans
    remaining_loans = [
        {
            'loan_id': loan['loan_id'],
            'remaining': loan['amount'],
            'interest_rate': loan['interest_rate'],
            'emi': loan['emi']
        }
        for loan in sorted_loans
    ]

    total_interest_optimized = 0.0
    months = 0

    while remaining_loans:
        months += 1
        to_remove = []

        for i, loan in enumerate(remaining_loans):
            monthly_rate = loan['interest_rate'] / 12 / 100
            interest = loan['remaining'] * monthly_rate

            payment = loan['emi']

            if i == 0:
                payment += extra_payment

            total_owed = loan['remaining'] + interest
            if payment > total_owed:
                payment = total_owed

            principal = payment - interest
            loan['remaining'] -= principal

            total_interest_optimized += interest

            if loan['remaining'] <= 0:
                to_remove.append(i)

        for i in reversed(to_remove):
            del remaining_loans[i]

    savings_amount = total_interest_current - total_interest_optimized

    timeline_current = max(loan['tenure'] for loan in loans) if loans else 0
    timeline_reduction = timeline_current - months

    return {
        "optimal_order": optimal_order,
        "strategy": "Avalanche (highest interest first)",
        "total_interest_current": total_interest_current,
        "total_interest_optimized": total_interest_optimized,
        "savings_amount": savings_amount,
        "timeline_reduction": timeline_reduction
    }