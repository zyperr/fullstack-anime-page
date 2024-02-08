from fastapi import APIRouter,HTTPException
from config.db import collection_mw as collection
from schema.schemas import list_serial
from models.anime import Anime,AnimeUpdate
from services.db_utils_mw import delete_mw,update_mw,get_one_mw

manhwasRouter = APIRouter()

@manhwasRouter.get("/api/manhwas",tags=["manhwas"])
async def get_manhwas(limit:int=10,skip:int=0):
    manhwas = list_serial(collection.find().skip(skip).limit(limit))
    return manhwas


@manhwasRouter.post("/api/manhwas",tags=["manhwas"],response_model=Anime)
async def create_manhwas(manhwas:Anime):
    manhwas_found = collection.find_one({"title":manhwas.title})
    if manhwas_found:
        raise HTTPException(status_code=409,detail="Manhwas already exists")
    response = collection.insert_one(manhwas.model_dump())
    if response.inserted_id:
        new_manhwas = collection.find_one({"_id":response.inserted_id})
        return new_manhwas
    raise HTTPException(status_code=400,detail="Error creating Manhwas")

@manhwasRouter.delete("/api/manhwas/{id}",tags=["manhwas"])
async def create_manhwas(id:str):
    response = await delete_mw(id)
    if response:
        return "Manhwa deleted successfully"
    raise HTTPException(status_code=404,detail=f"Manhwa Not found")

@manhwasRouter.put("/api/manhwas/{id}",tags=["manhwas"],response_model=AnimeUpdate)
async def update_manhwas(id:str,manhwas:Anime):
    response = await update_mw(id,manhwas)
    if response:
        return response
    raise HTTPException(status_code=400,detail="Error updating Manhwas")

@manhwasRouter.get("/api/manhwas/{id}",tags=["manhwas"])
async def get_manhwas(id:str):
    manhwas = get_one_mw(id)
    if manhwas:
        return manhwas
    raise HTTPException(status_code=404,detail=f"Manhwas Not found")