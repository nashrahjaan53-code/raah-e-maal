from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from datetime import datetime
from app.database.database import Base

class Loan(Base):
    __tablename__ = "loans"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    loan_name = Column(String)
    amount = Column(Float)
    emi = Column(Float)
    interest_rate = Column(Float)
    tenure_months = Column(Integer, nullable=True)
    total_payment = Column(Float, nullable=True)
    total_interest = Column(Float, nullable=True)
    status = Column(String, default="pending")
    application_date = Column(DateTime, default=datetime.utcnow, nullable=True)
    approval_date = Column(DateTime, nullable=True)
    approved_by = Column(Integer, nullable=True)
    risk_score = Column(Float, nullable=True)