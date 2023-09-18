// component - компонент страницы с сохранёнными карточками фильмов.
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies() {
    return (
        <section className='saved-movies'>

            <SearchForm />

            <MoviesCardList/>

            <span className='span__box'></span>

        </section>
    );
}

export default SavedMovies;
