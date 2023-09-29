// Component NavBurger - mobile menu
import { NavLink, Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import './NavBurger.css';

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
            <button onClick={openBurger} className={`burger burger_type_${type}`} type='button'>
            </button>

            {/* Overlay opened */}
            <div className={`overlay ${isOverlayOpen ? 'overlay_opened' : ''}`}>

                <button onClick={closeBurger} className='overlay__close'></button>

                <nav className='overlay__container'>

                    {/*<span className={`links links_${ rights }`}>*/}
                    <span className='links links_wrap'>
                        <NavLink to='/'
                                 className={({isActive}) => `link link_type_${type} ` + (isActive ? `link_active` : '')}>Главная</NavLink>
                        <NavLink to='/movies'
                                 className={({isActive}) => `link link_type_${type} ` + (isActive ? `link_active` : '')}>Фильмы</NavLink>
                        <NavLink to='/saved-movies'
                                 className={({isActive}) => `link link_type_${type} ` + (isActive ? 'link_active' : '')}>Сохраненные Фильмы</NavLink>
                    </span>

                    <NavLink to='/profile'
                             className={({isActive}) => `account link link_type_account ` + (isActive ? 'link_active' : '')}>
                        <p className='account__text'>Аккаунт</p>
                        {/*<img src={accountMan} className='account__man' alt='account icon'/>*/}
                    </NavLink>
                    {/*</span>*/}
                </nav>

            </div>


        </>
    );
}

export default NavBurger;
