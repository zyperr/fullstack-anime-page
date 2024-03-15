import "../styles/pages/homepage.css";
import { Gallery } from "../components/home/Gallery.jsx";
import UseDocumentTitle from "../hooks/useDoctTitle.js";
import { HeaderSection } from "../components/HeaderSection.jsx";
import { DisplayAnimes } from "../components/DisplayAnimes.jsx";
import { useApiAnimes } from "../hooks/useApiAnimes.js";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Pagination from "../components/Pagination.jsx";
import { Context } from "../context/Provider.jsx";
import { NoResult } from "../components/Admin/NoResult.jsx";
export function HomePage() {
  UseDocumentTitle("Home | look for animes,mangas and manhwas");
  const { tap, setTap } = useContext(Context);
  const [dataAnimes, setDataAnimes] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const { getAnimes } = useApiAnimes();
  
  useEffect(() => {
    getAnimes(`http://127.0.0.1:8000/api/${tap}/`, null).then(
      ({ animes, pag }) => {
        setDataAnimes(animes);
        setPageInfo(pag);
      }
    );
  }, [tap]);

  return (
    <section className="home">
      <Gallery />

      <section>
        <HeaderSection fnState={setTap} />
        <div className="wrapper-grid">
          {dataAnimes instanceof Array && dataAnimes.length > 0 ? (
            dataAnimes.map((item) => {
              return (
                <Link key={item.title} to={`/${tap}/${item.title}/${item._id}`}>
                  <DisplayAnimes
                    img={item.img_url}
                    title={item.title}  
                    type={item.media_type}
                  />
                </Link>
              );
            })
          ) : (
            <NoResult />
          )}
        </div>
        <Pagination
          pages={pageInfo.pages}
          dependency={dataAnimes}
          set={setDataAnimes}
          fn={getAnimes}
          tap={tap}
        />
      </section>
    </section>
  );
}
