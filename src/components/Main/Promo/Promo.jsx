// компонент с вёрсткой баннера страницы «О проекте».
import { HashLink } from 'react-router-hash-link';
import './Promo.css';
import '../../general/content.css';

function Promo() {
    return (
            <section id='promo' className='promo content__section'>

                <div className='promo__wrap'>
                    <span className='promo__wrap-text'>
                        <h1 className='promo__header'>Проект "Кинотеатр". <span className='promo-white-space'>факультет Веб-разработки</span></h1>
                        <p className='promo__text'>Зарегистрируйтесь чтобы искать и сохранять фильмы.&nbsp;<span className='promo-white-space'></span>Или листайте ниже, чтобы узнать больше про этот проект и его создателя. </p>
                    </span>
                    <HashLink smooth to='/#about' className='promo__link'>Узнать больше</HashLink>
                </div>

            </section>
    );
}

export default Promo;
