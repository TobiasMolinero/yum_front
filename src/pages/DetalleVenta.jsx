/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import TablaDetalles from "../components/TablaDetalles"
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import { get_venta_detallada } from '../utils/constants/constants'
import '../css/DetalleVenta.css'

const DetalleVenta = () => {

    const {id} = useParams()

    const [venta, setVenta] = useState([])

    const getVenta = async(id) => {
        try {
            let response = await axios.get(get_venta_detallada + id)
            setVenta(response.data)
        } catch (error) {
            alert(error)    
        }
    }

    useEffect(() => {
        getVenta(id)
    }, [])

    return (
        <>
            <Header />
            <NavBar />
            <div className="container-det-venta">
                <h1 className='titulo'>Venta Nro: {id}</h1>
                <div className="info">
                    <h3>Info Venta</h3>
                    {
                        venta.map(v => 
                            <ul key={v.nroVenta}>
                                <li>Cliente: <span>{v.nombreCliente}</span></li>
                                <li>Empleado: <span>{v.nombreEmpleado}</span></li>
                                <li>Fecha: <span>{v.fecha.substring(0, 10)}</span></li>
                                <li>Zona de venta: <span>{v.zona}</span></li>
                                <li>Metodo de Pago: <span>{v.metodo}</span></li>
                                <li>Observaciones: <span>{v.observaciones}</span></li>
                                <li>Importe Total: <span style={{color: 'green'}}>$ {v.totalVenta}</span></li>
                            </ul>
                        )
                    }
                </div>
                <div className="tabla-det-venta">
                    <TablaDetalles nroVenta={id} />
                </div>
                <p className='volver-ventas'><Link to='/app/ventas'><i className="bi bi-arrow-left"></i>Volver a ventas</Link></p>
            </div>
        </>
    )
}

export default DetalleVenta
