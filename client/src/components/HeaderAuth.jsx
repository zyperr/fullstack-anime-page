/* eslint-disable react/prop-types */
import "../styles/components/header.css";
import { Link, NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CiBookmark, CiLogout } from "react-icons/ci";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";

import { useState } from "react";

function HeaderAuth({ data }) {
  const [open, setOpen] = useState(false);
  function handleClick() {
    setOpen(!open);
  }
  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
    window.location.href = "/";
  }
  return (
    <header className="header">
      <h1 className="header__logo">Animes</h1>
      <nav className="header__nav">
        <ul className="header__ul">
          <li className="header__li">
            <NavLink to="/" className="header__navlink">
              <FaHome fontSize={30} />
            </NavLink>
          </li>
        </ul>
        <ul className="header__ul headerAuth__ul">
          <div className={open ? "bg-blur" : "bg-blur hideMenu"}></div>
          <li className="header__li header__li--hover" onClick={handleClick}>
            <img src={data.avatar} className="headerAuth__avatar" />
            <IoMdArrowDropdown className="header__li-icons"/>
          </li>
          <div
            className={
              open
                ? "headerAuth__accordion"
                : "headerAuth__accordion hideMenu bodyblur"
            }
          >
            <li className="header__navlink headerAuth__navlink">
              <NavLink
                className="headerAuth__navlink"
                to={`/user/profile/${data.username}/${data._id}`}
              >
                <img className="headerAuth__avatar" src={data.avatar} />
                <span>{data.username}</span>
              </NavLink>
            </li>

            <li className="header__navlink headerAuth__navlink">
              <NavLink className="headerAuth__navlink" to={""}>
                <CiBookmark className="header__li-icons" />
                <span>Favorite</span>
              </NavLink>
            </li>

            <li className="header__navlink headerAuth__navlink">
              <Link className="headerAuth__navlink" onClick={logout}>
                <CiLogout className="header__li-icons" />
                <span>Logout</span>
              </Link>
            </li>
            {data.role === "admin" && (
              <li className="header__navlink headerAuth__navlink">
                <Link className="headerAuth__navlink" to="/admin">
                  <MdOutlineAdminPanelSettings className="header__li-icons" />
                  <span>Admin</span>
                </Link>
              </li>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
}

export { HeaderAuth };
