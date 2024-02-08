from config.db import collection_user as collection
from fastapi import HTTPException
from bson import ObjectId
from schema.schemas import list_serial_users, serial_users
from middlewares.hash import hash_psw


def get_all_users():
    return list_serial_users(collection.find({}))


def get_username(username:str):
    user = collection.find_one({"username":username})
    return user

def get_one_user(id:str):
    user = collection.find_one({"_id":ObjectId(id)})
    user = serial_users(user)
    return user

def save_user(user):
    user["password"] = hash_psw(user["password"])
    user_found =  collection.insert_one(user)
    created_user =  collection.find_one({"_id": user_found.inserted_id})
    return created_user

def update_user(id:str,data):
    user = {k:v for k,v in data.model_dump().items() if v is not None}
    print(user)
    collection.update_one({"_id":ObjectId(id)},{"$set":user})
    document = collection.find_one({"_id":ObjectId(id)})
    return document

def delete_user(id:str):
    if not collection.find_one({"_id":ObjectId(id)}):
        raise HTTPException(status_code=404, detail="User not found")
    collection.delete_one({"_id":ObjectId(id)})
    return True