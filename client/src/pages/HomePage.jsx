import "../styles/pages/homepage.css"
import { Gallery } from "../components/Gallery";
import { HeaderSection } from "../components/HeaderSection";

export function HomePage() {

  return (
    <section>
      <Gallery />
      <HeaderSection />
    </section>
  )
}
