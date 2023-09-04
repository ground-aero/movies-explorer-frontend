import React from 'react';
import Promo from './Promo/Promo.jsx';
import NavTab from './NavTab/NavTab.jsx';
import AboutProject from './AboutProject/AboutProject.jsx';
import Techs from './Techs/Techs.jsx';
import AboutMe from './AboutMe/AboutMe.jsx';
import Portfolio from './Portfolio/Portfolio.jsx';
import '../general/content.css';
import './LandPage.css';

function LandPage({}) {

    return (
        <main className="landpage content">
            <h3>LANDING PAGE Block: Promo, NavTab, AboutProject, Techs, AboutMe, Portfolio</h3>

            <Promo/>
            <NavTab/>
            <AboutProject/>
            <Techs/>
            <AboutMe/>
            <Portfolio/>

        </main>
    );
}

export default LandPage;
