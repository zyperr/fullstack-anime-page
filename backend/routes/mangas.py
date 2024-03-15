from fastapi import APIRouter,HTTPException,Depends
from typing import Annotated
from models.pagation import PaginationModel,pagination_params,get_pagination
from config.db import collection_mangas as collection
from schema.schemas import list_serial
from math import ceil
from models.anime import Anime
from services.db_utils_mangas import get_one_manga


mangasRouter = APIRouter()

@mangasRouter.get("/api/mangas",tags=["mangas"])
async def get_mangas(pagination:Annotated[PaginationModel,Depends(pagination_params)]):
    skip =(pagination.page -1)* pagination.perPage
    limit = pagination.perPage
    count = ceil(collection.count_documents({}) / pagination.perPage)
    mangas = list_serial(collection.find({}).skip(skip).limit(limit))
    return get_pagination(pagination.page,pagination.perPage,pagination.next,pagination.prev,mangas,"api/mangas",count)


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

@mangasRouter.get("/api/mangas/{id}",tags=["mangas"])
async def get_manga(id:str):
    manga = get_one_manga(id)
    if manga:
        return manga
    raise HTTPException(status_code=404,detail=f"manga Not found")