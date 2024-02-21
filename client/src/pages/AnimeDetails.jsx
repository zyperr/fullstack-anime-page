import { useParams } from "react-router-dom";
import { useApiAnimes } from "../hooks/useApiAnimes";
import { useEffect, useState } from "react";
import { Paragraph } from "../components/Paragraph";
import { FaHeart } from "react-icons/fa";
function AnimeDetails() {
  const params = useParams();
  const [data, setData] = useState([]);
  const { getAnime } = useApiAnimes();

  useEffect(() => {
    getAnime("http://127.0.0.1:8000/api/animes/", params.id).then((res) =>
      setData(res)
    );
  }, []);
  console.log(data);
  
  return (
    <section className="anime__section" style={{color:"#00000"}}>
      <div className="anime__poster"></div>
      <div className="anime__details">
        <h1 className="anime__details-title">{data.title}</h1>
        <Paragraph text="Agregar a favoritos">
          <FaHeart fontSize={20} />
        </Paragraph>
        <Paragraph text={data.status} />
      </div>
      <article className="anime__genras">
      {
        data.genres.map((genre,index) => (
          <Paragraph key={index} text={genre} />
        ))
      }
      </article>
      <article className="anime__synopsis">
        <Paragraph text={data.synopsis} />
      </article>
      <span>
        {data.num_episodes}
      </span>
    </section>
  );
}

export { AnimeDetails };
