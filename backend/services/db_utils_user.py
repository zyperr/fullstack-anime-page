from config.db import collection_user as collection
from fastapi import HTTPException,Depends
from fastapi.security import OAuth2PasswordBearer
from bson import ObjectId
from schema.schemas import list_serial_users, serial_users
from jose import jwt,JWTError
from datetime import datetime,timedelta
from passlib.context import CryptContext
from middlewares.regex import verify_pattern_user_data

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
    user["password"] = get_password_hash(user["password"])
    user_found =  collection.insert_one(user)
    created_user =  collection.find_one({"_id": user_found.inserted_id})
    return created_user

def update_user(id:str,data):
        user = {k:v for k,v in data.model_dump().items() if v is not None}
        print(user)
        collection.update_one({"_id":ObjectId(id)},{"$set":user})
        document = collection.find_one({"_id":ObjectId(id)})
        return document
def add_favorite(id:str,item_id:str):
    user = collection.find_one({"_id":ObjectId(id)})
    if user:
        collection.update_one({
            "_id":ObjectId(id)
        },
        {
            "$addToSet":{
                "favorites":ObjectId(item_id)
            }
        })
        return {"message":"Added to Favorites"}
    else:
        raise HTTPException(status_code=404, detail="User not found")

def delete_user(id:str):
    if not collection.find_one({"_id":ObjectId(id)}):
        raise HTTPException(status_code=404, detail="User not found")
    collection.delete_one({"_id":ObjectId(id)})
    return True