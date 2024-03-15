import { BodyTable } from "../../components/Admin/BodyTable";
import { HeadTable } from "../../components/Admin/HeadTable";
import { useApiAnimes } from "../../hooks/useApiAnimes";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Provider";
import "../../styles/pages/admin/adminPanel.css";
import Pagination from "../../components/Pagination";
import { MdAdd, MdDelete } from "react-icons/md";
import { NoResult } from "../../components/Admin/NoResult";
import { HeaderSection } from "../../components/HeaderSection";
import { Link } from "react-router-dom";
export const AdminPanel = () => {
  const { getAnimes } = useApiAnimes();
  const [animes, setAnimes] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const context = useContext(Context);
  const { tap, setTap } = context;

  useEffect(() => {
    getAnimes(`http://127.0.0.1:8000/api/${tap}`, null).then(
      ({ animes, pag }) => {
        setAnimes(animes);
        setPageInfo(pag);
      }
    );
  }, [tap]);
  return (
    <section className="admin-panel">
      <article className="admin-panel__content">
        <aside className="admin-panel__header">
          <button className="btn">
           <Link to="/admin/animes/add" className="btn-link">
              <MdAdd />
           </Link>
          </button>
          <HeaderSection fnState={setTap} />
          <button className="btn">
            <MdDelete />
          </button>
        </aside>
        {animes instanceof Array ? (
          <>
            <table className="admin-panel__table">
              <HeadTable />
              <BodyTable animes={animes} />
            </table>
            <Pagination
              pages={pageInfo.pages}
              dependency={animes}
              set={setAnimes}
              fn={getAnimes}
              tap={tap}
            />
          </>
        ) : (
          <NoResult />
        )}
      </article>
    </section>
  );
};
