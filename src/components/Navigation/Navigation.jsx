// NavBar.js
import {NavLink, Link} from 'react-router-dom';
import './Navigation.css';
// import accountDark from '../../images/account_dark.png';
import accountMan from '../../images/account-man-full.svg';
import logoIcon from '../../images/logo.svg';

function Navigation(props) {
    console.log(props.loggedIn)
    return (
        <>
            <nav className='menu menu_wrap'>

                {props.loggedIn &&
                    <>
                        <Link to='/' className='menu__logo'>
                            <img className='logo' src={logoIcon} alt="logo"/>
                        </Link>
                        <span className='menu__links'>
                            <NavLink to='/movies' className='menu__link'>Фильмы</NavLink>
                            <NavLink to='/saved-movies' className='menu__link'>Сохраненные Фильмы</NavLink>
                        </span>
                        <Link to='/profile' className='account account_wrap account_wrap_entry'>
                            <p className='account__text'>Аккаунт</p>
                            <img src={accountMan} className='account__man' alt='account icon'/>
                        </Link>
                    </>
                }
                {!props.loggedIn &&
                    <>
                        <Link to='/' className='menu__logo'>
                            <img className='logo' src={logoIcon} alt="logo"/>
                        </Link>
                        <span className='account account_wrap'>
                            <Link to='/signup' className='account__link'>
                                <p className='account__link-text'>Регистрация</p>
                            </Link>
                            <Link to='/signin' className='account__link account__link_enter'>
                                <p className='account__link-text account__link-text_active'>Войти</p>
                            </Link>

                        </span>
                    </>
                }

            </nav>

        </>
    )
}

export default Navigation;
