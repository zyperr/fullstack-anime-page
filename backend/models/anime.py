from typing import Optional,List,Union
from pydantic import BaseModel, Field

class Anime(BaseModel):
    title: str
    status: Optional[str] = Field(default="finished airing | currently airing")
    media_type: str
    num_episodes: int = Field(ge=0, default=0)
    genres: List[str]
    synopsis: str
    img_url: str
    alternative_titles_synonyms: Optional[List[str]] = None



class AnimeUpdate(BaseModel):
    title: str = Field(None, title="Title of the anime")
    status: str = Field(None, title="Status of the anime")
    media_type: str = Field(None, title="Type of media")
    num_episodes: int = Field(None, title="Number of episodes")
    genres: List[str] = Field(None, title="List of genres")
    synopsis: str = Field(None, title="Synopsis of the anime")
    img_url: str = Field(None, title="URL of the image")
    alternative_titles_synonyms: List[str] = Field(None, title="List of alternative titles/synonyms")
    


    