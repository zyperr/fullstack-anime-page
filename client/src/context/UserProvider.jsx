import React from 'react'
import { useState,useEffect } from 'react';
import { useApiUser } from "../hooks/useApiUser";

export const UserContext = React.createContext({})


function UserProvider({children}) {
    const { getAuthUser } = useApiUser();
    const [data , setData] = useState({});
    const [fav, setFav] = useState([]);
    useEffect(() => {
      async function getAuth() {
        const token = localStorage.getItem("token");
        const { authUserData } = await getAuthUser(
          "http://127.0.0.1:8000/users/me",
          token
        );
        setData(authUserData);
        setFav(authUserData.favorites);
      }
      getAuth();
    }, []);
  return (
    <UserContext.Provider value={{data,fav}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider