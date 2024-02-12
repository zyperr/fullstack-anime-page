import ImageGallery from "react-image-gallery"
import "react-image-gallery/styles/css/image-gallery.css";

function Gallery() {
    const images = [
        {
          original: "https://picsum.photos/id/1018/1000/600/",
          thumbnail: "https://picsum.photos/id/1018/250/150/",
        },
        {
          original: "https://picsum.photos/id/1015/1000/600/",
          thumbnail: "https://picsum.photos/id/1015/250/150/",
        },
        {
          original: "https://picsum.photos/id/1019/1000/600/",
          thumbnail: "https://picsum.photos/id/1019/250/150/",
        },
        
      ];
  return (
    <>
    <ImageGallery items={images} showPlayButton={false} showFullscreenButton={false} showThumbnails={false}
      showBullets={true}
    />
    </>
  )
}

export { Gallery} 
