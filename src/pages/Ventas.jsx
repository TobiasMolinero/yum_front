/* eslint-disable no-unused-vars */
import '../css/Ventas.css'
import MenuVentas from '../components/menuVentas'
import TablaVentas from '../components/TablaVentas'
import ModalAddVenta from '../components/modales/ModalAddVenta'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { get_ventas } from '../utils/constants/constants'

const Ventas = () => {

    const [modal, setModal] = useState()
    const [ventas, setVentas] = useState()
    const [zona, setZona] = useState(1)
    
    // Con esta funcion podemos traer valores desde los componentes hijos MenuVentas y Modal al pasarlo como props.
    const getModal = (value) => {
        setModal(value)
    }

    const getIdZona = (value) => {
        setZona(value)
    }


    return (
        <div className="container-ventas">
            <h1 className='titulo'>Ventas</h1>
            <MenuVentas props = {{getModal, getIdZona}}/>
            {modal ? <ModalAddVenta getModal = {getModal}/> : ''} 
            <div className="tabla">
                <TablaVentas props = {zona}/>
            </div>
        </div>
    )
}

export default Ventas
