/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Inicio from "./pages/Inicio"
// import Header from "./components/Header"
// import NavBar from "./components/NavBar"
import Ventas from "./pages/Ventas"
import Login from "./pages/Login"
import {ProtectedRoute}  from "./components/ProtectedRoute"
import DetalleVenta from "./pages/DetalleVenta"

function App() {

  return (
    <Router>
      {/* <Header/>
      <NavBar/> */}
      <Routes>
        <Route index element={<Login />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/app" element={<ProtectedRoute />}>
          <Route path="/app/inicio" element={<Inicio />} />
          <Route path="/app/ventas" element={<Ventas />} /> 
          <Route path="/app/ventas/:id" element={<DetalleVenta />} /> 
        </Route>
      </Routes>
    </Router>
  )
}

export default App
