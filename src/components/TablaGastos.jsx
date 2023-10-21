/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {useEffect, useState} from 'react'
import axios from 'axios'
import '../css/Gastos.css'
import { borrar_gasto, filtrar_por_mes } from '../utils/constants/constants'
import { borrado_exitoso, conffirm_borrar, error_servidor } from '../utils/alertas/alertas'

const TablaGastos = (props) => {

    const [gastos, setGastos] = useState([])


    const handleAbrirModalEdit = (values) => {
        console.log(values)
        props.getModalEdit(values)
    }

    const getGastos = async () => {
        if(props.mes === undefined){
            return null
        } else {
            
            try {
                let response = await axios.get(filtrar_por_mes + props.mes)
                setGastos(response.data)
            } catch (error) {
                alert('Ocurrio un error en el servidor.')
            }
        }
    }

    const borrarGasto = (id) => {

        conffirm_borrar.fire().then((result) => {
            if(result.isConfirmed){
                axios.delete(borrar_gasto + id)
                borrado_exitoso.fire({
                    icon: 'success',
                    text: 'El registro se eliminó con exito.'
                })
                getGastos()
                
            }
        })
        .catch(error => {
            error_servidor.fire()
        })
    }


    useEffect(() => {
        getGastos()
    }, [props.mes])

    useEffect(() => {
        getGastos()
    } ,[props.modal, props.modalEdit])

  return (
    <table className='tabla-gastos'>
      <thead>
        <tr>
            <th>Fecha</th>
            <th>Descripcion</th>
            <th>Categoria</th>
            <th>Importe</th>
            <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {gastos.length === 0 ? <tr><td colSpan={5}><h1>No hay gastos registrados</h1></td></tr>

         :  gastos.map(g => 
            <tr key={g.idGasto}>
                <td>{g.fecha.substring(0, 10)}</td>
                <td>{g.descripcion}</td>
                <td>{g.categoriaGasto}</td>
                <td>{g.importe}</td>
                <td>
                    <i className='bi bi-trash' onClick={() => {borrarGasto(g.idGasto)}}></i>
                    <i className='bi bi-pencil-square' onClick={() => {handleAbrirModalEdit({modal: true, idGasto: g.idGasto})}}></i>
                </td>
            </tr>
        )
        }
      </tbody>
    </table>
  )
}

export default TablaGastos
