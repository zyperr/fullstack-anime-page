from fastapi import APIRouter,HTTPException,Depends
from typing import Annotated
from models.pagation import PaginationModel,pagination_params
from config.db import collection_mangas as collection
from schema.schemas import list_serial

from models.anime import Anime


mangasRouter = APIRouter()

@mangasRouter.get("/api/mangas",tags=["mangas"])
async def get_mangas(pagination:Annotated[PaginationModel,Depends(pagination_params)]):
    return list_serial(collection.find({}).limit(pagination.perPage).skip((pagination.page-1)*pagination.perPage))


@mangasRouter.post("/api/mangas",tags=["mangas"],response_model=Anime)
async def create_mangas(mangas:Anime):
    mangas_found = collection.find_one({"title":mangas.title})
    if mangas_found:
        raise HTTPException(status_code=409,detail="mangas already exists")
    response = collection.insert_one(mangas.model_dump())
    if response.inserted_id:
        new_mangas = collection.find_one({"_id":response.inserted_id})
        return new_mangas
    raise HTTPException(status_code=400,detail="Error creating mangas")