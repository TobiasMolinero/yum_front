/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import '../css/Gastos.css'

const MenuGastos = (props) => {

    const [mes, setMes] = useState(props.mes)
    const [nombreMes, setNombreMes] = useState()

    const getMes = () => {
        props.getValorMes(mes)
    }

    const mesActual = () => {
        const date = new Date()
        let mesActual = date.getMonth()
        switch (mesActual) {
          case 0:
            setMes('1')
            break;
        
          case 1:
            setMes('2')
            break;
        
          case 2:
            setMes('3')
            break;
        
          case 3:
            setMes('4')
            break;
        
          case 4:
            setMes('5')
            break;
        
          case 5:
            setMes('6')
            break;
        
          case 6:
            setMes('7')
            break;
        
          case 7:
            setMes('8')
            break;
        
          case 8:
            setMes('9')
            break;
        
          case 9:
            setMes('10')
            break;
        
          case 10:
            setMes('11')
            break;
        
          case 11:
            setMes('12')
            break;
        
          default:
            break;
        }
      }
    

    const getNombreMes = (valor) => {
            switch (valor) {
                case '1':
                    setNombreMes('Enero') 
                    break;

                case '2':
                    setNombreMes('Febrero') 
                    break;

                case '3':
                    setNombreMes('Marzo') 
                    break;

                case '4':
                    setNombreMes('Abril') 
                    break;

                case '5':
                    setNombreMes('Mayo') 
                    break;

                case '6':
                    setNombreMes('Junio') 
                    break;

                case '7':
                    setNombreMes('Julio') 
                    break;

                case '8':
                    setNombreMes('Agosto') 
                    break;

                case '9':
                    setNombreMes('Septiembre') 
                    break;

                case '10':
                    setNombreMes('Octubre') 
                    break;

                case '11':
                    setNombreMes('Noviembre') 
                    break;

                case '12':
                    setNombreMes('Diciembre') 
                    break;

                default:
                    break;
            }
    }

    const handleAbrirModal = () => {
        props.getModal(true)
    }

    useEffect(() => {
        mesActual()
        getNombreMes(mes)
    }, [])

    useEffect(() => {
        getMes()
        getNombreMes(mes)
    }, [mes])

    return (
        <div className='menu-gastos'>
            <div className="filtros">
                <select value={props.mes} onChange={(e) => {setMes(e.target.value)}}>
                    <option value='1'>ENERO</option>
                    <option value='2'>FEBRERO</option>
                    <option value='3'>MARZO</option>
                    <option value='4'>ABRIL</option>
                    <option value='5'>MAYO</option>
                    <option value='6'>JUNIO</option>
                    <option value='7'>JULIO</option>
                    <option value='8'>AGOSTO</option>
                    <option value='9'>SEPTIEMBRE</option>
                    <option value='10'>OCTUBRE</option>
                    <option value='11'>NOVIEMBRE</option>
                    <option value='12'>DICIEMBRE</option>
                </select>
            </div>
            <div className="mes">
                <h2>{nombreMes}</h2>
            </div>
            <div className='boton-agregar'>
                <button onClick={handleAbrirModal}><i className='bi bi-plus-square'></i>Agregar Gasto</button>
            </div>
        </div>
    )
}

export default MenuGastos
