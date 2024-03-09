from config.db import collection_user as collection
from config.db import collection_anime as collection_anime
from fastapi import HTTPException,Depends
from fastapi.security import OAuth2PasswordBearer
from bson import ObjectId
from schema.schemas import list_serial_users, serial_users
from jose import jwt,JWTError
from datetime import datetime,timedelta
from passlib.context import CryptContext
from middlewares.regex import verify_pattern_user_data
import random

server_url = "http://127.0.0.1:8000"
default_avatars = ["/static/avatars/default-avatar-1.webp","/static/avatars/default-avatar-2.webp","/static/avatars/default-avatar-3.webp","/static/avatars/default-avatar-4.webp","/static/avatars/default-avatar-5.webp","/static/avatars/default-avatar-6.webp"]
default_banners = ["/static/banners/default-banner-1.webp","/static/banners/default-banner-2.webp","/static/banners/default-banner-3.webp","static/banners/default-banner-4.webp"]

SECRET_KEY = "83daa0256a2289b0fb23693bf1f6034d443966"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRES_MINUTES = 30


pwd_contenxt = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth_2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password,hashed_password):
    return pwd_contenxt.verify(plain_password,hashed_password)



def get_password_hash(password):
    return pwd_contenxt.hash(password)

def verify_user(username:str,password:str):
    user = collection.find_one({"username":username})
    if user and verify_password(password,user["password"]):
        return user
    
def create_access_token(data:dict,expires_delta:timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow + timedelta(minutes=15)
    to_encode.update({"exp":expire})
    encoded_jwt = jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token:str = Depends(oauth_2_scheme)):
    credentials_exception = HTTPException(status_code=401,detail="Could not validate credentials",headers={"WWW-Authenticate":"Bearer"})
    try:
        payload = jwt.decode(token,SECRET_KEY,algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = collection.find_one({"username":username})
    if user is None:
        raise credentials_exception
    return user

def get_all_users():
    return list_serial_users(collection.find({}))


def get_username(username:str):
    user = collection.find_one({"username":username})
    return user

def get_one_user(username:str):
    user = collection.find_one({"username":username})
    user = serial_users(user)
    return user

def save_user(user):
    user = verify_pattern_user_data(user)
    user["avatar"] = server_url + random.choice(default_avatars)
    user["banner_profile"] = server_url + random.choice(default_banners)
    user["password"] = get_password_hash(user["password"])
    user["role"] = "user"
    user_found =  collection.insert_one(user)
    created_user =  collection.find_one({"_id": user_found.inserted_id})
    return created_user

    
def update_banner_profile(id:str,banner):
    userDb = collection.find_one({"_id":ObjectId(id)})
    if userDb:
            collection.update_one(
                {
                    "_id":ObjectId(id)
                },
                {
                    "$set":{
                        "banner_profile":banner
                    }
                }
            )
    return True

def update_avatar_profile(id:str,avatar) -> bool:
    userDb = collection.find_one({"_id":ObjectId(id)})
    if userDb:
            collection.update_one(
                
                {
                    "_id":ObjectId(id)
                },
                {
                    "$set":{
                        "avatar":avatar
                    }
                }
            )
    return True

def add_favorite(id:str,item_id:str):
    user = collection.find_one({"_id":ObjectId(id)})
    item = collection_anime.find_one({"_id":ObjectId(item_id)})
    if user:
        collection.update_one({
            "_id":ObjectId(id)
        },
        {
            "$addToSet":{
                "favorites":item
            }
        })
        return {"message":"it has been added to Favorites"}
    else:
        raise HTTPException(status_code=404, detail="User not found")

def delete_user(id:str):
    if not collection.find_one({"_id":ObjectId(id)}):
        raise HTTPException(status_code=404, detail="User not found")
    collection.delete_one({"_id":ObjectId(id)})
    return HTTPException(status_code=200, detail="User has been deleted")


def update_password(id:str,user):
    userDb = collection.find_one({"_id":ObjectId(id)})
    if userDb:
        if verify_password(user.old_password,userDb["password"]):
            if user.new_password == user.confirm_new_password:
                new_password = get_password_hash(user.new_password)
                collection.update_one(
                    {
                        "_id":ObjectId(id)
                        
                    },
                    {
                        "$set":{
                            "password": new_password
                        }
                    }
                )
                return HTTPException(status_code=200, detail="Password changed")
            else:
                raise HTTPException(status_code=400, detail="Passwords don't match, try again")
        else:
            raise HTTPException(status_code=400, detail="Current password is incorrect")
    else:
        raise HTTPException(status_code=404, detail="User not found")
