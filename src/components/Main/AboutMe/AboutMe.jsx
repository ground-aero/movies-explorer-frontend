// component for 'Main' - about me, contains 'Portfolio' sub-component.
import './AboutMe.css';
import '../../general/content.css';
import myPhoto from '../../../images/me_squoshed.svg';
import Portfolio from '../Portfolio/Portfolio.jsx'

function AboutMe() {

    return (
        <section id='about-me' className='sec about-me content__section'>

            <div className='sec__header-wrap sec__header-wrap_about-me'>
                <h3 className='sec__header'>Студент</h3>
            </div>

            <div className='article article_outer-wrap'>
                <article className='article__inner-wrap'>
                    <span className='article__inner-content'>
                        <h4 className='article__header'>Евгений</h4>
                    <h5 className='article__sub-header'>Фронтенд-разработчик, 43 года</h5>
                    <p className='article__text article__text_about'>
                        Живу в Москве, закончил факультет переводчиков КГТУ. У&nbsp;меня есть жена,
                        сын и дочь. Я долгое время работал в авиации, а ещё увлекаюсь прогулками. Недавно начал кодить.
                        С 2013 года работал в компании Goldair Handling SA. После того, как прошёл курс по веб-разработке, начал заниматься своим пет-проектом, фриланс-заказами.
                        Планирую полностью перейти на веб-разработку и программирование.
                    </p>
                    </span>
                    {/*justify flex-end*/}
                    <a href='https://github.com/ground-aero' className='article__outer-ref' target='_blank' rel='noopener noreferrer'>Github</a>
                </article>
                <img src={myPhoto} className='about-me__photo' alt='мое фото'/>
            </div>

            <Portfolio/>

        </section>
    );
}

export default AboutMe;
