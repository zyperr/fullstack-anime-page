import "../styles/pages/homepage.css";
import { Gallery } from "../components/gallery";
import UseDocumentTitle from "../hooks/useDoctTitle.js";
import { HeaderSection } from "../components/HeaderSection.jsx";
import { DisplayAnimes } from "../components/DisplayAnimes.jsx";
import imagen from '../assets/img/Hunter-x-HunterPortada1.jpg';
import { Link } from "react-router-dom";

export function HomePage() {
  UseDocumentTitle("Home | look for animes,mangas and manhwas")
  const animes = [
    {
      img: imagen,
      title: "Hunter X Hunter",
      id: "65d324be8cba87d76bf09009",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      img: imagen,
      title: "Hunter X Hunter",
      id: "65d328d38cba87d76bf0900a",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
    ,
  ]

  return (
    <section>
      <Gallery />

      <section>
        <HeaderSection />
        <div className="wrap">
        {
          animes.map(({ img, title, id, description}) => {
            return (
              <Link key={id} to={`/animes/${title}/${id}`}>
                <DisplayAnimes img={img} title={title} description={description}/>
              </Link>
            )
          })
        }
        </div>
      </section>
    </section>
  )
}
