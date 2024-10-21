from pymongo import MongoClient
from dotenv import load_dotenv
import os
load_dotenv()

PASSWORD = os.getenv("MONGO_PWD")
USER  =os.getenv("MONGO_USER")
URL =f"mongodb+srv://{USER}:{PASSWORD}@cluster0.shqzknu.mongodb.net/?retryWrites=true&w=majority&authSource=admin"


client = MongoClient(URL)

db = client.animes
db_user = client.user 

collection_anime= db["animes"]
collection_mw = db["manhwas"]
collection_mangas = db["mangas"]
collection_img = db_user["banners"]
collection_user = db_user["users"]

collection_name = collection_anime.name
collection_name_2 = collection_mw.name
collection_name_3 = collection_mangas.name



anime_validator = {
    "$jsonSchema": {
        "bsonType": "object",
        "properties": {
            "title": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "status":{
                "bsonType": "string",
                "description": "must be a string and is not required"
            },
            "media_type":{
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "num_episodes":{
                "bsonType": "int",
                "description": "must be a int and is required"
            },
            "synopsis": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "genres":{
                "bsonType":"array",
                "description": "must be an array of string and is required",
            },
            "img_url":{
                "bsonType":"string",
                "description": "must be a string and is required"
            },
            "alternative_titles_synonyms":{
                "bsonType": "array",
                "description": "must be an array of string and is not required",
            }
        }
    }
}

user_validator = {
    "$jsonSchema": {
        "bsonType": "object",
        "properties": {
            "username": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "password": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "email": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "role": {
                "bsonType": "string",
                "description": "must be a string and is required"
            },
            "favorites": {
                "bsonType": "array",
                "description": "must be an array of string and is not required"
            },
            "dark_mode": {
                "bsonType": "bool",
                "description": "must be a bool and is not required"
            },
            "avatar": {
                "bsonType": "string",
                "description": "must be a string and is not required"
            },
            "banner_profile": {
                "bsonType": "string",
                "description": "must be a string and is not required"
            }
        }
    }
}

db.command("collMod", collection_name, validator=anime_validator)
db.command("collMod", collection_name_2, validator=anime_validator)
db.command("collMod", collection_name_3, validator=anime_validator)