/* eslint-disable react/prop-types */
import "../styles/components/header.css";
import { Link,NavLink } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { useState } from "react";
function HeaderAuth({username,id}) {
  const [open, setOpen] = useState(false)
  function handleClick() {
    setOpen(!open)
  }
  function logout(){
    localStorage.removeItem('token')
    window.location.reload()
    window.location.href = "/"
  }
  return (
    <header className="header">
      <h1 className="header__logo">Animes</h1>
      <nav className="header__nav">
        <ul className="header__ul">
          <li className="header__li" onClick={handleClick}>
              <FaCircleUser className="header__li-icons" />
              <div className={open ? "header__accordeon active" : "header__accordeon"}>
               
               <Link className="header__navlink" to={`/user/profile/${username}/${id}`}> <span className="header__accordeon-text">Profile</span></Link>
               <Link className="header__navlink" onClick={logout}> <span className="header__accordeon-text">Logout</span></Link>
           </div>
          </li>
          <li className="header__li">
            <NavLink to="/" className="header__navlink">
              <FaHome fontSize={20} />
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export { HeaderAuth };
