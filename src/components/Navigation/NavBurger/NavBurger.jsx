// Component NavBurger - mobile menu
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import './NavBurger.css';
import burger from '../../../images/burger_white.svg';

function NavBurger ({ type }) {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    // useEffect(() => {
    //     document.body.style.overflow = isOverlayOpen ? 'burger-overlay_hidden' : '';
    // }, [isOverlayOpen]);

    // function isOpen() { setIsOverlayOpen(true) }
    function toggleBurger() { isOverlayOpen ? setIsOverlayOpen(false) : setIsOverlayOpen(true)}

    return (
        <>
            {/* Burger opened */}
            <button onClick={toggleBurger} className='burger' type='button'>
                <img src={burger} className={`burger__img_${type}`} alt='burger menu'/>
            </button>

            {/* Overlay opened */}
            <div className={`burger-overlay ${isOverlayOpen ? 'burger-overlay_opened' : ''}`}>
            </div>


        </>
    );
}

export default NavBurger;
