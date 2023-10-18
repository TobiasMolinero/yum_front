/* eslint-disable no-unused-vars */
import {useState}from 'react'
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import '../css/Clientes.css'
import TablaClientes from '../components/TablaClientes'
import ModalAddCliente from '../components/modales/ModalAddCliente'
import ModalEditClientes from '../components/modales/ModalEditClientes'

const Clientes = () => {

  const [modal, setModal] = useState()
  const [modalEdit, setModalEdit] = useState()
  const [idCliente, setIdCliente] = useState()

  const abrirModal = () => {
    setModal(true)
  }

  const cerrarModal = (value) => {
    setModal(value)
  }

  const abrirModalEdit = (values) => {
    setModalEdit(values.modal)
    setIdCliente(values.idCliente)
  }

  const cerrarModalEdit = (value) => {
    setModalEdit(value)
  }


  return (
    <>
        <Header />
        <NavBar />
        <div className='container-clientes'>
          <h1 className="titulo">Clientes</h1>
          {modal ? <ModalAddCliente cerrarModal={cerrarModal}/> : ''}
          {modalEdit ? <ModalEditClientes cerrarModalEdit={cerrarModalEdit} idCliente={idCliente}/> : ''}
          <hr />
          <div className="grid-clientes">
            <div className="contenedor-tabla-clientes">
              <TablaClientes abrirModalEdit={abrirModalEdit}/>
            </div>
            <div className="contenedor-boton">
              <button onClick={abrirModal} className='boton-agregar'><i className='bi bi-plus-square'></i>Agregar Cliente</button>
            </div>
          </div>
        </div>
    </>
  )
}

export default Clientes
