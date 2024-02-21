from fastapi import HTTPException
import re

pattern_username = r'^[a-zA-Z0-9_]{3,16}$'
pattern_pwd = r'^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$' 
pattern_mail = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'


def verify_pattern_user_data(data:dict):
    length_pwd = len(data["password"])
    length_username = len(data["username"])
    if not re.match(pattern=pattern_username,string=data["username"]):
        raise HTTPException(status_code=400,detail={"username":"Username can contain numbers and underscores cannot contain spaces"})
    elif length_username < 3 or length_username > 16:
        raise HTTPException(status_code=400,detail={"username":"must be between 3 and 16 characters long"})
    
    if not re.match(pattern=pattern_pwd,string=data["password"]):
        raise HTTPException(status_code=400,detail={"password":"must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"})
    elif length_pwd < 8:
        raise HTTPException(status_code=400,detail={"password":"must be at least 8 characters long"})
    
    if not re.match(pattern=pattern_mail,string=data["email"]):
        raise HTTPException(status_code=400,detail={"email":"must be a valid address"})
    return data