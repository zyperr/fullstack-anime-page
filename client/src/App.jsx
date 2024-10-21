/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Header } from "./components/Header";
import "./styles/index.css";
import { AnimeDetails } from "./pages/AnimeDetails";
import { HeaderAuth } from "./components/HeaderAuth";
import { Profile } from "./pages/Profile";
import { AdminPanel } from "./pages/Admin/AdminPanel.jsx";
import { EditAnime } from "./pages/Admin/Form/Edit/EditAnime";
import { AddAnime } from "./pages/Admin/Form/Create/AddAnime.jsx";
import { Provider } from "./context/Provider";
import { UserContext } from "./context/UserProvider.jsx";
import { NotFound } from "./pages/error/NotFound.jsx";
import { useEffect, useContext } from "react";
import { FavoritePage } from "./pages/FavoritePage.jsx"

function App() {
  const { user, fav } = useContext(UserContext);
  console.log(user)
  const isAuth = () => {
    return user.role !== undefined;
  };

  useEffect(() => {
    if (isAuth() === undefined) {
      window.location.href = user.role === undefined ? "/user/login" : "/";
    }
  }, []);
  return (
    <BrowserRouter>
      {isAuth() ? <HeaderAuth data={user} /> : <Header />}
      <Provider>
        <Routes>
          <Route path="/" element=<HomePage /> />
          <Route path="/user/login" element=<Login /> />
          <Route path="user/register" element=<Register /> />
          <Route path="/:type/:title/:id" element=<AnimeDetails /> />

          <Route
            path="/user/profile/:username/:id"
            element=<Profile data={user} />
          />

          {user.role === "admin" && (
            <Route path="/admin/panel" element=<AdminPanel /> />
          )}
          {user.role === "admin" && (
            <Route path="/admin/animes/:id/:name" element=<EditAnime /> />
          )}
          {user.role === "admin" && (
            <Route path="/admin/animes/add" element=<AddAnime /> />
          )}
          <Route path="/user/favorites" element=<FavoritePage data={fav} /> />
          <Route path="*" element=<NotFound /> />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
