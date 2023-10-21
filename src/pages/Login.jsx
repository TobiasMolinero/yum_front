import logo2 from '../assets/logo2.png'
import '../css/Login.css'
import { login_usuario } from '../utils/constants/constants'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { datos_invalidos, toast } from '../utils/alertas/alertas'

const Login = () => {

  const navigate = useNavigate()

  const[nombreUsuario, setNombreUsuario] = useState()
  const[contraseña, setContraseña] = useState()

  const login = async(e) => {
    e.preventDefault()
    try {
      var response = await axios.post(login_usuario, {
        nombreUsuario: nombreUsuario,
        contraseña: contraseña
      })
    } catch (error) {
      alert(error)
    }
    if(response.data === 0){
      datos_invalidos.fire({
        icon: 'error',
        text: 'Datos invalidos.'
      })
    } else {
      toast.fire({
        icon: 'success',
        text:'Iniciaste sesion correctamente'
      })
      localStorage.setItem('auth', true)
      navigate('/app/inicio')
    }
  }


  return (
    <div className="login-box">
      <img src={logo2} className="avatar" alt="Avatar Image"/>
      <h1>INGRESAR USUARIO</h1>
      <form onSubmit={login}>
        <label htmlFor="username">Nombre de usuario</label>
        <input type="text" required placeholder="Ingrese usuario" onChange={(e) => {setNombreUsuario(e.target.value)}}/>
        <label htmlFor="password">Contraseña</label>
        <input type="password" required placeholder="Ingrese contraseña" onChange={(e) => {setContraseña(e.target.value)}}/>
        <input type="submit" value="ACCEDER"/>
        {/* <a href="#">Olvide mi contraseña</a><br/> */}
        {/* <a href="#">Registrar usuario</a> */}
      </form>
    </div>
  )
}

export default Login
