

def serial(anime) -> dict:
    return {
        "_id":str(anime["_id"]),
        "title": anime["title"],
        "status": anime["status"],
        "media_type": anime["media_type"],
        "num_episodes": anime["num_episodes"],
        "genres": anime["genres"],
        'synopsis': anime["synopsis"],
        "img_url": anime["img_url"],
        "alternative_titles_synonyms": anime["alternative_titles_synonyms"] 
    }
    
def list_serial(animes) -> list:
    return [serial(anime) for anime in animes]


def serial_users (user) -> dict:
    return {
        "_id":str(user["_id"]),
        "username": user["username"],
        "email": user["email"],
        "role": user["role"],
        "favorites": user["favorites"]
    }

def serial_user_with_hash (user) -> dict:
    return {
        "_id":str(user["_id"]),
        "username": user["username"],
        "hash_pwd": user["password"],
        "email": user["email"],
        "role": user["role"],
        "favorites": user["favorites"]
    }
def list_serial_users(users) -> list:
    return [serial_users(user) for user in users]

