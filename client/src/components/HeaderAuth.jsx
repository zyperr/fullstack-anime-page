/* eslint-disable react/prop-types */
import "../styles/components/header.css";
import { Link, NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { CiBookmark, CiLogout } from "react-icons/ci";
import { useState } from "react";

function HeaderAuth({ username, id, avatar}) {
  const [open, setOpen] = useState(false)
  function handleClick() {
    setOpen(!open)
  }
  function logout() {
    localStorage.removeItem('token')
    window.location.reload()
    window.location.href = "/"
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
          <li className="header__li header__li--hover" onClick={handleClick}><img src={`http://127.0.0.1:8000${avatar}`} className="headerAuth__avatar"/></li>
          <div className={open ? "headerAuth__accordion" : 'headerAuth__accordion hideMenu bodyblur'}>
            <li className="header__navlink headerAuth__navlink">
              <Link className="headerAuth__navlink" to={`/user/profile/${username}/${id}`}>
                <img className="headerAuth__avatar" src={`http://127.0.0.1:8000${avatar}`} />
                <span>My account</span>
              </Link>
            </li>

            <li className="header__navlink headerAuth__navlink">
              <Link className="headerAuth__navlink" to={""}>
                <CiBookmark className="header__li-icons"/>
                <span>Favorite</span>
              </Link>
            </li>

            <li className="header__navlink headerAuth__navlink">
              <Link className="headerAuth__navlink" onClick={logout}>
                <CiLogout className="header__li-icons"/>
                <span>Logout</span>
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export { HeaderAuth };
