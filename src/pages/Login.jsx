import logo2 from '../assets/logo2.png'
import '../css/Login.css'

const Login = () => {
  return (
    <div className="login-box">
      <img src={logo2} className="avatar" alt="Avatar Image"/>
      <h1>INGRESAR USUARIO</h1>
      <form>
        <label htmlFor="username">Nombre de usuario</label>
        <input type="text" placeholder="Ingrese usuario"/>
        <label htmlFor="password">Contraseña</label>
        <input type="password" placeholder="Ingrese contraseña"/>
        <input type="submit" value="ACCEDER"/>
        <a href="#">Olvide mi contraseña</a><br/>
        <a href="#">Registrar usuario</a>
      </form>
    </div>
  )
}

export default Login
