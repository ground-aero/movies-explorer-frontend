import Promo from './Promo/Promo';
import About from './About/About';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import '../general/content.css';
import './Main.css';

function Main() {

    return (
        <main className='content'>

            <Promo/>

            <About/>
            <Techs/>
            <AboutMe/>
                {/*<Portfolio/>*/}

        </main>
    );
}

export default Main;
