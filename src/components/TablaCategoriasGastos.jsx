/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import axios from 'axios'
import '../css/Gastos.css'
import { borrar_categoria, get_categorias_gastos } from '../utils/constants/constants'
import { borrado_exitoso, conffirm_borrar, error_servidor } from '../utils/alertas/alertas'

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
    conffirm_borrar.fire().then((result) => {
      if(result.isConfirmed){
          axios.put(borrar_categoria + id)
          borrado_exitoso.fire({
              icon: 'success',
              text: 'El registro se eliminó con exito.'
          })
          getCategorias()
      }
  })
  .catch(error => {
      error_servidor.fire()
  })
  }

  useEffect(() => {
    getCategorias()
  }, [])

  useEffect(() => {
    getCategorias()
  }, [props.modalCategoria, props.getModalCategoriaEdit])

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
