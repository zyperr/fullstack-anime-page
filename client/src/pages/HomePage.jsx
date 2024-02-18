import "../styles/pages/homepage.css";
import { Gallery } from "../components/gallery";
import UseDocumentTitle from "../hooks/useDoctTitle.js";
import { HeaderSection } from "../components/HeaderSection.jsx";
import { DisplayAnimes } from "../components/DisplayAnimes.jsx";
import imagen from '../assets/img/Hunter-x-HunterPortada1.jpg';

export function HomePage() {
  UseDocumentTitle("Home | look for animes,mangas and manhwas")
  return (
    <section>
      <Gallery />

      <section>
        <HeaderSection />
        <div className="wrap">
          <DisplayAnimes  title={"Hunter X Hunter"} img={imagen} />
          <DisplayAnimes  title={"Hunter X Hunter"} img={imagen} />
          <DisplayAnimes  title={"Hunter X Hunter"} img={imagen} />
          <DisplayAnimes  title={"Hunter X Hunter"} img={imagen} />
          <DisplayAnimes  title={"Hunter X Hunter"} img={imagen} />
          <DisplayAnimes  title={"Hunter X Hunter"} img={imagen} />
          <DisplayAnimes  title={"Hunter X Hunter"} img={imagen} />
        </div>
      </section>
    </section>
  )
}
