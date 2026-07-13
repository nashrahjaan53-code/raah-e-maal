# backend/app/intelligence/debt_to_income.py

"""
Debt-to-Income (DTI) Calculator

DTI measures how much of a person's income goes toward paying debt.

Formula:
DTI = (Total Monthly EMI / Monthly Income) * 100
"""


def calculate_dti(monthly_income: float, total_emi: float):
    """
    Calculate Debt-to-Income ratio.

    Args:
        monthly_income (float): User's monthly income
        total_emi (float): Total monthly EMI payments

    Returns:
        float: DTI percentage
    """

    if monthly_income <= 0:
        raise ValueError("Monthly income must be greater than zero")

    dti = (total_emi / monthly_income) * 100

    return round(dti, 2)


def dti_risk_level(dti: float):
    """
    Determine risk level based on DTI ratio.
    """

    if dti < 30:
        return "Low Risk"
    elif dti < 40:
        return "Moderate Risk"
    elif dti < 50:
        return "High Risk"
    else:
        return "Very High Risk"


def debt_to_income_analysis(monthly_income: float, total_emi: float):
    """
    Full DTI analysis.
    """

    dti_ratio = calculate_dti(monthly_income, total_emi)

    risk_level = dti_risk_level(dti_ratio)

    return {
        "monthly_income": monthly_income,
        "total_emi": total_emi,
        "dti_ratio": dti_ratio,
        "risk_level": risk_level
    }
