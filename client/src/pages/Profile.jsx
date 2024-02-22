import "../styles/pages/profile.css";
import { useApiUser } from "../hooks/useApiUser";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

//Todo: no enviar la contraseña con hash al frontend y crear un metodo put para actualizarla de manera segura
import Label from "../components/LabelComponent";
function Profile() {
  const { getAuthUser } = useApiUser();
  const [data, setData] = useState({});
  useEffect(() => {
    getAuthUser(
      "http://127.0.0.1:8000/users/me/items",
      localStorage.getItem("token").toString()
    ).then((data) => setData(data));
  }, []);

  return (
    <section className="profile">
      <form className="profile__form">
        <Label
          text="username"
          forHtml="username"
          className="profile__label"
        />
        <div className="profile__wrap">
          <input type="text" id="username" placeholder={data.username} className="profile__input"/>
          <MdEdit   className="profile__icon"/>
        </div>
        <Label
          text="Password"
          forHtml="password"
          className="profile__label"
        />
        <div className="profile__wrap">
          <input type="password" id="password" placeholder={data.password} className="profile__input"/>
          <IoIosEyeOff   className="profile__icon"/>
        </div>
      </form>
    </section>
  );
}

export { Profile };
