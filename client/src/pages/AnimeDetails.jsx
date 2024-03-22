import { useParams } from "react-router-dom";
import { useApiAnimes } from "../hooks/useApiAnimes";
import {useEffect, useState,useContext } from "react";
import { Paragraph } from "../components/Paragraph";
import { FaArrowAltCircleLeft,FaHeart,FaHeartBroken } from "react-icons/fa";
import "../styles/pages/animeDetails.css";
import { Link } from "react-router-dom";
import {UserContext} from "../context/UserProvider";
function AnimeDetails() {
  const  {fav}  = useContext(UserContext);
  const params = useParams();
  const [genres, setGenres] = useState([]);
  const [favorites, setFavorites] = useState([]);
  
  const { getAnime, addToFavorites } = useApiAnimes();
  const [data, setData] = useState({});
  const [showBackBar, setShowBackBar] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({
    state: false,
    message: "",
    addClass: "",
  });
  useEffect(() => {
    const item = fav.map((item) => item._id); 
    setFavorites(item);
  }, [fav]);
  
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
      ({ data }) => {
        setData(data);
        setGenres(data.genres);
      }
    );
  }, []);

  const handleFavorite = async () => {
    const { data, res } = await addToFavorites(
      "http://127.0.0.1:8000/api/users/favorites/me",
      localStorage.getItem("token")?.toString(),
      params.id
    );
    if (res === 401) {
      setDisplayMessage({
        state: true,
        message: data.detail,
        addClass: "error",
      });
      setTimeout(() => {
        setDisplayMessage({ state: false, message: "", addClass: "" });
      }, 4000);
    } else if (res === 200) {
      setDisplayMessage({
        state: true,
        message: data.detail,
        addClass: "success",
      });
      setTimeout(() => {
        setDisplayMessage({ state: false, message: "", addClass: "" });
      }, 4000);
    } else if (res === 409) {
      setDisplayMessage({
        state: true,
        message: data.detail,
        addClass: "warning",
      });
      setTimeout(() => {
        setDisplayMessage({ state: false, message: "", addClass: "" });
      }, 4000);
    }
  };
  return (
    <section className="anime__section" style={{ color: "#00000" }}>
      {displayMessage.state ? (
        <div className={`snack-bar ${displayMessage.addClass}`}>
          <p>{displayMessage.message}</p>
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
          {
            favorites.includes(params.id) ? (
              <FaHeartBroken
                fontSize={20}
                className="anime__details-fav"
                onClick={handleFavorite}
                cursor={"pointer"}
              />
            ) : ( 
              <FaHeart
                fontSize={20}
                className="anime__details-fav"
                onClick={handleFavorite}
                cursor={"pointer"}
              />
            )
          }
        </Paragraph>
        <Paragraph text={data.status} className={"anime__details-status"} />
      </div>
      <article className="anime__genres">
        {genres.map((genre) => (
          <span key={genre} className="anime__genre">
            {genre}
          </span>
        ))}
      </article>
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
