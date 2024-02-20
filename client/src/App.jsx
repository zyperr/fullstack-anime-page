import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Header } from './components/Header'
import "./styles/index.css"
import { AnimeDetails } from './pages/AnimeDetails'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element=<HomePage/>/>
        <Route path='/user/login' element=<Login/>/>
        <Route path="user/register" element=<Register/>/>
        <Route path='/animes/:title/:id' element=<AnimeDetails/> />
        <Route path='*' element=<h1>Not found 404</h1>/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
