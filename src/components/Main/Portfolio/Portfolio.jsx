// component with links to other projects
import { Link } from 'react-router-dom';
import './Portfolio.css';
import '../../general/content.css';

function Portfolio() {

    return (
        <section id='portfolio' className='portfolio content-section content-section_inner'>

            <span className='portfolio__wrap'>
            <h2 className='portfolio__header'>Портфолио</h2>

            <ul className='portfolio__list'>
                <li className='portfolio__item'>
                    <Link to='https://ground.aero/' className='portfolio__link' target='_blank'>Pet-проект - сайт 'ground.aero'
                        <span className='portfolio__link-icon'></span>
                    </Link>
                </li>
                <li className='portfolio__item'>
                    <Link to='https://ground-aero.github.io/russian-travel/' className='portfolio__link' target='_blank'>Адаптивный сайт
                        <span className='portfolio__link-icon'></span>
                    </Link>
                </li>
                <li className='portfolio__item'>
                    <Link to='https://ground-aero.github.io/mesto/' className='portfolio__link' target='_blank'>Одностраничное приложение
                        <span className='portfolio__link-icon'></span>
                    </Link>
                </li>
                <li className='portfolio__item'>
                    <Link to='https://mesto-react.tech/' className='portfolio__link' target='_blank'>Приложение "Место" с авторизацией и регистрацией
                        <span className='portfolio__link-icon'></span>
                    </Link>
                </li>
                <li className='portfolio__item'>
                    <Link to='https://tg-app-client.netlify.app/' className='portfolio__link' target='_blank'>Приложение "3 в одном" - Telegram (Mini App): Чат, Погода, Прогноз. <br/> Имя в Telegram: @TgGroundBot
                        <span className='portfolio__link-icon'></span>
                    </Link>
                </li>
            </ul>

            </span>

        </section>
    );
}

export default Portfolio;
