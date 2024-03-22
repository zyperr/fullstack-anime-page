import Label from "../components/LabelComponent";
import SingInBtn from "../components/Btn";
import { Paragraph } from "../components/Paragraph";
import { NavLink } from "react-router-dom";
import UseDocumentTitle from "../hooks/useDoctTitle";
import "../styles/pages/register.css";
import { useForm } from "react-hook-form";
import { useApiUser } from "../hooks/useApiUser";
import { useState } from "react";
function Register() {
  UseDocumentTitle("Register - page");
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setError
  } = useForm();
  const [succed, setSucced] = useState({ isError: false, isSuccess: false, message: "" });
  const { createUser } = useApiUser();

  const onSubmit = handleSubmit(async (data) => {
    const { username, email, password } = data;
    const user = {
      username,
      email,
      password,
    };
    await createUser(user).then((a) => {
      const {userData,status} = a;
      console.log(status,userData)

      if(status === 400){
        setSucced({isError:true, isSuccess:false, message:userData.detail})
      }else if(status === 409){
        setError("username", {
          type: "manual",
          message: userData.detail
        })
      }else if(status === 201 || status === 200){
        setSucced({isError:false, isSuccess:true, message:"Account has been created successfully. You're being redirect to login."})
        setTimeout(() => {
          reset();
          window.location.reload();
          window.location.href = "/user/login";
        },2000)
      }
    });
  });

  return (
    <section className="register">
      <div className="container">
        <div className="register__banner"></div>
        <h2 className="register__title">
          Create an <span className="register__title-span">Account</span>
        </h2>
        <form className="register__form" onSubmit={onSubmit}>
          <div className="container-form">
            <Label text="Username" forHtml="username" />
            <input
              className="input"
              id="username"
              placeholder="Cream_Soda"
              {...register("username", {
                required: {
                  value: true,
                  message: "username is required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]{3,16}$/,
                  message: "Cannot contain spaces",
                },
                minLength: {
                  value: 3,
                  message: "username must be at least 3 characters long",
                },
                maxLength: {
                  value: 16,
                  message: "username cannot be longer than 16 characters",
                },
              })}
            />
            {errors.username?.message && (
              <p className="register__error">{errors.username.message}</p>
            )}
          </div>
          <div className="container-form">
            <Label text="Email" forHtml="user_mail" />
            <input
              type="email"
              className="input"
              id="user_mail"
              placeholder="sDg9@example.com"
              {...register("email", {
                required: {
                  message: "email is required",
                  value: true,
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/,
                  message: "must be a valid address",
                },
              })}
            />
            {errors.email?.message && (
              <p className="register__error">{errors.email?.message}</p>
            )}
          </div>
          <div className="container-form">
            <Label text="Password" forHtml="password" />
            <input
              className="input"
              id="password"
              type="password"
              placeholder="**********"
              {...register("password", {
                required: {
                  message: "password is required",
                  value: true,
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
            {errors.password?.message && (
              <p className="register__error">{errors.password.message}</p>
            )}
          </div>
          <div className="container-form">
            <Label text="Repeat password" forHtml="repeat-password" />
            <input
              className="input"
              id="repeat-password"
              placeholder="**********"
              type="password"
              {...register("repeatPassword", {
                required: {
                  value: true,
                  message: "password is required",
                },
                validate: (value) => {
                  if (watch("password") !== value) {
                    return "passwords do not match";
                  }
                  return true;
                },
              })}
            />
            {errors.repeatPassword?.message && (
              <p className="register__error">{errors.repeatPassword.message}</p>
            )}
          </div>
          <SingInBtn text="Register" fn={() => {}} isDisabled={false}/>
          <div className="container-form">
            <Paragraph
              className={"register__p"}
              text={"Already have an account? "}
            >
              <NavLink to="/user/login">Login</NavLink>
            </Paragraph>
          </div>
        </form>
        {succed.isSuccess && (
          <p className="profile__message-pwd --success">{succed.message}</p>
        )}
        {succed.isError && (
          <p className="profile__message-pwd --error">{succed.message}</p>
        )}
      </div>
    </section>
  );
}

export { Register };
