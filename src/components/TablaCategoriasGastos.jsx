/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/Gastos.css'
import { borrar_categoria, get_categorias_gastos } from '../utils/constants/constants'

const TablaCategoriasGastos = (props) => {

  const [categorias, setCategorias] = useState([])

  const getModalCategoriaEdit = (values) => {
    props.getModalCategoriaEdit(values)
  }

  const getCategorias = async () => {
    try {
      let response = await axios.get(get_categorias_gastos)
      setCategorias(response.data)
    } catch (error) {
      alert('Ocurrio un error en el servidor.')
    }
  }

  const borrarCategoria = async(id) => {
    try {
      await axios.put(borrar_categoria + id)
      getCategorias()
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    getCategorias()
  }, [])

  return (
      <table className='tabla-categorias-gastos'>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(c => 
            <tr key={c.idCategoriaGasto}>
              <td>{c.categoriaGasto}</td>
              <td>
                <i className="bi bi-trash" onClick={() => {borrarCategoria(c.idCategoriaGasto)}}></i>
                <i className="bi bi-pencil-square" onClick={() => {getModalCategoriaEdit({modal: true, 
                                                                                          idCategoriaGasto: c.idCategoriaGasto})}}>
                </i>
              </td>
            </tr>  
          )}
        </tbody>
      </table>
  )
}

export default TablaCategoriasGastos
