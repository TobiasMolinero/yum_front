/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import axios from 'axios'
import { get_categorias_gastos, agregar_gasto } from '../../utils/constants/constants'
import '../../css/Gastos.css'
import { gasto_guardado } from '../../utils/alertas/alertas'

const ModalAddGasto = (props) => {

    const [categorias, setCategorias] = useState([])

    const [fecha, setFecha] = useState()
    const [categoria, setCategoria] = useState()
    const [importe, setImporte] = useState()
    const [descripcion, setDescripcion] = useState()

    const handleCerrarModal = () => {
        props.getModal(false)
    }

    const getCategorias = async () => {
        try {
            let response = await axios.get(get_categorias_gastos)
            setCategorias(response.data)
        } catch (error) {
            alert('Ocurrio un error en el servidor.')
        }
    }

    const agregarGasto = async(e) => {
        e.preventDefault()
        if(categoria === 'selected' || categoria === undefined){
            alert('Debe seleccionar una categoria.')
        } else {
            try {
                await axios.post(agregar_gasto, {
                    descripcion: descripcion,
                    categoria: categoria,
                    fecha: fecha,
                    importe: importe
                })
                gasto_guardado.fire({
                    text: 'Gasto registrado.'
                })
                handleCerrarModal()
            } catch (error) {
                alert(error)
            }
        }
    }


    useEffect(() => {
        getCategorias()
    }, [])

    return (
        <div className="modal-background">
            <div className="modal-gastos">
                <button onClick={handleCerrarModal}><i className="bi bi-x-lg"></i></button>
                <div className="modal-gastos-container">
                    <h2>Agregar Gasto</h2>
                    <form onSubmit={agregarGasto}>
                        <div>
                            <label htmlFor="fecha">Fecha: </label>
                            <input type="date" id='fecha' required onChange={(e) => { setFecha(e.target.value) }} />
                        </div>
                        <div>
                            <select defaultValue='selected' onChange={(e) => { setCategoria(e.target.value) }}>
                                <option value='selected'>-- SELECCIONE CATEGORIA --</option>
                                {categorias.map(c =>
                                    <option key={c.idCategoriaGasto} value={c.idCategoriaGasto}>{c.categoriaGasto}</option>
                                )}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="importe">Importe: </label>
                            <input type="number" id="importe" required onChange={(e) => { setImporte(e.target.value) }} />
                        </div>
                        <div>
                            <textarea placeholder='Descripción' cols="30" rows="5" required onChange={(e) => { setDescripcion(e.target.value) }}></textarea>
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

export default ModalAddGasto
