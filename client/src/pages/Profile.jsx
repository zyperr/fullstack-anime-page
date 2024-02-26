/* eslint-disable react/prop-types */
import "../styles/pages/profile.css";
import { useApiUser } from "../hooks/useApiUser";
import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { Modal } from "../components/Modal";
import SavedButton from "../components/Btn";
import CancelButton from "../components/Btn";
function Profile({ data }) {
  const { getBanners } = useApiUser();
  const [bannerModal, setBannerModal] = useState(true);
  const [bannerData, setBannerData] = useState({banner_profile:"",state:false});
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    getBanners("http://127.0.0.1:8000/api/banners").then((res) => {
      setBanners(res);
    });
  }, []);

  const handleModal = (e) => {
    setBannerModal(!bannerModal);
  }
  const handleSelect = (e) => {
    console.log(e)
    setBannerData({...bannerData,banner_profile:e.target.value,state:!bannerData.state})
  }
  console.log(bannerData)
  return (
    <>
      <section className="profile">
        <article className="profile__header__account">
          <div className="profile__banner">
            <img
              className="profile__banner-img"
              src={data.banner_profile}
              alt={`banner of ${data.username}`}
            />
            <div className="editable-banner" onClick={handleModal}>
              <span className="editable-banner__text">Edit your banner</span>
            </div>
            <div className="profile__banner-edit">
              <MdOutlineEdit className="profile__banner-edit-icon" onClick={handleModal}/>
            </div>
          </div>
          <div className="profile__account-info">
            <div className="profile__user-wrapper">
              <div className="profile__avatar-wrapper">
                <div className="profile__avatar">
                  <div className="profile__account-img" >
                    <figure className="profile__account-img-container">
                      <picture className="profile__account-picture">
                        <img
                          src={data.avatar}
                          className="profile__account-img"
                          alt="avatar of a monkey with a strawhat"
                        />
                      </picture>
                    </figure>
                    <div className="profile__avatar-edit">
                      <MdOutlineEdit className="profile__avatar-edit-icon" />
                    </div>
                    <div className="editable-avatar">
                      <span className="editable-avatar__text">Edit</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="profile__user-wrapper">
                <h2 className="profile__name">{data.username}</h2>
              </div>
            </div>
          </div>
        </article>
        <Modal className={bannerModal ? "profile__modal" : "profile__modal active"}>
          <div className="profile__modal-container">
            <div className="profile__banner">
              <img
                className="profile__banner-img"
                src={data.banner_profile}
                alt={`banner of ${data.username}`}
              />
            </div>
            <div className="profile__banner-btn-wrapper">
              <h3 className="profile__banner-text">Select you banner image</h3>
            </div>
            <div className="profile__banner-btn-wrapper">
              <SavedButton
                text="Saved Banner"
                fn={() => {}}
                isDisabled={true}
              />
              <CancelButton text="Cancel" fn={handleModal} />
            </div>
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
                    {banners.map((banner) => (
                      <div key={banner.name} className={bannerData.state ? "profile__banners-item active" :"profile__banners-item"}>
                        <figure className="profile__banners-img">
                          <img
                            src={banner.path}
                            className="profile__banners-img"
                          />
                        </figure>
                        <div className="selectable-area" onClick={(e) => handleSelect(e)}></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      </section>
    </>
  );
}

export { Profile };
