/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import axios from "axios"
import { useEffect, useState, useRef } from "react"
import { 
    get_lista_clientes,
    get_lista_empleados,
    get_lista_zonas,
    get_lista_formaPago,
    get_lista_productos,
    get_det_temp,
    add_det_temp,
    del_det_temp_id,
    del_table_det_temp,
    upd_table_det_temp,
    get_one_venta,
    mod_venta
} from "../../utils/constants/constants"
import '../../css/Ventas.css'

const ModalEditVenta = (props) => {

    const selectProductos = useRef()
    const inputCantidad = useRef()

    const [nroVenta, setNroVenta] = useState(props.props.nroVenta)
    const [fecha, setFecha] = useState()
    const [cliente, setCliente] = useState()
    const [empleado, setEmpleado] = useState()
    const [zonaVenta, setZonaVenta] = useState()
    const [metodo, setMetodo] = useState()
    const [obs, setObs] = useState()
    const [producto, setProducto] = useState()
    const [cantidad, setCantidad] = useState(0)
    const [importeTotal, setImporteTotal] = useState()
    const [precioProducto, setPrecioProducto] = useState()

    const [listaClientes, setListaClientes] = useState([])
    const [listaEmpleados, setListaEmpleados] = useState([])
    const [listaZonas, setListaZonas] = useState([])
    const [listaFormaPago, setListaFormaPago] = useState([])
    const [listaProductos, setListaProductos] = useState([])
    const [detalle, setDetalle] = useState([])

    const handleCerrarModalEdit = () => {
        borrarTablaDetalle()
        props.props.getModalEdit(false)        
    }

    const getVenta = async() => {
        try {
            let response = await axios.get(get_one_venta + nroVenta)
            setFecha(response.data[0].fecha.substring(0, 10))
            setCliente(response.data[0].idCliente)
            setEmpleado(response.data[0].idEmpleado)
            setZonaVenta(response.data[0].idZonaVenta)
            setMetodo(response.data[0].idMetodoPago)
            setObs(response.data[0].observaciones)
        } catch (error) {
            alert(error)
        }
    }

    const getListaClientes = async() => {
        let response = await axios.get(get_lista_clientes)
        setListaClientes(response.data)
    }

    const getListaEmpleados = async() => {
        let response = await axios.get(get_lista_empleados)
        setListaEmpleados(response.data)
    }

    const getListaZonas = async() => {
        let response = await axios.get(get_lista_zonas)
        setListaZonas(response.data)
    }

    const getListaFormaPago = async() => {
        let response = await axios.get(get_lista_formaPago)
        setListaFormaPago(response.data)
    }

    const getListaProductos = async() => {
        let response = await axios.get(get_lista_productos)
        setListaProductos(response.data)
    }

    const getDetTemp = async() => {
        let response = await axios.get(get_det_temp)
        setDetalle(response.data)
    }

    const updateTablaDetTemp = async() => {
        await axios.post(upd_table_det_temp + nroVenta)
    }

    const getPrecioProducto = () => {
        if(producto === 'selected' || producto === '' || producto === undefined){
            setPrecioProducto(0)
        } else {
            let p = listaProductos.filter(p => p.idProducto === +producto)
            setPrecioProducto(p[0].precioMenor)
        }
    }

    const modificarVenta = async() => {

        if(detalle.length === 0){
            alert('Es necesario agregar un detalle para modificar la venta.')
        } else {
            try {
                await axios.put(mod_venta + nroVenta, {
                    fecha: fecha,
                    cliente: cliente,
                    empleado: empleado,
                    zonaVenta: zonaVenta,
                    metodo: metodo,
                    obs: obs,
                    importeTotal: importeTotal
                })
                alert('Se modificó con exito.')
                handleCerrarModalEdit()
            } catch (error) {
                alert(error)
            }
            window.location.reload()
        }
    }

    const agregarDetalle = async() => {
        if(producto === '' || producto === 'selected' || producto === undefined){
            alert('Debe seleccionar un producto')
        
        }else if(cantidad === '' || cantidad === 0 || cantidad === undefined){
            alert('Ingrese la cantidad')
        }else{
            try {
                await axios.post(add_det_temp, {
                    nroVenta: nroVenta,
                    idProducto: producto,
                    cantidad: cantidad
                }) 
            } catch (error) {
                alert(error)
            }
            getDetTemp()
            setProducto('selected')
            setCantidad(0)
            selectProductos.current.value = 'selected'
            inputCantidad.current.value = ''
        }
        
    }

    const borrarDetalle = async(id) => {
        try {
            await axios.delete(del_det_temp_id + id)
            getDetTemp()
        } catch (error) {
            alert('Error')
        }
    }

    const borrarTablaDetalle = () => {
        axios.delete(del_table_det_temp)
    }

    const calcularSubTotal = () => {
        let acc = 0
        detalle.forEach(d => {
            acc += +d.SubTotal
        })
        setImporteTotal(acc)
    }

    useEffect(() => {
        getListaClientes()
        getListaEmpleados()
        getListaZonas()
        getListaFormaPago()
        getListaProductos()
        updateTablaDetTemp()
        getDetTemp()
        getVenta()
    }, [])

    useEffect(() => {
        getPrecioProducto()
    }, [producto])

    useEffect(() => {
        calcularSubTotal()
    }, [detalle])


    return (
        <div className="modal-background">
            <div className="modal">
                <button onClick={handleCerrarModalEdit}><i className="bi bi-x-lg"></i></button>
                <div className="modal-container">
                    <h2>Modificar Venta</h2>
                    <form>
                        <div className="nro-venta">
                            <label htmlFor="nroventa">Nro. Venta:</label>
                            <input id='nroventa' type="number" defaultValue={nroVenta} disabled onChange={(e) => setNroVenta(e.target.value)} />
                        </div>
                        <input type="date" defaultValue={fecha} onChange={(e) => setFecha(e.target.value)} />
                        <select value={cliente} onChange={(e) => setCliente(e.target.value)}>
                            {listaClientes.map(c =>
                                <option key={c.idCliente} value={c.idCliente}>{c.nombreCliente.toUpperCase()}</option>)
                            }
                        </select>
                        <select value={empleado} onChange={(e) => setEmpleado(e.target.value)}>
                            {listaEmpleados.map(emp =>
                                <option key={emp.idEmpleado} value={emp.idEmpleado}>{emp.nombreEmpleado.toUpperCase()}</option>
                            )}
                        </select>
                        <select value={zonaVenta} onChange={(e) => setZonaVenta(e.target.value)}>
                            {listaZonas.map(z =>
                                <option key={z.idZonaVenta} value={z.idZonaVenta}>{z.zona.toUpperCase()}</option>
                            )}
                        </select>
                        <select value={metodo} onChange={(e) => setMetodo(e.target.value)}>
                            {listaFormaPago.map(fp =>
                                <option key={fp.idMetodoPago} value={fp.idMetodoPago}>{fp.metodo.toUpperCase()}</option>
                            )}
                        </select>
                        <textarea defaultValue={obs === 'undefined' ? '' : obs} cols="30" rows="5" placeholder='Observaciones' onChange={(e) => setObs(e.target.value)} />
                    </form>
                    <div className="detalle-venta">
                        <select ref={selectProductos} defaultValue='selected' onChange={(e) => { setProducto(e.target.value) }}>
                            <option value="selected">-- Seleccionar Producto --</option>
                            {listaProductos.map(p =>
                                <option key={p.idProducto} value={p.idProducto}>{p.nombreProducto.toUpperCase()}</option>
                            )}
                        </select>
                        <div className="cantidad">
                            <label htmlFor="">Cantidad :</label>
                            <input ref={inputCantidad} type="number" min={1} max={50} onChange={(e) => { setCantidad(e.target.value) }} />
                        </div>
                        <div className='precio'>
                            <p>Sub-Total:</p>
                            <span>$ {producto === 'selected' ||
                                producto === '' ||
                                producto === undefined ? 0 : parseFloat(precioProducto) * cantidad
                            }
                            </span>
                        </div>
                        <button onClick={agregarDetalle}>Agregar Producto</button>
                        <div className="contenedor-tabla">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th>SubTotal</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {detalle.map(d =>
                                        <tr key={d.idProducto}>
                                            <td>{d.nombreProducto}</td>
                                            <td>{d.precioMenor}</td>
                                            <td>{d.cantidad}</td>
                                            <td>{d.SubTotal}</td>
                                            <td>
                                                <i className="bi bi-trash" onClick={() => borrarDetalle(d.idProducto)}></i>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <p className='importe-total'>Importe Total: <span className='importe'>$ {importeTotal}</span></p>
                    </div>
                    <div className='modal-botones'>
                        <button className='boton-cancelar' onClick={handleCerrarModalEdit}>Cancelar</button>
                        <button className='boton-guardar' onClick={modificarVenta}>Modificar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalEditVenta
