import "../styles/pages/login.css";
import Label from "../components/LabelComponent";
import Btn from "../components/Btn";
import { Paragraph } from "../components/Paragraph.jsx";
import { NavLink } from "react-router-dom";
import UseDocumentTitle from "../hooks/useDoctTitle.js";
import { VscWarning } from "react-icons/vsc";
import { useForm } from "react-hook-form";
import {useApiUser} from "../hooks/useApiUser";
function Login() {
  UseDocumentTitle("Login - page");
  const {createToken} = useApiUser();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
      await createToken("http://127.0.0.1:8000/token",data.username,data.password).then((data)=>{
       localStorage.setItem("token",data.access_token)
      })
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
              placeholder="user@gmail.com"
              className="input"
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="error">
                <VscWarning />
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
                <VscWarning />
                Password is required
              </p>
            )}
          </div>
          <Btn text="Login" />
          <div className="container-form">
            <Paragraph className={"login__p"} text={"Don't have an account? "}>
              <NavLink to="/user/login">Register</NavLink>
            </Paragraph>
          </div>
        </form>
      </div>
    </section>
  );
}

export { Login };
