// Component NavBurger - mobile menu
import { NavLink, Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import './NavBurger.css';
import burger from '../../../images/burger_white.svg';
import accountMan from '../../../images/account-man-full.svg';

function NavBurger ({ type, rights }) {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    // useEffect(() => {
    //     document.body.style.overflow = isOverlayOpen ? 'overlay_hidden' : '';
    // }, [isOverlayOpen]);

    // function toggleBurger() { isOverlayOpen ? setIsOverlayOpen(false) : setIsOverlayOpen(true)}
    function openBurger() { isOverlayOpen ? setIsOverlayOpen(false) : setIsOverlayOpen(true) }
    function closeBurger() { !isOverlayOpen ? setIsOverlayOpen(true) : setIsOverlayOpen(false) }

    return (
        <>
            {/* Burger toggle */}
            <button onClick={openBurger} className='burger' type='button'>
                <img src={burger} className={`burger__img burger__img_${type}`} alt='burger menu'/>
            </button>

            {/* Overlay opened */}
            <div className={`overlay ${isOverlayOpen ? 'overlay_opened' : ''}`}>

                <button onClick={closeBurger} className='overlay__close'></button>

                <aside className='overlay__container'>

                    {/*<span className={`links links_${ rights }`}>*/}
                    <span className='links links_wrap'>
                        <NavLink to='/'
                                 className={({isActive}) => `link link_burger link_${type} ` + (isActive ? `link_active` : '')}>Главная</NavLink>
                        <NavLink to='/movies'
                                 className={({isActive}) => `link link_burger link_${type} ` + (isActive ? `link_active` : '')}>Фильмы</NavLink>
                        <NavLink to='/saved-movies'
                                 className={({isActive}) => `link link_burger link_${type} ` + (isActive ? 'link_active' : '')}>Сохраненные Фильмы</NavLink>
                    </span>

                    <NavLink to='/profile'
                             className={({isActive}) => `account_wrap link link_burger ` + (isActive ? 'link_active' : '')}>
                        <p className='account__text'>Аккаунт</p>
                        <img src={accountMan} className='account__man' alt='account icon'/>
                    </NavLink>
                    {/*</span>*/}
                </aside>

            </div>


        </>
    );
}

export default NavBurger;
