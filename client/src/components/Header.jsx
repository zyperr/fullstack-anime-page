import "../styles/components/header.css"
import { NavLink } from "react-router-dom"

const routes = [
  {
    path: '/',
    name: 'Home'
  },
  {
    path: '/animes',
    name: 'Animes'
  },
  {
    path: '/mangas',
    name: 'Mangas'
  },
  {
    path: '/manhwas',
    name: 'Manhwas'
  }
]
export function Header() {
  return (
    <header className="header">
    <h1 className="header__logo">Animes</h1>
      <nav className="header__nav">
        <ul className="header__ul">
          {
            routes.map(({name,path}) => (
              <li className="header__li" key={name}>
                <NavLink to={path} title={name} className="header__navlink">{name}</NavLink>
              </li>
            ))
          }
        </ul>
      </nav>
    </header>
  )
}
