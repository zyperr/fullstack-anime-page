import "../styles/components/header.css"
import { NavLink } from "react-router-dom"
import { FaRegUserCircle,FaHome } from "react-icons/fa";

const routes = [
  {
    path: '/',
    name: 'Home',
    icon: <FaHome    className="header__li-icons"/>
  },
  {
    path: '/user/profile',
    name: 'Profile',
    icon: <FaRegUserCircle  className="header__li-icons" />
  }
]
export function Header() {
  return (
    <header className="header">
    <h1 className="header__logo">Animes</h1>
      <nav className="header__nav">
        <ul className="header__ul">
          {
            routes.map(({name,path,icon}) => (
              <li className="header__li" key={name}>
                <NavLink to={path} title={name} className="header__navlink">{icon}</NavLink>
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  )
}
