import DeleteBtn from "../Btn";
import ConfirmDelete from "../Btn";
import CancelBtn from "../Btn";

import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import { useApiUser } from "../../hooks/useApiUser";
function DeleteAccount() {
  const { deleteUser } = useApiUser();
  const [succed, setSucced] = useState({isError:false, isSuccess:false, message:""});
  const [deleteAcc, setDeleteAcc] = useState({
    open: false,
    msg: "",
    isDisabled: true,
  });
  const handleMenu = () => {
    setDeleteAcc((prevState) => ({ ...prevState, open: !deleteAcc.open }));
  };
  const handleDelete = async () => {
    const { user, res } = await deleteUser();
    if (res === 200) {
      setSucced({isError:false, isSuccess:true, message:user});
    }else{
      setSucced({isError:true, isSuccess:false, message:user});
    }
    setTimeout(() => {
      setSucced({isError:false, isSuccess:true, message:"You're being redirect"});
      window.location.href = "/user/register";
      window.location.reload();
    },2000)
    setTimeout(() => {
      setSucced({isError:false, isSuccess:false, message:""});
      setDeleteAcc({ open: false, msg: "", isDisabled: true });
    },6000)
  };
  useEffect(() => {
    if(deleteAcc.msg === "CONFIRM"){
      setDeleteAcc(prevState => ({...prevState,isDisabled:false}))
    }else{
      setDeleteAcc(prevState => ({...prevState,isDisabled:true}))
    }
  }, [deleteAcc.msg]);

  return (
    <article className="profile__wrapper profile__option">
      <div className="profile__option-container">
        <div className="profile__option-delete">
          <h3 className="profile__title">
            <MdDelete className="profile__title-icon --delete" />
            Delete Account
          </h3>
          <DeleteBtn text={"Delete Account"} fn={handleMenu} />
        </div>
      </div>
      <div
        className={
          deleteAcc.open
            ? "profile__container-delete active"
            : "profile__container-delete"
        }
      >
        <div className="profile__container">
          <h3 className="profile__title">
            Are you sure you want to delete your account?
          </h3>
          <div className="profile__container-btn">
            <input
              type="text"
              placeholder={"CONFIRM"}
              className="profile__input"
              onChange={(e) =>
                setDeleteAcc({ ...deleteAcc, msg: e.target.value })
              }
            />
            <p className="profile__input-confirm">
              Please write your confirm to delete your account
            </p>
          </div>
          <div className="profile__container-btn">
            <ConfirmDelete
              text={"Delete Account"}
              isDisabled={deleteAcc.isDisabled}
              fn={handleDelete}
            />
            <CancelBtn text={"Cancel"} fn={handleMenu} />
          </div>
        </div>

        {succed.isSuccess && (
          <p className="profile__message-pwd --success">{succed.message}</p>
        )}
        {succed.isError && (
          <p className="profile__message-pwd --error">{succed.message}</p>
        )}
      </div>
    </article>
  );
}

export { DeleteAccount };
