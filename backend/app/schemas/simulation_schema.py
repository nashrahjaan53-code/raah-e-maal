from typing import Any, Optional

from pydantic import BaseModel, ConfigDict, Field


class SimulationCreate(BaseModel):
    user_id: int
    name: str = Field(min_length=1, max_length=150)
    parameters: dict[str, Any]
    result: dict[str, Any]


class SimulationUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=1, max_length=150)
    parameters: Optional[dict[str, Any]] = None
    result: Optional[dict[str, Any]] = None


class SimulationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    user_id: int
    name: str
    parameters: dict[str, Any]
    result: dict[str, Any]
    created_at: str
    updated_at: str
