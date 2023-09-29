// component with descr. of Diploma Project
import './About.css';
import '../../general/content.css';

function About() {

    return (
        <section id='about' className='sec about content__section'> {/* flex, column - */}

            <div className='sec__header-wrap sec__header-wrap_about'>
                <h2 className='sec__header'>О проекте</h2>
            </div>

            {/*2nd flex-box*/}
            <article className='articles articles_wrap'>
                <div className='article'>
                    <h3 className='article__title'>Дипломный проект включал 5 этапов</h3>
                    <p className='article__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className='article'>
                    <h3 className='article__title article__title_bottom'>На выполнение диплома ушло 5 недель</h3>
                    <p className='article__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </article>

            {/*3rd flex-box - table - align-self: flex-end*/}
            <ul className='table'>
                <li className='table-cell'>
                    <p className='table-row table-row_theme_primary'>1 неделя</p>
                    <p className='table-row table-row_theme_secondary'>4 недели</p>
                </li>
                <li className='table-cell'>
                    <p className='table-row table-row_theme_primary table-row_type_tech'>Back-end</p>
                    <p className='table-row table-row_theme_secondary table-row_type_tech'>Front-end</p>
                </li>

            </ul>

        </section>
    );
}

export default About;
