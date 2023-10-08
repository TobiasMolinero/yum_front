/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import '../css/Ventas.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { get_lista_zonas } from '../utils/constants/constants'

const MenuVentas = (props) => {

  const [zona, setZona] = useState(1)
  const [listaZonas, setListaZonas] = useState([])

  // Funcion donde utilizamos la props para pasarle el valor true a Ventas y abrir el Modal.
  const handleAbrirModal = () => {
    props.props.getModal(true)
  }

  const getIdZona = () => {
    props.props.getIdZona(zona)
  }

  const getListaZonas = async() => {
    let response = await axios.get(get_lista_zonas)
    setListaZonas(response.data)
  }

  useEffect(() => {
    getListaZonas()
  }, [])

  useEffect(() => {
    getIdZona()
  }, [zona])

  return (
    <div className="herramientas">
      <div>
        <h4>Zona de venta:</h4>
        <select onChange={(e) => {setZona(e.target.value)}}>
          {
            listaZonas ? listaZonas.map(z => 
              <option key={z.idZonaVenta} value={z.idZonaVenta}>{z.zona.toUpperCase()}</option>
            ) 
            : 
            <option>ERROR</option>
          }
        </select>
      </div>
      <button onClick={handleAbrirModal}><i className="bi bi-plus-square"></i>Agregar Venta</button>
    </div>
  )
}

export default MenuVentas