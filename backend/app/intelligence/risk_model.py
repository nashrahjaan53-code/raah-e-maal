# backend/app/intelligence/risk_model.py


def credit_risk_factor(credit_score):

    if credit_score >= 750:
        return 0.2
    elif credit_score >= 700:
        return 0.4
    elif credit_score >= 650:
        return 0.6
    else:
        return 1.0


def calculate_risk_score(
    credit_score,
    monthly_income,
    loan_amount,
    existing_loans,
):

    credit_risk = credit_risk_factor(credit_score)

    income_ratio = loan_amount / monthly_income

    loan_burden = existing_loans * 0.1

    risk_score = (
        (credit_risk * 0.5)
        + (income_ratio * 0.3)
        + (loan_burden * 0.2)
    )

    return min(round(risk_score * 100, 2), 100)