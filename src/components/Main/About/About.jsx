// component with descr. of Diploma Project
import './About.css';
import '../../general/content.css';

function About() {

    return (
        <section id='about' className='about content__section'> {/* flex, column - */}

            <div className='about__header_wrap'>
                <h2 className='about__header'>О проекте</h2>
                <hr className='about__line'/>
            </div>

            {/*2nd flex-box*/}
            <article className='articles articles_wrap'>
                <article className='article'>
                    <h3 className='article__title'>Дипломный проект включал 5 этапов</h3>
                    <p className='article__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </article>
                <article className='article'>
                    <h3 className='article__title'>Дипломный проект включал 5 этапов</h3>
                    <p className='article__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </article>
            </article>

            {/*3rd flex-box - table - align-self: flex-end*/}
            <ul className='table'>
                <li className='table-cell'>
                    <p className='table-row table-row_left'>1 неделя</p>
                    <p className='table-row table-row_right'>4 недели</p>
                </li>
                <li className='table-cell'>
                    <p className='table-row table-row_left table-row_tech'>Back-end</p>
                    <p className='table-row table-row_right table-row_tech'>Front-end</p>
                </li>

            </ul>

        </section>
    );
}

export default About;
