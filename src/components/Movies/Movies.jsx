// Component for page with movies search.
import '../general/content.css';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from './MoviesCardList/MoviesCardList';

function Movies() {
    return (
        <section className='movies content__section'>

            <h6>MOVIES SEC: SearchForm, Preloader, MoviesCardList, MoviesCard</h6>

            <SearchForm />

            <Preloader />

            <MoviesCardList />

        </section>
    );
}

export default Movies;
