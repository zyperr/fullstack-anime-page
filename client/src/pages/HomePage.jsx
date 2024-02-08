import "../styles/pages/homepage.css"
export function HomePage() {
  return (
    <section>
      
      <article>
        <h3>Animes</h3>
        <div>
          <figure>
            <picture>
              <source srcSet type="image/jpe"/>
              <img src="https://www.crunchyroll.com/imgsrv/display/thumbnail/480x720/catalog/crunchyroll/5e7f533c3b4f46244ca228af62e83dfa.jpe"/>
            </picture>
          </figure>
        </div>
      </article>
      <article>
        <h3>Mangas</h3>
        <div>
          <figure>
            <picture>
              <source srcSet type="image/webp"/>
              <img src="https://otakuteca.com/images/books/cover/5bc7cb37a8df5.webp"/>
            </picture>
          </figure>
        </div>
      </article>
      <article>
        <h3>Manhwas</h3>
         <div>
          <figure>
            <picture>
              <source srcSet type="image/webp"/>
              <img src="https://otakuteca.com/images/books/cover/5c2efcd42cd5e.webp"/>
            </picture>
          </figure>
        </div>
      </article>
    </section>
  )
}
