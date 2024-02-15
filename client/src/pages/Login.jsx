import "../styles/pages/login.css"
import Input from "../components/InputComponent"
import Label from "../components/LabelComponent"
import Btn from "../components/Btn"

//todo Agregar una bonita imagen para el banner linea 10
function Login() {
  return (
    <section className="login">
        <div className="login__banner">
        </div>
        <h2 className="login__title">Welcome to <span className="login__title-span">Anime</span></h2>
        <form className="login__form">

          <div className="container">
            <Label text="Email" forHtml="email"/>
            <Input type="Email" id="email" placeholder="user@gmail.com"/>
          </div>
          <div className="container">
            <Label text="Password" forHtml="password"/>
            <Input type="password" id="password" placeholder="your password"/>
          </div>
          <Btn text="Login"/>
        </form>
    </section>
  )
}

export {Login}