import { useParams } from "react-router-dom";
import { useApiAnimes } from "../hooks/useApiAnimes";
import { useEffect, useState } from "react";
import { Paragraph } from "../components/Paragraph";
import { FaHeart } from "react-icons/fa";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import "../styles/pages/animeDetails.css";
import { Link } from "react-router-dom";
function AnimeDetails() {
  const params = useParams();
  const [data, setData] = useState([]);
  const { getAnime,addToFavorites } = useApiAnimes();
  const [showBackBar, setShowBackBar] = useState(false);

  // Un pequeño evento del scroll
  // Para mostrar u ocultar el boton para volver a la pagina de inicio
  // cuando el usuario haga scroll se cambia el valor del useState ShowBackBar a true o false
  // dependiendo de si el scroll es mayor o igual a 100
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const visible = currentScrollPos >= 100;
      setShowBackBar(visible);
    };
    window.addEventListener("scroll", handleScroll);
    if (window.scrollY >= 100) setShowBackBar(false);
  }, []);

  useEffect(() => {
    getAnime("http://127.0.0.1:8000/api/animes/", params.id).then((res) =>
      setData(res)
    );
  }, []);
  const handleFavorite = async () => {
    const {data,res}= await addToFavorites("http://127.0.0.1:8000/api/users/favorites/me",localStorage.getItem("token").toString(), params.id);
    if (res === 200) {
        console.log(data.message)
    }else if(res === 401){
      console.log(data.message)
    }
  }
  return (
    <section className="anime__section" style={{ color: "#00000" }}>
      {/* Este es el componente afectado por el efecto de scroll*/}
      <Link to="/" className={showBackBar ? "anime__back_btn show" : "anime__back_btn"}>
        <FaArrowAltCircleLeft fontSize={20} className="anime__back_btn-icon" />
      </Link>
      <div
        className="anime__banner"
        style={{ backgroundImage: `url(${data.img_url})` }}
      ></div>
      <div className="anime__details">
        <h2 className="anime__details-title">{data.title}</h2>
        <Paragraph>
          <FaHeart fontSize={20} className="anime__details-fav" onClick={handleFavorite}/>
        </Paragraph>
        <Paragraph text={data.status} className={"anime__details-status"} />
      </div>
      <article className="anime__genres">{}</article>
      <article className="anime__synopsis">
        <h4>Synopsis</h4>
        <Paragraph
          className={"anime__synopsis-paragraph"}
          text={data.synopsis}
        />
      </article>
      <article className="anime__episodes">{/* proximo a completar */}</article>
    </section>
  );
}

export { AnimeDetails };
