import { useParams } from "react-router-dom";
import { useApiAnimes } from "../hooks/useApiAnimes";
import { useEffect, useState } from "react";
import { Paragraph } from "../components/Paragraph";
import { FaHeart } from "react-icons/fa";
import "../styles/components/animeDetails.css"
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
      <div className="anime__banner" style={{backgroundImage:`url(${data.img_url})`}}></div>
      <div className="anime__details">
        <h2 className="anime__details-title">{data.title}</h2>
        <Paragraph >
          <FaHeart fontSize={20} className="anime__details-fav"/>
        </Paragraph>
        <Paragraph text={data.status} className={"anime__details-status"}/>
      </div>
      <article className="anime__genres">
        {
          
        }
      </article>
      <article className="anime__synopsis">
        <h4>Synopsis</h4>
        <Paragraph className={"anime__synopsis-paragraph"} text={data.synopsis} />
      </article>
      <article className="anime__episodes">
        {/* proximo a completar */}
      </article>
    </section>
  );
}

export { AnimeDetails };
