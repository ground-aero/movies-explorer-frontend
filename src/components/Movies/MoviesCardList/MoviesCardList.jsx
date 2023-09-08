// компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
    return (
        <ul className='movies-cardlist'>
            <>
            <h4>MoviesCardList +MoviesCard -> for SEC -Movies/ Saved M. </h4>
            {/*FilterCheckbox - // внутри SearchForm // фильтр с чекбоксом «Только короткометражки»
            отд. управляемыq компонент FilterCheckbox */}
            <MoviesCard />
            </>
        </ul>
    );
}

export default MoviesCardList;
