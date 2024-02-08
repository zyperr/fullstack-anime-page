from config.db import collection_anime as collection
from bson import ObjectId
from schema.schemas import serial


def get_title(title:str):
    anime = collection.find_one({"title":title.lower()})
    return anime

def get_one_anime(id:str):
    anime = collection.find_one({"_id":ObjectId(id)})
    anime = serial(anime)
    return anime

def save_anime(anime):
    new_anime =  collection.insert_one(anime)
    created_anime =  collection.find_one({"_id": new_anime.inserted_id})
    return created_anime

async def update_anime(id:str,data):
    anime = {k:v for k,v in data.model_dump().items() if v is not None}
    print(anime)
    await collection.update_one({"_id":ObjectId(id)},{"$set":anime})
    document = await collection.find_one({"_id":ObjectId(id)})
    return document

async def delete_anime(id:str):
    await collection.delete_one({"_id":ObjectId(id)})
    return True
