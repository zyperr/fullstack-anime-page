import pprint
from fastapi import APIRouter
from fastapi.responses import JSONResponse
import os
staticRouter = APIRouter()


server_url = "http://127.0.0.1:8000"
categorys = ["default","op","solo-leveling","black-clover","god-of-high-school","jujutsu-kaisen","other","tokyo-revengers"]
anime_slider_ids = ["65e65c11ee2d4033c9e31314","65e65f95ee2d4033c9e31316","65e6604fee2d4033c9e31317","65e65d59ee2d4033c9e31315"]
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

@staticRouter.get("/api/slider",tags=["slider"])
async def get_slider():
    static_dir = "static/slider/img/"
    static_dir_text = "static/slider/img-text/"

    file_names = os.listdir(static_dir)
    files_text = os.listdir(static_dir_text)
    
    content = []
    
    for index,file in enumerate(file_names):
            content.append({"path":f"{server_url}/static/slider/img/{file}","name":file.replace(".webp","").replace("-"," ").replace(".jpg","").replace(".jpeg",""),"id":anime_slider_ids[index]})
        
    for index,file in enumerate(files_text):
        content[index].update({"path_text":f"{server_url}/static/slider/img-text/{file}","name_text":file.replace(".webp","").replace("-"," ").replace(".jpg","")})
    

    return JSONResponse(content=content,status_code=200)

    
