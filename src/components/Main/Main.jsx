import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import About from './About/About';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import '../general/content.css';
import './Main.css';

function Main() {

    return (
        <main className='content'>

            <Promo/>

            <About/>
            <Techs/>
            <AboutMe/>
                <Portfolio/>
                <NavTab/>

        </main>
    );
}

export default Main;
