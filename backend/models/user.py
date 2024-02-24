from typing import Optional,List
from pydantic import BaseModel, Field


class User(BaseModel):
    username: str
    email: str
    password: str
    favorites: Optional[List[str]] = []
    role: str = Field(default="user")
    darkmode: Optional[bool] = Field(default=False)
    
class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    favorites: Optional[List[str]] = None
    role: Optional[str] = None
    darkmode: Optional[bool] = None
    
class UpdatePassword(BaseModel):
    old_password: str
    new_password: str
    confirm_new_password:str