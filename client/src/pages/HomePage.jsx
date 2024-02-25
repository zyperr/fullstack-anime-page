import "../styles/pages/homepage.css";
import { Gallery } from "../components/gallery";
import UseDocumentTitle from "../hooks/useDoctTitle.js";
import { HeaderSection } from "../components/HeaderSection.jsx";
import { DisplayAnimes } from "../components/DisplayAnimes.jsx";
import { useApiAnimes } from "../hooks/useApiAnimes.js";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";





export function HomePage() {
  UseDocumentTitle("Home | look for animes,mangas and manhwas")

  const [dataAnimes, setDataAnimes] = useState([]);
  const { getAnimes } = useApiAnimes()

  useEffect(() => {
    getAnimes("http://127.0.0.1:8000/api/animes/").then((res) => {
      setDataAnimes(res);
    });

  },[]);


  return (
    <section className="blur">
      <Gallery />

      <section>
        <HeaderSection />
        <div className="wrap">
          {
            dataAnimes.map((item) => {
              return (
                <Link key={item.title} to={`/animes/${item.title}/${item._id}`}>
                  <DisplayAnimes img={item.img_url} title={item.title}></DisplayAnimes>
                </Link>
              )
            })
          }
        </div>
      </section>
    </section>
  )
}
