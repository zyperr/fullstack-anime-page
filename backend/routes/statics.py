from fastapi import APIRouter
from fastapi.responses import JSONResponse
import os

staticRouter = APIRouter()


server_url = "http://127.0.0.1:8000"
categorys = ["default","op","solo-leveling","black-clover","god-of-high-school","jujutsu-kaisen","other","tokyo-revengers"]

@staticRouter.get("/api/banners",tags=["banners"])
async def get_banners():
    static_dir = "static/banners/"
    file_names = os.listdir(static_dir)
    content = []
    for category in categorys:
        for file in file_names:
            if file.startswith(category):
                content.append({"path":f"{server_url}/static/banners/{file}","name":file,"category":category.replace("-"," ")})
    return JSONResponse(content=content,status_code=200)


@staticRouter.get("/api/banners/{name}",tags=["banners"])
async def get_banner(name:str):
    static_dir = "static/banners/"
    file_name = os.path.join(static_dir,name)
    return JSONResponse(content={"path":server_url+file_name,"name":name},status_code=200)


@staticRouter.get("/api/avatars",tags=["avatars"])
async def get_avatars():
    static_dir = "static/avatars/"
    file_names = os.listdir(static_dir)
    content = []
    for category in categorys:
        for file in file_names:
            if file.startswith(category):
                content.append({"path":f"{server_url}/static/avatars/{file}","name":file,"category":category.replace("-"," ")})
    return JSONResponse(content=content,status_code=200)

@staticRouter.get("/api/avatars/{name}",tags=["avatars"])
async def get_avatar(name:str):
    static_dir = "static/avatars/"
    file_name = os.path.join(static_dir,name)
    return JSONResponse(content={"path":server_url+file_name,"name":name},status_code=200)