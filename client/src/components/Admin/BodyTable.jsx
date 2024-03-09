import { useApiAnimes } from "../../hooks/useApiAnimes";
import { useEffect, useState } from "react";
import { Dropdown } from "./Dropdown";
export const BodyTable = () => {
  const { getAnimes } = useApiAnimes();
  const [animes, setAnimes] = useState([]);
  useEffect(() => {
    getAnimes("http://127.0.0.1:8000/api/animes").then(({ animes }) => {
      setAnimes(animes);
    });
  }, []);
  return (
    <>
      <tbody className="admin-panel__table-body">
        {animes.map((anime) => {
          return (
            <tr className="admin-panel__table-row" key={anime._id}>
              <td>
                <img src={anime.img_url} alt={anime.title} />
              </td>
              <td>{anime.title}</td>
              <td>{anime.status}</td>
              <td>{anime.media_type}</td>
              <td>{anime.num_episodes}</td>
              <td>
                {anime.genres.map((item, index) => (
                  <span className="admin-panel__span" key={`${item}_${index}`}>
                    {item}
                  </span>
                ))}
              </td>
              <td className="admin-panel__synopsis" title={anime.synopsis}>
                {anime.synopsis}
              </td>
              <td>
                <Dropdown id={anime._id}/>
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
};
