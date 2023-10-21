/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../../css/Clientes.css'
import { editar_cliente, get_one_cliente } from '../../utils/constants/constants.js'
import { cliente_guardado } from '../../utils/alertas/alertas'

const ModalEditClientes = (props) => {

    const [nombre, setNombre] = useState()
    const [telefono, setTelefono] = useState()
    const [domicilio, setDomicilio] = useState()
    const [idCliente, setIdCliente] = useState(props.idCliente)


    const handleCerrarModal = () => {
        props.cerrarModalEdit(false)
    }

    const getCliente = async() => {
        try {
            let response = await axios.get(get_one_cliente + idCliente)
            setNombre(response.data[0].nombreCliente)
            setDomicilio(response.data[0].domicilio)
            setTelefono(response.data[0].telefono)
        } catch (error) {
            alert(error)
        }
    }

    const editarCliente = async(e) => {
        e.preventDefault()
        try {
            await axios.put(editar_cliente + idCliente, {
                nombre: nombre,
                domicilio: domicilio,
                telefono: telefono
            })
            cliente_guardado.fire({
                text: 'Los datos del cliente se modificaron con exito.'
            })
            handleCerrarModal()
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getCliente()
    }, [])


    return (
        <div className="modal-background">
            <div className="modal-clientes">
                <button onClick={handleCerrarModal}><i className="bi bi-x-lg"></i></button>
                <div className="modal-clientes-container">
                    <h2>Agregar Cliente</h2>
                    <form onSubmit={editarCliente}>
                        <div>
                            <label htmlFor="nombre">Nombre: </label>
                            <input type="text" id="nombre" value={nombre} autoComplete='off' required onChange={(e) => { setNombre(e.target.value) }} />
                        </div>
                        <div>
                            <label htmlFor="telefono">Telefono: </label>
                            <input type="text" id="telefono" value={telefono} autoComplete='off' required onChange={(e) => { setTelefono(e.target.value) }} />
                        </div>
                        <div>
                            <label htmlFor="domicilio">Domicilio: </label>
                            <input type="text" id="domicilio" value={domicilio} autoComplete='off' required onChange={(e) => { setDomicilio(e.target.value) }} />
                        </div>
                        <div className='modal-botones'>
                            <button className='boton-cancelar' onClick={handleCerrarModal} type='button'>Cancelar</button>
                            <button className='boton-guardar' type='submit'>Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ModalEditClientes
