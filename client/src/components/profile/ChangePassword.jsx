import SaverNewPwd from "../Btn";
import { MdSettings } from "react-icons/md";
import { useApiUser } from "../../hooks/useApiUser";
import { useForm } from "react-hook-form";
import { useState } from "react";

function ChangePassword() {
  const { changePassword } = useApiUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const [succed, setSucced] = useState({isError:false, isSuccess:false, message:""});

  const onSubmit = handleSubmit(async (data) => {

    await changePassword(localStorage.getItem("token").toString(), data).then(
      (data) => {
        const { user, res } = data;
        console.log(res,user)
        console.log(user, res);
        if (res === 400) {
          setSucced({isError:true, isSuccess:false, message:user});
        }else if(res === 200){
          setSucced({isError:false, isSuccess:true, message:user});
        }
        reset();
        setTimeout(() => {
          setSucced(false)
        },6000)
      }
    );
  });
  return (
    <>
      <h3 className="profile__title">
        <MdSettings className="profile__title-icon" />
        Settings
      </h3>
      <div className="profile__option-password">
        <h4 className="profile__title">Change Password</h4>
        <form className="profile__form" onSubmit={onSubmit}>
          <label className="profile__label" htmlFor="old_password">
            Current Password
          </label>
          <input
            className="profile__input"
            type="password"
            id="old_password"
            {...register("old_password", {
              required: {
                value: true,
                message: "Please enter your password",
              },
            })}
          />
          {errors.old_password?.message && (
            <p className="profile__error">{errors.old_password.message}</p>
          )}
          <label className="profile__label" htmlFor="new_password">
            New Password
          </label>
          <input
            className="profile__input"
            type="password"
            id="new_password"
            {...register("new_password", {
              required: {
                value: true,
                message: "Please enter your new password",
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message:
                  "must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
              },
              minLength: {
                value: 8,
                message: "password must be at least 8 characters long",
              },
            })}
          />
          {errors.new_password?.message && (
            <p className="profile__error">{errors.new_password.message}</p>
          )}
          <label className="profile__label" htmlFor="confirm_new_password">
            Confirm new Password
          </label>
          <input
            className="profile__input"
            type="password"
            id="confirm_new_password"
            {...register("confirm_new_password", {
              required: {
                value: true,
                message: "please confirm your new password ",
              },
              validate: (value) => {
                if (watch("new_password") !== value) {
                  return "passwords do not match";
                }
                return true;
              },
            })}
          />
          {errors.confirm_new_password?.message && (
            <p className="profile__error">{errors.confirm_new_password.message}</p>
          )}

          {succed.isSuccess && (<p className="profile__message-pwd --success">{succed.message}</p>)}
          {succed.isError && (<p className="profile__message-pwd --error">{succed.message}</p>)}

          <SaverNewPwd text="Save" fn={onSubmit}/>
        </form>
      </div>
    </>
  );
}

export { ChangePassword };
