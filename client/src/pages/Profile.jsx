import "../styles/pages/profile.css";
import { useApiUser } from "../hooks/useApiUser";
import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

function Profile() {
  const { getAuthUser } = useApiUser();
  const [data, setData] = useState({});
  useEffect(() => {
    getAuthUser(
      "http://127.0.0.1:8000/users/me/items",
      localStorage.getItem("token").toString()
    ).then((data) => setData(data));
  }, []);
  console.log(data)
  return (
    <section className="profile">
    </section>
  );
}

export { Profile };
