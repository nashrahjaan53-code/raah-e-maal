from typing import Any, Optional

from pydantic import BaseModel, ConfigDict, Field


class RecommendationCreate(BaseModel):
    user_id: int
    title: str = Field(min_length=1, max_length=150)
    analysis: dict[str, Any]
    notes: Optional[str] = Field(default=None, max_length=500)


class RecommendationUpdate(BaseModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=150)
    analysis: Optional[dict[str, Any]] = None
    notes: Optional[str] = Field(default=None, max_length=500)


class RecommendationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    user_id: int
    title: str
    analysis: dict[str, Any]
    notes: Optional[str]
    created_at: str
    updated_at: str
