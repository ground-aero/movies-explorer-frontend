import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import '../general/content.css';
import './Main.css';

function Main() {

    return (
        <main className='content'>
            <h2>MAIN: Promo, NavTab, AboutProject, Techs, AboutMe, Portfolio</h2>

            <Promo/>
            <NavTab/>
            <AboutProject/>
            <Techs/>
            <AboutMe/>
            <Portfolio/>

        </main>
    );
}

export default Main;
