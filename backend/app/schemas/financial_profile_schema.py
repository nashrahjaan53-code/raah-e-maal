from pydantic import BaseModel, ConfigDict, Field

# Request body for creating a financial profile
class FinancialProfileCreate(BaseModel):
    user_id: int
    income: float = Field(ge=0)
    expenses: float = Field(ge=0)
    savings: float = Field(ge=0)
    credit_score: int = Field(ge=300, le=900)


class FinancialProfileUpdate(BaseModel):
    income: float | None = Field(default=None, ge=0)
    expenses: float | None = Field(default=None, ge=0)
    savings: float | None = Field(default=None, ge=0)
    credit_score: int | None = Field(default=None, ge=300, le=900)

# Response body for financial profile data
class FinancialProfileResponse(BaseModel):
    id: int
    user_id: int
    income: float
    expenses: float
    savings: float
    credit_score: int

    model_config = ConfigDict(from_attributes=True)