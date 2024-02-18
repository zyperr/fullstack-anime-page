import Label from "../components/LabelComponent"
import Input from "../components/InputComponent"
import Btn from "../components/Btn"
import { Paragraph } from "../components/Paragraph"
import { NavLink } from "react-router-dom"
import UseDocumentTitle from "../hooks/useDoctTitle"
import "../styles/pages/register.css"
function Register() {
  UseDocumentTitle("Register - page")

  return (
    <section className="register">
        <div className="register__banner">
        </div>
        <h2 className="register__title">Create an <span className="register__title-span">Account</span></h2>
        <form className="register__form">
          <div className="container">
            <Label text="Email" forHtml="email"/>
            <Input type="Email" id="email" placeholder="Pepito200FullBox@gmail.com"/>
          </div>
          <div className="container">
            <Label text="Password" forHtml="password"/>
            <Input type="password" id="password" placeholder="your password"/>
            <Paragraph className={"register__p-tip"} text={"Your password must be at least 6 characters long"}/>
          </div>
          <Btn text="Register"/>
          <div className="container">
            <Paragraph className={"register__p"} text={"Already have an account? "}>
                <NavLink to="/user/login">Login</NavLink>
            </Paragraph>
          </div>
        </form>
    </section>
  )
}

export {Register}