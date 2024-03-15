import { useEffect, useState } from "react";
import "../styles/components/pagination.css";
function Pagination({ pages, dependency, set, fn, tap }) {
  const [pageItems, setPagItems] = useState([]);
  useEffect(() => {
    const items = [];
    for (let i = 1; i <= pages; i++) {
      items.push(
        <li key={i} className="pagination__li">
          <a
            className="pagination__link"
            onClick={(e) => {
              e.preventDefault();
              fn(`http://127.0.0.1:8000/api/${tap}`, e.target.text).then(
                ({ animes }) => set(animes)
              );
            }}
          >
            {i}
          </a>
        </li>
      );
    }
    setPagItems(items);
  }, [dependency]);
  return <ul className="pagination">{pageItems.map((item) => item)}</ul>;
}

export default Pagination;
