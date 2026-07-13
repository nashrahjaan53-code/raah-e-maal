from pydantic import BaseModel, ConfigDict, Field

# Request body for creating a new user
class UserCreate(BaseModel):
    username: str = Field(min_length=1, max_length=100)
    password: str = Field(min_length=6, max_length=128)

# Request body for login
class UserLogin(BaseModel):
    username: str = Field(min_length=1, max_length=100)
    password: str = Field(min_length=6, max_length=128)


class UserUpdate(BaseModel):
    username: str | None = Field(default=None, min_length=1, max_length=100)
    password: str | None = Field(default=None, min_length=6, max_length=128)

# Response body for user data
class UserResponse(BaseModel):
    id: int
    username: str

    model_config = ConfigDict(from_attributes=True)


class UserMeResponse(BaseModel):
    id: int
    username: str
    role: str


class UserAdminListItem(BaseModel):
    id: int
    username: str
    role: str