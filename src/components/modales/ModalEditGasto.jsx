/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import {useState, useEffect} from 'react'
import '../../css/Gastos.css'
import { one_gasto, get_categorias_gastos, editar_gasto } from '../../utils/constants/constants'
import { error_servidor, gasto_guardado } from '../../utils/alertas/alertas'

const ModalEditGasto = (props) => {

    const [gasto, setGasto] = useState([])
    const [categorias, setCategorias] = useState([])

    const [fecha, setFecha] = useState()
    const [categoria, setCategoria] = useState()
    const [importe, setImporte] = useState()
    const [descripcion, setDescripcion] = useState()

    const handleCerrarModal = () => {
        props.getModalEdit(false)
    }

    const getCategorias = async () => {
        try {
            let response = await axios.get(get_categorias_gastos)
            setCategorias(response.data)
        } catch (error) {
            error_servidor.fire()
        }
    }

    const getGasto = async() => {
        try {
            let response = await axios.get(one_gasto + props.idGasto)
            setFecha(response.data[0].fecha.substring(0, 10))
            setCategoria(response.data[0].idCategoriaGasto)
            setImporte(response.data[0].importe)
            setDescripcion(response.data[0].descripcion)
        } catch (error) {
            error_servidor.fire()
        }
    }

    const editarGasto = async(e) => {
        e.preventDefault()
        try {
            await axios.put(editar_gasto + props.idGasto, {
                fecha: fecha,
                categoria: categoria,
                importe: importe, 
                descripcion: descripcion
            })
            gasto_guardado.fire({
                text: 'Registro modificado.'
            })
            handleCerrarModal()
        } catch (error) {
            error_servidor.fire()
        }
    }

    useEffect(() => {
        getCategorias()
        getGasto()
    }, [])

  return (
    <div className="modal-background">
        <div className="modal-gastos">
            <button onClick={handleCerrarModal}><i className="bi bi-x-lg"></i></button>
            <div className="modal-gastos-container">
                <h2>Editar Gasto</h2>
                <form onSubmit={editarGasto}>
                    <div>
                        <label htmlFor="fecha">Fecha: </label>
                        <input type="date" defaultValue={fecha} id='fecha' required onChange={(e) => {setFecha(e.target.value)}}/>
                    </div>
                    <div>
                        <select  value={categoria} onChange={(e) => {setCategoria(e.target.value)}}>
                            {categorias.map(c => 
                                <option key={c.idCategoriaGasto} value={c.idCategoriaGasto}>{c.categoriaGasto}</option>    
                            )}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="importe">Importe: </label>
                        <input type="number" id="importe" required defaultValue={importe} onChange={(e) => {setImporte(e.target.value)}}/>
                    </div>
                    <div>
                        <textarea placeholder='Descripción' cols="30" rows="5"  required defaultValue={descripcion} onChange={(e) => {setDescripcion(e.target.value)}}></textarea>
                    </div>
                    <div className='modal-botones'>
                        <button className='boton-cancelar' onClick={handleCerrarModal} type='button'>Cancelar</button>
                        <button className='boton-guardar' type='submit'>Modificar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ModalEditGasto
