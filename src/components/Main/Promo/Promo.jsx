// компонент с вёрсткой баннера страницы «О проекте».
import { HashLink } from 'react-router-hash-link';
import './Promo.css';
import '../../general/content.css';

function Promo() {
    return (
            <section id='promo' className='promo content__section'>

                <div className='promo__wrap'>
                    <span className='promo__wrap-text'>
                        <h1 className='promo__header'>Учебный проект студента факультета <span className='promo-white-space'>Веб-разработки.</span></h1>
                        <p className='promo__text'>Листайте ниже, чтобы узнать больше про&nbsp;этот проект и его создателя</p>
                    </span>
                    <HashLink smooth to='/#about' className='promo__link'>Узнать больше</HashLink>
                </div>

                {/*<img src={logoGlobe} className='promo__globe-img' alt='logo globe'/>*/}

            </section>
    );
}

export default Promo;
