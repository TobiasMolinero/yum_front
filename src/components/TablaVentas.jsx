/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import '../css/Ventas.css'
import {useState, useEffect } from 'react'
import axios from 'axios'
import { del_venta, get_ventas } from '../utils/constants/constants'
import { Link } from 'react-router-dom'

const TablaVentas = (props) => {

    const [ventas, setVentas] = useState([])

    const handleAbrirModalEdit = (values) => {
        props.props.getModalEdit(values)
    }

    const getVentas = async() => {
        try {
            let response = await axios.get(get_ventas + props.props.zona)
            setVentas(response.data)
        } catch (error) {
            alert(error)
        }
    }

    const borrarVenta = async(id) => {
        try {
            await axios.delete(del_venta + id)
            getVentas()
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getVentas()
    }, [props.props.zona])

    return (
        <table>
            <thead>
                <tr>
                    <th>Nro Venta</th>
                    <th>Fecha</th>
                    <th>Cliente</th>
                    <th>Empleado</th>
                    <th>Metodo de pago</th>
                    <th>Observaciones</th>
                    <th>Detalle</th>
                    <th>Monto Total</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>

                {ventas.length > 0 ? ventas.map(v => //TRUE: rellena la tabla con los datos.
                    <tr key={v.nroVenta}>
                        <td>{v.nroVenta}</td>
                        <td>{v.fecha.substring(0, 10)}</td>
                        <td>{v.nombreCliente}</td>
                        <td>{v.nombreEmpleado}</td>
                        <td>{v.metodo}</td>
                        <td>{v.observaciones === 'undefined' ? '-' : v.observaciones}</td>
                        <td><Link>Ver detalle</Link></td>
                        <td>{v.totalVenta}</td>
                        <td>
                            <i className="bi bi-trash" onClick={() => {borrarVenta(v.nroVenta)}}></i>
                            <i className="bi bi-pencil-square" onClick={() => handleAbrirModalEdit({modal: true, nroVenta: v.nroVenta})}></i>
                        </td>

                    </tr>    
                ) : //False: rellena con un aviso de 'no hay datos'
                    <tr>
                        <td colSpan={9}>
                            <h2>No hay ventas registradas</h2>
                        </td>
                    </tr>
                }
            </tbody>
        </table>
    )
}

export default TablaVentas

{/* <i class="bi bi-trash"></i> */ }
{/* <i class="bi bi-pencil-square"></i> */ }

