from typing import Optional,List
from pydantic import BaseModel, Field

class Anime(BaseModel):
    title: str
    status: Optional[str] = Field(default="Oct 4, 2015 to Mar 27, 2016")
    media_type: str
    num_episodes: int = Field(ge=0, default=0)
    genres: List[str]
    synopsis: str
    img_url: str
    alternative_titles_synonyms: Optional[List[str]] = None



class AnimeUpdate(BaseModel):
    title: Optional[str] = None
    status: Optional[str] = None
    media_type: Optional[str] = None
    num_episodes: Optional[int] = None
    genres: Optional[List[str]] = None
    synopsis: Optional[str] = None
    img_url: Optional[str] = None
    alternative_titles_synonyms: Optional[List[str]] = None
    


    