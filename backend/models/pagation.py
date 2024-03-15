from pydantic import BaseModel
from fastapi import Query

class PaginationModel(BaseModel):
    perPage:int
    page:int
    prev:int
    next:int

def pagination_params(
    page:int = Query(ge=1,required=False,default=1,le=50000),
    perPage:int = Query(ge=1, le=100,required=False,default=10),
):
    return PaginationModel(perPage=perPage,page=page,next=page+1,prev= page-1)

def get_pagination(page:int,perPage:int,next:int,prev:int,elements:list,endpoint:str,count:int):
    pages = {
        "pages":count,
        "perPage":perPage,
        "CurrentPage":page,
        "prev":f"http://127.0.0.1:8000/{endpoint}?page={prev}", 
        "next":f"http://127.0.0.1:8000/{endpoint}?page={next}",
        "ElementsPerPage":len(elements),
    }
    if pages["prev"].split("?pages=")[0][-1] == "0":
        pages["prev"] = None
    if len(elements) == 0:
        pages["next"] = None
        elements ="No more result to show"
    
    
    return {"pages":pages,"result":elements}