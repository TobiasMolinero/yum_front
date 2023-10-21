/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react'
import '../../css/Gastos.css'
import { editar_categoria, one_categoria } from '../../utils/constants/constants'
import axios from 'axios'
import { gasto_guardado } from '../../utils/alertas/alertas'

const ModalEditCategoria = (props) => {

    const [nombreCategoria, setNombreCategoria] = useState()

    const handleCerrarModal = () => {
        props.getModalCategoriaEdit(false)
    }

    const getCategoria = async() => {
        try {
            let response = await axios.get(one_categoria + props.idCategoriaGasto)
            setNombreCategoria(response.data[0].categoriaGasto)
        } catch (error) {
            alert(error)
        }
    }

    const editarCategoria = async(e) => {
        e.preventDefault()
        try {
            await axios.put(editar_categoria + props.idCategoriaGasto, {
                categoriaGasto: nombreCategoria
            })
            gasto_guardado.fire({
                text: 'Categoria modificada con exito.'
            })
            handleCerrarModal()
        } catch (error) {
            alert(error)
        }
    }


    useEffect(() => {
        getCategoria()
    }, [])

  return (
    <div className="modal-background">
        <div className="modal-categoria">
            <button onClick={handleCerrarModal}><i className="bi bi-x-lg"></i></button>
            <h2>Agregar Categoria</h2>
            <form onSubmit={editarCategoria}>
                <div className="input">
                    <label htmlFor="nombre">Nombre Categoria:</label>
                    <input type="text" id="nombre" autoComplete='off' required defaultValue={nombreCategoria} onChange={(e) => {setNombreCategoria(e.target.value)}}/>
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

export default ModalEditCategoria
