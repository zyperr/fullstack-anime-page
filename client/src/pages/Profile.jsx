/* eslint-disable react/prop-types */
import "../styles/pages/profile.css";
import { useApiUser } from "../hooks/useApiUser";
import { useEffect, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import { Modal } from "../components/Modal";
import { Modal_content } from "../components/Modal_content";
import { Modal_Header } from "../components/Modal_Header";
import UseDocumentTitle from "../hooks/useDoctTitle";
import { ChangePassword } from "../components/profile/ChangePassword";
import { DeleteAccount } from "../components/profile/DeleteAccount";

function Profile({ data }) {
  UseDocumentTitle(`Profile - ${data.username}`);
  const { getBanners, putAvatar, putBanner, getAvatars } = useApiUser();
  const [bannerModal, setBannerModal] = useState({
    banner: true,
    avatar: true,
  });

  //Usestate para las apicalls
  const [banners, setBanners] = useState([]);
  const [avatars, setAvatars] = useState([]);
  //Usestate para manejar los datos para asi guardarlos
  const [imgData, setImgData] = useState({
    img_profile: "",
    state: false,
    index: 0,
    isSelected: false,
  });
  useEffect(() => {
    async function promiseApiCalls() {
      await getBanners("http://127.0.0.1:8000/api/banners").then((res) => {
        setBanners(res);
      });
      await getAvatars("http://127.0.0.1:8000/api/avatars").then((res) => {
        setAvatars(res);
      });
    }
    promiseApiCalls();
  }, []);

  const handleSavedBanner = async (banner_src) => {
    const { res } = await putBanner(banner_src, localStorage.getItem("token"));
    if (res === 200) {
      window.location.reload();
    }
  };
  const handleSavedAvatar = async (avatar_src) => {
    const { res } = await putAvatar(avatar_src, localStorage.getItem("token"));
    if (res === 200) {
      window.location.reload();
    }
  };
  const handleModalBanner = () => {
    setBannerModal({ ...bannerModal, banner: !bannerModal.banner });
  };
  const handleAvatarModal = () => {
    setBannerModal({ ...bannerModal, avatar: !bannerModal.avatar });
  };
  const handleSelect = (index, e) => {
    console.log(e);
    console.log(index);
    setImgData({
      img_profile: e.target.dataset.src,
      index: e.target.dataset.src,
      isSelected: !imgData.isSelected,
      state: !!imgData.isSelected,
    });
  };
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
            <div className="editable-banner" onClick={handleModalBanner}>
              <span className="editable-banner__text">Edit your banner</span>
            </div>
            <div className="profile__banner-edit">
              <MdOutlineEdit
                className="profile__banner-edit-icon"
                onClick={handleModalBanner}
              />
            </div>
          </div>
          <div className="profile__account-info">
            <div className="profile__user-wrapper">
              <div className="profile__avatar-wrapper">
                <div className="profile__avatar">
                  <div className="profile__account-img">
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
                    <div
                      className="editable-avatar"
                      onClick={handleAvatarModal}
                    >
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
        <article className="profile__wrapper profile__option">
          <div className="profile__option-container">
            <ChangePassword />
            <DeleteAccount />
          </div>
        </article>
        <Modal
          className={
            bannerModal.banner ? "profile__modal" : "profile__modal active"
          }
        >
          <div className="profile__modal-container">
            <Modal_Header
              handleModal={handleModalBanner}
              imgData={imgData}
              src={data.banner_profile}
              alt={data.username}
              handleSaved={handleSavedBanner}
              setImgData={setImgData}
            />
            <Modal_content
              banners={banners}
              imgData={imgData}
              setImgData={setImgData}
              handleSelect={handleSelect}
            />
          </div>
        </Modal>
        <Modal
          className={
            bannerModal.avatar
              ? "profile__modal-avatar"
              : "profile__modal-avatar active"
          }
        >
          <div className="profile__modal-container">
            <Modal_Header
              handleModal={handleAvatarModal}
              imgData={imgData}
              src={data.avatar}
              alt={data.username}
              handleSaved={handleSavedAvatar}
              setImgData={setImgData}
            />
            <Modal_content
              banners={avatars}
              imgData={imgData}
              setImgData={setImgData}
              handleSelect={handleSelect}
            />
          </div>
        </Modal>
      </section>
    </>
  );
}

export { Profile };
