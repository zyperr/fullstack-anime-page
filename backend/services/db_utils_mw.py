from config.db import collection_mw as collection
from bson import ObjectId
from schema.schemas import list_serial,serial

def get_all_mw():
    return list_serial(collection.find({}))
def get_title(title:str):
    mw = collection.find_one({"title":title.lower()})
    return mw

def get_one_mw(id:str):
    mw = collection.find_one({"_id":ObjectId(id)})
    mw = serial(mw)
    return mw

def save_mw(mw):
    mw_found =  collection.insert_one(mw)
    created_mw =  collection.find_one({"_id": mw_found.inserted_id})
    return created_mw

async def update_mw(id:str,data):
    mw = {k:v for k,v in data.model_dump().items() if v is not None}
    print(mw)
    await collection.update_one({"_id":ObjectId(id)},{"$set":mw})
    document = await collection.find_one({"_id":ObjectId(id)})
    return document

async def delete_mw(id:str):
    await collection.delete_one({"_id":ObjectId(id)})
    return True
