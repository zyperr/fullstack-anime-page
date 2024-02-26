/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Header } from "./components/Header";
import "./styles/index.css";
import { AnimeDetails } from "./pages/AnimeDetails";
import { useApiUser } from "./hooks/useApiUser";
import { useState } from "react";
import { useEffect } from "react";
import { HeaderAuth } from "./components/HeaderAuth";
import {Profile} from "./pages/Profile"
function App() {
  const { getAuthUser } = useApiUser();
  const [data, setData] = useState({});

  useEffect(() => {
    if(localStorage.length !== 0) {
      getAuthUser(
        "http://127.0.0.1:8000/users/me/items",
        localStorage.getItem("token").toString()
      ).then((data) => setData(data));
    }
  }, []);
  const userInfo = data
  const isAuth = () => {
    return data.role !== undefined;
  }
  return (
    <BrowserRouter>
      {isAuth() ? <HeaderAuth data={userInfo}/> : <Header />}
      <Routes>
        <Route path="/" element=<HomePage /> />
        <Route path="/user/login" element=<Login /> />
        <Route path="user/register" element=<Register /> />
        <Route path="/animes/:title/:id" element=<AnimeDetails /> />
        <Route path="/user/profile/:name/:id" element=<Profile data={userInfo} /> />
        <Route path="*" element="error" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
