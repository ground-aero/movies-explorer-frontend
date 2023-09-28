// component - NotFound page - 404
import '../general/content.css';
import './NotFound.css';
import {Link, useNavigate} from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    return (
        <main className='content'>
            <section className='not-found not-found_page'>
                <span className='not-found_info__wrap'>
                    <p className='not-found_page__err'>404</p>
                    <p className='not-found_page__text'>Страница не найдена</p>
                </span>
                <Link onClick={() => navigate(-1)} className='link-back'>Назад</Link>
            </section>
        </main>
    );
}

export default NotFound;
