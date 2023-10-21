/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import '../../css/Ventas.css'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { get_lista_productos,
        get_lista_clientes,
        get_lista_empleados,
        get_lista_formaPago,
        get_lista_zonas,
        get_det_temp,
        add_det_temp,
        del_det_temp_id,
        del_table_det_temp,
        get_last_NroVenta,
        add_venta
} from '../../utils/constants/constants'
import ModalAddCliente from './ModalAddCliente'
import { error_servidor, faltan_datos, venta_guardada } from '../../utils/alertas/alertas'

const ModalAddVenta = (props) => {


    const selectProductos = useRef()
    const inputCantidad = useRef()

    const [nroVenta, setNroVenta] = useState()
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

    const [modalCliente, setModalCliente] = useState()

    // Funcion donde utilizamos la props para pasarle a Ventas el valor false y cerrar el modal.
    const handleCerrarModal = () => {
        borrarTablaDetalle()
        props.getModal(false)
    }

    // FUNCION PARA TRAER EL VALOR FALSE DEL MODAL CLIENTES Y CERRAR EL MISMO

    const getValorModalCliente = (value) => {
        setModalCliente(value)
    }

    // ABRIR MODAL CLIENTE

    const abrirModalCliente = () => {
        setModalCliente(true)
    }

    // FUNCIONES GET

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

    const getPrecioProducto = () => {
        if(producto === 'selected' || producto === '' || producto === undefined){
            setPrecioProducto(0)
        } else {
            let p = listaProductos.filter(p => p.idProducto === +producto)
            setPrecioProducto(p[0].precioMenor)
        }
    }

    const getLastNroVenta = async() => {
        try {
            let response = await axios.get(get_last_NroVenta)
            if(response.data.length === 0){
                setNroVenta(1)
            } else {
                setNroVenta(response.data[0].nroVenta + 1)
            }
        } catch (error) {
            error_servidor.fire()
        }
    }

    // FUNCIONES CRUD

    const agregarVenta = async() => {
        if(fecha === '' || fecha === undefined ||
           cliente === 'selected' || cliente === '' || cliente === undefined ||
           empleado === 'selected' || empleado === '' || empleado === undefined ||
           zonaVenta === 'selected' || zonaVenta === '' || zonaVenta === undefined ||
           metodo === 'selected' || metodo === '' || metodo === undefined ||
           detalle.length === 0
           ){
                faltan_datos.fire()
           } else {
                try {
                    await axios.post(add_venta, {
                        nroVenta: nroVenta,
                        fecha: fecha,
                        cliente: cliente,
                        empleado: empleado,
                        zonaVenta: zonaVenta,
                        metodo: metodo,
                        obs: obs,
                        importeTotal: importeTotal
                    })
                    venta_guardada.fire({
                        text:'La venta se registró con exito.'
                    }).then(
                        handleCerrarModal()
                    )
                } catch (error) {
                    alert(error)
                }
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
        if(detalle.lenght !== 0){
            borrarTablaDetalle()
        }
        getLastNroVenta()
        getListaClientes()
        getListaEmpleados()
        getListaZonas()
        getListaFormaPago()
        getListaProductos()
    }, [])

    useEffect(() => {
        getPrecioProducto()
    }, [producto])

    useEffect(() => {
        calcularSubTotal()
    }, [detalle])

    useEffect(() => {
        getListaClientes()
    } ,[modalCliente])


  return (
      <div className="modal-background">
        {modalCliente ? <ModalAddCliente getValorModalCliente={getValorModalCliente}/> : ''}
        <div className="modal">
            <button onClick={handleCerrarModal}><i className="bi bi-x-lg"></i></button>
            <div className="modal-container">
                <h2>Agregar Venta</h2>
                <form>
                    <div className="nro-venta">
                        <label htmlFor="nroventa">Nro. Venta:</label>
                        <input id='nroventa' type="number" defaultValue={nroVenta} disabled onChange={(e) => setNroVenta(e.target.value)}/>
                    </div>
                    <input type="date" onChange={(e) => setFecha(e.target.value)}/>
                    <div className='select-cliente'>
                        <select defaultValue='selected' onChange={(e) => setCliente(e.target.value)}>
                            <option value="selected">-- Seleccione Cliente --</option>
                            {listaClientes.map( c =>
                                <option key={c.idCliente} value={c.idCliente}>{c.nombreCliente.toUpperCase()}</option>)
                            }
                        </select>
                        <p onClick={abrirModalCliente} title='Agregar cliente' className='atajo-agregar-clientes'> + </p>
                    </div>
                    <select defaultValue='selected' onChange={(e) => setEmpleado(e.target.value)}>
                        <option value="selected">-- Seleccione Empleado --</option>
                        {listaEmpleados.map(emp =>
                            <option key={emp.idEmpleado} value={emp.idEmpleado}>{emp.nombreEmpleado.toUpperCase()}</option>
                        )}
                    </select>
                    <select defaultValue='selected' onChange={(e) => setZonaVenta(e.target.value)}>
                        <option value="selected">-- Zona de Venta --</option>
                        {listaZonas.map(z =>
                            <option key={z.idZonaVenta} value={z.idZonaVenta}>{z.zona.toUpperCase()}</option>
                        )}
                    </select>
                    <select defaultValue='selected' onChange={(e) => setMetodo(e.target.value)}>
                        <option value="selected">-- Metodo de pago --</option>
                        {listaFormaPago.map(fp =>
                            <option key={fp.idMetodoPago} value={fp.idMetodoPago}>{fp.metodo.toUpperCase()}</option>
                        )}
                    </select>
                    <textarea cols="30" rows="5" placeholder='Observaciones' onChange={(e) => setObs(e.target.value)}/>
                </form>
                <div className="detalle-venta">
                    <select ref={selectProductos} defaultValue='selected' onChange={(e) => {setProducto(e.target.value)}}>
                        <option value="selected">-- Seleccionar Producto --</option>
                        {listaProductos.map(p =>
                            <option key={p.idProducto} value={p.idProducto}>{p.nombreProducto.toUpperCase()}</option>
                        )}
                    </select>
                    <div className="cantidad">
                        <label htmlFor="">Cantidad :</label>
                        <input ref={inputCantidad} type="number" min={1} max={50} onChange={(e) => {setCantidad(e.target.value)}}/>
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
                    <button className='boton-cancelar' onClick={handleCerrarModal}>Cancelar</button>
                    <button className='boton-guardar' onClick={agregarVenta}>Guardar</button>
                </div>
            </div>
        </div>
      </div>
  )
}


export default ModalAddVenta

{/* <i class="bi bi-trash"></i> */}