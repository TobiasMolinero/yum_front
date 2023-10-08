import logo from '../assets/logo-sinfondo.png'
import '../css/Header.css'

const Header = () => {
  return (
    <header className='header'>
        <h2>Sistema de Gestión</h2>
        <img src={logo} alt="logo" />
    </header>
  )
}

export default Header
