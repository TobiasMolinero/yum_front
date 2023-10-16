import logo2 from '../assets/logo2.png'
import '../css/Header.css'

const Header = () => {
  return (
    <header className='header'>
        <h2>Sistema de Gestión</h2>
        <img src={logo2} alt="logo" />
    </header>
  )
}

export default Header
