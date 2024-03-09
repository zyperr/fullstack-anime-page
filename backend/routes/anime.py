from fastapi import APIRouter,HTTPException,Depends
from models.anime import Anime,AnimeUpdate
from typing import Annotated
from models.pagation import PaginationModel,pagination_params,get_pagination
from services.db_utils_anime import save_anime,get_title,update_anime,delete_anime,get_one_anime
from config.db import collection_anime as collection
from schema.schemas import list_serial
animeRouter = APIRouter()
 
@animeRouter.get("/api/animes",tags=["animes"])
async def get_animes(pagination:Annotated[PaginationModel,Depends(pagination_params)]):
    animes =  list_serial(collection.find({}).limit(pagination.perPage).skip((pagination.page-1)*pagination.perPage))
    return get_pagination(pagination.page,pagination.perPage,pagination.next,pagination.prev,animes,"api/animes")


    
@animeRouter.post("/api/animes",tags=["animes"],response_model=Anime)
def create_anime(anime:Anime):
    
    anime_found =  get_title(anime.title)
    if anime_found:
        raise HTTPException(status_code=409,detail="Anime already exists")
    anime.title = anime.title.lower()
    response =  save_anime(anime.model_dump())
    if response:
        print(response)
        return response
    raise HTTPException(status_code=400,detail="Error creating Anime")


@animeRouter.get("/api/animes/{id}",tags=["animes"])
async def get_anime(id:str):
    anime = get_one_anime(id)
    if anime:
        return anime
    raise HTTPException(status_code=404,detail=f"Anime Not found")

@animeRouter.put("/api/animes/{id}",tags=["animes"],response_model=AnimeUpdate)
async def put_anime(id:str,anime:AnimeUpdate):
    response =  await update_anime(id,anime)
    if response:
        return response
    raise HTTPException(status_code=400,detail="Error updating Anime")

@animeRouter.delete("/api/animes/{id}",tags=["animes"])
async def delete_anime(id:str):
    response = await delete_anime(id)
    if response:
        return "Anime deleted"
    raise HTTPException(status_code=404,detail=f"Anime Not found")

