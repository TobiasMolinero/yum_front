/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/Clientes.css'
import { borrar_cliente, get_lista_clientes } from '../utils/constants/constants'

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
        try {
            await axios.delete(borrar_cliente + id)
            getClientes()
        } catch (error) {
            alert(error)   
        }
    }

    useEffect(() => {
        getClientes()
    } ,[])

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
