// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
    return (
            <ul className='movies__cards'>

                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                {/*<li className='movies__card'>Card 0</li>*/}
                {/*<li className='movies__card'>Card 0.1</li>*/}

            </ul>
    );
}

export default MoviesCardList;
