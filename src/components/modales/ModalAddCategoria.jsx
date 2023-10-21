/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import '../../css/Gastos.css'
import { agregar_categoria_gasto } from "../../utils/constants/constants"
import axios from "axios"
import { gasto_guardado } from "../../utils/alertas/alertas"

const ModalAddCategoria = (props) => {

    const [nombreCategoria, setNombreCategoria] = useState()

    const handleCerrarModal = () => {
        props.getModalCategoria(false)
    }

    const agregarCategoria = async(e) => {
        e.preventDefault()
        try {
            await axios.post(agregar_categoria_gasto, {
                categoriaGasto: nombreCategoria
            })
            gasto_guardado.fire({
                text: 'Categoria registrada con exito.'
            })
            handleCerrarModal()
        } catch (error) {
            alert(error)
        }
    }

  return (
    <div className="modal-background">
        <div className="modal-categoria">
            <button onClick={handleCerrarModal}><i className="bi bi-x-lg"></i></button>
            <h2>Agregar Categoria</h2>
            <form onSubmit={agregarCategoria}>
                <div className="input">
                    <label htmlFor="nombre">Nombre Categoria:</label>
                    <input type="text" id="nombre" autoComplete='off' required onChange={(e) => {setNombreCategoria(e.target.value)}}/>
                </div>
                <div className="modal-botones">
                    <button className="boton-cancelar" onClick={handleCerrarModal} type="button">Cancelar</button>
                    <button className="boton-guardar" type="submit">Guardar</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ModalAddCategoria
