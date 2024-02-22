/* eslint-disable react/prop-types */
import "../styles/components/header.css";
import { NavLink,Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

function HeaderAuth({username,id}) {
  return (
    <header className="header">
      <h1 className="header__logo">Animes</h1>
      <nav className="header__nav">
        <ul className="header__ul">
          <li className="header__li">
            <Link className="header__navlink" to={`/user/profile/${username}/${id}`}>
              <FaCircleUser className="header__li-icons" />
            </Link>
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
