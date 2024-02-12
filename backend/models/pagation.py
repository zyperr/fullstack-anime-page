from pydantic import BaseModel
from fastapi import Query

class PaginationModel(BaseModel):
    perPage:int
    page:int
    

def pagination_params(
    page:int = Query(ge=1,required=False,default=1,le=50000),
    perPage:int = Query(ge=1, le=100,required=False,default=10)
):
    return PaginationModel(perPage=perPage,page=page)