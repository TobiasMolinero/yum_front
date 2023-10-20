/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {useState} from 'react'
import NavBar from '../components/NavBar'
import Header from '../components/Header'
import TablaGastos from '../components/TablaGastos'
import TablaCategoriasGastos from '../components/TablaCategoriasGastos'
import MenuGastos from '../components/MenuGastos'
import ModalAddGasto from '../components/modales/ModalAddGasto'
import ModalEditGasto from '../components/modales/ModalEditGasto'
import ModalAddCategoria from '../components/modales/ModalAddCategoria'
import '../css/Gastos.css'
import ModalEditCategoria from '../components/modales/ModalEditCategoria'

const Gastos = () => {

  const [valorMes, setValorMes] = useState()
  const [modal, setModal] = useState()
  const [modalEdit, setModalEdit] = useState()
  const [idGasto, setIdGasto] = useState()

  const [modalCategoria, setModalCategoria] = useState()
  const [modalCategoriaEdit, setModalCategoriaEdit] = useState()
  const [idCategoriaGasto, setIdCategoriaGasto] = useState()


  const getValorMes = (value) => {
    setValorMes(value)
  }

  const getModal = (value) => {
    setModal(value)
  }

  const getModalEdit = (values) => {
    setModalEdit(values.modal)
    setIdGasto(values.idGasto)
  }

  const handleAbrirModalCategoria = () => {
    setModalCategoria(true)
  }

  const getModalCategoria = (value) => {
    setModalCategoria(value)
  }

  const getModalCategoriaEdit = (values) => {
    setModalCategoriaEdit(values.modal)
    setIdCategoriaGasto(values.idCategoriaGasto)
  }

  return (
    <>
        <Header />
        <NavBar />
        <div className='container-gastos'>
          <h1 className='titulo'>Gastos</h1>
          <hr />
          {/* MODALES */}
          {modal ? <ModalAddGasto getModal={getModal}/> : ''}
          {modalEdit ? <ModalEditGasto getModalEdit={getModalEdit} idGasto={idGasto}/> : ''}
          {modalCategoria ? <ModalAddCategoria getModalCategoria={getModalCategoria}/> : ''}
          {modalCategoriaEdit ? <ModalEditCategoria getModalCategoriaEdit={getModalCategoriaEdit} idCategoriaGasto={idCategoriaGasto}/> : ''}
          <div className="grid-tablas"> 
            <div className='grid-tablas-gastos'>
              <MenuGastos getValorMes={getValorMes} getModal={getModal} mes={valorMes}/>
              <div className="contenedor-tabla-gastos">
                <TablaGastos getModalEdit={getModalEdit} mes={valorMes}/>
              </div>
            </div>
            <div className="grid-tablas-categorias">
              <h3>Categorias Gastos</h3>
              <button onClick={handleAbrirModalCategoria}><i className='bi bi-plus-square'></i>Agregar Categoria</button>
              <div className="contenedor-tabla-categorias">
                <TablaCategoriasGastos getModalCategoriaEdit={getModalCategoriaEdit} modal={modal} modalEdita={modalEdit}/>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default Gastos
