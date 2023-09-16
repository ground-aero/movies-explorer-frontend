// Component for 'Main' - with techs used
import './Techs.css';
import '../../general/content.css';

function Techs() {

    return (
        <section id='techs' className='techs content__section'>

            <div className='techs__header_wrap'>
                <h3 className='techs__header'>Технологии</h3>
                <hr className='techs__line'/>
            </div>

            <article className='article-techs'>
                <h4 className='article-techs__title'>7 технологий</h4>
                <p className='article-techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </article>

            <ul className='techs__list'>
                <li className='techs__item'>HTML</li>
                <li className='techs__item'>CSS</li>
                <li className='techs__item'>JS</li>
                <li className='techs__item'>React</li>
                <li className='techs__item'>Git</li>
                <li className='techs__item'>Express.js</li>
                <li className='techs__item'>mongoDB</li>
            </ul>

        </section>
    );
}

export default Techs;
