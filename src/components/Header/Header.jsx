// Component Header - for Main page,
// should change its outlay, if user authorized or not.
import React from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation.jsx';
import logoDark from '../../images/logo_dark.svg';

function Header() {
    return (
        <header className='header header_wrap'>
            <img className='' src={logoDark} alt="logo type dark"/>
            {/*Шапка на главной странице, как и на других страницах, должна менять отображение,
            если пользователь авторизован или не авторизован.
            Такое поведение нужно сразу предусмотреть в вёрстке, даже несмотря на то,
            что сама авторизация ещё не реализована.*/}

            <Navigation />
        </header>
    );
}

export default Header;
