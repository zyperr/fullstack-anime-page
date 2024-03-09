import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useApiAnimes } from "../../hooks/useApiAnimes";
import { useEffect, useState } from "react";
import { DescriptionImage } from "./DescriptionImage";
import "../../styles/components/home/gallery.css";
import { Link } from "react-router-dom";
function Gallery() {
  const { getSlider } = useApiAnimes();
  const [images, setImages] = useState([]);

  useEffect(() => {
    getSlider().then(({ data }) => {
      setImages(data);
    });
  }, []);

  const pathImg = images.map(({ path, name,path_text,id }) => {
    return { thumbnail: path, original: path, alt: name, original_text:  path_text,id:id};
  });

  return (
    <>
      <ImageGallery
        items={pathImg}
        renderItem={({ original, alt,original_text,id }) => (
          <div key={original} className="image-gallery-container">
            <div className="image-gallery-blur"></div>
            <img className="image-gallery-image" src={original} alt={alt} />
            <DescriptionImage>
              <picture>
                <img className="image-gallery-description-img" src={original_text}/>
              </picture>
            </DescriptionImage>
            <div className="btn_container">
              <Link className="btn" to={`/animes/${alt}/${id}`} >
                  Watch
              </Link>
            </div>
          </div>
        )}
        showPlayButton={false}
        showFullscreenButton={false}
        showThumbnails={false}
        showBullets={true}
        additionalClass="gallery"
      />
    </>
  );
}

export { Gallery };
