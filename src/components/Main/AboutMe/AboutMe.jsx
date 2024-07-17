// component for 'Main' - about me, contains 'Portfolio' sub-component.
import './AboutMe.css';
import '../../general/content.css';
import myPhoto from '../../../images/me_squoshed.jpg';
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
                    Живу в Москве, в 2002г. окончил факультет переводчиков КГТУ, 2024г. факультет вэб-разработки ЯндексПрактикум. У&nbsp;меня есть жена,
                        сын и дочь. Около 20 лет работал в аэропортовой сфере, увлекаюсь путешествиями и игрой на музыкальных инструментах. С 2022г начал кодить.
                        После того, как прошёл курс по веб-разработке, начал заниматься своими пет-проектами, о чем мечтал еще до прихода в программирование, а также некоторыми частными заказами.
                        Перехожу в веб-разработку и программирование на постоянной основе.
                    </p>
                    </span>
                    <a href='https://github.com/ground-aero' className='article__outer-ref' target='_blank' rel='noopener noreferrer'>Github</a>
                </article>
                <img src={myPhoto} className='about-me__photo' alt='мое фото'/>
            </div>

            <Portfolio/>

        </section>
    );
}

export default AboutMe;
