/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import '../../css/Clientes.css'
import axios from 'axios'
import { agregar_cliente } from '../../utils/constants/constants'

const ModalAddCliente = (props) => {


    const [nombre, setNombre] = useState()
    const [domicilio, setDomicilio] = useState()
    const [telefono, setTelefono] = useState()

    const handleCerrarModal = () => {
        props.cerrarModal(false)
    }

    const agregarCliente = async(e) => {
        e.preventDefault()
        try {
            await axios.post(agregar_cliente, {
                nombre: nombre,
                domicilio: domicilio,
                telefono: telefono
            })
            alert('El cliente se registró con exito.')
            handleCerrarModal()
        } catch (error) {
            alert(error)
        }
        window.location.reload()
    }

    return (
        <div className="modal-background">
            <div className="modal-clientes">
                <button onClick={handleCerrarModal}><i className="bi bi-x-lg"></i></button>
                <div className="modal-clientes-container">
                    <h2>Agregar Cliente</h2>
                    <form onSubmit={agregarCliente}>
                        <div>
                            <label htmlFor="nombre">Nombre: </label>
                            <input type="text" id="nombre" autoComplete='off' required onChange={(e) => { setNombre(e.target.value) }} />
                        </div>
                        <div>
                            <label htmlFor="telefono">Telefono: </label>
                            <input type="text" id="telefono" autoComplete='off' required onChange={(e) => { setTelefono(e.target.value) }} />
                        </div>
                        <div>
                            <label htmlFor="domicilio">Domicilio: </label>
                            <input type="text" id="domicilio" autoComplete='off' required onChange={(e) => { setDomicilio(e.target.value) }} />
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

export default ModalAddCliente
