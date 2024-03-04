/* eslint-disable react/prop-types */

import "../styles/components/displayAnimes.css"


export function DisplayAnimes({ img, title }) {
    return (
        <div className="displayAnimes-section__container">
            <figure className="figure-container">
                <img className="displayAnimes__anime-img" src={img}></img>
                <h3 className="displayAnimes__anime-title" title={title}>{title}</h3>
            </figure>
        </div>
    )
}