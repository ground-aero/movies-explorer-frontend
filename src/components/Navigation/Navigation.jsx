// NavBar.js
import {NavLink, Link} from 'react-router-dom';
import './Navigation.css';
import accountMan from '../../images/account-man-full.svg';
import logoIcon from '../../images/logo.svg';

function Navigation({ loggedIn, type, rights }) {
    // console.log(props.loggedIn)
    let weight = (type === 'movies') ? 500 : '';

    return (
        <>
            <nav className={`menu menu_wrap`}>

                <Link to='/' className='menu__logo'>
                    <img className='logo' src={logoIcon} alt='logo'/>
                </Link>

                {/* переключение значений для блоока 'Navigation' inside Header */}
                <span className={`menu__links_${ rights }`}>
                    <NavLink to='/movies'
                             className={`menu__link menu__link_${ rights } menu__link_type_${ type } menu__link_${weight}`}>Фильмы</NavLink>
                    <NavLink to='/saved-movies'
                             className={`menu__link menu__link_${ rights } menu__link_type_${ type }`}>Сохраненные Фильмы</NavLink>
                </span>

                {/** логика отображения блока 'account entry' */}
                {loggedIn &&
                <>
                    <Link to='/profile'
                          className={`account account_wrap account_wrap_${ type }`}>
                        <p className='account__text'>Аккаунт</p>
                        <img src={accountMan}
                             className='account__man' alt='account icon'/>
                    </Link>
                </>
                }
                {!loggedIn &&
                    <span className='account_wrap'>
                        <Link to='/signup'
                              className={`account__link`}>
                            <p className='account__link-text'>Регистрация</p>
                        </Link>
                        <Link to='/signin'
                              className={`account__link account__link_enter`}>
                            <p className='account__link-text account__link-text_active'>Войти</p>
                        </Link>
                    </span>
                }

            </nav>
        </>
    )
}

export default Navigation;