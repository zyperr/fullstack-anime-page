import "../styles/pages/homepage.css"
import { Gallery } from "../components/gallery"
import UseDocumentTitle from "../hooks/useDoctTitle.js"

export function HomePage() {
  UseDocumentTitle("Home | look for animes,mangas and manhwas")
  return (
    <section>
        <Gallery/>
    </section>
  )
}
