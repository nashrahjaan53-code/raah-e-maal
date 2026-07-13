from sqlalchemy import Column, Integer, Float, ForeignKey
from app.database.database import Base

class FinancialProfile(Base):
    __tablename__ = "financial_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, index=True)
    income = Column(Float)
    expenses = Column(Float)
    savings = Column(Float)
    credit_score = Column(Integer)