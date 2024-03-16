import "../styles/components/headerSection.css";
import { useState } from "react";
function HeaderSection({ fnState,initialTap }) {
  const taps = ["animes", "mangas", "manhwas"];
  const [activeIndex, setActiveIndex] = useState(null);

  const handleOnClick = (index) => {
    setActiveIndex(index);
  }
  return (
    <aside className="header-section">
      <menu className="header-section__nav">
        <ul className="nav__list">
          {taps.map((tap,index) => {
            return (
              <li key={tap} className={activeIndex === index || initialTap === tap ? `nav__list-li active ${taps[index]}` : `nav__list-li ${taps[index]}`} onClick={() => {
                handleOnClick(index)
                fnState(tap)
                }}>
                {tap}
              </li>
            );
          })}
        </ul>
      </menu>
    </aside>
  );
}

export { HeaderSection };
