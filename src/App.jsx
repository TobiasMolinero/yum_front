/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Inicio from "./pages/Inicio"
// import Header from "./components/Header"
// import NavBar from "./components/NavBar"
import Ventas from "./pages/Ventas"
import Login from "./pages/Login"

function App() {

  return (
    <Router>
      {/* <Header/>
      <NavBar/> */}
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/inicio" element={<Inicio/>}/>
        <Route path="/ventas" element={<Ventas/>}/>
      </Routes>
    </Router>
  )
}

export default App
