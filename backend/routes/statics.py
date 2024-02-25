from fastapi import APIRouter
from fastapi.responses import JSONResponse
import os

staticRouter = APIRouter()




@staticRouter.get("/api/banners",tags=["banners"])
async def get_banners():
    static_dir = "static/banners/"
    file_names = os.listdir(static_dir)
    content = []
    for file in file_names:
        content.append({"path":f"/static/banners/{file}","name":file})
    return JSONResponse(content,status_code=200)

@staticRouter.get("/api/banners/{name}",tags=["banners"])
async def get_banner(name:str):
    static_dir = "static/banners/"
    file_name = os.path.join(static_dir,name)
    return JSONResponse(content={"path":file_name,"name":name},status_code=200)


@staticRouter.get("/api/avatars",tags=["avatars"])
async def get_avatars():
    static_dir = "static/avatars/"
    file_names = os.listdir(static_dir)
    content = []
    for file in file_names:
        
        content.append({"path":f"/static/avatars/{file}","name":file})
    return JSONResponse(content,status_code=200)


@staticRouter.get("/api/avatars/{name}",tags=["avatars"])
async def get_avatar(name:str):
    static_dir = "static/avatars/"
    file_name = os.path.join(static_dir,name)
    return JSONResponse(content={"path":file_name,"name":name},status_code=200)