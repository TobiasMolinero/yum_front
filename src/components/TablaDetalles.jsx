/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios"
import { useState, useEffect } from "react"
import { get_det_venta } from "../utils/constants/constants"


const TablaDetalles = (props) => {

    const [detalle, setDetalle] = useState([])

    const getDetalle = async (id) => {
        let response = await axios.get(get_det_venta + id)
        console.log(response.data)
        setDetalle(response.data)
    }

    useEffect(() => {
        getDetalle(props.nroVenta)
    }, [])

    return (
        <>
            <h3>Detalle</h3>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>SubTotal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        detalle.map(d =>
                            <tr key={d.nroVenta}>
                                <td>{d.nombreProducto}</td>
                                <td>$ {d.precioMenor}</td>
                                <td>{d.cantidad}</td>
                                <td>$ {d.SubTotal}</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default TablaDetalles
