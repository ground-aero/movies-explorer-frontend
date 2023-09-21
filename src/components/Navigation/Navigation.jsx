// NavBar.js
import {NavLink, Link} from 'react-router-dom';
import './Navigation.css';
import accountMan from '../../images/account-man-full.webp';
import logoIcon from '../../images/logo.webp';
import NavBurger from './NavBurger/NavBurger';

function Navigation({ loggedIn, type, rights }) {

    return (
        <>
            <nav className={`menu menu_wrap`}>

                <Link to='/' className='menu__logo'>
                    <img className='logo' src={logoIcon} alt='logo'/>
                </Link>

                {/* переключение значений для блоока 'Navigation' inside Header */}
                <nav className={`menu__links_${ rights }`}>
                    <NavLink to='/movies'
                             className={({isActive}) => `menu__link_type_${type} menu__link ` + (isActive ? `menu__link_active` : '')}>Фильмы</NavLink>
                    <NavLink to='/saved-movies'
                             className={({isActive}) => `menu__link_type_${type} menu__link ` + (isActive ? 'menu__link_active' : '')}>Сохраненные Фильмы</NavLink>

                    {/* Burger <= 728-px */}
                    <NavBurger type={type}/>

                </nav>

                {/** логика отображения 'account' */}
                {loggedIn &&
                <>
                    <Link to='/profile'
                          className={`account account_wrap account_wrap_${ type } account_wrap_${ type }_${rights}`}>
                        <p className='account__text'>Аккаунт</p>
                        <img src={accountMan}
                             className='account__man' alt='account icon'/>
                    </Link>
                </>
                }

                {/** логика отображения блока 'Регистрация' / Войти' */}
                {!loggedIn &&
                    <nav className={`account_wrap account_wrap_${ type }_${rights}`}>
                        <Link to='/signup'
                              className={`account__link account__link_register `}>
                            <p className='account__link-text'>Регистрация</p>
                        </Link>
                        <Link to='/signin'
                              className={`account__link account__link_enter `}>
                            <p className='account__link-text account__link-text_active'>Войти</p>
                        </Link>

                    </nav>
                }

            </nav>
        </>
    )
}

export default Navigation;
