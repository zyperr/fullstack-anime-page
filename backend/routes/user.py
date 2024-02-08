from fastapi import APIRouter,HTTPException
from config.db import collection_user as collection
from schema.schemas import list_serial_users
from models.user import User
from services.db_utils_user import delete_user,update_user,get_one_user,save_user,get_username



userRouter = APIRouter()

@userRouter.get("/api/users",tags=["users"])
def get_users():
    return list_serial_users(collection.find())

@userRouter.get("/api/users/{id}",tags=["users"])
def get_user(id:str):
    user = get_one_user(id)
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
def delete_user_endpoint(id:str):
    response =  delete_user(id)
    if response:
        return "User deleted"
    raise HTTPException(status_code=404,detail=f"User Not found")

@userRouter.put("/api/users/{id}",tags=["users"])
def update_anime(id:str,user:User):
    response =  update_user(id,user)
    if response:
        return response
    raise HTTPException(status_code=400,detail="Error updating User")