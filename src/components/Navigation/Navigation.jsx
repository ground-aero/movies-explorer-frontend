// NavBar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import accountDark from '../../images/account_dark.png';

function Navigation () {
    return (
        <>
        <nav className='menu menu_wrap'>
            <NavLink to='/' className='menu__link'>Домой</NavLink>
            <NavLink to='/movies' className='menu__link'>Фильмы</NavLink>
            <NavLink to='/saved-movies' className='menu__link'>Сохраненные Фильмы</NavLink>
        </nav>
            <div className='account account_wrap'>
                <img src={accountDark} className='account__icon' alt='account icon'/>
            </div>
        </>
    )
}

export default Navigation;
