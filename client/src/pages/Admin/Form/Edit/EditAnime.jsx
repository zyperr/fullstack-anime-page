import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FormEdit } from "./FormEdit";
import { useApiAnimes } from "../../../../hooks/useApiAnimes";
import "../../../../styles/pages/admin/form/edit/editAnime.css";
export const EditAnime = () => {
  const { getAnime } = useApiAnimes();
  const params = useParams();
  const [anime, setAnime] = useState({});

  const disabled = {
    title: true,
    status: true,
    media_type: true,
    num_episodes: true,
    genres: true,
    synopsis: true,
  };
  useEffect(() => {
    getAnime("http://127.0.0.1:8000/api/animes/", params.id).then((data) =>
      setAnime(data)
    );
  }, []);
  const keys = Object.keys(disabled);
  if (keys.includes(params.name)) {
    disabled[params.name] = false;
  }
  return (
    <section className="edit">

      <FormEdit anime={anime} disabled={disabled} id={params.id} name={params.name}/>
    </section>
  );
};
