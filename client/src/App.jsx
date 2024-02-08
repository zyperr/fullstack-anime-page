import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { Header } from './components/Header'
import "./styles/index.css"

function App() {

  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element=<HomePage/>/>
        <Route path='*' element=<h1>Not found 404</h1>/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
