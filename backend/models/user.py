from typing import Optional,List
from pydantic import BaseModel, Field


class User(BaseModel):
    username: str
    email: str
    password: str
    favorites: Optional[List[str]] = None
    role: str = Field(default="user")
    darkmode: Optional[bool] = Field(default=False)