from config.db import collection_mangas as collection
from fastapi import HTTPException
from bson import ObjectId
from schema.schemas import serial



def get_one_manga(id:str):
    manga = collection.find_one({"_id":ObjectId(id)})
    manga = serial(manga)
    return manga