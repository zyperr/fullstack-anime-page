import "../styles/pages/login.css"
import Input from "../components/InputComponent"
import Label from "../components/LabelComponent"
import Btn from "../components/Btn"
import { Paragraph } from "../components/Paragraph.jsx"
import { NavLink } from "react-router-dom"
import UseDocumentTitle from "../hooks/useDoctTitle.js"
//todo Agregar una bonita imagen para el banner linea 10
function Login() {
  UseDocumentTitle("Login - page")
  return (
    <section className="login">
      <div className="container">
        <div className="login__banner">
        </div>
        <h2 className="login__title">Welcome to <span className="login__title-span">Anime</span></h2>
        <form className="login__form">

          <div className="container-form">
            <Label text="Email" forHtml="email" />
            <Input type="Email" id="email" placeholder="user@gmail.com" />
          </div>
          <div className="container-form">
            <Label text="Password" forHtml="password" />
            <Input type="password" id="password" placeholder="your password" />
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
  )
}

export { Login }