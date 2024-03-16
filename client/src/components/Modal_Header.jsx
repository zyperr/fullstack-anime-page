/* eslint-disable react/prop-types */
import SavedButton from "../components/Btn";
import CancelButton from "../components/Btn";

function Modal_Header({
  src,
  imgData,
  setImgData,
  handleModal,
  handleSaved,
  alt,
}) {
  const body = document.querySelector("body");
  return (
    <div className="profile__wrapper">
      <div className="profile__banner">
        <img
          className="profile__banner-img"
          src={
            imgData.isSelected !== imgData.state
              ? imgData.img_profile
              : src
          }
          alt={`banner of ${alt}`}
        />
      </div>
      <div className="profile__banner-btn-wrapper">
        <h3 className="profile__banner-text">Select you banner image</h3>
        <div className="profile__banner-btn-container">
          <SavedButton
            text="Saved"
            fn={() => handleSaved(imgData.img_profile)}
            isDisabled={imgData.isSelected === imgData.state}
          />
          <CancelButton
            text="Cancel"
            fn={() => {
              handleModal();
              body.style.overflow = "auto";
              setImgData({
                img_profile: src,
                state: false,
                index: 0,
                isSelected: false,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export { Modal_Header };
