/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Routes, Route, Router} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Header } from "./components/Header";
import "./styles/index.css";
import { AnimeDetails } from "./pages/AnimeDetails";
import { useApiUser } from "./hooks/useApiUser";
import { useState,useEffect } from "react";
import { HeaderAuth } from "./components/HeaderAuth";
import {Profile} from "./pages/Profile"
function App() {
  const { getAuthUser } = useApiUser();
  const [data, setData] = useState({});
  const [errorCode, setErrorCode] = useState(0);

  useEffect(() => {
      async function getAuth(){
        const token = localStorage.getItem("token")
        const {authUserData,status} = await getAuthUser("http://127.0.0.1:8000/users/me",token);
        setData(authUserData);
        if(status === 401){
          localStorage.removeItem("token")
          setErrorCode(status)
        }
      }
      getAuth()
  }, []);
  const userInfo = data
  const isAuth = () => {
    return data.role !== undefined;
  }

  useEffect(() => {
    if (isAuth() === undefined) {
      window.location.href = data.role === undefined ? "/user/login" : "/";
    }
  },[])
  return (
    <BrowserRouter >
      {isAuth() ? <HeaderAuth data={userInfo}/> : <Header />}
      <Routes>
        <Route path="/" element=<HomePage /> />
        <Route path="/user/login" element=<Login /> />
        <Route path="user/register" element=<Register /> />
        <Route path="/animes/:title/:id" element=<AnimeDetails />  />
        <Route path="/user/profile/:username/:id" element=<Profile data={userInfo} />/>
        <Route path="*" element="error" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
