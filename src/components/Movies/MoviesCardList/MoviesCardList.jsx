// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
    return (
        <>
            <ul className='movies__cards'>

                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
                <MoviesCard />
            </ul>

            <div className='movies__more'>
                <button className='movies__btn-more' name='movies__btn-more-btn' type='button'>Еще</button>
            </div>

        </>
    );
}

export default MoviesCardList;
