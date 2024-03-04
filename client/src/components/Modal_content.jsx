/* eslint-disable react/prop-types */
function Modal_content({
    banners,
    imgData,
    handleSelect,}) {
  return (
    <div className="profile__banners-container">
      {Object.entries(
        banners.reduce((acc, banner) => {
          if (!acc[banner.category]) {
            acc[banner.category] = [];
          }
          acc[banner.category].push(banner);
          return acc;
        }, {})
      ).map(([category, banners]) => (
        <div key={category}>
          <h3 className="profile__banner-text-category">{category}</h3>
          <div className="profile__banners__default-category">
            {banners.map((banner, index) => (
              <div
                key={banner.name}
                className={
                  imgData.index === banner.path
                    ? "profile__banners-item active"
                    : "profile__banners-item"
                }
              >
                <figure className="profile__banners-img">
                  <img src={banner.path} className="profile__banners-img" />
                </figure>
                <div
                  className="selectable-area"
                  data-src={banner.path}
                  onClick={(e) => handleSelect(index, e)}
                ></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export{Modal_content};
