import { BodyTable } from "../../components/Admin/BodyTable";
import { HeadTable } from "../../components/Admin/HeadTable";
import "../../styles/pages/adminPanel.css";
export const AdminPanel = () => {
  return (
    <section className="admin-panel">
      <article className="admin-panel__content">
        <table className="admin-panel__table">
          <HeadTable />
          <BodyTable />
        </table>
      </article>
    </section>
  );
};
