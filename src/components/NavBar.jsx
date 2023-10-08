/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {  useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/NavBar.css'
import iconInicio from '../assets/inicio.png'
import iconVentas from '../assets/ventas.png'
import iconGastos from '../assets/gastos.png'
import iconCaja from '../assets/caja.png'
import iconLogout from '../assets/logout.png'

const NavBar = () => {

const [showNav, setShowNav] = useState(false)

const openMenu = () => {
  setShowNav(true)
}

const closeMenu = () => {
  setShowNav(false)
}

  return (
    <>
        <button className='boton-abrir' onClick={openMenu}><i className="bi bi-list"></i></button>
        <div className={showNav ? 'navbar' : 'navbar_closed'}>
          <div className="container-boton">
            <button className='boton-cerrar' onClick={closeMenu}><i className="bi bi-x-lg" hidden={showNav ? false : true}></i></button>
          </div>
          <h3>Menú</h3>
          <hr />
          <div className='nav'>
            <nav>
              <ul>
                <li><img className='nav-icon' src={iconInicio} alt="" /><Link className='nav-link' onClick={closeMenu} to='/inicio'>Inicio</Link></li>
                <li><img className='nav-icon' src={iconVentas} alt="" /><Link className='nav-link' onClick={closeMenu} to='/ventas'>Ventas</Link></li>
                <li><img className='nav-icon' src={iconGastos} alt="" />Gastos</li>
                <li><img className='nav-icon' src={iconCaja} alt="" />Clientes</li>
              </ul>
            </nav>
            <div className='logout'>
              <p><img className='nav-icon' src={iconLogout} alt="" />Cerrar sesión</p>
            </div>
          </div>
        </div>
    </>
  )
}

export default NavBar
