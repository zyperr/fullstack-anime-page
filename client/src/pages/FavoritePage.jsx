/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"
import { DisplayAnimes } from "../components/DisplayAnimes"




export function FavoritePage({ data }) {
    return (
        <section className="home_container">
            <div className="wrapper-grid">

                {
                    data.length === 0 ? <h2 className="noResult">Your favorite is empty.  You should add one or more</h2> :
                    data.map((anime) => {

                        return (
                            <Link key={anime._id} to={`/${anime.media_type === "TV" || anime.media_type === "OVA" || anime.media_type === "Movie" ? "animes" : `${anime.media_type}s` }/${anime.title}/${anime._id}`}>
                                <DisplayAnimes key={anime._id} title={anime.title} img={anime.img_url} type={anime.media_type} />
                            </Link>
                        )
                    })
                }
            </div>

        </section>

    )

}