# Intelligence Layer – LoanPilot

## Overview

The Intelligence Layer processes user financial data and generates:

* EMI & loan tracking
* DTI (Debt-to-Income)
* Risk score
* Loan eligibility
* Repayment strategies
* Financial insights

---

## 🏗️ Architecture

```
User Data
   ↓
financial_forecast.py (core data + calculations)
   ↓
other modules (DTI, Risk, Eligibility, Strategies)
   ↓
financial_insight.py (final output)
```

---

## Files

* `financial_forecast.py` → central data + EMI + loan status
* `debt_to_income_ratio.py` → DTI calculation
* `risk_model.py` → risk scoring
* `loan_optimizer.py` → eligibility check
* `scenarios_generator.py` → repayment strategies
* `repayment_intelligence.py` → advanced analysis
* `financial_insight.py` → combines everything

---

## Flow

1. User data → `build_user_profile()`
2. Loans → EMI + status
3. Calculate DTI + risk
4. Check eligibility
5. Generate strategies
6. Return final insights

---

## Output Example

```
{
  "total_emi": 4500,
  "dti": 9.0,
  "risk_score": 42,
  "strategies": [...],
  "insights": [...]
}
```

---

## Run

```
cd backend
python -m app.intelligence.financial_insight
```

---

## Summary

This layer is the **financial brain** of the system, converting user data into insights and decisions.
