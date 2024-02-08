from bcrypt import hashpw,gensalt,checkpw
def hash_psw(password:str) -> str:
    hashed_psw = hashpw(password.encode('utf-8'),gensalt())
    return hashed_psw

def check_password(plain_password:str,hashed_password:str) -> bool:
     return checkpw(plain_password.encode('utf-8'),hashed_password)