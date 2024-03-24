from typing import Optional,List
from pydantic import BaseModel, Field
from enum import Enum
class User(BaseModel):
    username: str
    email: str
    password: str
    favorites: Optional[List[str]] = []
    role: Optional[str] = None
    darkmode: Optional[bool] = Field(default=False)
    avatar: Optional[str] = None
    banner_profile: Optional[str] = None 

class UserUpdate(BaseModel):
    username:  Optional[str] =None
    email:  Optional[str] =None
    role:  Optional[str] =None
    darkmode: Optional[str] =None
    avatar:  Optional[str] =None
    banner_profile:  Optional[str] =None
    
class UpdatePassword(BaseModel):
    old_password: str
    new_password: str
    confirm_new_password:str

class CollectionEnum(Enum):
    animes:str = "animes"
    mangas:str = "mangas"
    manhwas:str = "manhwas"
    


