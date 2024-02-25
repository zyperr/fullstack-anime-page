from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.anime import animeRouter
from routes.manhwas import manhwasRouter
from routes.mangas import mangasRouter
from routes.user import userRouter
from routes.statics import staticRouter
from fastapi.staticfiles import StaticFiles
import os
from dotenv import load_dotenv
import uvicorn
load_dotenv()

app = FastAPI()

frontend_url_local = os.getenv("FRONTEND_URL_LOCAL")
frontend = os.getenv("FRONTEND_URL")

app.include_router(animeRouter)
app.include_router(manhwasRouter)
app.include_router(mangasRouter)
app.include_router(userRouter)
app.include_router(staticRouter)

origins = [
    frontend_url_local,
    frontend,
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static",StaticFiles(directory="static"),name="static")

@app.get("/")
async def root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)