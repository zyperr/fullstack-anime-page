import "../styles/components/headerSection.css";

function HeaderSection({ fnState }) {
  const taps = ["animes", "mangas", "manhwas"];

  return (
    <aside className="header-section">
      <menu className="header-section__nav">
        <ul className="nav__list">
          {taps.map((tap) => {
            return (
              <li key={tap} className="nav__list-li" onClick={() => fnState(tap)}>
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
