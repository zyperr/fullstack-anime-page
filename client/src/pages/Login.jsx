import "../styles/pages/login.css";
import Label from "../components/LabelComponent";
import LogInBtn from "../components/Btn";
import { Paragraph } from "../components/Paragraph.jsx";
import { NavLink } from "react-router-dom";
import UseDocumentTitle from "../hooks/useDoctTitle.js";
import { useForm } from "react-hook-form";
import { useApiUser } from "../hooks/useApiUser";
import { useState } from "react";
function Login() {
  UseDocumentTitle("Login - page");
  const { createToken } = useApiUser();
  const [modal, setModal] = useState({
    state: false,
    message: "",
    isError:false
  });

  const errorMessage = {
    incorrect: "Wrong username or password",
    correct: " You have successfully logged in! \n You're being redirect to home",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    const { tokenData, status } = await createToken(
      "http://127.0.0.1:8000/token",
      data.username,
      data.password
    );
    console.log(status,tokenData)
    if (status !== 200) {
      setModal({ state: true, message: errorMessage.incorrect, isError:true });
      setTimeout(() => {
        setModal({ state: false, message: "" });
      },5000)
    }
    if (tokenData === undefined || tokenData === null) return;
    if (status === 200){
      setModal({ state: true, message: errorMessage.correct, isError:false });
      localStorage.setItem("token", tokenData.access_token);
      setTimeout(() => {
        setModal({ state: false, message: "" });
        setTimeout(() => {
          window.location.reload();
          window.location.href = "/";          
        }, 500);
      },2000)
    }
    reset();
  });
  
  return (
    <section className="login">
      <div className="container">
        <div className="login__banner"></div>
        <h2 className="login__title">
          Welcome to <span className="login__title-span">Anime</span>
        </h2>
        <form className="login__form" onSubmit={onSubmit}>
          <div className="container-form">
            <Label text="Username" forHtml="username" />
            <input
              type="text"
              id="username"
              placeholder="canasta_heels2"
              className="input"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="error">
                Username is required
              </p>
            )}
          </div>
          <div className="container-form">
            <Label text="Password" forHtml="password" />
            <input
              type="password"
              id="password"
              placeholder="******"
              className="input"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="error">
                Password is required
              </p>
            )}
          </div>
          <LogInBtn text="Login" />
          <div className="container-form">
            <Paragraph className={"login__p"} text={"Don't have an account? "}>
              <NavLink to="/user/login">Register</NavLink>
            </Paragraph>
          </div>
        </form>
        <div className={modal.state ? "login__header-errors active" : "login__header-errors"}
        style={{backgroundColor: modal.isError ? "var(--color-error)" : "var(--color-success)"}}>
            <div className="login__header-errors-container">
            <span>
              {modal.message}
            </span>
            </div>
        </div>
      </div>
    </section>
  );
}

export { Login };
