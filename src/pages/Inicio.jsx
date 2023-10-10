/* eslint-disable no-unused-vars */
// import Header from "../components/Header"
import '../css/Inicio.css'
import { useState, useEffect } from 'react'
import ingresos from '../assets/ingresos.png'
import gastos from '../assets/gastos.png'
import calendario from '../assets/calendario.png'
import Header from "../components/Header"
import NavBar from '../components/NavBar'
import { get_ganancias, get_perdidas } from '../utils/constants/constants'
import axios from 'axios'




const Inicio = () => {

  const [periodo, setPeriodo] = useState()
  const [ganancias, setGanancias] = useState()
  const [perdidas, setPerdidas] = useState()

  const getPeriodo = () => {
    const date = new Date()
    let numeroMes = date.getMonth()
    let año = date.getFullYear()
    switch (numeroMes) {
      case 0:
        setPeriodo(`Enero ${año}`)
        break;

      case 1:
        setPeriodo(`Febrero ${año}`)
        break;

      case 2:
        setPeriodo(`Marzo ${año}`)
        break;

      case 3:
        setPeriodo(`Abril ${año}`)
        break;

      case 4:
        setPeriodo(`Mayo ${año}`)
        break;

      case 5:
        setPeriodo(`Junio ${año}`)
        break;

      case 6:
        setPeriodo(`Julio ${año}`)
        break;

      case 7:
        setPeriodo(`Agosto ${año}`)
        break;

      case 8:
        setPeriodo(`Septiembre ${año}`)
        break;

      case 9:
        setPeriodo(`Octubre ${año}`)
        break;

      case 10:
        setPeriodo(`Noviembre ${año}`)
        break;

      case 11:
        setPeriodo(`Diciembre ${año}`)
        break;

      default:
        break;
    }
  }
  
  const getGanancias = async() => {
    try {      
      let response = await axios.get(get_ganancias)
      setGanancias(response.data[0].ganancias)
    } catch (error) {
      alert(error, 'Ocurrio un error en el servidor. Ponganse en contacto con el administrador.')
    }
  }

  const getPerdidas = async() => {
    try {      
      let response = await axios.get(get_perdidas)
      setPerdidas(response.data[0].perdidas)
    } catch (error) {
      alert('Ocurrio un error en el servidor. Ponganse en contacto con el administrador.')
    }
  }

  useEffect(() => {
    getPeriodo()
    getGanancias()
    getPerdidas()
  }, []);

  return (
    <>
      <Header/>    
      <NavBar /> 
      <div className="container-inicio">
        <h1 className="titulo">¡Hola de Nuevo!</h1>
        <p>Un resumen del mes</p>
        <h4>{periodo}</h4>
        <hr />
        <div className="grid-inicio">

          <div className='resumen'>
            <div>
              <img src={ingresos} alt="" />
              <ul>
                <li><p>Ingresos</p></li>
                <li><span className='valor-verde'>$ {ganancias ? ganancias : '0.00'}</span></li>
              </ul>
            </div>
            <div>
              <img src={gastos} alt="" />
              <ul>
                <li><p>Gastos</p></li>
                <li><span className='valor-rojo'>$ {perdidas ? perdidas : '0.00'}</span></li>
              </ul>
            </div>
            <div className="colspan-2">
              <img src={calendario} alt="" />
              <ul>
                <li><p>Periodo:</p></li>
                <li><span className='valor-verde'>{periodo}</span></li>
              </ul>
            </div>
          </div>
          <div className='saldo-total'>
            <h3>Saldo Total</h3>
            <span className='valor-total'>$ {ganancias - perdidas}</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Inicio
