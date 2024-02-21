import Label from "../components/LabelComponent";
import Btn from "../components/Btn";
import { Paragraph } from "../components/Paragraph";
import { NavLink } from "react-router-dom";
import UseDocumentTitle from "../hooks/useDoctTitle";
import "../styles/pages/register.css";
function Register() {
  UseDocumentTitle("Register - page");
  return (
    <section className="register">
      <div className="container">
        <div className="register__banner"></div>
        <h2 className="register__title">
          Create an <span className="register__title-span">Account</span>
        </h2>
        <form className="register__form">
          <div className="container-form">
            <Label text="Username" forHtml="username"  />
            <input className="input"id="username" placeholder="Zyperr"/>
          </div>
          <div className="container-form">
            <Label text="Password" forHtml="password" />
            <input  className="input" id="password" placeholder="**********"/>
          </div>
          <div className="container-form">
            <Label text="Repeat password" forHtml="repeat-password" />
            <input  className="input" id="repeat-password" placeholder="**********"/>
          </div>
          <Btn text="Register" />
          <div className="container-form">
            <Paragraph
              className={"register__p"}
              text={"Already have an account? "}
            >
              <NavLink to="/user/login">Login</NavLink>
            </Paragraph>
          </div>
        </form>
      </div>
    </section>
  );
}

export { Register };
