/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/Clientes.css'
import { borrar_cliente, get_lista_clientes } from '../utils/constants/constants'
import { borrado_exitoso, conffirm_borrar, error_servidor } from '../utils/alertas/alertas'

const TablaClientes = (props) => {

    const [clientes, setClientes] = useState([])

    const handleAbrirModalEdit = (values) => {
        props.abrirModalEdit(values)
    }
    
    const getClientes = async() => {
        try {
            let response = await axios.get(get_lista_clientes)
            setClientes(response.data)
        } catch (error) {
            alert('Ocurrio un error en el servidor')
        }
    }

    const borrarCliente = async(id) => {
        conffirm_borrar.fire().then((result) => {
            if(result.isConfirmed){
                axios.delete(borrar_cliente + id)
                borrado_exitoso.fire({
                    icon: 'success',
                    text: 'El registro se eliminó con exito.'
                })
                getClientes()
            }
        })
        .catch(error => {
            error_servidor.fire()
        })
    }

    useEffect(() => {
        getClientes()
    } ,[])

    useEffect(() => {
        getClientes()
    } ,[props.modal, props.modalEdit])

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Telefono</th>
                        <th>Domicilio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.length === 0 ? <tr><td colSpan={4}><h1>No hay registros</h1></td></tr> 
                        : clientes.map(cl => 
                            <tr key={cl.idCliente}>
                                <td>{cl.nombreCliente}</td>
                                <td>{cl.telefono}</td>
                                <td>{cl.domicilio}</td>
                                <td>
                                    <i className='bi bi-trash' onClick={() => {borrarCliente(cl.idCliente)}}></i>
                                    <i className='bi bi-pencil-square' onClick={() => {handleAbrirModalEdit({modal: true, idCliente: cl.idCliente})}}></i>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default TablaClientes
