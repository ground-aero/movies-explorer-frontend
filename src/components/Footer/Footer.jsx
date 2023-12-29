// Component Footer
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer () {
    return (
        <footer className='footer'>

            <h3 className='footer__header'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>

            <div className='footer__bottom'>

                <p className='footer__year'>© 2023</p>
                <ul className='footer__items'>
                    <li className='footer__item'>
                        <Link className='footer__link' to='https://practicum.yandex.ru/' target='_blank'>Яндекс.Практикум</Link>
                    </li>
                    <li className='footer__item'>
                        <Link className='footer__link' to='https://github.com/ground-aero' target='_blank'>Github</Link>
                    </li>
                </ul>

            </div>
        </footer>
    );
}

export default Footer;
