from fastapi import APIRouter,HTTPException,Depends,HTTPException,status
from config.db import collection_user as collection
from schema.schemas import list_serial_users,serial_users,serial_user_with_hash
from models.user import User
from services.db_utils_user import add_favorite, delete_user,update_user,get_one_user,save_user,get_username,create_access_token,verify_user,ACCESS_TOKEN_EXPIRES_MINUTES,get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from models.token import Token
from datetime import timedelta


userRouter = APIRouter()


@userRouter.post("/token",response_model=Token,tags=["Token"])
def login_for_access_token(form_data:OAuth2PasswordRequestForm = Depends()):
    user = verify_user(form_data.username,form_data.password)
    if not user:
        raise HTTPException(status_code=401,detail="Incorrect username or password",headers={"WWW-Authenticate":"Bearer"})
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRES_MINUTES)
    access_token = create_access_token(data={"sub":user["username"]},expires_delta=access_token_expires)
    
    return {"access_token":access_token,"token_type":"bearer"}

@userRouter.get("/users/me",tags=["users"])
def read_users_me(current_user:User = Depends(get_current_user)):
    user = serial_users(current_user)
    return user
@userRouter.get("/users/me/items",tags=["users"])
def read_own_items(current_user:User = Depends(get_current_user)):
    return serial_user_with_hash(current_user)

@userRouter.get("/api/users",tags=["users"])
def get_users(current_user:User = Depends(get_current_user)):
    return list_serial_users(collection.find())

@userRouter.get("/api/users/{username}",tags=["users"])
def get_user(username:str):
    user = get_one_user(username)
    if user:
        return user
    raise HTTPException(status_code=404,detail=f"User Not found")



@userRouter.post("/api/users",tags=["users"],response_model=User)
def create_user(user:User):
    user_found = get_username(user.username)
    if user_found:
        raise HTTPException(status_code=409,detail="Username has already taken")
    response = save_user(user.model_dump())
    if response:
        print(response)
        return response
    raise HTTPException(status_code=400,detail="Error creating User")
@userRouter.delete("/api/users/{id}",tags=["users"])
def delete_user_endpoint(id:str, current_user:User = Depends(get_current_user)):
    response =  delete_user(id)
    if response:
        return "User deleted"
    raise HTTPException(status_code=404,detail=f"User Not found")

@userRouter.put("/api/users/{id}",tags=["users"],)
def update_anime(id:str,user:User,current_user:User = Depends(get_current_user)):
    response =  update_user(id,user)
    if response:
        return response
    raise HTTPException(status_code=400,detail="Error updating User")

@userRouter.post("/api/users/favorites/{user_id}",tags=["users-favorites"])
def favorites(user_id:str,item_id:str,current_user:User = Depends(get_current_user)):
    response =  add_favorite(user_id,item_id)
    if response:
        return response
    raise HTTPException(status_code=400,detail="Error adding to Favorites")

