/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import '../css/Ventas.css'
import MenuVentas from '../components/MenuVentas'
import TablaVentas from '../components/TablaVentas'
import ModalAddVenta from '../components/modales/ModalAddVenta'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import ModalEditVenta from '../components/modales/ModalEditVenta'
import { useEffect, useState } from 'react'

const Ventas = () => {

    const [modal, setModal] = useState()
    const [modalEdit, setModalEdit] = useState()
    const [zona, setZona] = useState(1)
    const [nroVenta, setNroVenta] = useState()
    
    // Con esta funcion podemos traer valores desde los componentes hijos MenuVentas y Modal al pasarlo como props.
    const getModal = (value) => {
        setModal(value)
    }

    const getModalEdit = (values) => {
        setModalEdit(values.modal)
        setNroVenta(values.nroVenta)
    }

    const getIdZona = (value) => {
        setZona(value)
    }


    return (
        <>
            <Header/>
            <NavBar/>      
            <div className="container-ventas">
                <h1 className='titulo'>Ventas</h1>
                <hr />
                <MenuVentas props = {{getModal, getIdZona}}/>
                {modal ? <ModalAddVenta getModal = {getModal}/> : ''} 
                {modalEdit ? <ModalEditVenta props = {{getModalEdit, nroVenta}}/> : ''}
                <div className="tabla">
                    <TablaVentas props = {{zona, getModalEdit}} modal={modal} modalEdit={modalEdit}/>
                </div>
            </div>
        </>
    )
}

export default Ventas
