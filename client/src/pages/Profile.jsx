import "../styles/pages/profile.css";
import { useApiUser } from "../hooks/useApiUser";
import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
function Profile() {
  const { getAuthUser } = useApiUser();
  const [data, setData] = useState({});
  useEffect(() => {
    getAuthUser(
      "http://127.0.0.1:8000/users/me/items",
      localStorage.getItem("token").toString()
    ).then((data) => setData(data));
  }, []);
  console.log(data);
  return (
    <section className="profile">
      <article className="profile__header__account">
        <div className="profile__banner">
          <img
            className="profile__banner-img"
            src={`http://127.0.0.1:8000${data.banner_profile}`}
            alt={`banner of ${data.username}`}
          />
          <div className="editable-banner">
            <span className="editable-banner__text">Edit your banner</span>
          </div>
          <div className="profile__banner-edit">
            <MdOutlineEdit className="profile__banner-edit-icon" />
          </div>
        </div>
        <div className="profile__account-info">
          <div className="profile__user-wrapper">
            <div className="profile__avatar-wrapper">
              <div className="profile__avatar">
                <div className="profile__account-img">
                  <figure className="profile__account-img-container">
                    <picture className="profile__account-picture">
                      <img
                        src={`http://127.0.0.1:8000${data.avatar}`}
                        className="profile__account-img"
                        alt="avatar of a monkey with a strawhat"
                      />
                    </picture>
                  </figure>
                  <div className="profile__avatar-edit">
                    <MdOutlineEdit className="profile__avatar-edit-icon" />
                  </div>
                  <div className="editable-avatar">
                    <span className="editable-avatar__text">Edit</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile__user-wrapper">
              <h2 className="profile__name">{data.username}</h2>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export { Profile };
