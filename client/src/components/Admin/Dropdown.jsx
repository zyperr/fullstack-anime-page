import { useState } from "react";
import "../../styles/components/dropdown.css";
import { Link } from "react-router-dom";

export const Dropdown = ({id}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown} className="btn dropdown-toggle">
        Select Option
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            <li><Link to={`/admin/animes/${id}/title`} className="dropdown-link">Title</Link></li>
            <li><Link to={`/admin/animes/${id}/status`} className="dropdown-link">Status</Link></li>
            <li><Link to={`/admin/animes/${id}/media_type`} className="dropdown-link">Media type</Link></li>
            <li><Link to={`/admin/animes/${id}/episodes`} className="dropdown-link">Episodes</Link></li>
            <li><Link to={`/admin/animes/${id}/genres`} className="dropdown-link">Genres</Link></li>
            <li><Link to={`/admin/animes/${id}/synopsis`} className="dropdown-link">Synopsis</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
};
