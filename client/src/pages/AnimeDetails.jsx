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
  const { getAnime, addToFavorites } = useApiAnimes();
  const [showBackBar, setShowBackBar] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

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
    getAnime(`http://127.0.0.1:8000/api/${params.type}/`, params.id).then(
      ({ data }) => setData(data)
    );
  }, []);
  const handleFavorite = async () => {
    if (!localStorage.getItem("token")) {
      setIsAuth(true);
      setTimeout(() => {
        setIsAuth(false);
      }, 4000);

    }
    const { data, res } = await addToFavorites(
      "http://127.0.0.1:8000/api/users/favorites/me",
      localStorage.getItem("token").toString(),
      params.id
    );
    if (res === 200) {
      setIsAuth(false);
      console.log(data.message);
    } else if (res === 401) {
      console.log(data.message);
    }
  };
  return (
    <section className="anime__section" style={{ color: "#00000" }}>
      {isAuth ? (
        <div className="anime__title not-auth">
          <p>It&apos;s seems that you don&apos;t have an account</p>
          <p>Go and create one <Link to="/user/register">Register</Link></p>
        </div>
      ) : null}
      {/* Este es el componente afectado por el efecto de scroll*/}
      <Link
        to=".."
        className={showBackBar ? "anime__back_btn show" : "anime__back_btn"}
      >
        <FaArrowAltCircleLeft fontSize={20} className="anime__back_btn-icon" />
      </Link>

      <div
        className="anime__banner"
        style={{ backgroundImage: `url(${data.img_url})` }}
      ></div>
      <div className="anime__details">
        <h2 className="anime__details-title">{data.title}</h2>
        <Paragraph>
          <FaHeart
            fontSize={20}
            className="anime__details-fav"
            onClick={handleFavorite}
          />
        </Paragraph>
        <Paragraph text={data.status} className={"anime__details-status"} />
      </div>
      <article className="anime__genres">{/*** proximo a completar */}</article>
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
