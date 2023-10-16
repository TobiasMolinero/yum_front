/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Inicio from "./pages/Inicio"
import Ventas from "./pages/Ventas"
import Login from "./pages/Login"
import {ProtectedRoute}  from "./components/ProtectedRoute"
import DetalleVenta from "./pages/DetalleVenta"
import Gastos from "./pages/Gastos"
import Clientes from "./pages/Clientes"

function App() {

  return (
    <Router>
      <Routes>
        <Route index element={<Login />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/app" element={<ProtectedRoute />}>
          <Route path="/app/inicio" element={<Inicio />} />
          <Route path="/app/ventas" element={<Ventas />} /> 
          <Route path="/app/ventas/:id" element={<DetalleVenta />} /> 
          <Route path="/app/gastos" element={<Gastos />} />
          <Route path="/app/clientes" element={<Clientes />} /> 
        </Route>
      </Routes>
    </Router>
  )
}

export default App
