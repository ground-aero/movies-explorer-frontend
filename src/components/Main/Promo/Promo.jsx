// компонент с вёрсткой баннера страницы «О проекте».
import { HashLink } from 'react-router-hash-link';
import './Promo.css';
import '../../general/content.css';
import logoGlobe from '../../../images/logo-world.svg';

function Promo() {
    return (
            <section id='promo' className='promo content__section'>

                <div className='promo__wrap'>
                    <span className='promo__wrap_left'>
                        <h1 className='promo_header'>Учебный проект студента факультета Веб-разработки.</h1>
                        <p className='promo_text'>Листайте ниже, чтобы узнать больше про этот проект и его создателя</p>
                    </span>
                    <HashLink smooth to='/#portfolio' className='promo__link promo__link_more'>Узнать больше</HashLink>

                </div>

                <img src={logoGlobe} className='promo__globe-img' alt='logo globe'/>

            </section>
    );
}

export default Promo;
