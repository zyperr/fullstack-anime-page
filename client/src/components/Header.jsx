import "../styles/components/header.css"
import { NavLink } from "react-router-dom"
import { FaCircleUser } from "react-icons/fa6";
import {FaHome} from "react-icons/fa"
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false)
  function handleClick() {
    setOpen(!open)
  }
  return (
    <header className="header">
    <h1 className="header__logo">Animes</h1>
      <nav className="header__nav">
        <ul className="header__ul">
            <li className="header__li" onClick={handleClick}>
              <FaCircleUser    className={open ? "header__li-icons active" : "header__li-icons"}/>
              <div className={open ? "header__accordeon active" : "header__accordeon"}>
               
                  <NavLink className="header__navlink" to="/user/login"> <span className="header__accordeon-text">Login</span></NavLink>
                
                
                  <NavLink to="/user/register" className="header__navlink"><span className="header__accordeon-text">Register</span></NavLink>
              </div>
            </li>
            <li className="header__li">
              <NavLink to="/" className="header__navlink"><FaHome fontSize={20}/></NavLink>
            </li>
        </ul>
      </nav>
    </header>
  )
}
