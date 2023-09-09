// NavBar.js
import { NavLink, Link } from 'react-router-dom';
import './Navigation.css';
import accountDark from '../../images/account_dark.png';
import logoIcon from '../../images/logo.svg';

function Navigation () {
    return (
        <>
        <nav className='menu menu_wrap'>
            <Link to='/' className='menu__logo'>
                <img className='logo' src={logoIcon} alt="logo"/>
            </Link>

            <div className='menu__links_wrap'>
                <NavLink to='/movies' className='menu__link'>Фильмы</NavLink>
                <NavLink to='/saved-movies' className='menu__link'>Сохраненные Фильмы</NavLink>
            </div>

            <Link to='/profile' className='account account_wrap'>
            {/*<p account__text>Аккаунт</p>*/}
            <img src={accountDark} className='account__icon' alt='account icon'/>
        </Link>
        </nav>


        </>
    )
}

export default Navigation;
