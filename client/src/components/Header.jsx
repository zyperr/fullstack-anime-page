import "../styles/components/header.css"
import { NavLink } from "react-router-dom"

import { FaHome } from "react-icons/fa"




export function Header() {
 
  return (
    <header className="header">
      <h1 className="header__logo">Animes</h1>
      <nav className="header__nav">
        <ul className="header__ul">
          <li className="header__li">
            <NavLink to="/" className="header__navlink"><FaHome fontSize={30} /></NavLink>
          </li>
          <li className="header__navlink">
            <NavLink to="/user/register"><span>Register</span></NavLink>
          </li>
          <li className="header__navlink">
            <NavLink to="/user/login"><span>Login</span></NavLink>
          </li>
        </ul>

      </nav>
    </header>
  )
}
