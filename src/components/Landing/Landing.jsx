import React from 'react';
import Promo from './Promo/Promo.jsx';
import '../general/content.css';

function Landing({}) {

    return (
        <main className="landing content">
            <h3>This is Landing block, containig:
            Promo,
                NavTab,
                AboutProject,
                Techs,
                AboutMe,
                Portfolio
            </h3>

            <Promo/>

        </main>
    );
}

export default Landing;
